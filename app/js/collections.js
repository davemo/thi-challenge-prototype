(function(c, m) {
  
  c.Contacts = Backbone.Collection.extend({
    url: "/contacts"
  });
  
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