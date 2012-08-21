(function(r, c, m) {

  r.ChallengeActivities = new c.ChallengeActivities();
  r.ChallengeRules      = new c.ChallengeRules();
  r.ChallengeBonuses    = new c.ChallengeBonuses();
  r.ChallengeDetail     = new m.ChallengeDetail();

  new THI.Routers.Main();
  Backbone.history.start();

})(THI.Runtime, THI.Collections, THI.Models);