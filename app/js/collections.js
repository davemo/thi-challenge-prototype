(function(c, m) {
  
  c.Contacts = Backbone.Collection.extend({
    url: "/contacts"
  });
  
  c.Activities = Backbone.Collection.extend({
    model: m.Activity
  });
  
})(THI.Collections, THI.Models);