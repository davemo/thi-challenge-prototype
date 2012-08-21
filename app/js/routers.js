(function(r, v, c) {
  
  r.Main = Backbone.Router.extend({
    initialize: function() {
      _.bindAll(this);
    },
    container: $("#page"),
    routes: {
      "browse"           : "browse",
      "view"             : "view",
      "top-teams"        : "topTeams",
      "top-individuals"  : "topIndividuals",
      "roster"           : "roster",
      "activity"         : "activity",
      "details"          : "details",
      "challenge/create" : "createChallenge",
      "*path"            : "home"
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
    topTeams: function() {
      this._renderPage(new v.TopTeams());
    },
    topIndividuals: function() {
      this._renderPage(new v.TopIndividuals());
    },
    roster: function() {
      this._renderPage(new v.Roster());
    },
    activity: function() {
      this._renderPage(new v.ActivityList());
    },
    details: function() {
      this._renderPage(new v.Details());
    },
    createChallenge: function() {
      this._renderPage(new v.CreateChallenge());
      $(".activities").replaceWith(new v.RuleTable({
        collection: THI.Runtime.Activities
      }).render().el);
    },
    _renderPage: function(view) {
      this.container.empty().append(view.render().el);
    }
  });
  
})(THI.Routers, THI.Views, THI.Collections);