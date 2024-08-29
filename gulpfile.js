const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

//sass.compiler = require('dart-sass');

async function scssTask(){
    return src('app/scss/style.scss', { sourcemaps : true})
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', {sourcemaps: '.'}));
}

async function jsTask(){
    return src('app/js/script.js', {sourcemaps: true})
        .pipe(babel({presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist', {sourcemaps: '.'}));
}

async function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            style: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
async function browserSyncReLoad(cb) {
    browsersync.reload();
    cb();
}

async function watchTask(){
    watch('*.html', browserSyncReLoad);
    watch(
        ['app/scss/**/*.scss', 'app/**/*.js'], 
        series(scssTask, jsTask, browserSyncReLoad)
    );
}

exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);