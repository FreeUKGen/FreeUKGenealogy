module.exports = function(grunt) {


  /**
   * load plugins
   */
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-svgmin');


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
      },

      fonts: {
        expand: true,
        cwd: 'bower_components/FreeUKGenealogy-Core-Frontend/fonts/',
        src: '**',
        dest: 'fonts/',
        flatten: true,
        filter: 'isFile',
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
          'bower_components/js-cookie/src/js.cookie.js',
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
          'bower_components/ScrollMagic/js/jquery.scrollmagic.min.js',
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
      // copy & minify any core svg src files first
      core: {
        files: [{
          expand: true,
          cwd: 'bower_components/FreeUKGenealogy-Core-Frontend/images/svg/src',
          src: ['*.svg'],
          dest: 'images/svg/min'
        }]
      },
      // then copy & minify our project svg files, potentially overwriting any
      // of the same name that came from the core
      project: {
        files: [{
          expand: true,
          cwd: 'images/svg/src',
          src: ['*.svg'],
          dest: 'images/svg/min'
        }]
      }
    },


    ///////////////
    // GRUNTICON //
    ///////////////
    grunticon: {
      project: {
        files: [{
          expand: true,
          cwd: 'images/svg/min',
          src: ['*.svg'],
          dest: "styles/css"
        }],
        options: {
          pngfolder: '../../images/png',
          // add more hover styles here following this pattern
          customselectors: {
            "reply--dark" : [".icon__reply:hover",".icon__reply:active"],
            "repost--dark" : [".icon__repost:hover",".icon__repost:active"],
            "star--dark" : [".icon__star:hover",".icon__star:active"],
            "cancel--brighter" : [".icon__cancel:hover",".icon__cancel:active"],
            "twitter--dark" : [".icon__twitter:hover",".icon__twitter:active"],
            "rss--dark" : [".icon__rss:hover",".icon__rss:active"],
            "googleplus--dark" : [".icon__googleplus:hover",".icon__googleplus:active"],
            "facebook--dark" : [".icon__facebook:hover",".icon__facebook:active"],
            "github--dark" : [".icon__github:hover",".icon__github:active"],
            "search--dark" : [".search:hover .icon__search",".search:active .icon__search"],
            "comment--brighter" : [".icon__comment:hover",".icon__comment:active"],
            "chevron-left--dark" : [".icon__chevron-left:hover",".icon__chevron-left:active"],
            "chevron-right--dark" : [".icon__chevron-right:hover",".icon__chevron-right:active"],
            "chevron-alt-left--dark" : [".icon__chevron-alt-left:hover",".icon__chevron-alt-left:active"],
            "chevron-alt-right--dark" : [".icon__chevron-alt-right:hover",".icon__chevron-alt-right:active"],
            "cancel-grey" : [".icon__cancel-white:hover",".icon__cancel-white:active"],
            "burger--brighter" : [".icon__burger:hover",".icon__burger:active"],
            "error" : ["input.parsley-error","textarea.parsley-error",".multiselect select.parsley-error"],
            "success" : ["input.parsley-success","textarea.parsley-success",".multiselect select.parsley-success"],
            "select" : [".select select"],
            "select-error" : [".select select.parsley-error"],
            "select-success" : [".select select.parsley-success"]
          },
          cssprefix: '.icon__',
          template: 'bower_components/FreeUKGenealogy-Core-Frontend/grunticon.hbs'
        }
      }
    },


    //////////
    // SASS //
    //////////
    sass: {
      prod: {
        options: {
          style: 'compressed',
          loadPath: ['bower_components']
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
        tasks: ['svgmin','grunticon']
      }
    },


  });


  /**
   * default tasks
   */
  grunt.registerTask('default', ['copy','concat','uglify','svgmin','grunticon','sass']);

};
