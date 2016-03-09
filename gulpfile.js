'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint : ['./*.js', '!gulpfile.js'],
  watch : ['gulpfile.js', './foreclosure.js', './test/**/*.js', '!test/{temp,temp/**}'],
  tests : ['./test/**/*.js', '!test/{temp,temp/**}']
};

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint())
    .pipe(plugins.plumber(plumberConf))
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('mocha', function() {
  return gulp.src(paths.tests)
    .pipe(plugins.mocha({
      reporter : 'spec',
      bail : true
    }))
});

gulp.task('watch', function() {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint', 'mocha', 'watch']);

gulp.task('default', ['test']);

