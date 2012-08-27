(function(v, api, m, r) {

  v.Page = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this);
    },
    render: function() {
      this.$el.html(this.template());
      if (this.components) {
        _.defer(this.components);
      }
      return this;
    }
  });

  v.Alert = Backbone.View.extend({ // mirrors bootstrap types: alert-error, alert-success, alert-info
    el: "#alerts",
    template: JST["app/templates/alert.hb"],
    REMOVE_AFTER: 6500,
    initialize: function(options) {
      _.bindAll(this);
      this.message = options.message;
      this.type = options.type;
      this.render();
      _.delay(this.removeAlert, this.REMOVE_AFTER);
    },
    render: function() {
      this.alert = $(this.template({
        message: this.message,
        type: this.type
      }));
      this.$el.append(this.alert);
    },
    removeAlert: function() {
      this.alert.fadeOut("slow").remove();
    }
  });

  v.Home = v.Page.extend({
    template: JST["app/templates/pages/home.hb"]
  });

  v.Browse = v.Page.extend({
    template: JST["app/templates/pages/browse.hb"]
  });

  v.View = v.Page.extend({
    template: JST["app/templates/pages/view.hb"]
  });

  v.Roster = v.Page.extend({
    template: JST["app/templates/pages/roster.hb"]
  });
  
  v.DetailSummary = Backbone.View.extend({
    el: '.detail-summary',
    template: JST["app/templates/challengecreator/detail.summary.hb"],
    initialize: function() {
      _.bindAll(this);
      this.model.bind("change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  
  v.InputSummary = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this);
      this.collection.bind('all', this.updateSummary);
    },
    updateSummary: function(event, model, collection) {
      this.$el.empty();
      collection.each(function(data) {
        this.$el.append(this.template(data.toJSON()));
      }, this);
    }
  });

  v.ActivitySummary = v.InputSummary.extend({
    el: '.activity-summary',
    template: JST['app/templates/challengecreator/activity.summary.lineitem.hb']
  });

  v.ScoringSummary = v.InputSummary.extend({
    el: '.scoring-summary',
    template: JST['app/templates/challengecreator/scoring.summary.lineitem.hb']
  });

  v.BonusSummary = v.InputSummary.extend({
    el: '.bonus-summary',
    template: JST['app/templates/challengecreator/bonus.summary.lineitem.hb']
  });

  v.CreateChallenge = v.Page.extend({
    template: JST["app/templates/pages/create.challenge.hb"],
    events: {
      "click .create-challenge" : "generateConfig"
    },
    generateConfig: function(e) {
      e.preventDefault();
      var config = THI.Challenge.ConfigGenerator({ 
        rules: r.ChallengeRules,
        details: r.ChallengeDetail,
        activities: r.ChallengeActivities,
        bonuses: r.ChallengeBonuses
      });
      console.log(config);
    },
    components: function() {
      new v.SelectDetails({ model: r.ChallengeDetail });      
      new v.DetailSummary({ model: r.ChallengeDetail });
      
      new v.ActivitySummary({ collection: r.ChallengeActivities });
      new v.SelectActivities({ model: r.ChallengeActivity, collection: r.ChallengeActivities });

      new v.ScoringSummary({ collection: r.ChallengeRules });      
      new v.SelectScoring({ model: r.ChallengeRule, collection: r.ChallengeRules });

      new v.BonusSummary({ collection: r.ChallengeBonuses });
      new v.SelectBonuses({ model: r.ChallengeBonus, collection: r.ChallengeBonuses });
    }
  });
  
  v.SelectDetails = Backbone.View.extend({
    el: ".details-selector",
    template: JST["app/templates/challengecreator/user-input-widgets/details.selector.hb"],
    modelBinderMapping: {
      "name": ".name",
      "startDate": ".start-date",
      "endDate": ".end-date",
      "description": ".description"
    },
    initialize: function() {
      _.bindAll(this);
      this.render();
      this.modelBinder = new Backbone.ModelBinder();
      this.modelBinder.bind(this.model, this.el, this.modelBinderMapping);
    },
    render: function() {
      this.$el.html(this.template());
    }
  });

  v.ChallengeCreationStep = Backbone.View.extend({
    template: JST["app/templates/challengecreator/challenge.creation.step.hb"],
    events: {
      "click .btn-success" : "addEntry",
      "click .btn-reset"   : "clearFields"
    },
    initialize: function() {
      _.bindAll(this);
      this.render();
      this.modelBinder = new Backbone.ModelBinder();
      this.modelBinder.bind(this.model, this.el, this.modelBinderMapping);
    },
    addEntry: function(e) {
      e.preventDefault();
      this.collection.add(this.model.toJSON());
    },
    clearFields: function(e) {
      e.preventDefault();
      this.model.clear();
    },
    render: function() {
      this.$el.html(this.template({ title: this.title }));
      this.$(".item-adder").html(this.itemAdder());
      return this;
    }
  });

  v.SelectActivities = v.ChallengeCreationStep.extend({
    el: ".activity-selector",
    itemAdder: JST["app/templates/challengecreator/user-input-widgets/activity.selector.hb"],
    title: "Select Activities",
    modelBinderMapping: {
      "activity": ".activity",
      "points": ".points"
    }
  });

  v.SelectScoring = v.ChallengeCreationStep.extend({
    el: ".scoring-selector",
    itemAdder: JST["app/templates/challengecreator/user-input-widgets/scoring.selector.hb"],
    title: "Scoring Rules",
    modelBinderMapping: {
      "constraint": ".constraint",
      "activity": ".activity",
      "timePeriod": '.time-period',
      "points": '.points'
    }
  });

  v.SelectBonuses = v.ChallengeCreationStep.extend({
    el: ".bonus-selector",
    itemAdder: JST["app/templates/challengecreator/user-input-widgets/bonus.selector.hb"],
    title: "Scoring Bonuses",
    modelBinderMapping: {
      "threshold": ".threshold",
      "activity": ".activity",
      "timePeriod": '.time-period',
      "bonus": '.bonus'
    }
  });

})(THI.Views, THI.API, THI.Models, THI.Runtime);