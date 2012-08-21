(function(m) {
  
  m.ChallengeActivity = Backbone.Model.extend({
    // defaults: activity, points
  });
  
  m.ChallengeRule = Backbone.Model.extend({
    // defaults: activity, limit, timePeriod (day, week, month), constraint (min or max)
  });
  
  m.ChallengeBonus = Backbone.Model.extend({
    // defaults: activity, threshold, timePeriod (day, week, month), bonus
  });

    m.ChallengeDetail = Backbone.Model.extend({
        // defaults: name, start, end, description
    });
  
})(THI.Models);