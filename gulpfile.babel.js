import gulp from 'gulp';
import './gulp/build-js';
import './gulp/build-sass';
import './gulp/build-assets';
import './gulp/http';

gulp.task('watch:js', function () {
  gulp.watch('./src/**/*.js', [ 'build:js:src' ]);
});
gulp.task('watch:css', function () {
  gulp.watch('./sass/**/*.sass', [ 'build:sass' ]);
});
gulp.task('watch', [ 'watch:js', 'watch:css' ]);

gulp.task('build', [ 'build:js', 'build:assets', 'build:sass' ]);
gulp.task('default', [ 'build' ]);
