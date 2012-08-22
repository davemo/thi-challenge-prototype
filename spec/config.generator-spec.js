describe("THI.Challenge.ConfigGenerator", function() {
  var generatedConfig, subject;
  
  subject = THI.Challenge.ConfigGenerator;
  
  it("exists", function() {
    expect(subject.toBeDefined);
  });
  
  describe("generating the multipliers key", function() {
    var activities;
    
    beforeEach(function() {
      activities = new THI.Collections.ChallengeActivities;
      activities.add({
        activity: "step",
        points: 10
      });
      activities.add({
        activity: "login",
        points: 100
      });
      generatedConfig = subject({ activities: activities });
    });
  
    it("returns the multipliers key as an object literal mapped by {  activity: points }", function() {
      expect(generatedConfig.multipliers).toEqual({
        step: 10,
        login: 100
      });
    });
  });
  
  describe("generating the start day", function() {
    var details;
    
    beforeEach(function() {
      details = new THI.Models.ChallengeDetail({
        name: "Jordans Challenge",
        startDate: "2012-08-23",
        endDate: "2012-08-31",
        description: "Whallopalooza"
      });
      generatedConfig = subject({ details: details });
    });
    
    it("computes the startDate into the human readable day of the week", function() {
      expect(generatedConfig.start_day).toBe("thursday");
    });
  });
  
  function addRulesTo(collection, ruleArray) {
    _.each(ruleArray, function(raw) {
      collection.add({
        timePeriod: raw[0],
        activity: raw[1],
        constraint: raw[2],
        points: raw[3]
      });
    });
  }
  
  describe("generating daily rules", function() {
    var rules;
    
    beforeEach(function() {
      rules = new THI.Collections.ChallengeRules;
      addRulesTo(rules, [
        ['day', 'step', 'min', 100], 
        ['day', 'login', 'max', 200]
      ]);
      generatedConfig = subject({ rules: rules });
    });
    
    it("generates the proper daily rules object", function() {
      expect(generatedConfig.rules[0]).toEqual({
        range: "day",
        rules: [
          { type: "step", min: 100 }, 
          { type: "login", max: 200 }
        ]
      });
    });
    
    context("when there are overall rules", function() {
      
      beforeEach(function() {
        addRulesTo(rules, [
          ['day', 'overall', 'max', 5000],
          ['day', 'overall', 'min', 100]
        ]);
        generatedConfig = subject({ rules: rules });
      });
      
      it("places the max and min values directly on the daily rules object", function() {
        expect(generatedConfig.rules[0].max).toBe(5000);
        expect(generatedConfig.rules[0].min).toBe(100);
      });
      
    });
  });
});
