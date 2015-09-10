/// <binding Clean='clean' />
var path = require('path');

var gulp = require("gulp"),
    babel = require('gulp-babel'),
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
    filesize = require("gulp-filesize"),
    notify = require("gulp-notify"),
    streamify = require("gulp-streamify"),
    mocha = require("gulp-mocha"),
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
        .pipe(source('scripts.js'))
        .pipe(gulpif(args.release, streamify(uglify())))
        .pipe(filesize())
        .pipe(gulp.dest('build/'))
        .pipe(notify({
            message: 'Build success! <%= options.date%>',
            //icon: path.join(__dirname, 'image.jpg'),
            title: "todo project",
            templateOptions: { date: new Date() }
        }))
        .on('error', gutil.log);
});

gulp.task("watch", function (cb) {
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
        .pipe(filesize())
        .pipe(gulpif(args.release, cssmin()))
        .pipe(filesize())
        .pipe(gulp.dest('build/'))
        .on('error', gutil.log);
});

gulp.task('less', function () {
    gulp.src('./styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('build'));
});

gulp.task('build_tests', function (cb) {
    if (!args.release) {
        return cb();
    }
    return gulp.start('tests');
});

gulp.task('tests', function () {
    return gulp.src('tests/**/*.test.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task("validate", ['eslint', "tests"]);

gulp.task('precommit', function() {
    gulp.src('./hooks/pre-commit').pipe(gulp.dest('./.git/hooks'));
});

gulp.task('precommit-remove', function() {
    gulp.src(["./.git/hooks/pre-commit"], { read: false })
        .pipe(rimraf());
});

gulp.task('es6', function () {
    return gulp.src('examples/scripts_es6/Application.js')
        .pipe(babel())
        .pipe(gulp.dest('build/es6'));
});

gulp.task("build", ['clean', 'eslint', 'build_tests', 'browserify', 'build:css', 'watch']);
