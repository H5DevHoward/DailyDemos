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

const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

gulp.task('css', function () {
    const processors = [
        autoprefixer,
        cssnext,
        precss,
        // cssnano
    ];
    return gulp.src('./public/css/*.scss')
        // .pipe(sass().on('error', sass.logError))
        // .pipe(compass({
        //     sassDir: './public/css',
        //     cssDir: './dest'
        // }))
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./public'))
        .pipe(reload({stream: true}));
});

gulp.task('ejs', function () {
    return gulp.src('./views/*.ejs')
        .pipe(reload({stream: true}));
});
gulp.task('js', function () {
    return gulp.src('./public/js/*.js')
        .pipe(reload({stream: true}));
});
gulp.task('img', function () {
    return gulp.src('./public/img/*')
        .pipe(reload({stream: true}));
});

gulp.task('watch', function() {
    browserSync.init({
        // server: {
        //     baseDir: "./public"
        // },
        proxy: 'localhost:3123'
    });
    gulp.watch('views/*.ejs', ['ejs']);
    gulp.watch('public/css/*.scss', ['css']);
    gulp.watch('public/js/*.js', ['js']);
    gulp.watch('public/img/*', ['img']).on('change', reload);
});
