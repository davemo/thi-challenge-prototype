describe("THI.Challenge.ConfigGenerator", function() {
  var generatedConfig, subject, rules, bonuses, details, activities;
  
  subject = THI.Challenge.ConfigGenerator;
  
  // helpers
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
  
  beforeEach(function() {
    activities = new THI.Collections.ChallengeActivities;
    rules = new THI.Collections.ChallengeRules();
    bonuses = new THI.Collections.ChallengeBonuses();
  });
  
  describe("generating the multipliers key", function() {
    
    beforeEach(function() {
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
  
  describe("generating rules", function() {
    
    function testTimePeriodRules(timePeriod, ordinal, rules) {
      addRulesTo(rules, [
        [timePeriod, 'step', 'min', 100], 
        [timePeriod, 'login', 'max', 200]
      ]);
      
      expect(subject({ rules: rules }).rules[ordinal]).toEqual({
        range: timePeriod,
        rules: [
          { type: "step", min: 100 }, 
          { type: "login", max: 200 }
        ]
      });
    }
    
    context("daily rules", function() {      
      it("generates the daily rules object as the first member of the rules array", function() {
        testTimePeriodRules('day', 0, rules);
      });
    });
    
    context("weekly rules", function() {      
      it("generates the weekly rules object as the second member of the rules array", function() {
        testTimePeriodRules('week', 1, rules);
      });
    });
    
    context("monthly rules", function() {      
      it("generates the monthly rules object as the third member of the rules array", function() {
        testTimePeriodRules('month', 2, rules);
      });
    });
    
    context("challenge wide rules", function() {
      it("generates the challenge wide rules object as the fourth member of the rules array", function() {
        testTimePeriodRules('challenge', 3, rules);
      });
    });
  });
  
  xdescribe("generating overall bonuses", function() {
    
    beforeEach(function() {
      addRulesTo(rules, [
        ['day', 'step', 'min', 100], 
        ['day', 'login', 'max', 200]
      ]);
      addBonusesTo(bonuses, [
        ['anything', 12500, 'day', 1000]
      ]);
      generatedConfig = subject({ bonuses: bonuses, rules: rules });
    });
    
    describe("daily rules", function() {
      it("should include overall bonus", function(){
        expect(generatedConfig.rules[0].bonus).toEqual({threshold: 12500, reward: 1000});
      });      
    });
  });
  
  describe("generating bonuses", function() {
    
    function testTimePeriodBonuses(timePeriod, ordinal, rules, bonuses) {
      addRulesTo(rules, [
        [timePeriod, 'step', 'min', 100], 
        [timePeriod, 'login', 'max', 200]
      ]);
      addBonusesTo(bonuses, [
        ['step', 12500, timePeriod, 1000], 
        ['login', 200,  timePeriod, 50]
      ]);
      
      expect(subject({ bonuses: bonuses, rules: rules }).rules[ordinal]).toEqual({
        range: timePeriod,
        rules: [
          { type: "step", min: 100, bonus: { threshold: 12500, reward: 1000 } }, 
          { type: "login", max: 200, bonus: { threshold: 200, reward: 50} }
        ]
      });
    }
    
    describe("daily bonuses", function() {
      it("includes bonuses in the daily rules calculation", function() {
        testTimePeriodBonuses('day', 0, rules, bonuses);
      });
    });
    
    describe("weekly bonuses", function() {
      it("includes bonuses in the weekly rules calculation", function() {
        testTimePeriodBonuses('week', 1, rules, bonuses);
      });
    });
    
    describe("monthly bonuses", function() {
      it("includes bonuses in the monthly rules calculation", function() {
        testTimePeriodBonuses('month', 2, rules, bonuses);
      });
    });
    
    describe("challenge wide bonuses", function() {
      it("includes bonuses in the challenge rules calculation", function() {
        testTimePeriodBonuses('challenge', 3, rules, bonuses);
      });
    });
  });
  
});
