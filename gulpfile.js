const { src, dest, parallel, watch: gulpWatch } = require('gulp'),
      livereload = require('gulp-livereload'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps');

const config = {
  boostrap_sass_dir: './node_modules/bootstrap/scss',
  scss_src_path: './src/scss/**/*.scss',
  css_dist_path: './public/static/css',
};

function css() {

  const path = (typeof arguments[0] === 'string') ? arguments[0] : config.scss_src_path;

  return src(path)
    .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [config.boostrap_sass_dir]
      }))
      .pipe(rename({
        suffix: '.min'
      }))
    .pipe(sourcemaps.write('maps', {
      includeContent: true,
      sourceRoot: config.scss_src_path
    }))
    .pipe(dest(config.css_dist_path))
    .pipe(livereload());
}

function watch() {
  livereload.listen({start: true});
  return gulpWatch(config.scss_src_path)
    .on('change', (file) => {
      return css(file)
    });
}

exports.css = css;
exports.watch = watch;
exports.default = parallel(css, watch);
