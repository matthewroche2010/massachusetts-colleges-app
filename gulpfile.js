const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const webPack = require('webpack-stream');
const webPackConfig = require('./webpack.config.js');
const htmlmin = require('gulp-htmlmin');

function js(done) {
  return gulp
    .src(['./src/index.js'])
    .pipe(sourcemaps.init())
    .pipe(webPack(webPackConfig))
    .pipe(sourcemaps.write('./dist/'))
    .pipe(gulp.dest('./dist/', {sourcemaps: true}));
  done();
}

function html(done) {
  gulp
    .src(`./src/index.html`)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(`./dist/`));
  done();
}

function data(done) {
  gulp
    .src(`./data/*.json`)
    .pipe(gulp.dest(`./dist/`));
  done();
}

exports.default = gulp.parallel(
  js,
  html,
  data,
);


