this['JST'] = this['JST'] || {};

this['JST']['app/templates/homepage.us'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>'+
( pkg.name )+
'</title>\n    <link rel="stylesheet" type="text/css" href="'+
( css )+
'" media="all" />\n  </head>\n  <body>\n    <div class="container">\n      <div id="alerts"></div>\n      <div id="masthead" class="well">\n      </div>\n      <div id="page"></div>\n    </div>\n    <script type="text/javascript" src="'+
( js )+
'"></script>\n  </body>\n</html>';
}
return __p;
};