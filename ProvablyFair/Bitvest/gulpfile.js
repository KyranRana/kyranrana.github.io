const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('es6', () =>
  browserify('Verifier/Frontend/UserInterface.js')
      .transform('babelify', {
        presets: ['@babel/preset-env'],
      })
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('build')));

gulp.task('default', () =>
  gulp.watch('Verifier/**/*.js', {ignoreInitial: false}, gulp.series('es6')));
