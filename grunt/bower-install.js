module.exports = function(grunt) {
  "use strict";
  grunt.config('bower', {
    install: {
      options: {
        targetDir: '<%= pkg.dir.vendor %>',
        layout: 'byComponent',
        install: true,
        verbose: false,
        cleanTargetDir: false,
        cleanBowerDir: false
      }
    }
  });

};
