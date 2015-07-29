var gulp = require('gulp'),
    fs = require('fs'),
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
    minify = require('gulp-minify-css');

var paths = {
  entryFile: './src/js/moza.js',
  outputDir: './dist/js/',
  outputFile: 'moza.js',
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: 'dist/css/'
	}
}

var package = require('./package.json');

var banner = {
	full :
		'/**\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>, by <%= package.author.name %>.\n' +
		' * <%= package.repository.url %>\n' +
		' * \n' +
		' * Free to use under the MIT License.\n' +
		' * http://gomakethings.com/mit/\n' +
		' */\n\n',
	min :
		'/**' +
		' <%= package.name %> v<%= package.version %>, by Chris Ferdinandi' +
		' | <%= package.repository.url %>' +
		' | Licensed under MIT: http://gomakethings.com/mit/' +
		' */\n'
};


// clean the output directory
gulp.task('clean', function(cb){
    rimraf(paths.outputDir, cb);
});

var bundler;
function getBundler() {
  if (!bundler) {
    bundler = watchify(browserify(paths.entryFile, _.extend({ debug: true }, watchify.args)));
  }
  return bundler;
};

function bundle() {
  return getBundler()
    .transform(babelify)
    .bundle()
    .on('error', function(err) { console.log('Error: ' + err.message); })
    .pipe(source(paths.outputFile))
    .pipe(gulp.dest(paths.outputDir))
    .pipe(reload({ stream: true }));
}

gulp.task('build-persistent', ['clean'], function() {
  return bundle();
});

gulp.task('build', ['build-persistent'], function() {
  process.exit(0);
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

gulp.task('watch', ['build-persistent'], function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
  getBundler().on('update', function() {
    gulp.start('build-persistent')
  });
});

// WEB SERVER
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

// WEB SERVER
gulp.task('default', ['build-persistent', 'watch']);
