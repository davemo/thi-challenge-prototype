(function(r, c, m) {

  r.ChallengeActivities = new c.ChallengeActivities();
  r.ChallengeRules      = new c.ChallengeRules();
  r.ChallengeBonuses    = new c.ChallengeBonuses();
  r.ChallengeDetail     = new m.ChallengeDetail();

    // Models
    r.ChallengeActivity = new m.ChallengeActivity();
    r.ChallengeRule     = new m.ChallengeRule();
    r.ChallengeBonus    = new m.ChallengeBonus();

  new THI.Routers.Main();
  Backbone.history.start();

})(THI.Runtime, THI.Collections, THI.Models);