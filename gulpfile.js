// Gulp plugin setup

var gulp = require('gulp');

// Gulp environment utility

var gutil = require('gulp-util');

// Watches single files

var watch = require('gulp-watch');

var gulpShopify = require('gulp-shopify-upload');

// Grabs API credentials

var config = require('./config.json');

// Compiles SCSS files

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var cssnano = require('gulp-cssnano');

var concat = require('gulp-concat');

// Minify & rename files

var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

// Compiles Image files

var imagemin = require('gulp-imagemin');

var changed = require('gulp-changed');

// Notifies of errors

var notify = require('gulp-notify');

// Includes the Bourbon Neat libraries

var neat = require('node-neat').includePaths;

function handleErrors() {

  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify

  notify.onError({

      title: "Compile Error",

      message: "<%= error %>"

  }).apply(this, args);

// Keep gulp from hanging on this task

  this.emit('end');

}

gulp.task('images', function() {

  return gulp.src('./lib/images/*')

    .pipe(changed('./spacelabs-dev/assets/')) // Ignore unchanged files

    .pipe(imagemin({
      progressive: true,
      verbose: true
    })) // Optimize

    .pipe(gulp.dest('./spacelabs-dev/assets/'));

});

gulp.task('sass', function () {

  gulp.src('./lib/scss/*.{sass,scss}')

    .pipe(sass({includePaths: neat}))

    .on('error', handleErrors)

    .pipe(autoprefixer({ browsers: ['last 2 version'] }))

    .pipe(rename({suffix: '.min'}))

    .pipe(cssnano())

    .pipe(concat('spacelabs.min.css'))

    .pipe(gulp.dest('./spacelabs-dev/assets'))

    .pipe(notify({ message: 'SCSS task complete' }));

});

gulp.task('styles', function () {

  gulp.watch('./lib/scss/**/*.{sass,scss}', ['sass']);

});

gulp.task('scriptsWatch', function () {

  gulp.watch('./lib/js/**/*.js', ['scripts']);

});

gulp.task('imageWatch', function () {

  gulp.watch('lib/images/*.{jpg,jpeg,png,gif,svg}', ['images']);

});

gulp.task('scripts', function() {

  return gulp.src(['./lib/js/jquery-validator.js', './lib/js/fontawesome.js', './lib/js/jquery-mask.js', './lib/js/spacelabs.js'])

      .pipe(concat('spacelabs.js'))

      .pipe(rename({suffix: '.min'}))

      .pipe(uglify())

      .pipe(gulp.dest('./spacelabs-dev/assets'))

      .pipe(notify({ message: 'Scripts task complete' }));

});

gulp.task('shopifywatch', function() {

  switch(gutil.env.env) {

    case "development":

      console.log(config.development);

      var options = {

          "basePath": "./spacelabs-dev/"

      };
      
      return watch('./spacelabs-dev/+(assets|layout|config|snippets|sections|templates|locales)/**')
      .pipe(gulpShopify(config.development.shopify_api_key, config.development.shopify_api_password, config.development.shopify_url, config.development.theme_id, options));
      
    break;

    case "test":

      gulp.src(['./spacelabs-dev/**/*','!spacelabs-dev/**/*.yml']).pipe(gulp.dest('./spacelabs-test'));

      break;

    case "production":

      gulp.src(['./spacelabs-test/**/*','!spacelabs-test/**/*.yml']).pipe(gulp.dest('./spacelabs-prod'));

    break;

    default:

      console.log("Gulp Utilities is not pulling a correct environment flag");
  }

});

// Default gulp action when gulp is run in development and production

switch(gutil.env.env) {

  case "development":

    gulp.task('default', [

      'shopifywatch', 'styles', 'scriptsWatch', 'imageWatch'

    ]);

  break;

  case "test":

    gulp.task('default', [

      'shopifywatch'

    ]);

  break;

  case "production":

    gulp.task('default', [

      'shopifywatch'

    ]);

  break;

  default:

    console.log("Gulp Error");

}