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
  return gulp.src(['./assets/libs/**/*.js', './src/**/*.js'])
    .pipe(concat('notes.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * "Uglifies" concatenated files.
 */
gulp.task('compress', function () {
  // TODO
  return gulp.src('./dist/notes.js')
    .pipe(concat('notes.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

// concat bower *.js to `notesb-ng.js`
// and bower *.css to `notesb-ng.css`
// gulp.task('bower', function() {
//   var jsFilter = gulpFilter('**/*.js'),
//       cssFilter = gulpFilter('**/*.css');
  
//   return gulp.src(['./src/assets/lib/**/*.js', './src/app'])
//     .pipe(concat('notesb-ng.js'))
//     .pipe(gulp.dest('./src/dist/'));
//   // return bower('./src/assets/lib')
//   //   .pipe(jsFilter)
//   //   .pipe(concat('notesb-ng.js'))
//   //   .pipe(gulp.dest(dest))
//   //   .pipe(jsFilter.restore())   
//   //   .pipe(gulp.dest(dest))
//   //   .pipe(cssFilter)
//   //   .pipe(concat('notesb-ng.css'))
//   //   .pipe(gulp.dest(dest))
//   //   .pipe(cssFilter.restore())
// });

// if we want to minify it, just add .pipe(rename({suffix: '.min'}))
// gulp.task('compress', function() {
//   return gulp.src(src.js)
//     .pipe(concat('notesa-ng.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest(dest));
// });

// tasks
gulp.task('default', ['bower', 'concatenate']);
gulp.task('deploy', ['default', 'compress']);