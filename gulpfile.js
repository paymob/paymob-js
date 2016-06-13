var gulp = require('gulp');
var gulpInstall = require('gulp-install');
var merge = require('merge2');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var rimraf = require('rimraf');
var fs = require('fs');
var bower = require('gulp-bower');
var mainBowerFiles = require('main-bower-files');


gulp.task('bower-install', function() {
  // Runs bower install --production
  return gulp.src('bower.json')
    .pipe(gulpInstall({production: true, allowRoot: true}));
});

gulp.task('bower-install-dev',  function() {
  return bower()
    .pipe(gulp.dest('./bower_components'));
});


gulp.task('bower-production', ['bower-install', 'create-dirs'], function() {
  // moves main files to lib folder
  return gulp.src(mainBowerFiles({includeDev: false}), {base: 'bower_components'})
    .pipe(gulp.dest('libs'));
});

gulp.task('bower-dev', ['bower-install-dev', 'create-dirs'], function() {
  // moves main files to lib folder
  return gulp.src(mainBowerFiles({
    includeDev: 'inclusive'
  }), {base: 'bower_components'})
    .pipe(gulp.dest('libs'));
});

gulp.task('create-dirs', function() {
  var dirs = ['build', 'dist', 'libs', 'test'];
  rimraf.sync('libs');
  dirs.forEach(function(dir) {
    try {
      fs.mkdirSync(dir);
    } catch(e) {
      if (e.code != 'EEXIST') {
        throw e;
      }
    }
  });
});

gulp.task('default', ['dev']);

gulp.task('dev', ['create-dirs', 'bower-dev'], function() {
  var libs = gulp.src('libs/**/*.js');
  var src = gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  return merge(libs, src).pipe(concat('paymob_js_hash.js')).pipe(gulp.dest('build'));
});


gulp.task('dist', ['create-dirs', 'bower-dev'], function() {
  var libs = gulp.src('libs/**/*.js');
  var src = gulp.src(['src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));

  return merge(libs, src).pipe(concat('paymob_js_hash.js')).pipe(uglify()).pipe(gulp.dest('dist'));
});
