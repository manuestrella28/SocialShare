var gulp = require('gulp'); //gulp object
var sass = require('gulp-sass'); //compile sass to css
var autoprefixer = require('gulp-autoprefixer'); //includes vendor prefix values for css
var browserSync = require('browser-sync'); //run server for dev process
var useref = require('gulp-useref'); //concatenation of js and css
var uglify = require('gulp-uglify'); //minify js
var minifyHtml = require('gulp-minify-html'); //minify html
var minifyCss = require('gulp-minify-css'); //minify css
var gulpIf = require('gulp-if'); //logical checks
var del = require('del'); //delete folders and files for clean up
var sourcemaps = require('gulp-sourcemaps'); //provides browser the original
var size = require('gulp-size'); //log file sizes
var wiredep = require('wiredep').stream; //inject bower dependencies into html in correct dependency order

//source paths
var sassSrc = 'app/scss/**/*.scss';
var cssDest = 'app/css';
var jsSrc = 'app/js/**/*.js';
var indexSrc = 'app/*.html';
var distSrc = 'dist';
var reload = browserSync.reload;

//inject bower scripts into html markup
gulp.task('bower', function() {
  return gulp.src(indexSrc)
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

//compile sass to css
gulp.task('sass', function() {
  return gulp.src(sassSrc)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(cssDest))
    .pipe(reload({
      stream: true
    }));
});

//prepare files for concat and minify, then move to Dist
gulp.task('html', ['clean', 'bower', 'sass'], function() {
  return gulp.src(indexSrc)
    .pipe(useref({
      searchPath: ['.', 'app']
    }))
    // .pipe(gulpIf('*.js', uglify())) //minifies only javascript files
    // .pipe(gulpIf('*.css', minifyCss())) //minifies only css files
    // .pipe(gulpIf('*.html', minifyHtml({
    //   conditionals: true,
    //   comments: true,
    //   loose: false
    // })))
    .pipe(gulp.dest(distSrc));
});

//copy images to dist
var imgSrc = 'app/images/**/*.+(png|jpg|jpeg|svg|gif)';
var imgDest = 'dist/images';
gulp.task('images', function() {
  return gulp.src(imgSrc)
    .pipe(gulp.dest(imgDest));
});

//remove folders and files from Dist
gulp.task('clean', function() {
  del(distSrc);
});

//create localhost server
gulp.task('serve', function() {
  browserSync({
    port: 8080,
    server: {
      baseDir: ['app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
  });
});

//watch files for changes
gulp.task('watch', ['sass', 'serve'], function() {
  gulp.watch(sassSrc, ['sass']);
  gulp.watch(indexSrc, reload);
  gulp.watch(jsSrc, reload);
  gulp.watch('bower.json', ['bower']);
});

gulp.task('build', ['html', 'images'], function() {
  return gulp.src('dist/**/*')
    .pipe(size({
      showFiles: false,
      gzip: true,
      title: 'build'
    }));
});

gulp.task('dev', ['html'], function() {
  gulp.start('watch');
});

gulp.task('default', function() {
  gulp.start('html');
});