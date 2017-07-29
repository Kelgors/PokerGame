import gulp from 'gulp';
import plumber from 'gulp-plumber';
import file from 'gulp-file';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import replace from 'gulp-replace';

import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import preset from 'babel-preset-es2015';

import {name} from '../package.json';

const srcPath = 'src/';
const buildPath = 'website/';

const libFiles = [
//  'bower_components/mersennetwister/src/MersenneTwister.js',
  'bower_components/jquery/dist/jquery.js',
  'node_modules/pixi.js/dist/pixi.js',
  'bower_components/navigo/lib/navigo.js'
];

function _generate(bundle){
  return bundle.generate({
    format: 'umd',
    moduleName: 'PokerGame',
    sourceMap: true,
    globals: {
      'jquery': '$',
      'pixi.js': 'PIXI',
      'mersennetwister': 'MersenneTwister'
    }
  });
}

function bundle(opts) {
  return rollup({
    entry: srcPath + name + '.js',
    external: ['jquery', 'pixi.js', 'mersennetwister'],
    plugins: [
      json(),
      babel({
        sourceMaps: true,
        presets: [['es2015', {modules: false}]],
        plugins: [ "external-helpers" ],
        babelrc: false
      })
    ]
  }).then(bundle => {
    return _generate(bundle);
  }).then(gen => {
    gen.code += '\n//# sourceMappingURL=' + gen.map.toUrl();
    return gen;
  });
}

const now = new Date();
/**
 * @param {Number} n
 * @returns {String}
 */
function formatNumber(n) {
  if (n < 10) return `0${n}`;
  return n.toString();
}
const buildTime = `${formatNumber(now.getMonth()+1)}-${formatNumber(now.getDate())}-${now.getFullYear()} ${formatNumber(now.getHours())}:${formatNumber(now.getMinutes())}:${formatNumber(now.getSeconds())}`;

gulp.task('build:js:src', function() {
  return bundle().then(gen => {
    return file(name + '.js', gen.code, {src: true})
      .pipe(plumber())
      .pipe(replace(/\{BUILD_TIME\}/, `${buildTime}`))
      .pipe(gulp.dest(buildPath))
      .pipe(rename(name + '.min.js'))
      .pipe(uglify({
        preserveComments: 'license'
      }))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildPath));
  });
});

gulp.task('build:js:lib', function() {
  return gulp.src(libFiles)
      .pipe(plumber())
      .pipe(concat('lib.js'))
      .pipe(gulp.dest('website/'))
      .pipe(rename('lib.min.js'))
      .pipe(uglify({
        preserveComments: 'license'
      }))
      .pipe(gulp.dest('website/'));
});

gulp.task('build:js', [ 'build:js:lib', 'build:js:src' ]);
