(function(r, v, c) {
  
  r.Main = Backbone.Router.extend({
    initialize: function() {
      _.bindAll(this);
    },
    container: $("#page"),
    routes: {
      "*path" : "home"
    },
    home: function() {
      this._renderPage(new v.Home());
    },
    _renderPage: function(view) {
      this.container.empty().append(view.render().el);
    }
  });
  
})(THI.Routers, THI.Views, THI.Collections);