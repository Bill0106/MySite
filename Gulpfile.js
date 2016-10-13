/**
 * Created by bill on 15/10/22.
 */

var gulp     = require('gulp'),
    webpack  = require('webpack-stream'),
    sass     = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css');

// Style Tasks
gulp.task('style', function()
{
    return gulp.src('./resources/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/build/css'));
});

// Scripts
gulp.task('scripts', function()
{
    return gulp.src('./angular/app.ts')
        .pipe(webpack())
        .pipe(gulp.dest('./public/build/js'));
});

// Scripts:production
gulp.task('scripts:build', function()
{
    return gulp.src('./angular/app.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./public/build/js'));
});

gulp.task('watch', function() {
    gulp.watch('./resources/sass/*/*.scss', ['style']);
    gulp.watch('./angular/**/*.ts', ['scripts']);
});

gulp.task('default', ['style', 'scripts:build']);