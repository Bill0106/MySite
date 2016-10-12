/**
 * Created by bill on 15/10/22.
 */

var path = require('path');

var gulp      = require('gulp'),
    sass      = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    uglify    = require('gulp-uglify'),
    notify    = require('gulp-notify'),
    jshint    = require('gulp-jshint'),
    concat    = require('gulp-concat');



// Style Tasks
function styleCompile()
{
    return gulp.src('./sass/style.scss')
        .pipe(sass().on('error', sass.logError))
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
    return gulp.watch('./sass/**/*.scss', gulp.series(styleCompile));
}
function watchScripts()
{
    return gulp.watch('./angular/**/*.js', gulp.series(appJS, adminJS));
}

gulp.task('watch', gulp.parallel(watchStyle, watchScripts));
gulp.task('default', gulp.parallel(styleCompile, adminJS, appJS));