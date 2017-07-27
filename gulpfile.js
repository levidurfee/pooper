const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const minify = require('gulp-minify');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');

gulp.task('transpile', function() {
  return gulp.src([
    './src/js/poop.js'
  ])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(minify({
    ext: {
      min: '.min.js'
    }
  }))
  .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('transpile:message', function() {
  return gulp.src([
    './src/js/message.js'
    ])
  .pipe(babel({presets: ['es2015']}))
  .pipe(minify({
    ext: {
      min: '.min.js'
    }
  }))
  .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('sass', function () {
  return gulp.src('./src/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/js/poop.js'], ['transpile']);
  gulp.watch(['./src/js/message.js'], ['transpile:message']);
  gulp.watch(['./src/scss/styles.scss'], ['sass']);
});
