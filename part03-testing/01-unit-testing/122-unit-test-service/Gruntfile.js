'use strict';

module.exports = function (grunt) {
    /* grunt task configuration */
    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            client: ['./app/*.js'],
            myself: ['Gruntfile.js']
        },
        clean: {
            server: '.tmp'
        },
        connect: {
            options: {
                port: 5000,
                open: true,
                livereload: 55729,
                hostname: 'localhost', // change this to '0.0.0.0' to access the server from outside
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            connect.static('.tmp'),
                            connect.static('app')
                        ];
                    }
                }
            },
            proxies: [
                // {
                //     context: '/app/login',
                //     rewrite: {
                //         '^/app': '' // remove /app from context
                //     },
                //     host: 'localhost',
                //     port: 3000,
                //     https: false,
                //     changeOrigin: false
                // }
            ]
        },
        watch: {
            lint: {
                tasks: ['jshint:client'],
                files: ['app/*.js']
            },
            karma: {
                tasks: ['karma:unit'],
                files: ['app/*.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/*.html',
                    'app/*.js'
                ]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS'],
                singleRun: true,
                reporters: 'dots'
            }
        }
    });

    /* plugin tasks loading */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-karma');

    /* plugin tasks aliases */
    grunt.registerTask('serve', function () {
        grunt.log.warn('running `serve` task');
        grunt.task.run([
            'jshint:client',
            'karma:unit',
            'clean:server',
            'configureProxies:server',
            'connect:livereload',
            'watch'
        ]);
    });
};