const { src, dest, watch } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
/* const webp = require('gulp-webp');*/
const avif = require('gulp-avif'); 

function css(done) {
    src('src/scss/app.scss')
        .pipe(sass())
        /* .pipe(postcss([autoprefixer(), cssnano()])) */
        .pipe(dest('build/css'))

    done();
}


function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
}

function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
}

function dev() {
    watch('src/scss/**/*.scss', css);
}


exports.css = css;
exports.dev = dev;
exports.versionAvif = versionAvif;
