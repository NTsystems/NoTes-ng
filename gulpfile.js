// dependencies
var gulp = require('gulp'),
    bower = require('gulp-bower'),
    filter = require('gulp-filter'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

/**
 * Installs app dependencies.
 */
gulp.task('bower', function () {
  return bower({ cmd: 'update' });
});

/**
 * Concatenates scripts.
 */
gulp.task('concatenate', function () {
  var sources = [
    './assets/libs/**/*.js',
    './src/**/*.js'
  ];

  return gulp.src(sources)
    .pipe(concat('notes.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * "Uglifies" concatenated files.
 */
gulp.task('compress', function () {
  var sources = [
    './dist/notes.js'
  ];

  return gulp.src(sources)
    .pipe(concat('notes.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

// tasks
gulp.task('default', ['bower', 'concatenate']);