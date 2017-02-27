// require gulp modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var browserify = require('browserify');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var rename = require('gulp-rename');
var embedTemplates = require('gulp-angular-embed-templates');

// tasks configuration variables

// sass compile configuration
var sassConfig = {
	taskName: 'compile-sass',
	watchFiles: './src/scss/*.scss',
	entryPoint: './src/scss/style.scss',
	dest: './dist/',
	includePaths: ['./node_modules/angular-material/modules/scss']
};

// js task
var jsConfig = {
	taskName: 'concat-js',
	watchFiles: ['./src/js/**/*.js', './src/js/**/*.html'],
	entryPoint: './src/js/main.js',
	concatFile: 'main.js',
	dest: './dist/'
};

// minify js task
var uglifyConfig = {
	taskName: 'uglify',
	src: './dist/main.js',
	uglifyFile: 'main.min.js',
	dest: './dist/'	
};

// default task
gulp.task('default', [
	sassConfig.taskName, 
	jsConfig.taskName,
	], function() {

		// start browser sync server
		browserSync.init({
			server: "./"
		});

		// watch scss files changes and compile
	    gulp.watch(sassConfig.watchFiles, [sassConfig.taskName]);

	    // watch js files changes and concatenate
	    gulp.watch(jsConfig.watchFiles, [jsConfig.taskName]);

	    // watch html files changes and reload server
	    gulp.watch('./*.html', function() {
	    	browserSync.reload();
	    	notify().write('Browser reloaded!!!');
	    });
	}
);

// sass compile task
gulp.task(sassConfig.taskName, function() {
	gulp.src(sassConfig.entryPoint)
	//.pipe(sourcemaps.init())
	.pipe(sass({ includePaths: sassConfig.includePaths }).on('error', function(error) {
		return notify().write(error);
	}))
	.pipe(postcss([autoprefixer(), cssnano()]))
	//.pipe(sourcemaps.write('./'))	
	.pipe(gulp.dest(sassConfig.dest))
	.pipe(browserSync.stream())
	.pipe(notify('SASS Compiled!!!'));
});

// js concatenate task
gulp.task(jsConfig.taskName, function() {
	gulp.src(jsConfig.entryPoint)
	.pipe(tap(function(file) {
		file.contents = browserify(file.path, { debug: true }).bundle().on('error', function(error) {
			return notify().write(error);
		});
	}))
	.pipe(buffer())
	//.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(embedTemplates({ skipErrors: true }))
	.pipe(gulp.dest(jsConfig.dest))
	.pipe(rename(uglifyConfig.uglifyFile))
	.pipe(uglify())
	//.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(uglifyConfig.dest))	
	.pipe(notify('JS Concatenated & Minified!!!'))
	.pipe(browserSync.stream());
});

// minify js
gulp.task(uglifyConfig.taskName, function() {
	gulp.src(uglifyConfig.src)
	.pipe(uglify())
	.pipe(gulp.dest(uglifyConfig.dest))
	.pipe(notify('JS Minified!!!'))
});
