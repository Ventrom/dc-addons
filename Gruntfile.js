(function (module) {

    'use strict';

    module.exports = function (grunt) {
        // if this variable exists we have already set up grunt
        if (
            !grunt ||
            !grunt.config ||
            !grunt.config.data ||
            !grunt.config.data.config
        ) {
            // Load grunt modules from package.json automatically
            require('load-grunt-tasks')(grunt);

            var gruntConfig = {config: {
                // base folders
                dist: 'dist',
                src: 'src',
                tests: 'tests',
                grunt: 'grunt',

                scripts: 'scripts',
                less: 'less',

                pkg: grunt.file.readJSON('package.json'),
            }};

            // loads tasks in the 'grunt' folder
            grunt.loadTasks('grunt');
            // loads task options in the 'grunt/options' folder
            grunt.initConfig(grunt.util._.extend(gruntConfig, gruntLoadConfig('./grunt/options/', grunt)));
        }
    };

    function gruntLoadConfig(path, grunt) {
        var glob = require('glob');
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function (option) {
            key = option.replace(/\.js$/, '');
            object[key] = require(process.cwd() + path.replace('.', '') + option);
            if (typeof object[key] === 'function') {
                object[key] = object[key](grunt);
            }
        });

        return object;
    }/*

            grunt.initConfig({
                pkg: grunt.file.readJSON('package.json'),
                watch: {
                    js: {
                        files: ['src/scripts/*.js'],
                        tasks: ['jshint']
                    },
                    css: {
                        files: ['src/less/*.less'],
                        tasks: ['jshint']
                    }
                },
                concat: {
                    files: {
                        src: ['src/main.js', 'src/scripts/base-google-chart.js'],
                        dest: 'dist/concat.js'
                    }
                },
                browserify: {
                    options: {
                       transform: [['babelify', {presets: ['es2015']}]]
                    },
                    js: {
                        src: [ 'dist/concat.js' ],
                        dest: 'dist/dc-addons.js'
                    }
                },
                clean: {
                    js: [ 'dist/concat.js' ]
                },
                less: {
                    development: {
                        files: {'dist/dc-addons.css': ['src/less/*.less']}
                    }
                },
                uglify: {
                    dist: {
                        files: {
                          'dist/dc-addons.min.js': 'dist/dc-addons.js'
                        }
                    }
                },
                cssmin: {
                    dist: {
                        files: {
                          'dist/dc-addons.min.css': 'dist/dc-addons.css'
                        }
                    }
                },
                jshint: {
                    files: ['Gruntfile.js', 'src/scripts/*.js'],
                    options: {
                        'browser': true,
                        'camelcase': true,
                        'curly': true,
                        'eqeqeq': true,
                        'evil': false,
                        'immed': true,
                        'latedef': false,
                        'loopfunc': true,
                        'maxlen': 150,
                        'multistr': true,
                        'newcap': true,
                        'noarg': true,
                        'noempty': true,
                        'nonbsp': true,
                        'nonew': true,
                        'quotmark': 'single',
                        'sub': true,
                        'undef': true,
                        'unused': false,
                        'globals' : {
                            '__dirname': false,
                            'console': false,
                            'crossfilter' : true,
                            'd3' : false,
                            'dc' : true,
                            'global': false,
                            'io': true,
                            'module': false,
                            'process': false,
                            'require': false,
                            'L': true,
                            'google': false,
                            'MarkerClusterer': false,
                            'angular': false
                        }
                    }
                }
            });

            grunt.loadNpmTasks('grunt-contrib-jshint');
            grunt.loadNpmTasks('grunt-contrib-concat');
            grunt.loadNpmTasks('grunt-contrib-clean');
            grunt.loadNpmTasks('grunt-contrib-cssmin');
            grunt.loadNpmTasks('grunt-contrib-uglify');
            grunt.loadNpmTasks('grunt-contrib-watch');
            grunt.loadNpmTasks('grunt-browserify');
            grunt.loadNpmTasks('grunt-contrib-less');
            grunt.registerTask('default', ['jshint', 'concat', 'browserify', 'clean', 'less', 'uglify', 'cssmin']);
        }
    };*/

})(module);
