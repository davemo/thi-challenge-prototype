(function(v, api, m, r) {

  v.Page = Backbone.View.extend({
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
      _.bindAll(this, ['removeAlert']);
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

  v.BrowseChallenges = v.Page.extend({
    template: JST["app/templates/pages/browse.challenges.hb"]
  });

  v.ViewChallengeTeam = v.Page.extend({
      template: JST["app/templates/pages/view.challenge.team.hb"],
      components: function() {
          var self = this;
          $('#comparison-table').dataTable( {
                  "aaData": [
                      /* Reduced data set */
                      [ "Ralph Wiggum", "150", "1"],
                      [ "Marge Simpson", "120", "2"],
                      [ "Homer Simpson", "90", "3"],
                      [ "Mayor Quimby", "50", "4"],
                      [ "Krusty the Clown", "2", "5"]
                  ],
                  "aoColumns": [
                      { "sTitle": "Name" },
                      { "sTitle": "Score" },
                      { "sTitle": "Rank" }
                  ],
                  "aaSorting": [[2,'asc']]
              } );
          new Highcharts.Chart({
              chart: {
                  renderTo: 'comparison-chart',
                  type: 'line',
                  height: 300
              },
              xAxis: {
                  categories: ['Aug 24', 'Aug 25', 'Aug 26', 'Aug 27', 'Aug 28', 'Aug 29','Aug 30','Aug 31']
              },
              title: {
                  text: 'Your Team vs ' + self.options.teamId
              },
              yAxis: {
                  min: 0,
                  title: {
                      text: 'Score'
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              },
              tooltip: {
                  formatter: function() {
                          return '<b>'+ this.series.name +'</b><br/>'+
                          this.x +': '+ this.y +' points';
                  }
              },
              legend: {
                  layout: 'horizontal',
                  // align: 'right',
                  verticalAlign: 'top',
                  y: 15,
                  borderWidth: 0
              },
              series: [{
                  name: 'Your Team Score',
                  data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5]
              }, {
                  name: self.options.teamId + " Score",
                  data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1]
              }]
          });
      }
  });
  
  v.ViewChallenge = v.Page.extend({
    template: JST["app/templates/pages/view.challenge.hb"],
    components: function() {
        new Highcharts.Chart({
            chart: {
                renderTo: 'comparison-chart',
                type: 'line',
                marginRight: 130,
                marginBottom: 25,
                height: 300
            },
            xAxis: {
                categories: ['Aug 24', 'Aug 25', 'Aug 26', 'Aug 27', 'Aug 28', 'Aug 29','Aug 30','Aug 31']
            },
            title: {
                text: 'Your Team Score vs Average Score'
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Score'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y +' points';
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 100,
                borderWidth: 0
            },
            series: [{
                name: 'Your Team Score',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5]
            }, {
                name: 'Average Score',
                data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1]
            }]
        });
    }
  });
  
  v.DetailSummary = Backbone.View.extend({
    el: '.detail-summary',
    template: JST["app/templates/challengecreator/detail.summary.hb"],
    initialize: function() {
      this.model.bind("change", this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  
  v.InputSummary = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, ['updateSummary']);
      this.collection.bind('all', this.updateSummary);
    },
    updateSummary: function(event, model, collection) {
      this.$el.empty();
      this.collection.each(function(data) {
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
      // _.bindAll(this);
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
      // _.bindAll(this);
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