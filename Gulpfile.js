var gulp = require('gulp');
var browserify =  require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var livereload = require("gulp-livereload");
var jshint =require('gulp-jshint');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('browserify',function(){
	var browserified = transform(function(filename){
		var b = browserify(filename);
		return b.bundle();
	})

	return gulp.src(['./test-js/*.js'])
		.pipe(browserified)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('js/'))
		.pipe(rename({suffix:".min"}))
		.pipe(uglify())
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

	gulp.watch(["sass/**/*.scss","./index.html","test-js/**/*.js"])
})