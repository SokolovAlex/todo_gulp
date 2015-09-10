﻿/// <binding Clean='clean' />
var path = require('path');

var gulp = require("gulp"),
    browserify = require("browserify"),
    rimraf = require("gulp-rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    less = require('gulp-less'),
    jshint = require("gulp-jshint"),
    source = require('vinyl-source-stream'),
    args = require('yargs').argv,
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    eslint = require('gulp-eslint'),
    notify = require("gulp-notify"),
    stream = require("event-stream"),
    uglify = require("gulp-uglify");

var main_js = ['examples/scripts/main.js'];
var watch_src = ['examples/scripts/**/*.js'];

gulp.task('clean', function() {
    gulp.src(["build/**/*.js", "build/**/*.css"], { read: false })
        .pipe(rimraf());
});

gulp.task('eslint', function () {
    return gulp.src('examples/scripts/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format('tap'))
        .pipe(eslint.failOnError());
});

gulp.task('jshint', function () {
    return gulp.src('examples/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browserify', function() {
    gutil.log(gutil.colors.cyan('Start .js build'));
    return browserify(main_js)
        .bundle()
        .pipe(gulpif(args.release, uglify()))
        .pipe(source('scripts.js'))
        .pipe(gulp.dest('build/'))
        .pipe(notify({
            message: 'Build success! <%= options.date%>',
            //icon: path.join(__dirname, 'image.jpg'),
            title: "todo project",
            templateOptions: { date: new Date() }
        }));
});

gulp.task("watch:br", function (cb) {
    if (args.release) {
        return cb();
    }
    gulp.watch(watch_src, ['eslint', 'browserify']);
});

gulp.task("build:css", function () {
    var cssStream = gulp.src('./styles/*.less')
        .pipe(less());
    var lessStream = gulp.src('styles/**/*.css');
    stream.merge(cssStream, lessStream)
        .pipe(concat('styles.css'))
        .pipe(gulpif(args.release, cssmin()))
        .pipe(gulp.dest('build/'));
});

gulp.task('less', function () {
    gulp.src('./styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('build'));
});

gulp.task("validate", ['eslint']);

gulp.task("build", ['clean', 'eslint', 'browserify', 'build:css', 'watch:br']);
