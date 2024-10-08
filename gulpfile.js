const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function compilaSass() {
  return gulp
    .src("sass/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}
gulp.task("sass", compilaSass);

function pluginsCSS() {
  return gulp
    .src("css/lib/*.css")
    .pipe(concat("plugins.css"))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());
}
gulp.task("plugincss", pluginsCSS);

function gulpJs() {
  return gulp
    .src("js/scripts/*.js")
    .pipe(concat("all.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./js"))
    .pipe(browserSync.stream());
}
gulp.task("alljs", gulpJs);

function pluginsJs() {
  return gulp
    .src(["./js/lib/aos.min.js", "./js/lib/swiper.min.js"])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("js/"))
    .pipe(browserSync.stream());
}
gulp.task("pluginjs", pluginsJs);

function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}
gulp.task("browser-sync", browser);

function watch() {
  gulp.watch("sass/*.scss", compilaSass);
  gulp.watch("css/lib/*.css", pluginsCSS);
  gulp.watch("*.html").on("change", browserSync.reload);
  gulp.watch("js/scripts/*.js", gulpJs);
  gulp.watch("js/lib/*.js", pluginsJs);
}
gulp.task("watch", watch);

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "browser-sync",
    "sass",
    "alljs",
    "pluginjs",
    "plugincss"
  )
);
