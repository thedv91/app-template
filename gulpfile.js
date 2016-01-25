"use strict";

var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var wiredep = require('wiredep').stream;
var lib = require('bower-files')();
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var series = require('stream-series');
var templateCache = require('gulp-angular-templatecache');
var connect = require('gulp-connect');
var open = require("open");

var path = {
	dist: 'dist',
	app: 'app',
	vendorjs: 'dist/js/vendor',
	vendorcss: 'dist/css/vendor',
};
var app = {
	port: 9000
};

gulp.task('default', ['coppy-html', 'template', 'bower', 'sass', 'scripts', 'inject', 'connect', 'watch'], function() {
	console.info('Hello Recycle Bin!');
	open("http://localhost:" + app.port);
});

gulp.task('connect', function() {
	connect.server({
		root: [path.dist, '.tmp'],
		livereload: true,
		port: app.port
	});
});

gulp.task('watch', function() {
	gulp.watch(path.app + '/**/*.js', ['scripts']);
	gulp.watch(path.app + '/**/*.scss', ['sass']);
	gulp.watch(path.app + '/**/*.html', ['coppy-html', 'inject']);
});

gulp.task('sass', function() {
	gulp.src(path.app + '/scss/main.scss')
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCss({
			compatibility: 'ie8'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dist + '/css'));
});

gulp.task('scripts', function() {
	return gulp.src(path.app + '/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(path.dist + '/js'));
});

/* Inject bower */
gulp.task('bower-js', function() {
	return gulp.src(lib.ext('js').files)
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(concat('vendor.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.vendorjs));
});

gulp.task('bower-css', function() {
	return gulp.src(lib.ext('css').files)
		.pipe(sourcemaps.init())
		.pipe(minifyCss({
			compatibility: 'ie8'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.vendorcss));
});

gulp.task('bower', ['bower-js', 'bower-css']);

gulp.task('lint', function() {
	return gulp.src(path.app + '/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('coppy-html', function() {
	return gulp.src(path.app + '/**/*.html')
		.pipe(gulp.dest(path.dist));
});

gulp.task('clean-scripts', function() {
	return gulp.src(path.dist + '/**/*.js', {
			read: false
		})
		.pipe(clean());
});

gulp.task('clean-styles', function() {
	return gulp.src(path.dist + '/**/*.css', {
			read: false
		})
		.pipe(clean());
});

gulp.task('clean', function() {
	return gulp.src(path.dist, {
			read: false
		})
		.pipe(clean());
});

gulp.task('inject', function() {

	var vendorStream = gulp.src([path.vendorjs + '/**/*.js'], {
		read: false
	});

	var appStream = gulp.src([path.dist + '/js/*.js'], {
		read: false
	});

	var vendorCssStream = gulp.src([path.vendorcss + '/**/*.css'], {
		read: false
	});

	var appCssStream = gulp.src([path.dist + '/css/*.css'], {
		read: false
	});

	return gulp.src(path.app + '/index.html')
		.pipe(inject(gulp.src(path.vendorjs + '/**/*.js', {
			read: false
		}), {
			ignorePath: path.dist,
			addRootSlash: false,
			name: 'bower'
		}))
		.pipe(inject(gulp.src(path.dist + '/js/*.js', {
			read: false
		}), {
			ignorePath: path.dist,
			addRootSlash: false,
			name: 'app'
		}))
		.pipe(inject(gulp.src(path.vendorcss + '/**/*.css', {
			read: false
		}), {
			ignorePath: path.dist,
			addRootSlash: false,
			name: 'bower'
		}))
		.pipe(inject(gulp.src(path.dist + '/css/*.css', {
			read: false
		}), {
			ignorePath: path.dist,
			addRootSlash: false,
			name: 'app'
		}))
		.pipe(gulp.dest(path.dist));
});

gulp.task('template', function() {
	return gulp.src(path.app + '/views/**/*.html')
		.pipe(templateCache({
			module: 'app.templates'
		}))
		.pipe(gulp.dest(path.dist + '/js'));
});