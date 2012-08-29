(function(r, v, c) {
  
  r.Main = Backbone.Router.extend({
    initialize: function() {
      _.bindAll(this);
    },
    container: $("#page"),
    routes: {
      "challenge"             : "browseChallenges",
      "challenge/battlebird"  : "viewChallenge",
      "challenge/create"      : "createChallenge",
      "*path"                 : "home"
    },
    home: function() {
      this._renderPage(new v.Home());
    },
    browseChallenges: function() {
      this._renderPage(new v.BrowseChallenges());
    },
    viewChallenge: function() {
      this._renderPage(new v.ViewChallenge());
    },
    createChallenge: function() {
      this._renderPage(new v.CreateChallenge());
    },
    _renderPage: function(view) {
      this.container.empty().append(view.render().el);
    }
  });
  
})(THI.Routers, THI.Views, THI.Collections);