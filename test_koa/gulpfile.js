const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
// const sass = require('gulp-sass');
// const compass = require( 'gulp-for-compass' );
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cssnext = require('cssnext');
const precss = require('precss');
const rename = require('gulp-rename');

gulp.task('css', function () {
    const processors = [
        autoprefixer,
        cssnext,
        precss,
        // cssnano
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
