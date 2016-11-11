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

// Clean:angular
gulp.task('clean:angular', function()
{
    return gulp.src('./public/build/js/app.js')
        .pipe(clean());
});

// Scripts:angular
gulp.task('scripts:angular', ['clean:angular'], function()
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

// Scripts:angular-production
gulp.task('scripts:angular-build', function()
{
    return gulp.src('./angular/app.ts')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./public/build/js'));
});

// Clean:react
gulp.task('clean:angular', function()
{
    return gulp.src('./public/build/js/admin.js')
        .pipe(clean());
});

// Scripts:react
gulp.task('scripts:react', function()
{
    return gulp.src('./react/app.tsx')
        .pipe(webpack({
            output: {
                filename: 'admin.js'
            },
            resolve: {
                extensions: ['', '.js', '.tsx', '.ts']
            },
            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loader: 'awesome-typescript-loader'
                    },
                    {
                        test: /\.tsx$/,
                        loader: 'awesome-typescript-loader'
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./public/build/js'))
        .pipe(notify('All Finished!'));
});

// Scripts:react-production
gulp.task('scripts:react-build', function()
{
    return gulp.src('./react/app.tsx')
        .pipe(webpack(require('./webpack.react.js')))
        .pipe(gulp.dest('./public/build/js'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('./resources/sass/*/*.scss', ['style']);
    gulp.watch(['./angular/**/*.ts', './resources/views/**/*.html'], ['scripts:angular']);
    gulp.watch(['./react/**/*.tsx', './react/**/*.ts'], ['scripts:react']);
});

gulp.task('default', ['style', 'scripts:angular-build', 'scripts:react-build']);
