var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
// var sass = require('gulp-sass');
// var compass = require( 'gulp-for-compass' );
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var cssnext = require('cssnext');
var precss = require('precss');
var rename = require('gulp-rename');

gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnext,
        precss,
        cssnano
    ];
    return gulp.src('./public/css/*.pcss')
        // .pipe(sass().on('error', sass.logError))
        // .pipe(compass({
        //     sassDir: './public/css',
        //     cssDir: './dest'
        // }))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'));
});
