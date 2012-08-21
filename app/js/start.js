(function(r, c) {

  r.ChallengeActivities = new c.ChallengeActivities();
  r.ChallengeRules      = new c.ChallengeRules();
  r.ChallengeBonuses    = new c.ChallengeBonuses();

  new THI.Routers.Main();
  Backbone.history.start();

})(THI.Runtime, THI.Collections);