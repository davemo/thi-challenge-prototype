(function(c) {
  
  var _generateRulesFor = function(range, rules) {
    var rangeRules = { range: range, rules: [] };
    var filteredRules = _.filter(rules, function(rule) {
      return rule.timePeriod === range && rule.activity !== 'anything';
    });
    rangeRules.rules = _.map(filteredRules, function(rule) {
      var ruleOutput = { type: rule.activity };
      ruleOutput[rule.constraint] = rule.points;
      return ruleOutput;
    });
    _addOverallValuesTo(rangeRules, rules, range);
    return rangeRules;
  };
  
  var _generateBonusesFor = function(range, bonuses, rangeRules){
    var filteredBonuses = _.filter(bonuses, function(bonus) {
      return bonus.timePeriod === range && bonus.activity !== 'anything';
    });
    
    var rules = rangeRules.rules;
    _.each(filteredBonuses, function(bonus){      
      for(var i=0; i < rules.length; i++){
        if (rules[i].type === bonus.activity){
          rules[i].bonus = {threshold : bonus.threshold, reward : bonus.bonus};
          break;
        }
      }
    });
    _addOverallBonusesTo(rangeRules, bonuses);
  };
  
  var _detectConstraint = function(boundary, collection, range) {
    return _.find(collection, function(rule) {
      return rule.activity === 'anything' && rule.timePeriod === range && rule.constraint === boundary;
    });
  };
  
  var _addOverallBonusesTo = function(range, bonuses) {
    var overallBonuses = _.filter(bonuses, function(bonus) {
      return bonus.timePeriod === range.range && bonus.activity === 'anything';
    });
    if(overallBonuses.length > 0) {
      var b = overallBonuses[0];
      range.bonus = { threshold: b.threshold, reward: b.bonus };
    }
    
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
      var rulesPlain     = data.rules.toJSON();
      var bonusesPlain   = data.bonuses && data.bonuses.toJSON();
      
      _.each(["day", "week", "month", "challenge"], function(range) {
        var rangeRules = _generateRulesFor(range, rulesPlain);
        if(rangeRules) {
          output.rules.push(rangeRules);
          if(rangeRules.rules) {
            _generateBonusesFor(range, bonusesPlain, rangeRules);
          } 
        }
      });
    }    
    
    return output;
  };
  
  
  
})(THI.Challenge);