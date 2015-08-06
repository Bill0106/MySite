/**
 * Created by Bill on 14-8-8.
 */

module.exports = function(grunt)
{
    grunt.initConfig({
        jshint: {
            all: ['angular/**/*.js']
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: {
                    'public/javascripts/app.min.js': [
                        'angular/app.js',
                        'angular/controllers/app/*.js',
                        'angular/services/*.js',
                        'angular/routes/appRoutes.js'
                    ],
                    'public/javascripts/admin.min.js': [
                        'angular/admin.js',
                        'angular/controllers/admin/*.js',
                        'angular/services/*.js',
                        'angular/routes/adminRoutes.js'
                    ]
                }
            }
        },
        less: {
            build: {
                files: {
                    'public/style/css/style.css': 'public/style/less/style.less'
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'public/style/css/style.min.css': 'public/style/css/style.css'
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['public/style/less/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['angular/**/*.js'],
                tasks: ['jshint', 'uglify']
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['jshint', 'uglify', 'concurrent']);
};