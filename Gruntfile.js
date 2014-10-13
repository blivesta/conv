module.exports = function(grunt) {
  "use strict";
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  
  // Initialize config.
  grunt.initConfig({
    pkg: require('./package.json'),
    banner: 
      '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.url %>\n' +
      ' * Licensed under <%= pkg.licenses %>\n' +
      ' * Author : <%= pkg.author %>\n' +
      ' * <%= pkg.author_url %>\n' +
      ' */\n',
    watch: {
      options: {
        spawn: false,
        livereload : true
      },
      less: {
        files: [
          '<%= pkg.dir.src %>/less/*.less',
          '<%= pkg.dir.src %>/less/**/*.less'
        ],
        tasks: [
          'build-less',
          'jekyll',
          'notify'
        ]
      },
      grunt: {
        files: ['<%= jshint.grunt.src %>'],
        tasks: [
          'jshint:grunt',
          'notify'
        ]
      },
      js: {
        files: [
          '<%= pkg.dir.src %>/js/*.js'
        ],
        tasks: [
          'build-js',
          'jekyll',
          'notify'
        ]
      },
      html: {
        files: [
          '<%= pkg.dir.src %>/*.html',
          '<%= pkg.dir.src %>/_includes/*',
          '<%= pkg.dir.src %>/_posts/*',
          '<%= pkg.dir.src %>/_layouts/*'
        ],
        tasks: [
          'build-html',
          'notify'
        ]
      }
    }

  });

  grunt.loadTasks('grunt');

  grunt.registerTask('deploy', [
    'buildcontrol',
    'notify'
  ]);

  grunt.registerTask('build-less', [
    'less:main', 
    'autoprefixer:main', 
    'usebanner:main', 
    'csscomb:main', 
    'less:mainMin',
    'csslint'
  ]);

  grunt.registerTask('build-js', [
    // 'uglify:mainMin',
    'jshint:main'
  ]);

  grunt.registerTask('build-html', [
    'jekyll'
  ]);
  
  grunt.registerTask('test', [
    'jshint',
    'csslint'
  ]);

  grunt.registerTask('b', [ // Build
    // 'clean',
    'bower:install',
    'build-less',
    'build-js',
    'build-html',
    'validation:jekyll'
  ]);

  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'connect',
      'watch'
    ]);
  });

};
