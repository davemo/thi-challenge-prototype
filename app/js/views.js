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

  v.ChallengeSummary = Backbone.View.extend({
    template: JST["app/templates/challengecreator/summary.hb"],
    initialize: function() {
      _.bindAll(this);
      this.render();
    },
    render: function() {
      this.setElement(this.template());
      _.defer(function() {
        new v.DetailSummary({ model: r.ChallengeDetail });
        new v.ActivitySummary({ collection: r.ChallengeActivities });
        new v.ScoringSummary({ collection: r.ChallengeRules });
        new v.BonusSummary({ collection: r.ChallengeBonuses });
      });
    }
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

  v.ActivitySummary = Backbone.View.extend({
    el: '.activity-summary',
    template: Handlebars.compile('Participants compete for points on: {{{ activities }}}'),

    initialize: function() {
      _.bindAll(this);
      this.collection.bind('all', this.updateSummary);
    },
    updateSummary: function(event, model, collection) {
      var activities = collection.map(function(a) {
        return '<span class="label label-info">' + a.attributes.activity + '</span>';
      });
      this.$el.html(this.template({
        activities: activities.join(', ')
      }));
    }
  });

  v.ScoringSummary = Backbone.View.extend({
    el: '.scoring-summary',
    template: JST['app/templates/challengecreator/scoring.summary.lineitem.hb'],

    initialize: function() {
      _.bindAll(this);
      this.collection.bind('all', this.updateScore);
    },
    updateScore: function(event, model, collection) {
      var scoreHtml = '';
      collection.each(function(data) {
        scoreHtml += this.template(data.toJSON());
      }, this);
      this.$el.html(scoreHtml);
    }
  });

  v.BonusSummary = Backbone.View.extend({
    el: '.bonus-summary',
    template: JST['app/templates/challengecreator/bonus.summary.lineitem.hb'],

    initialize: function(){
      _.bindAll(this);
      this.collection.bind('all', this.updateBonus);
    },
    updateBonus: function(event, model, collection){
      var bonusHtml = '';
      collection.each(function(data){
        bonusHtml += this.template(data.toJSON());
      }, this);
      this.$el.html(bonusHtml);
    }
  });

  v.CreateChallenge = v.Page.extend({
    template: JST["app/templates/pages/create.challenge.hb"],
    components: function() {
      var creator = $(".challenge-creator");
      var summary = $(".challenge-summary");

      var SelectDetails = new v.SelectDetails({
        model: r.ChallengeDetail
      });

      var SelectRules = new v.SelectRules({
        model: r.ChallengeRule,
        collection: r.ChallengeRules
      });

      var SelectBonuses = new v.SelectBonuses({
        model: r.ChallengeBonus,
        collection: r.ChallengeBonuses
      });

      var ChallengeSummary = new v.ChallengeSummary();

      var SelectActivities = new v.SelectActivities({
        model: r.ChallengeActivity,
        collection: r.ChallengeActivities,
        getAdvancedRulesElements: function(show){
          return [
            SelectRules.$el,
            SelectBonuses.$el
          ];
        }
      });

      creator.append(SelectDetails.el);
      creator.append(SelectActivities.el);
      creator.append(SelectRules.el);
      creator.append(SelectBonuses.el);
      summary.append(ChallengeSummary.el);
    }
  });

  v.ChallengeCreationStep = Backbone.View.extend({
    template: JST["app/templates/challengecreator/challenge.creation.step.hb"],
    events: {
      "click .btn-success": "addEntry",
      "click .btn-reset": "clearFields"
    },
    initialize: function() {
      _.bindAll(this);
      this.collection.bind("all", this.updateTable);
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
    updateTable: function(e, m, collection) {
      var table = this.$("tbody").empty();
      collection.each(function(rule) {
        table.append(this.rowTemplate(rule.toJSON()));
      }, this);
    },
    render: function() {
      this.setElement(this.template({
        title: this.title,
        headings: this.tableHeadings,
        liClass: (this.advancedRule ? 'hidden' : '')
      }));
      this.$(".item-adder").html(this.itemAdder());
      return this;
    }
  });

  v.SelectDetails = Backbone.View.extend({
    template: JST["app/templates/challengecreator/details.selector.hb"],
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
      this.setElement(this.template());
    }
  });

  v.SelectActivities = v.ChallengeCreationStep.extend({
    itemAdder: JST["app/templates/challengecreator/activity.selector.hb"],
    rowTemplate: Handlebars.compile("<tr><td>{{ activity }}</td><td>{{ points }}</td></tr>"),
    title: "Select Activities",
    tableHeadings: ["Activity", "Points"],
    modelBinderMapping: {
      "activity": ".activity",
      "points": ".points"
    },
    render: function(){
      var r = v.ChallengeCreationStep.prototype.render.apply(this, arguments);
      this.bindExtraEvents();
      return r;
    },
    bindExtraEvents: function(){
      this.$('.toggle-advanced-rules').click($.proxy(this, "toggleAdvancedRules"));
    },
    toggleAdvancedRules: function(e){
      e.preventDefault();
      var $anchor = $(e.currentTarget);
      if(!$anchor.data('closed-text')){
        $anchor.data('closed-text', $anchor.text());
      }

      $.each(this.options.getAdvancedRulesElements(), function(){
        var dataKey = ($(this).hasClass('hidden')) ? 'open-text' : 'closed-text';
        $anchor.text($anchor.data(dataKey));
        $(this).toggleClass('hidden');
      });
    }
  });

  v.SelectRules = v.ChallengeCreationStep.extend({
    itemAdder: JST["app/templates/challengecreator/rule.selector.hb"],
    rowTemplate: Handlebars.compile("<tr><td>{{ activity }}</td><td>{{ constraint }} {{ points }}</td><td>{{ timePeriod }}</td></tr>"),
    title: "Scoring Rules",
    advancedRule: true,
    tableHeadings: ["Activity", "Constraint", "Time Period"],
    modelBinderMapping: {
      "constraint": ".constraint",
      "activity": ".activity",
      "timePeriod": '.time-period',
      "points": '.points'
    }
  });

  v.SelectBonuses = v.ChallengeCreationStep.extend({
    itemAdder: JST["app/templates/challengecreator/bonus.selector.hb"],
    rowTemplate: Handlebars.compile("<tr><td>{{ activity }}</td><td>{{ threshold }} </td><td>{{ timePeriod }}</td><td>{{ bonus }}</td></tr>"),
    title: "Scoring Bonuses",
    advancedRule: true,
    tableHeadings: ["Activity", "Threshold", "Time Period", "Bonus"],
    modelBinderMapping: {
      "threshold": ".threshold",
      "activity": ".activity",
      "timePeriod": '.time-period',
      "bonus": '.bonus'
    }
  });

})(THI.Views, THI.API, THI.Models, THI.Runtime);