var gulp = require('gulp'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');


gulp.task('browserify-es6', function(){
    return browserify({
        entries: './dev/script/app.es6'
    })
    .plugin([watchify])
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .on('error', function(err){
        console.log(err.toString());
        this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['browserify-es6']);
