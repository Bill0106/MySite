/**
 * Created by Bill on 14-8-8.
 */

module.exports = function(grunt)
{
    grunt.initConfig({
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon']
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent']);
};