var gulp = require("gulp");
var rimraf = require("gulp-rimraf");
var less = require("gulp-less");
var minifyCss = require("gulp-minify-css");
var runSequence = require("run-sequence");
var connect = require("gulp-connect");

gulp.task("clean", function () {
	return gulp.src("./dist/**/*.*", { read: false })
		.pipe(rimraf({ force: true }));
});
gulp.task("less", function () {
	return gulp.src("./app/less/**/*.less")
		.pipe(less())
		.pipe(minifyCss())
		.pipe(gulp.dest("./dist/css"));
});
gulp.task("html", function () {
    return gulp.src("./app/**/*.html")
        .pipe(gulp.dest("./dist"));
});
gulp.task("assets", function () {
	return gulp.src("./app/assets/**/*.*")
        .pipe(gulp.dest("./dist"));
});
gulp.task("connect", function () {
	connect.server({
		root: "dist/",
		port: 8888
	});
});
gulp.task("watch", function () {
	gulp.watch("./app/less/**/*.less", ["less"]);
	gulp.watch("./app/**/*.html", ["html"]);
	gulp.watch("./app/assets/**/*.*", ["assets"]);
});
gulp.task("build", function () {
	runSequence(["clean"], ["less", "html", "assets"]);
})
gulp.task("default", ["build", "watch", "connect"]);