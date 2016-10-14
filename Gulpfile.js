/**
 * Created by bill on 15/10/22.
 */

var gulp     = require('gulp'),
    webpack  = require('webpack-stream'),
    sass     = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    clean    = require('gulp-clean'),
    notify   = require("gulp-notify");

// Style Tasks
gulp.task('style', function()
{
    return gulp.src('./resources/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./public/build/css'));
});

// Clean
gulp.task('clean', function()
{
    return gulp.src('./public/build/js/app.js')
        .pipe(clean());
});

// Scripts
gulp.task('scripts', ['clean'], function()
{
    return gulp.src('./angular/app.ts')
        .pipe(webpack({
            output: {
                filename: 'app.js'
            },
            resolve: {
                extensions: ['', '.js', '.ts']
            },
            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
                    },
                    {
                        test: /\.html$/,
                        loader: 'html'
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./public/build/js'))
        .pipe(notify('All Finished!'));
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
