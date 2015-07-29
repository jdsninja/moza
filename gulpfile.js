var gulp = require('gulp'),
    fs = require('fs'),
    del = require('del');
    browserify = require('browserify'),
    watchify = require('watchify'),
    babelify = require('babelify'),
    rimraf = require('rimraf'),
    source = require('vinyl-source-stream'),
    _ = require('lodash'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plumber = require('gulp-plumber'),
    header = require('gulp-header'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    exit = require('gulp-exit'),
    livereload = require('gulp-livereload');
var package = require('./package.json');

var paths = {
  input: 'src/**/*',
  output: 'dist/',
  scripts: {
    entryFile: 'src/js/moza.js',
    outputName: 'moza.js',
		input: 'src/js/*',
		output: 'dist/js/'
	},
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css/'
	}
}

var banner = {
	full :
		'/**\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>, by <%= package.author.name %>.\n' +
		' * <%= package.repository.url %>\n' +
		' * \n' +
		' * Free to use under the MIT License.\n' +
		' */\n\n',
	min :
		'/**' +
		' <%= package.name %> v<%= package.version %>, by <%= package.author.name %>.\n' +
		' | <%= package.repository.url %>' +
		' | Licensed under MIT' +
		' */\n'
};

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(paths.scripts.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

gulp.task('build:scripts', function() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(paths.scripts.outputName))
    .pipe(gulp.dest(paths.scripts.output))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minify())
    .pipe(header(banner.min, { package : package }))
    .pipe(gulp.dest(paths.scripts.output))
    .pipe(exit());
});

// Process, lint, and minify Sass files
gulp.task('build:styles', function() {
	return gulp.src(paths.styles.input)
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}))
		.pipe(flatten())
		.pipe(prefix({
			browsers: ['last 2 version', '> 1%'],
			cascade: true,
			remove: true
		}))
		.pipe(header(banner.full, { package : package }))
		.pipe(gulp.dest(paths.styles.output))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minify())
		.pipe(header(banner.min, { package : package }))
		.pipe(gulp.dest(paths.styles.output));
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

// Remove prexisting content from output and test folders
gulp.task('clean:dist', function () {
	del.sync([
		paths.output
	]);
});

// Spin up livereload server and listen for file changes
gulp.task('listen', function () {
	livereload.listen();
	gulp.watch(paths.input).on('change', function(file) {
		gulp.start('default');
		gulp.start('refresh');
	});
});

// Run livereload after file change
gulp.task('refresh', ['build'], function () {
	livereload.changed();
});

// Make sure we exit the process
gulp.task('exit', function () {
	  process.exit(0);
});

/**
 * Task Runners
 */
// Compile files
gulp.task('build', [
	'clean:dist',
	'build:styles',
	'build:scripts'
]);

// Compile files when something changes
gulp.task('watch', [
	'listen',
	'default'
]);

// Start the dev server and watch files for changes
gulp.task('dev', [
	'serve'
]);

// WEB SERVER
gulp.task('default', ['build']);
