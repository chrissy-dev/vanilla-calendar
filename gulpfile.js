var gulp = require('gulp')
var postcss = require('gulp-postcss')
var cssnext = require('postcss-cssnext')
var csshex = require('postcss-hexrgba')
var cssnano = require('cssnano')
var uglify = require('gulp-uglify')

var CSS_PATH = './src/**/*.css';
var JS_PATH = './src/**/*.js';
var DIST_PATH = './dist'

gulp.task('css', function () {
  return (
    gulp.src(CSS_PATH)
    .pipe(postcss([
      cssnext({warnForDuplicates: false}),
      csshex(),
      cssnano(),
    ]))
    .pipe(gulp.dest(DIST_PATH))
  )
})

gulp.task('js', function () {
  return (
    gulp.src(JS_PATH)
    .pipe(uglify())
    .pipe(gulp.dest(DIST_PATH))
  )
})

gulp.task('watch', function () {
  gulp.watch(CSS_PATH, ['css'])
  gulp.watch(JS_PATH, ['js'])
})
