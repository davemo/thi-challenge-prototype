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
    template: JST["app/templates/alert.handlebar"],
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
    template: JST["app/templates/home.handlebar"]
  });
  
  v.Browse = v.Page.extend({
    template: JST["app/templates/browse.handlebar"]
  });
  
  v.View = v.Page.extend({
    template: JST["app/templates/view.handlebar"]
  });
  
  v.TopTeams = v.Page.extend({
    template: JST["app/templates/topteams.handlebar"]
  });
  
  v.TopIndividuals = v.Page.extend({
    template: JST["app/templates/topindividuals.handlebar"]
  });
  
  v.Roster = v.Page.extend({
    template: JST["app/templates/roster.handlebar"]
  });
  
  v.ActivityList = v.Page.extend({
    template: JST["app/templates/activity.handlebar"]
  });
  
  v.Details = v.Page.extend({
    template: JST["app/templates/details.handlebar"]
  });
  
})(THI.Views, THI.API);