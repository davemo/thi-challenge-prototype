(function(r, v, c) {
  
  r.Main = Backbone.Router.extend({
    initialize: function() {
      _.bindAll(this);
    },
    container: $("#page"),
    routes: {
      "browse" : "browse",
      "view"   : "view",
      "*path"  : "home"
    },
    home: function() {
      this._renderPage(new v.Home());
    },
    browse: function() {
      this._renderPage(new v.Browse());
    },
    view: function() {
      this._renderPage(new v.View());
    },
    _renderPage: function(view) {
      this.container.empty().append(view.render().el);
    }
  });
  
})(THI.Routers, THI.Views, THI.Collections);