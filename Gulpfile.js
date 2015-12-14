var gulp = require('gulp');
var browserify =  require('browserify');
var source = require('vinyl-source-stream');
var buffer =require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var livereload = require("gulp-livereload");
var jshint =require('gulp-jshint');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require("gulp-sourcemaps");

gulp.task('browserify',function(){
	var b = browserify({
		entries: './test-js/app.js',
		debug: true
	})
	return b.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest("js/"))
		.pipe(rename({suffix:".min"}))
		.pipe(gulp.dest("js/"))
})

gulp.task('styles',function(){
	return gulp.src("sass/**/*.scss")
		.pipe(sass().on("error",sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('css/'))
		.pipe(rename({suffix:'.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('css/'))

})

gulp.task("default", function(){
	gulp.watch('sass/**/*.scss',['styles'])
	gulp.watch('test-js/**/*.js',['browserify'])

	livereload.listen();

	gulp.watch(["sass/**/*.scss","./index.html","./test-js/**/*.js"]).on("change",livereload.changed)
})