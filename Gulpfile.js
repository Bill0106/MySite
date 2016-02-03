/**
 * Created by bill on 15/10/22.
 */

var path = require('path');

var gulp      = require('gulp'),
    less      = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    uglify    = require('gulp-uglify'),
    notify    = require('gulp-notify'),
    jshint    = require('gulp-jshint'),
    nodemon   = require('gulp-nodemon'),
    concat    = require('gulp-concat');



// Style Tasks
function lessCompile()
{
    return gulp.src('./resources/less/style.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/build/css'));
}

// Scripts Tasks
var commonJS  = [
    'angular/services/myServices.js',
    'angular/config.js'
];

function appJS()
{
    return stream = gulp.src(['angular/app.js', 'angular/controllers/app/*.js', 'angular/routes/appRoutes.js'].concat(commonJS))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/build/js'));
}

function adminJS()
{
    return stream = gulp.src(['angular/admin.js', 'angular/controllers/admin/*.js', 'angular/routes/adminRoutes.js'].concat(commonJS))
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('admin.js'))
        .pipe(gulp.dest('./public/build/js'));
}

// Watch Files
function watchStyle()
{
    return gulp.watch('./resources/less/**/*.less', gulp.series(lessCompile));
}
function watchScripts()
{
    return gulp.watch('./angular/**/*.js', gulp.series(appJS, adminJS));
}
gulp.task('watch', gulp.parallel(watchStyle, watchScripts));

// Start Server
gulp.task('start', function()
{
    nodemon({
        script: 'server.js',
        ext: 'js html less',
        env: {
            'NODE_ENV': 'development'
        },
        tasks: ['watch']
    }).on('restart', function()
    {
        return gulp.src('').pipe(notify('All Finish!'));
    });
});

gulp.task('default', gulp.parallel(lessCompile, adminJS, appJS));