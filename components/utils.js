export function render(template, context) {
  return template.replace(/\{(\w+)\}/g, function(match, p1) {
    return context[p1];
  });
};
