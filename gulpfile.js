var gulp = require('gulp')
var postcss = require('gulp-postcss')
var uglify = require('gulp-uglify')

gulp.task('css', function () {
  return (
    gulp.src('./src/*.css')
    .pipe(postcss([
      require('postcss-cssnext')(),
      require('postcss-hexrgba'),
      require('cssnano')
    ]))
    .pipe(gulp.dest('./dist'))
  )
})

gulp.task('js', function () {
  return (
    gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
  )
})

gulp.task('watch', function () {
  gulp.watch('./src/**/*.css', ['css'])
  gulp.watch('./src/**/*.js', ['js'])
})
