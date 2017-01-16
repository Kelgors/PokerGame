import gulp from 'gulp';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';

const OUTPUT_DIR = 'dist/themes';

function _generate(srcFiles, themeName) {
  return gulp.src(srcFiles)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(concat(`${themeName}.css`))
    .pipe(gulp.dest(OUTPUT_DIR))
    .pipe(rename(`${themeName}.min.css`))
    .pipe(cleanCss())
    .pipe(gulp.dest(OUTPUT_DIR))
    ;
}

const TASKS_NAME = [ 'default', 'empty' ].map((themeName) => {
  const TASK_NAME = `build:sass:${themeName}`;
  gulp.task(TASK_NAME, () => {
    return _generate(`src/styles/${themeName}/*.sass`, themeName);
  });
  return TASK_NAME;
});

gulp.task('build:sass', TASKS_NAME);
