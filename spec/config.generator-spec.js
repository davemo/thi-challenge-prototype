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
  
  describe("generating rules", function() {
    var rules;
    
    beforeEach(function() {
      rules = new THI.Collections.ChallengeRules();
    });
    
    context("daily rules", function() {
      beforeEach(function() {
        addRulesTo(rules, [
          ['day', 'step', 'min', 100], 
          ['day', 'login', 'max', 200]
        ]);
        generatedConfig = subject({ rules: rules });
      });
      
      it("generates the daily rules object as the first member of the rules array", function() {
        expect(generatedConfig.rules[0]).toEqual({
          range: "day",
          rules: [
            { type: "step", min: 100 }, 
            { type: "login", max: 200 }
          ]
        });
      });
    });
    
    context("weekly rules", function() {
      beforeEach(function() {
        addRulesTo(rules, [
          ['week', 'step', 'min', 100], 
          ['week', 'login', 'max', 200],
          ['week', 'anything', 'max', 5000]
        ]);
        generatedConfig = subject({ rules: rules });
      });
      
      it("generates the weekly rules object as the second member of the rules array", function() {
        expect(generatedConfig.rules[1]).toEqual({
          range: "week",
          max: 5000,
          rules: [
            { type: "step", min: 100 }, 
            { type: "login", max: 200 }
          ]
        });
      });
    });
    
    context("monthly rules", function() {
      beforeEach(function() {
        addRulesTo(rules, [
          ['month', 'step', 'min', 100], 
          ['month', 'login', 'max', 200],
          ['month', 'anything', 'min', 5000]
        ]);
        generatedConfig = subject({ rules: rules });
      });
      
      it("generates the monthly rules object as the third member of the rules array", function() {
        expect(generatedConfig.rules[2]).toEqual({
          range: "month",
          min: 5000,
          rules: [
            { type: "step", min: 100 }, 
            { type: "login", max: 200 }
          ]
        });
      });
    });
    
    context("challenge wide rules", function() {
      beforeEach(function() {
        addRulesTo(rules, [
          ['challenge', 'step', 'min', 100], 
          ['challenge', 'login', 'max', 200],
          ['challenge', 'anything', 'min', 5000]
        ]);
        generatedConfig = subject({ rules: rules });
      });
      
      it("generates the challenge wide rules object as the fourth member of the rules array", function() {
        expect(generatedConfig.rules[3]).toEqual({
          range: "challenge",
          min: 5000,
          rules: [
            { type: "step", min: 100 }, 
            { type: "login", max: 200 }
          ]
        });
      });
    });
  });
  
  function addBonusesTo(collection, bonusArray) {
    _.each(bonusArray, function(raw) {
      collection.add({
        activity:    raw[0],
        threshold:   raw[1],
        timePeriod:  raw[2],
        bonus:       raw[3]
      });
    });
  }
  
  describe("generating bonuses", function() {
    var rules, bonuses;
    
    beforeEach(function() {
      rules   = new THI.Collections.ChallengeRules();
      bonuses = new THI.Collections.ChallengeBonuses();
    });
    
    describe("daily bonuses", function() {
      beforeEach(function() {
        addRulesTo(rules, [
          ['day', 'step', 'min', 100], 
          ['day', 'login', 'max', 200]
        ]);
        addBonusesTo(bonuses, [
          ['step', 12500, 'day', 1000], 
          ['login', 200,  'day', 50]
        ]);
        generatedConfig = subject({ bonuses: bonuses, rules: rules });
      });
      
      it("includes bonuses in the daily rules calculation", function() {
        expect(generatedConfig.rules[0]).toEqual({
          range: "day",
          rules: [
            { type: "step", min: 100, bonus: { threshold: 12500, reward: 1000 } }, 
            { type: "login", max: 200, bonus: { threshold: 200, reward: 50} }
          ]
        });
      });
    });    
  });
});
