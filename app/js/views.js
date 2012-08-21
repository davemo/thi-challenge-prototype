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
  
  v.CreateChallenge = v.Page.extend({
    template: JST["app/templates/pages/create.challenge.hb"],
    components: function() {
      var creator = $(".challenge-creator");
      creator.append(new v.SelectActivities({ collection: r.ChallengeActivities }).el);
      creator.append(new v.SelectRules({ collection: r.ChallengeRules }).el);
      creator.append(new v.SelectBonuses({ collection: r.ChallengeBonuses }).el);      
    }
  });
  
  v.ChallengeCreationStep = Backbone.View.extend({
    template: JST["app/templates/challengecreator/challenge.creation.step.hb"],
    initialize: function() {
      _.bindAll(this);
      this.collection.bind("all", this.updateTable);
      this.render();
    },
    updateTable: function(e, m, collection) {
      var table = this.$("tbody").empty();
      collection.each(function(rule) {
        this.$("tbody").append(this.rowTemplate(rule.toJSON()));
      }, this);
    }
  });
  
  v.SelectActivities = v.ChallengeCreationStep.extend({
    itemAdder: JST["app/templates/challengecreator/activity.selector.hb"],
    rowTemplate: Handlebars.compile("<tr><td>{{ activity }}</td><td>{{ points }}</td></tr>"),
    title: "Select Activities",
    tableHeadings: ["Activity", "Points"],
    events: {
      "click .btn-success" : "addActivity",
      "click .btn-reset"   : "clearFields"
    },
    addActivity: function(e) {
      e.preventDefault();
      var dom = $(e.currentTarget).parents(".item-adder");
      var model = new m.ChallengeActivity({
        activity: dom.find('.activity').val(),
        points: dom.find('.points').val()
      });
      this.collection.add(model);
    },
    clearFields: function(e) {
      e.preventDefault();
      this.$(".activity").val("");
      this.$(".points").val("");
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
    events: {
      "click .btn-success" : "addRule",
      "click .btn-reset"   : "clearFields"
    },
    addRule: function(e) {
      e.preventDefault();
      var dom = $(e.currentTarget).parents(".item-adder");
      var model = new m.ChallengeRule({
        constraint: dom.find('.constraint').val(),
        activity:   dom.find('.activity').val(),
        timePeriod: dom.find('.time-period').val(),
        points:     dom.find('.points').val()
      });
      this.collection.add(model);
    },
    clearFields: function(e) {
      e.preventDefault();
      this.$(".constraint").val("");
      this.$(".activity").val("");
      this.$(".time-period").val("");
      this.$(".points").val("");
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
    events: {
      "click .btn-success" : "addBonus",
      "click .btn-reset"   : "clearFields"
    },
    addBonus: function(e) {
      e.preventDefault();
      var dom = $(e.currentTarget).parents(".item-adder");
      var model = new m.ChallengeBonus({
        threshold:  dom.find('.threshold').val(),
        activity:   dom.find('.activity').val(),
        timePeriod: dom.find('.time-period').val(),
        bonus:      dom.find('.bonus').val()
      });
      this.collection.add(model);
    },
    clearFields: function(e) {
      e.preventDefault();
      this.$(".threshold").val("");
      this.$(".activity").val("");
      this.$(".time-period").val("");
      this.$(".bonus").val("");
    },
    render: function() {
      this.setElement(this.template({ title: this.title, headings: this.tableHeadings }));
      this.$(".item-adder").html(this.itemAdder());
      return this;
    }
  });
  
})(THI.Views, THI.API, THI.Models, THI.Runtime);