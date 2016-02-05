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

	var jsFilter = gulpFilter('*.js', {restore: true}),
		cssFilter = gulpFilter('*.css', {restore: true});

	return gulp.src(bowerMain())

		.pipe(jsFilter)
		.pipe(concat('notes.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(jsFilter.restore)

		// CSS
		.pipe(cssFilter)
		.pipe(concat('notes.css'))
		.pipe(gulp.dest('./dist'))
		.pipe(minifyCSS({keepBreaks:true}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(cssFilter.restore)
});


/*
* explicitly listed files, because gulp doesn't pack them in right order
*/
gulp.task('concatenate', function () {
	return gulp.src(['./src/app.module.js', './src/app.config.js', './src/auth/auth.module.js', './src/**/*.js'])
		.pipe(concat('notesapp.js'))
		.pipe(gulp.dest('./dist'));
});

