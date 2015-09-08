/// <binding Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("gulp-rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    args = require('yargs').argv,
    gulpif = require('gulp-if'),
    uglify = require("gulp-uglify");

var js_src = [ 'bower_components/**/*min.js', 'scripts/**/*.js'];

gulp.task('clean', function() {
    gulp.src(["build/**/*.js", "build/**/*.css"], { read: false })
        .pipe(rimraf());
});

gulp.task("build:js", function () {
    gulp.src(js_src)
        .pipe(concat('scripts.js'))
        .pipe(gulpif(args.release, uglify()))
        .pipe(gulp.dest('build/'));
});

gulp.task("watch:js", function (cb) {
    if (args.release) {
        return cb();
    }
    gulp.watch(js_src, ['build:js']);
});

gulp.task("build:css", function () {
    gulp.src('styles/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulpif(args.release, cssmin()))
        .pipe(gulp.dest('build/'));
});

gulp.task("build", ['clean', 'build:js', 'build:css', 'watch:js']);

gulp.task("default", ['build']);
