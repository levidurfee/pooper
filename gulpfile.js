const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');

gulp.task('transpile', function() {
  return gulp.src([
    './src/poop.js'
  ])
  .pipe(babel({ presets: ['es2015'] }))
  .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch(['./src/poop.js'], ['transpile']);
});

