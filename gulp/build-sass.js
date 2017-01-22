import gulp from 'gulp';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';

const OUTPUT_DIR = 'website/';

function _generate(srcFiles, outputName) {
  return gulp.src(srcFiles)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(concat(`${outputName}.css`))
    .pipe(gulp.dest(OUTPUT_DIR))
    .pipe(rename(`${outputName}.min.css`))
    .pipe(cleanCss())
    .pipe(gulp.dest(OUTPUT_DIR))
    ;
}


gulp.task('build:sass', function () {
  _generate('sass/index.sass', 'index');
});
