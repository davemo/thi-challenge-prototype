(function(m) {

  m.ChallengeActivity = Backbone.Model.extend({
    defaults: {
      activity: 'step',
      points: 0
    }
  });

  m.ChallengeRule = Backbone.Model.extend({
    defaults: {
      constraint: 'max',
      activity: 'step',
      points: 0,
      timePeriod: 'day'
    },
    toJSON: function() {
      return _.extend({
        minMax: this.attributes.constraint === 'max' ? 'may gain a maximum' : 'must gain a minimum'
      }, this.attributes);
    }
  });

  m.ChallengeBonus = Backbone.Model.extend({
    defaults: {
      activity: 'step',
      threshold: 0,
      timePeriod: 'day',
      bonus: 0
    }
  });

  m.ChallengeDetail = Backbone.Model.extend({
    // defaults: name, startDate, endDate, description
  });

})(THI.Models);
