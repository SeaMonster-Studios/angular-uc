/*jslint node: true */


process.env.PHANTOMJS_EXECUTABLE = process.env.PHANTOMJS_EXECUTABLE || '/usr/local/opt/nvm/v0.10.28/bin/phantomjs';

module.exports = function(grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: ["Gruntfile.js", "server.js", "api/**/*.js", "app/js/**/*.js", "!app/bower_components/**/*.js"]
        },
        simplemocha: {
            options: {
                ui: "bdd"
            },
            all: {
                src: ["tests/js/**/*.js"]
            }
        },
        clean: ["app/dist"],
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: "app/",
                        src: ["css/**/*.css", "*.html", "img/**/*.svg", "!Gruntfile.js", "fonts/**/*", "bower_components/bootstrap/dist/css/bootstrap.css"],
                        dest: "app/dist/",
                        flatten: false,
                        filter: "isFile"
                    },
                    {

                        expand  : true,
                        cwd     : "app/",
                        src     : ["css/**/*.css", "*.html", "img/**/*.svg", "!Gruntfile.js", "fonts/**/*"],
                        dest    : "app/dist/",
                        flatten : false,
                        filter  : "isFile"

                    },
                    {
                        expand  : true,
                        cwd     : "app/js/app/",
                        src     : ["views/**/*.html"],
                        dest    : "app/dist/",
                        flatten : false,
                        filter  : "isFile"
                    },
                    {
                        expand  : true,
                        cwd     : "tests/",
                        src     : ["js/**/*.js", "**/*.html", "mocha/**/*.js", "mocha/**/*.css", "chai/**/*.js"],
                        dest    : "app/dist/tests",
                        flatten : false,
                        filter  : "isFile"
                    }
                ]
            }
        },
        browserify: {
            all: {
                src: ["app/js/**/*.js"],
                dest: "app/dist/public.js"
            },
            options: {
                transform: ['debowerify'],
                debug: true
            }
        },
        sass: {
            dist: {
                files: {
                    "app/dist/style.css" : "sass/style.scss",
                    "app/dist/wes.css" : "sass/wes.scss"
                }
            }
        },
        express: {
            dev: {
                options: {
                    background: true,
                    script: "server.js"
                }
            },
            prod: {
                options: {
                    script: "server.js",
                    node_env: "production"
                }
            },
            test: {
                options: {
                    script: "server.js"
                }
            }
        },
        casper: {
            acceptance: {
                options: {
                    pre: "node server.js",
                    verbose: true,
                    "log-level": "debug",
                    test: true
                },
                files: {
                    "/dev/null": ["tests/acceptance/*_test.js"]
                }
            }
        },
        watch: {
            scripts: {
                files: ["app/js/**/*.js", "app/bower_components/**/*.js", "tests/**/*.js", "tests/**/*.html", "app/**/*.html", "!app/dist/**/*.html"],
                tasks: ["build"]
            },
            source: {
                files: ["sass/**/*.scss"],
                tasks: ["sass"],
                options: {
                    livereload: true
                }
            },
            express: {
                files: ["server.js", "api/routes/*.js", "api/auth/*.js", "api/*.js"],
                tasks: ['server'],
                options: {
                    spawn: false
                }
            }
        },
    });// end grunt.initConfig

    grunt.registerTask('serve', [ 'build', 'express:dev','watch' ]);
    grunt.registerTask('server', 'serve');
    grunt.registerTask('test:acceptance',['express:dev','casper']);
    grunt.registerTask('test:api','simplemocha');
    grunt.registerTask('test',['test:api']);
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build',['clean', 'browserify', 'copy:main', 'sass' ]);
};// end module.exports

























