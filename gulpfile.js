// include gulp
var gulp = require('gulp');
var bower = require('gulp-bower');
var gulpFilter = require('gulp-filter');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// define base folders
var src = {
  css: ['client/app/**/*.css'],
  js: ['client/app/**/*.js'],
  bower: ['bower.json', '.bowerrc']
}
// define default destination folder
var dest = 'client/dist/';

// concat bower *.js to `notesb-ng.js`
// and bower *.css to `notesb-ng.css`
gulp.task('bower', function() {
  var jsFilter = gulpFilter('**/*.js')
  var cssFilter = gulpFilter('**/*.css')
  return bower('client/bower_components/')
    .pipe(jsFilter)
    .pipe(concat('notesb-ng.js'))
    .pipe(gulp.dest(dest))
    .pipe(jsFilter.restore())
    .pipe(gulp.dest(dest))
    .pipe(cssFilter)
    .pipe(concat('notesb-ng.css'))
    .pipe(gulp.dest(dest))
    .pipe(cssFilter.restore())
});

// if we want to minify it, just add .pipe(rename({suffix: '.min'}))
gulp.task('compress', function() {
  return gulp.src(src.js)
    .pipe(concat('notesa-ng.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

 
// default task
gulp.task('default', ['bower', 'compress']);