(function(c) {
  
  var _generateRulesFor = function(range, rules) {
    var rangeRules = { range: range, rules: [] };
    var filteredRules = rules.filter(function(rule) {
      var attrs = rule.attributes;
      return attrs.timePeriod === range && attrs.activity !== 'overall';
    });
    rangeRules.rules = filteredRules.map(function(rule) {
      var attrs = rule.attributes;
      var ruleOutput = { type: attrs.activity };
      ruleOutput[attrs.constraint] = attrs.points;
      return ruleOutput;
    });
    _addOverallValuesTo(rangeRules, rules);
    return rangeRules;
  };
  
  var _addOverallValuesTo = function(processed, original) {
    function detectConstraint(boundary, collection) {
      return collection.find(function(rule) {
        var a = rule.attributes;
        return a.activity === 'overall' && a.constraint === boundary;
      });
    }
    
    var max = detectConstraint("max", original);
    var min = detectConstraint("min", original);
    
    if(max) {
      processed.max = max.attributes.points;
    }
    
    if(min) {
      processed.min = min.attributes.points;
    }
  };
  
  c.ConfigGenerator = function(data) {
    var output = {
      start_day: '',
      multipliers: {},
      rules: []
    };
    
    if(data.activities){
      data.activities.each(function(model){
        output.multipliers[model.attributes.activity] = model.attributes.points;
      });
    }
    
    if(data.details){
      var date = moment(data.details.attributes.startDate, 'YYYY-MM-DD').format('dddd');
      output.start_day = date.toLowerCase();
    }
    
    if(data.rules){
      output.rules.push(_generateRulesFor("day", data.rules));
    }
    
    return output;
  };
  
  
  
})(THI.Challenge);