import gulp from 'gulp';
import plumber from 'gulp-plumber';
import jsonMinify from 'gulp-json-minify';
import svgo from 'gulp-svgo';

var svgOptions = require('../svgo.json');

gulp.task('build:assets:lang', function () {
    return gulp.src('assets/languages/*.json')
        .pipe(jsonMinify())
        .pipe(gulp.dest('website/assets/languages'));
});

gulp.task('build:assets:cards', function () {
    return gulp.src('assets/cards/default/*.svg')
        .pipe(svgo(svgOptions))
        .pipe(gulp.dest('website/assets/cards/default'));
});

gulp.task('build:assets', [ 'build:assets:lang', 'build:assets:cards' ]);