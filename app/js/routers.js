(function(r, v, c) {
  
  r.Main = Backbone.Router.extend({
    initialize: function() {
      _.bindAll(this);
    },
    container: $("#page"),
    routes: {
      "challenge"              : "browseChallenges",
      "challenge/:id"          : "viewChallenge",
      "challenge/:id/team/:id" : "viewChallengeTeam",
      "challenge/create"       : "createChallenge",
      "*path"                  : "home"
    },
    home: function() {
      this._renderPage(new v.Home());
    },
    browseChallenges: function() {
      this._renderPage(new v.BrowseChallenges());
    },
    viewChallenge: function(challengeId) {
      this._renderPage(new v.ViewChallenge());
    },
    createChallenge: function() {
      this._renderPage(new v.CreateChallenge());
    },
    viewChallengeTeam: function(challengeId, teamId) {
      this._renderPage(new v.ViewChallengeTeam({
          teamId: teamId
      }));
    },    
    _renderPage: function(view) {
      this.container.empty().append(view.render().el);
    }
  });
  
})(THI.Routers, THI.Views, THI.Collections);