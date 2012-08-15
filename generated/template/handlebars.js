this['JST'] = this['JST'] || {};

this['JST']['app/templates/alert.handlebar'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"alert alert-block ";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " fade in\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>\n  ";
  foundHelper = helpers.message;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\n</div>";
  return buffer;});

this['JST']['app/templates/home.handlebar'] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div id=\"home\">\n  <div class=\"well\">\n    <h2>Challenge Sauce</h2>\n    <div class=\"well\">\n		Things?\n    </div>\n  </div>\n</div>";});