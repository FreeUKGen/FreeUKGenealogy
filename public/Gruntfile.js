module.exports = function(grunt) {


  /**
   * load plugins
   */
  grunt.loadNpmTasks('grunt-contrib-copy');
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

      classie: {
        src: 'bower_components/classie/classie.js',
        dest: 'scripts/dist/classie.js'
      },

      shiv: {
        src: 'bower_components/html5shiv/dist/html5shiv.min.js',
        dest: 'scripts/dist/html5shiv.js'
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
          cssprefix: '.icon__',
          template: 'bower_components/FreeUKGenealogy-Core-Frontend/grunticon.hbs',
          // to use colours, add more options here and then modify your src
          // filenames to follow this pattern: filename.colors-white-red.svg
          colors: {
            white: "#ffffff"
          }
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
      sass: {
        files: ['styles/scss/**/*.scss'],
        tasks: ['sass']
      },
      svg: {
        files: ['images/svg/src/**/*.svg'],
        tasks: ['svgmin:grunticon','grunticon']
      }
    }


  });


  /**
   * default tasks
   */
  grunt.registerTask('default', ['copy','svgmin','grunticon','sass']);

};
