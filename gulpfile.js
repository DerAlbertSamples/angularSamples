var gulp = require('gulp');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var mainBowerFiles = require('main-bower-files');


var config = {
	'bower_components' : './bower_components',
	'siteDir' : './src',
	'appDir' : './src/app',
	'assetsDir' : './src/assets'
};

gulp.task('browser-sync', function(){
	browserSync({
		server : { baseDir : config.siteDir }
	})
});

gulp.task('browser-sync-css', function(){
	return gulp.src(config.siteDir + "/css/*.css")
		.pipe(browserSync.reload({stream:true}));
});
gulp.task('browser-sync-reload', function(){
	browserSync.reload();
});

gulp.task('preview', ['browser-sync'], function() {
	gulp.watch(config.siteDir + '/css/*.css', ['browser-sync-css']);
	gulp.watch(config.siteDir + '/**/*.html', ['browser-sync-reload']);
	gulp.watch(config.appDir + '/**/*.js', ['browser-sync-reload']);
});

gulp.task('inject-assets', function(){
	var site = config.siteDir;
	var target = gulp.src(site + "/index.html");
	var assetsStream = gulp.src([config.assetsDir + "/**/*"], {read:false});
	var appFiles = [
		config.siteDir + "/css/*.css",
		config.appDir + "/core/**/*.js",
		config.appDir + "/modules/**/*.js",
		config.appDir + "/*.js"
	];
	var appStream = gulp.src(appFiles, {read:false});

	return target
		.pipe(inject(assetsStream, { name: 'assets', ignorePath: site.substring(2), relative:false}))
		.pipe(inject(appStream, { name: 'app', ignorePath: site.substring(2), relative:false}))
		.pipe(gulp.dest(site));

});
gulp.task('clean-assets', function() {
	return gulp.src(config.assetsDir, {read:false})
		.pipe(clean())
});

gulp.task('copy-assets', ['clean-assets'], function() {
	return gulp.src(mainBowerFiles(),{
		'base': config.bower_components
	})
	.pipe(gulp.dest(config.assetsDir));
})
gulp.task('default', ["copy-assets"]
);