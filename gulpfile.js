var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var combiner = require('stream-combiner2');
var http = require('http');
var ecstatic = require('ecstatic');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var ghPages = require('gulp-gh-pages');

var DIST = 'dist/';
var CSS_DEST = 'dist/css';
var JS_DEST = 'dist/js';
var MAIN_LESS_FILE = 'styles.less';
var MAIN_JS_FILE = 'index.js';
var SERVER_PORT = 4000;

/* Compile ES6 */
// https://gist.github.com/danharper/3ca2273125f500429945
function compileJS(watch) {
  var bundler = watchify(browserify(MAIN_JS_FILE, { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(MAIN_JS_FILE))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(JS_DEST));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

/* Compile, minify, and compress LESS files */
gulp.task('less', function() {
  var combined = combiner.obj([
    gulp.src(MAIN_LESS_FILE),
    less(),
    autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }),
    gulp.dest(CSS_DEST)
  ]);

  // any errors in the above streams will get caught
  // by this listener, instead of being thrown:
  combined.on('error', console.error.bind(console));

  return combined;
});

/* Watch Files For Changes */
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(MAIN_LESS_FILE, ['less']);

  /* Trigger a live reload on any template changes */
  gulp.watch('index.html').on('change', livereload.changed);

  /* Trigger a live reload upon CSS complilation */
  gulp.watch(CSS_DEST + '/**').on('change', livereload.changed);

  /* Trigger a live reload upon JS complilation */
  gulp.watch(JS_DEST + '/**').on('change', livereload.changed);
});

gulp.task('serve', function() {
  //Set up your static fileserver, which serves files in the build dr
  http.createServer(ecstatic({ root: __dirname + '/dist' })).listen(SERVER_PORT);
});

// copy static assets to dist folder
gulp.task('images', function() {
  return gulp.src('images/**/*.{png,jpg,jpeg,gif}')
    .pipe(gulp.dest(DIST + 'images/'));
});

// copy example to dist folder
gulp.task('html', function() {
  return gulp.src('**/*.html')
    .pipe(gulp.dest(DIST));
});

// deploy to github pages
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('javascript:build', function() { return compileJS(); });

gulp.task('javascript:watch', function() { return compileJS(true); });

/* Run a server for development */
gulp.task('default', ['less', 'html', 'images',  'javascript:watch', 'watch', 'serve']);

/* Create a build of frontend code */
gulp.task('build', ['less', 'html', 'images', 'javascript:build']);
