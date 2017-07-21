const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const minify = require('gulp-minify');
const sass = require('gulp-sass');

gulp.task('transpile', function() {
  return gulp.src([
    './src/poop.js'
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
    './src/message.js'
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
  return gulp.src('./src/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/poop.js'], ['transpile']);
  gulp.watch(['./src/message.js'], ['transpile:message']);
  gulp.watch(['./src/styles.scss'], ['sass']);
});
