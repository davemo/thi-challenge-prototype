/* Define custom server-side HTTP routes for lineman's development server
 *   These might be as simple as stubbing a little JSON to
 *   facilitate development of code that interacts with an HTTP service
 *   (presumably, mirroring one that will be reachable in a live environment).
 *
 * It's important to remember that any custom endpoints defined here
 *   will only be available in development, as lineman only builds
 *   static assets, it can't run server-side code.
 *
 * This file can be very useful for rapid prototyping or even organically
 *   defining a spec based on the needs of the client code that emerge.
 *
 */

module.exports = {
  drawRoutes: function(app) {
    app.post('/testpost', function(req, res) {
      res.json({
        name: "ralph",
        nice_guy: true
      });
    });

    app.get('/contacts', function(req, res) {
      res.json([
       { firstName: "Dave", lastName: "Mosher", id: 12345 },
       { firstName: "Ralph", lastName: "Wiggum", id: 77891 },
       { firstName: "Pete", lastName: "Snouser", id: 20456 }
      ]);
    });
  }
};