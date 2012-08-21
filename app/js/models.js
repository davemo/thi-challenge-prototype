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
      toJSON: function(){
        var attrs = this.attributes;
        if(attrs.constraint == 'max'){
            attrs.minMax = 'may gain a maximum';
        } else {
            attrs.minMax = 'must gain a minimum';
        }
        return attrs;
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
        // defaults: name, start, end, description
    });
  
})(THI.Models);