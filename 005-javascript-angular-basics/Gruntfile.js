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
                            connect.static('.tmp'),
                            connect.static('app')
                        ];    
                    }
                }    
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/*.html',
                    'app/*.js'
                ]
            }
        }
    });

    /* plugin tasks loading */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /* plugin tasks aliases */
        grunt.registerTask('serve', function (target) {
        grunt.log.warn('running `serve` task');
        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'watch'
        ]);        
    });
};