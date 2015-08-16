import d3 from 'd3';

var maxItems = 648;

//specify the number of columns and rows for pictogram layout
var numCols = 20;

//padding for the grid
var xPadding = 5;
var yPadding = 5;

//horizontal and vertical spacing between the icons
var hBuffer = 5;
var wBuffer = 5;

//generate a d3 range for the total number of required elements
var index = d3.range(maxItems);
var body = d3.select('body');

//create slider
var slider = body.append('input')
  .attr('type', 'range')
  .attr('value', 0)
  .attr('min', 0)
  .attr('max', maxItems)
  .attr('step', 1);

//create svg element
var svgDoc = body.append('svg')
  .attr('viewBox','0 0 120 180');

function updateColors(maxValue) {
  d3.selectAll('circle').attr('class', (d, i) => {
    if (d < maxValue) {
      return 'iconSelected';
    }
    else {
      return 'iconPlain';
    }
  });
}

//text element to display number of icons highlighted
svgDoc.append('text')
  .attr('id', 'txtValue')
  .attr('x', xPadding)
  .attr('y', yPadding)
  .attr('dy', -1)
  .text('0');

//create group element and create an svg <use> element for each icon
svgDoc.append('g')
  .attr('id','pictoLayer')
  .selectAll('use')
  .data(index)
  .enter()
  .append('circle')
  .attr('r', 1)
  .attr('id', (d) => 'icon' + d)
  .classed('iconPlain', true)
  .attr('cx', (d) => {
    var remainder = d % numCols; // calculates the x position (column number) using modulus
    return xPadding + (remainder * wBuffer); // apply the buffer and return value
  })
  .attr('cy', (d) => {
    var whole=Math.floor(d / numCols); // calculates the y position (row number)
    return yPadding + (whole * hBuffer); // apply the buffer and return the value
  });

slider.on('input', () => {
  let value = slider.property('value');
  d3.select('#txtValue').text(value);
  updateColors(value);
});
