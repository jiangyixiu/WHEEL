var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rev = require('gulp-rev');

var app = {
    srcPath: 'src/',
    devPath: 'build/',
    prdPath: 'dist/'
};
gulp.task('default', function () {
    return gulp.src('css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});
gulp.task('lib', function() {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath + 'vendor'))
        .pipe(gulp.dest(app.prdPath + 'vendor'))
});

gulp.task('rev', function() {
    return gulp.src([app.srcPath + 'style/**/*.css', app.srcPath + 'script/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('dist'))
});

gulp.task('clean', function() {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean());
});
