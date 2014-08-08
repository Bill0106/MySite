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
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['nodemon']);
};