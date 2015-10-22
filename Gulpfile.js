/**
 * Created by bill on 15/10/22.
 */

var path = require('path');

var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');

gulp.task('less', function()
{
    var stream =  gulp.src('./resources/less/style.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/build/css'));

    return stream;
});

gulp.task('js-app', function()
{
    var stream = gulp.src([
        'angular/app.js',
        'angular/controllers/app/*.js',
        'angular/services/myServices.js',
        'angular/routes/appRoutes.js',
        'angular/config.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/build/js'));

    return stream;
});

gulp.task('js-admin', function()
{
    var stream = gulp.src([
        'angular/admin.js',
        'angular/controllers/admin/*.js',
        'angular/services/myServices.js',
        'angular/routes/adminRoutes.js',
        'angular/config.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(concat('admin.js'))
        .pipe(gulp.dest('./public/build/js'));

    return stream;
});

gulp.task('watch', function()
{
    gulp.watch('./resources/less/**/*.less', ['less']);
    gulp.watch('./angular/**/*.js', ['js-app', 'js-admin']);
});

gulp.task('start', function()
{
    nodemon({
        script: 'server.js',
        ext: 'js html less',
        env: {
            'NODE_ENV': 'development'
        }
    }).on('restart', function()
    {
        return gulp.src('').pipe(notify('All Finish!'));
    });
});

gulp.task('default', ['less', 'js-app', 'js-admin'], function()
{
    return gulp.src('').pipe(notify('All Finish!'));
});