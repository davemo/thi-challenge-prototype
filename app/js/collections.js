(function(c, m) {

  c.ChallengeActivities = Backbone.Collection.extend({
    model: m.ChallengeActivity
  });

  c.ChallengeRules = Backbone.Collection.extend({
    model: m.ChallengeRule
  });

  c.ChallengeBonuses = Backbone.Collection.extend({
    model: m.ChallengeBonus
  });

})(THI.Collections, THI.Models);
