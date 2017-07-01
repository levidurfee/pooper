const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const minify = require('gulp-minify');

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
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/poop.js'], ['transpile']);
});

