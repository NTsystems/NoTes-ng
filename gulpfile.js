// dependencies
var gulp = require('gulp'),
	bowerMain = require('main-bower-files'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpFilter = require('gulp-filter'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	flatten = require('gulp-flatten');


gulp.task('bower', function(){

	var jsFilter = gulpFilter('*.js');

	return gulp.src(bowerMain())

		.pipe(jsFilter)
		.pipe(concat('notes.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(jsFilter.restore())
});
    