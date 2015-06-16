// dependencies
var gulp = require('gulp'),
	bowerMain = require('main-bower-files'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpFilter = require('gulp-filter'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	minifyCSS    = require('gulp-minify-css'),
	flatten = require('gulp-flatten');


gulp.task('bower', function(){

	var jsFilter = gulpFilter('*.js'),
		cssFilter = gulpFilter('*.css');

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

		// CSS
		.pipe(cssFilter)
		.pipe(concat('notes.css'))
		.pipe(gulp.dest('./dist'))
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(cssFilter.restore())
});
    