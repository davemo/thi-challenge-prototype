(function(v, api) {
  
  v.Page = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this);
    },
    render: function() {
      this.$el.html(this.template());
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
    template: JST["app/templates/home.hb"]
  });
  
  v.Browse = v.Page.extend({
    template: JST["app/templates/browse.hb"]
  });
  
  v.View = v.Page.extend({
    template: JST["app/templates/view.hb"]
  });
  
  v.TopTeams = v.Page.extend({
    template: JST["app/templates/topteams.hb"]
  });
  
  v.TopIndividuals = v.Page.extend({
    template: JST["app/templates/topindividuals.hb"]
  });
  
  v.Roster = v.Page.extend({
    template: JST["app/templates/roster.hb"]
  });
  
  v.ActivityList = v.Page.extend({
    template: JST["app/templates/activity.hb"]
  });
  
  v.Details = v.Page.extend({
    template: JST["app/templates/details.hb"]
  });
  
  v.CreateChallenge = v.Page.extend({
    template: JST["app/templates/create.challenge.hb"]
  });
  
})(THI.Views, THI.API);