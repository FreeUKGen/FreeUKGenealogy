module.exports = function(grunt) {


  /**
   * load plugins
   */
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-csscomb');


  /**
   * Project configuration.
   */
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    //////////
    // COPY //
    //////////
    copy: {

      owlJs: {
        src: 'bower_components/owl-carousel2/dist/owl.carousel.js',
        dest: 'scripts/dist/owl.js'
      },

      owlJsProd: {
        src: 'bower_components/owl-carousel2/dist/owl.carousel.min.js',
        dest: 'scripts/dist/owl.min.js'
      }

    },


    ////////////
    // CONACT //
    ////////////
    concat: {
      library: {
        options: {
          separator: ';'
        },
        src: [
          'bower_components/jquery/dist/jquery.js',
          'scripts/lib/ios-orientationchange-fix.js',
          'bower_components/respond/dest/respond.matchmedia.addListener.src.js',
          'bower_components/respond/dest/respond.src.js',
          'scripts/lib/jquery-ui-1.10.3.custom.js',
          'bower_components/jquery-placeholder/jquery.placeholder.js',
          'bower_components/eventEmitter/EventEmitter.js',
          'bower_components/eventie/eventie.js',
          'bower_components/imagesloaded/imagesloaded.js',
          'bower_components/imgLiquid/js/imgLiquid.js',
          'bower_components/jquery-form/jquery.form.js',
          'bower_components/parsleyjs/dist/parsley.js',
          'bower_components/riotjs/riot.js',
          'bower_components/riotjs/lib/observable.js',
          'bower_components/owl-carousel2/dist/owl.carousel.js'
        ],
        dest: 'scripts/dist/lib.js'
      },

      main: {
        options: {
          separator: ';'
        },
        src: [
          'scripts/src/helpers/*.js',
          'scripts/src/models/*.js',
          'scripts/src/presenters/*.js',
          'scripts/src/app.js'
        ],
        dest: 'scripts/dist/main.js'
      },

      html5shiv: {
        options: {
          separator: ';'
        },
        src: 'bower_components/html5shiv/dist/html5shiv.js',
        dest: 'scripts/dist/html5shiv.js'
      },

      ie7: {
        options: {
          separator: ';'
        },
        src: 'scripts/lib/csswizardry-grids-ie7-polyfill.js',
        dest: 'scripts/dist/lte-ie7-polyfills.js'
      }

    },


    ////////////
    // UGLIFY //
    ////////////
    uglify: {
      library: {
        options: {
          sourceMap: true,
          banner: '/*! <%= pkg.name %> - library - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'scripts/dist/lib.min.js': 'scripts/dist/lib.js'
        }
      },

      main: {
        options: {
          sourceMap: true,
          banner: '/*! <%= pkg.name %> - main app - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'scripts/dist/main.min.js': 'scripts/dist/main.js'
        }
      },

      html5shiv: {
        options: {
          sourceMap: true,
          banner: '/*! <%= pkg.name %> - html5shiv - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'scripts/dist/html5shiv.min.js': 'scripts/dist/html5shiv.js'
        }
      },

      ie7: {
        options: {
          sourceMap: true,
          banner: '/*! <%= pkg.name %> - ie7 polyfills - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'scripts/dist/lte-ie7-polyfills.min.js': 'scripts/dist/lte-ie7-polyfills.js'
        }
      }

    },


    ////////////
    // SVGMIN //
    ////////////
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }, {
          convertPathData: {
            straightCurves: false // advanced SVGO plugin option
          }
        }]
      },
      grunticon: {
        files: [{
          expand: true,
          cwd: 'images/svg/src',
          src: ['**/*.svg'],
          dest: 'images/svg/min',
          ext: '.svg'
        }]
      }
    },


    ///////////////
    // GRUNTICON //
    ///////////////
    grunticon: {
      icons: {
        files: [{
          expand: true,
          cwd: 'images/svg/min',
          src: ['*.svg'],
          dest: "styles/css"
        }],
        options: {
          pngfolder: '../../images/png',
          cssprefix: '.icon__',
          template: 'grunticon.hbs'
        }
      }
    },


    /////////////
    // CSSCOMB //
    /////////////
    csscomb: {
      options: {
        config: 'styles/scss/config.json'
      },
      dynamic_mappings: {
        expand: true,
        cwd: 'styles/scss/',
        src: ['*.scss'],
        dest: 'styles/scss/'
      }
    },


    //////////
    // SASS //
    //////////
    sass: {
      prod: {
        options: {
          style: 'compressed'
        },
        files: {
          'styles/css/lap_and_up.min.css' : 'styles/scss/lap_and_up.scss',
          'styles/css/palm.min.css' : 'styles/scss/palm.scss',
          'styles/css/ie.min.css' : 'styles/scss/ie.scss'
        }
      }
    },


    ///////////
    // WATCH //
    ///////////
    watch: {
      js: {
        files: [
          'scripts/src/**/*.js',
          'scripts/lib/**/*.js'
        ],
        tasks: ['concat:main','uglify:main']
      },
      sass: {
        files: ['styles/scss/**/*.scss'],
        tasks: ['sass']
      },
      svg: {
        files: ['images/svg/src/**/*.svg'],
        tasks: ['svgmin:grunticon','grunticon']
      }
    },
  });


  /**
   * default tasks
   *
   * not running the fontsmith task here as it will keep replacing
   * the existing font files which will hurt our users' browser caches.
   */
  grunt.registerTask('default', ['copy','concat','uglify','svgmin','grunticon','sass']);

};
