/*global module:false*/
module.exports = function(grunt) {
  var _ = grunt.utils._,
      exec = require('child_process').exec,
      server = require(process.cwd() + '/config/server.js'),
      appTasks = require(process.cwd() + '/config/application.js').appTasks,
      defaultAppTasks = _(appTasks).flatten();

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('lineman');

  grunt.registerTask('default', defaultAppTasks);
  grunt.registerTask('run', appTasks.common.join(' ')+' server watch');

  grunt.task.run('configure');
  
  grunt.registerTask('server', 'Custom Express Server', function() {
    grunt.log.writeln('Starting express web server in "./generated" on port 3000.');
    server.listen(3000);
  });
};
