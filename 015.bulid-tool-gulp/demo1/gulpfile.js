
var rf           = require('fs');   // node对象
var path         = require('path'); // node对象
var gulp         = require('gulp');

// 监听
var watch        = require('gulp-watch'); 
var livereload   = require('gulp-livereload');  // 自动监听文件变化并刷新页面

// 错误捕获
var plumber      = require('gulp-plumber');

var foreach      = require('gulp-foreach');

// css 文件处理相关插件
var sass         = require('gulp-sass');
var csscomb      = require('gulp-csscomb');  // 格式化css文件
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var cssbeautify  = require('gulp-cssbeautify');

// js处理相关
var through      = require('through2');
var concat       = require('gulp-concat');  // 合并
var jshint       = require('gulp-jshint');

// 图像处理
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');

// 错误，提示
var gutil = require('gulp-util');
var notify = require("gulp-notify");

// 补全css3属性前缀插件：浏览器版本设置
var autoprefixer_config = ['> 1%', 'Firefox >= 10', 'ie >= 9', 'iOS >= 4', 'Chrome >= 10'];

var paths = {
	css_start_url: 'css/**/*.{scss, less, sass}',
	css_end_url: 'css',
	js_start_url: ['js/**/!(_)*.js', '!js/{node_modules,bower_components}/**/*', '!js/core.js', '!js/main.js'],
	js_end_url: 'js'
}

// 错误处理
function handleError(err) {
    gutil.beep();
    gutil.log(err.toString());
    notify.onError("Error: <%= error.message %>")(err);
    this.emit('end');
}


gulp.task('css', function() {
	return gulp.src(paths.css_start_url)
		.pipe(plumber({
			errorHandler: handleError
		}))
		// .pipe(sass().on('error', sass.logError))
		.pipe(foreach(function(stream, file) {
			return stream.pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
		}))
		.pipe(autoprefixer({
			browsers: autoprefixer_config,
			cascade: false
		}))
		.pipe(csscomb())
		.pipe(minifycss({
			aggressiveMerging: false,
            advanced: false,
            compatibility: 'ie7',
            keepBreaks: true
		}))
		.pipe(cssbeautify({
			autosemicolon: true
		}))
		.pipe(gulp.dest(paths.css_end_url))
		.pipe(livereload({
			quiet: true
		}))
		.pipe(notify({
			onLast: true,
			message: 'Browser reload for css!'
		}));
});

gulp.task('js', function() {
	return gulp.src(paths.js_start_url)
	.pipe(plumber({
		errorHandler: handleError
	}))
	.pipe(concat('core.js'))
	.pipe(gulp.dest(paths.js_end_url))
	.pipe(livereload({
		quiet: true
	}))
	.pipe(notify({
		onLast: true,
		message: 'Js concat success!'
	}))
})

gulp.task('jsconcat', function() {
	gulp.src(['./js/libs/require.js', './js/libs/config.js', 'js/libs/**/*', '!js/libs/core.js'])
		.pipe(concat('core1.js'))
		.pipe(gulp.dest('./js/'));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(paths.css_start_url, ['css']);
})

// 默认任务
gulp.task('default', ['watch']);