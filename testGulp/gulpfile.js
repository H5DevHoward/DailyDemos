'use strict';
//加载插件
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),//sass的编译
    less = require('gulp-less'),//less的编译
    autoprefixer = require('gulp-autoprefixer'),//自动添加css前缀
    minifycss = require('gulp-minify-css'),//压缩css
    jshint = require('gulp-jshint'),//js代码校验
    uglify = require('gulp-uglify'),//压缩js代码
    imagemin = require('gulp-imagemin'),//压缩图片
    rename = require('gulp-rename'),//重命名
    concat = require('gulp-concat'),//合并js文件
    notify = require('gulp-notify'),//更改提醒
    cache = require('gulp-cache'),//图片缓存，只有图片替换了才压缩
    livereload = require('gulp-livereload'),//自动刷新页面
    del = require('del'),//清除文件
    sequence = require('gulp-sequence'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

//编译sass/less、自动添加css前缀和压缩
//gulp.src这个API设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss, vender.scss]，也可以是正则表达式/**/*.scss
gulp.task('styles', function(){
  // return gulp.src('src/styles/main.scss')
    // .pipe(sass({style: 'expanded'}))
  return gulp.src('src/styles/main.less')
    .pipe(less({style: 'expanded'}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/assets/css'))
    // .pipe(rename({suffix: 'min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/assets/css'))
    // less编译后的css将注入到浏览器里实现更新
    .pipe(reload({stream: true}))
    .pipe(notify({message: 'Styles task complete'}));
});

//js代码校验、合并和压缩
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('gulp-jshint-html-reporter', { filename: 'jshint-output.html' }))
    // .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'Scripts task complete' }));
});

//压缩图片
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    // .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true })))//现在，只有新建或者修改过的图片才会被压缩了
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(reload({stream: true}))
    .pipe(notify({message: 'Images task complete' }));
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist/assets'))
    .pipe(reload({stream: true}))
    .pipe(notify({message: 'Html task complete' }));
});

//清除文件
//在任务执行前，最好先清除之前生成的文件
//我们用一个回调函数（cb）确保在退出前完成任务
gulp.task('clean', function(cb) {
    // del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
    del(['dist/assets/*'], cb)
});

gulp.task('sequence', function(cb){
    sequence('styles', 'scripts', 'images', 'html')(cb)
});


//监听文件
gulp.task('watch', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/assets/"
        }
    });
    // Watch .html files
    gulp.watch('src/index.html', ['html']);
    // Watch .scss files
    gulp.watch('src/styles/**/*.less', ['styles']);
    // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);
    // Watch image files
    gulp.watch('src/images/**/*', ['images']).on('change', reload);

    //自动刷新页面
    //要使这个能够工作，还需要在浏览器上安装LiveReload插件
    // Create LiveReload server
    // livereload.listen();
    // Watch any files in dist/, reload on change
    // gulp.watch(['dist/**']).on('change', livereload.changed);
});

//设置build任务（build）
//在这个例子里面，clean任务执行完成了才会去运行其他的任务，在gulp.start()里的任务执行的顺序是不确定的，所以将要在它们之前执行的任务写在数组里面
gulp.task('build', ['clean'], function(cb) {
    // gulp.start('sequence');
    sequence('styles', 'scripts', 'images', 'html', cb);
});
