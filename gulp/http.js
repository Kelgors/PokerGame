import gulp from 'gulp';
import connect from 'gulp-connect';

gulp.task('serve:website', ['watch'], function () {
  return connect.server({
    root: [ 'website', 'dist', 'bower_components', 'img' ],
    livereload: true,
    port: 8080
  });
});
