import gulp from 'gulp';
import plumber from 'gulp-plumber';
import file from 'gulp-file';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import preset from 'babel-preset-es2015';

import {name} from '../package.json';

const srcPath = 'src/';
const buildPath = 'dist/';

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

gulp.task('build:js', function() {
  return bundle().then(gen => {
    return file(name + '.js', gen.code, {src: true})
      .pipe(plumber())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildPath))
      .pipe(filter(['*', '!**/*.js.map']))
      .pipe(rename(name + '.min.js'))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify({
        preserveComments: 'license'
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildPath));
  });
});