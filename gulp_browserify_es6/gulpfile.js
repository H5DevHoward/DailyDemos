var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sequence = require('gulp-sequence'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;


gulp.task('browserify-es6', function() {
    return browserify({
            entries: './dev/script/app.es6'
        })
        .plugin([watchify])
        .transform(babelify, {
            presets: ['es2015']
        })
        .bundle()
        .on('error', function(err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dev'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('compile', function(cb) {
    sequence(['browserify-es6'], cb);
});

gulp.task('default', ['compile'], function() {
    browserSync.init({
        port: 9207,
        server: {
            baseDir: './dev'
        }
    });
    gulp.watch('./dev/script/app.es6', ['browserify-es6']);
    gulp.watch('./dev').on('change', reload);
});
