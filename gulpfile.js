var gulp = require('gulp'),
  connect = require('gulp-connect'),
  open = require('gulp-open'),
  watch = require('gulp-watch'),
  sass = require('gulp-sass'),
  babel = require("gulp-babel");
var port = 8081;
var src = './src';
var dist = './dist';

gulp.task('connect', function () {
  connect.server({
    port: port,
    livereload: true
  });
});

gulp.task('open', function(){
  var options = {
    url: 'http://localhost:' + port
  };
  gulp.src('./index.html')
  .pipe(open('', options));
});

gulp.task('js', function () {
  gulp.src(src + '/js/*.js')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(src + '/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist + '/css'));
});

gulp.task("babel", function () {
  return gulp.src(src + '/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest(dist + '/js'));
});

gulp.task('watch', function () {
  gulp.watch([src + '/js/*.js'], ['js', 'babel']);
  gulp.watch(src + '/sass/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'babel', 'connect', 'open', 'watch']);
