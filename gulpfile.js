/// <binding Clean='clean' />

var gulp = require("gulp"),
    rimraf = require("gulp-rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

gulp.task('clean', function() {
    gulp.src(["build/**/*.js", "build/**/*.css"], { read: false })
        .pipe(rimraf());
});

gulp.task("build:js", function () {
    gulp.src([ 'bower_components/**/*min.js', 'scripts/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'));
});

gulp.task("build:css", function () {
    gulp.src('styles/**/*.css')
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('build/'));
});

gulp.task("build", ['build:js', 'build:css']);

gulp.task("default", ['build']);
