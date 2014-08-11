/**
 * Created by Bill on 14-8-8.
 */

module.exports = function(grunt)
{
    grunt.initConfig({
        jshint: {
            all: ['public/src/javascripts/**/*.js']
        },

        uglify: {
            options: {
                mangle: false
            },
            admin: {
                files: {
                    'public/dist/javascripts/adminApp.min.js': ['public/src/admin/adminApp.js']
                }
            },
            build: {
                files: {
                    'public/dist/javascripts/app.min.js': ['public/src/javascripts/**/*.js', 'public/src/javascripts/*.js']
                }
            }
        },

        less: {
            build: {
                files: {
                    'public/dist/css/style.css': 'public/src/less/style.less'
                }
            }
        },

        cssmin: {
            build: {
                files: {
                    'public/dist/css/style.min.css': 'public/dist/css/style.css'
                }
            }
        },

        watch: {
            css: {
                files: ['public/src/**/*.less'],
                tasks: ['less', 'cssmin']
            },
            js: {
                files: ['public/src/**/*.js'],
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

    grunt.registerTask('default', ['less', 'cssmin', 'jshint', 'uglify', 'concurrent']);
};