(function(c) {
  
  var _generateRulesFor = function(range, rules) {
    var rangeRules = { range: range, rules: [] };
    var filteredRules = _.filter(rules, function(rule) {
      return rule.timePeriod === range && rule.activity !== 'overall';
    });
    rangeRules.rules = _.map(filteredRules, function(rule) {
      var ruleOutput = { type: rule.activity };
      ruleOutput[rule.constraint] = rule.points;
      return ruleOutput;
    });
    _addOverallValuesTo(rangeRules, rules, range);
    return rangeRules;
  };
  
  var _detectConstraint = function(boundary, collection, range) {
    return _.find(collection, function(rule) {
      return rule.activity === 'overall' && rule.timePeriod === range && rule.constraint === boundary;
    });
  };
  
  var _addOverallValuesTo = function(processed, original, range) {  
    var max = _detectConstraint("max", original, range);
    var min = _detectConstraint("min", original, range);
    
    if(max) {
      processed.max = max.points;
    }
    
    if(min) {
      processed.min = min.points;
    }
  };
  
  c.ConfigGenerator = function(data) {
    var output = {
      start_day: '',
      multipliers: {},
      rules: []
    };
    
    if(data.activities){
      _.each(data.activities.toJSON(), function(m){
        output.multipliers[m.activity] = m.points;
      });
    }
    
    if(data.details){
      if(data.details.attributes.startDate) {
        var date = moment(data.details.attributes.startDate, 'YYYY-MM-DD').format('dddd');
        output.start_day = date.toLowerCase();        
      }
    }
    
    if(data.rules){
      var rulesPlain   = data.rules.toJSON();
      var dailyRules   = _generateRulesFor("day",   rulesPlain);
      var weeklyRules  = _generateRulesFor("week",  rulesPlain);
      var monthlyRules = _generateRulesFor("month", rulesPlain);
      
      if(dailyRules) {
        output.rules.push(dailyRules);
      }
      
      if(weeklyRules) {
        output.rules.push(weeklyRules);
      }
      
      if(monthlyRules) {
        output.rules.push(monthlyRules);
      }
    }
    
    return output;
  };
  
  
  
})(THI.Challenge);