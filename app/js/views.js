(function(v, api, m, r) {
  
  v.Page = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this);
    },
    render: function() {
      this.$el.html(this.template());
      if(this.components) {
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
      this.type    = options.type;    
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
        initialize: function(){
            _.bindAll(this);
            this.render();
        },
        render: function(){
            this.setElement(this.template());
            _.defer(function(){
                new v.ActivitySummary({ collection: r.ChallengeActivities });
                new v.ScoringSummary({ collection: r.ChallengeRules });
            });
        }
    });

    v.ActivitySummary = Backbone.View.extend({
        el: '.activity-summary',
        template: Handlebars.compile('Participants compete for points on: {{{ activities }}}'),

        initialize: function(){
            _.bindAll(this);
            this.collection.bind('all', this.updateSummary);
        },
        updateSummary: function(event, model, collection){
            var activities = collection.map(function(){
                return '<span class="label label-info">' + a.attributes.activity + '</span>';
            });
            this.$el.html(this.template({ activities: activities.join(', ') }));
        }
    });

    v.ScoringSummary = Backbone.View.extend({
        el: '.scoring-summary',
        template: JST['app/templates/challengecreator/scoring.summary.lineitem.hb'],

        initialize: function(){
            _.bindAll(this);
            this.collection.bind('all', this.updateScore);
        },
        updateScore: function(event, model, collection){
            var scoreHtml = '';
            collection.each(function(data){
                scoreHtml += this.template(data.toJSON());
            }, this);
            this.$el.html(scoreHtml);
        }
    });
  
  v.CreateChallenge = v.Page.extend({
    template: JST["app/templates/pages/create.challenge.hb"],
    components: function() {
      var creator = $(".challenge-creator");
      creator.append(new v.SelectDetails({ model: r.ChallengeDetail }).el);
      creator.append(new v.SelectActivities({ model: r.ChallengeActivity, collection: r.ChallengeActivities }).el);
      creator.append(new v.SelectRules({ model: r.ChallengeRule, collection: r.ChallengeRules }).el);
      creator.append(new v.SelectBonuses({ model: r.ChallengeBonus, collection: r.ChallengeBonuses }).el);
      creator.append(new v.ChallengeSummary().el);
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
    }
  });

    v.SelectDetails = Backbone.View.extend({
        template: JST["app/templates/challengecreator/details.selector.hb"],
        modelBinderMapping: {
            // modelKey: cssSelector
            "name" : ".name",
            "startDate": ".start-date",
            "endDate": ".end-date",
            "description": ".description"
        },
        initialize: function(){
            _.bindAll(this);
            this.render();
            this.modelBinder = new Backbone.ModelBinder();
            this.modelBinder.bind(this.model, this.el, this.modelBinderMapping);

        },
        render: function(){
            this.setElement(this.template());
        }
    });

  v.SelectActivities = v.ChallengeCreationStep.extend({
    itemAdder: JST["app/templates/challengecreator/activity.selector.hb"],
    rowTemplate: Handlebars.compile("<tr><td>{{ activity }}</td><td>{{ points }}</td></tr>"),
    title: "Select Activities",
    tableHeadings: ["Activity", "Points"],
      modelBinderMapping: {
          // modelKey: cssSelector
          "activity" : ".activity",
          "points": ".points"
      },
    render: function() {
      this.setElement(this.template({ title: this.title, headings: this.tableHeadings }));
      this.$(".item-adder").html(this.itemAdder());
      return this;
    }
  });
  
  v.SelectRules = v.ChallengeCreationStep.extend({
    itemAdder: JST["app/templates/challengecreator/rule.selector.hb"],
    rowTemplate: Handlebars.compile("<tr><td>{{ activity }}</td><td>{{ constraint }} {{ points }}</td><td>{{ timePeriod }}</td></tr>"),
    title: "Scoring Rules",
    tableHeadings: ["Activity", "Constraint", "Time Period"],
      modelBinderMapping: {
          // modelKey: cssSelector
          "constraint" : ".constraint",
          "activity": ".activity",
          "timePeriod": '.time-period',
          "points": '.points'
      },
    render: function() {
      this.setElement(this.template({ title: this.title, headings: this.tableHeadings }));
      this.$(".item-adder").html(this.itemAdder());
      return this;
    }
  });
  
  v.SelectBonuses = v.ChallengeCreationStep.extend({
    itemAdder: JST["app/templates/challengecreator/bonus.selector.hb"],
    rowTemplate: Handlebars.compile("<tr><td>{{ activity }}</td><td>{{ threshold }} </td><td>{{ timePeriod }}</td><td>{{ bonus }}</td></tr>"),
    title: "Scoring Bonuses",
    tableHeadings: ["Activity", "Threshold", "Time Period", "Bonus"],
      modelBinderMapping: {
          // modelKey: cssSelector
          "threshold" : ".threshold",
          "activity": ".activity",
          "timePeriod": '.time-period',
          "bonus": '.bonus'
      },
    render: function() {
      this.setElement(this.template({ title: this.title, headings: this.tableHeadings }));
      this.$(".item-adder").html(this.itemAdder());
      return this;
    }
  });
  
})(THI.Views, THI.API, THI.Models, THI.Runtime);