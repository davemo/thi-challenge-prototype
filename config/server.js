var express            = require('express'), 
    request            = require('request'),
    app                = express.createServer();

app.configure(function() {
  app.use(express.static(process.cwd() + "/generated"));
  app.use(express.bodyParser());
  app.use(express.errorHandler());
});

app.post('/testpost', function(req, res) {  
  // STUB
  res.json({
    name: "ralph",
    nice_guy: true
  });
});

app.get('/contacts', function(req, res) {
  // STUB
  res.json([
   { firstName: "Dave", lastName: "Mosher", id: 12345 },
   { firstName: "Ralph", lastName: "Wiggum", id: 77891 },
   { firstName: "Pete", lastName: "Snouser", id: 20456 }
  ]);
});

module.exports = app;
