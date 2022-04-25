'use strict';

const gulp = require('gulp');
const { src, dest } = require('gulp');
const { series, parallel } = require('gulp');

const sass = require('gulp-sass')(require('node-sass'));
const server = require('browser-sync').create();
const webpack = require('webpack-stream');
const del = require('del');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mquery-packer');
const htmlmin = require('gulp-htmlmin');
const cleanss = require('gulp-cleancss');
const minify = require('gulp-minify');
const gulpIf = require('gulp-if');

let PROD = false;

const SRC_STYLE = 'src/style/main.scss';
const SRC_HTML = 'src/*.html';
const SRC_IMG = 'src/img/*.{png,jpg,jpeg, gif,ico}';
const SRC_FONTS = 'src/fonts/**/*';
const SRC_JS_EXTERNAL = 'src/js-external/**/*.js';
const SRC_JS = 'src/js/main.js';

const DST_HTML = 'build/';
const DST_STYLE = 'build/css/';
const DST_IMG = 'build/img/';
const DST_FONTS = 'build/fonts/';
const DST_JS = 'build/js/';

const WATCH_PATTERN_HTML = 'src/*.html';
const WATCH_PATTERN_STYLE = 'src/style/**/*.scss';
const WATCH_PATTERN_JS = 'src/js/**/*.js';
const WATCH_PATTERN_JS_EXTERNAL = 'src/js-external/**/*.js';
const WATCH_PATTERN_IMG = 'src/img/*';
const WATCH_PATTERN_FONTS = 'src/fonts/**/*';

const buildHtml = () => {
  return src(SRC_HTML)
    .pipe(gulpIf(PROD,
      htmlmin({
        collapseWhitespace: true,
        trimCustomFragments: true,
        collapseInlineTagWhitespace: true,
        removeComments: true
      })))
    .pipe(dest(DST_HTML));
};

const buildStyle = () => {
  return src(SRC_STYLE)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(rename('style.css'))
    .pipe(gulpIf(PROD, cleanss()))
    .pipe(dest(DST_STYLE));
};

const buildJs = () => {
  return src(SRC_JS)
    .pipe(plumber())
    .pipe(webpack({
      devtool: (PROD) ? false : 'source-map',
      mode: (PROD) ? 'production' : 'development',
      module: {
        rules: [{
          test: /\.js$/,
          // loader: 'babel-loader'
        }]
      },
      output: {
        filename: 'script.js'
      }
    }))
    .pipe(gulpIf(PROD,
      minify({
        ext: {
          min:'.js'
        },
        noSource: true
      })))
    .pipe(dest(DST_JS));
};

const copyImg = () => {
  return src(SRC_IMG)
    .pipe(dest(DST_IMG));
};

const copyFonts = () => {
  return src(SRC_FONTS)
    .pipe(dest(DST_FONTS));
};

const copyJsExternal = () => {
  return src(SRC_JS_EXTERNAL)
    .pipe(dest(DST_JS));
};

const clear = () => {
  return del(DST_HTML);
};

const reloadServer = (source) => {
  return src(source)
    .pipe(server.stream());
};

const startServer = (cb) => {
  server.init({
    server: DST_HTML,
    port: 3502
  });

  gulp.watch(WATCH_PATTERN_HTML, series(buildHtml, reloadServer.bind(null, DST_HTML)));
  gulp.watch(WATCH_PATTERN_STYLE, series(buildStyle, reloadServer.bind(null, DST_STYLE)));
  gulp.watch(WATCH_PATTERN_JS, series(buildJs, reloadServer.bind(null, DST_JS)));
  gulp.watch(WATCH_PATTERN_JS_EXTERNAL, series(copyFonts, reloadServer.bind(null, DST_JS)));
  gulp.watch(WATCH_PATTERN_IMG, series(copyImg, reloadServer.bind(null, DST_IMG)));
  gulp.watch(WATCH_PATTERN_FONTS, series(copyFonts, reloadServer.bind(null, DST_FONTS)));

  cb();
};

const setProdaction = (cb) => {
  PROD = true;
  cb();
};

const build = series(clear, parallel(buildHtml, buildStyle, copyImg, copyFonts, buildJs, copyJsExternal));

exports.dev = series(build, startServer);
exports.prod = series(setProdaction, build);
exports.clear = clear;
exports.build = build;
