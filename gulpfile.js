var gulp = require('gulp'),
  connect = require('gulp-connect'),
  open = require('gulp-open'),
  watch = require('gulp-watch'),
  babel = require("gulp-babel");
var port = 8081;

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
  gulp.src('./js/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./js/*.js'], ['js', 'babel']);
});

gulp.task("babel", function () {
  return gulp.src("./js/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js"));
});


gulp.task('default', ['babel', 'connect', 'open', 'watch']);
