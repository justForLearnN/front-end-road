'use strict';

var rf = require("fs");
var path = require("path");
var through = require("through2");
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var csscomb = require('gulp-csscomb');
var cssbeautify = require('gulp-cssbeautify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var header = require('gulp-header');
var footer = require('gulp-footer');
var livereload = require('gulp-livereload');
var stylish = require('jshint-stylish');
var watch = require('gulp-watch');
var imgcache = require('gulp-imgcache');
var notify = require("gulp-notify");
var foreach = require("gulp-foreach");
var amdOptimize = require('amd-optimize');
var sass = require("gulp-sass");
var hash = require('gulp-hash');
var sort = require('gulp-sort');
var replace = require('gulp-replace');
var rsync = require('gulp-rsync');

// 图像处理
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');

//错误捕获
var plumber = require('gulp-plumber');

var pkg = require('./package.json');
var cdnHost = pkg.cdn.host;
var cdnPath = '/' + pkg.cdn.path.split('/').filter(function(name){
    return !!name;
}).join('/') || '/activity-demo';
var cdnUrl = cdnHost + cdnPath;

// 设置相关路径
var paths = {
    css: 'css',
    js: 'js',
    img: 'images',
    build: 'build',
    configFile: './config.static.json',
    corejs: 'js/core.js',
    other: [ /* 其它需要拷贝的文件 */ ]
};

var oldStaticConfig
try {
    oldStaticConfig = require(paths.configFile) || {};
} catch (e) {
    oldStaticConfig = {};
}

var comment = "/*!\n * " + ['@author: ' + pkg.author].join("\n * ") + "\n */\n\n";
var autoprefixer_config = ['> 1%', 'Firefox >= 10', 'ie >= 9', 'iOS >= 4', 'Chrome >= 10'];
var configjs = paths.js + '/libs/config.js';
var requirejsConfigString = rf.readFileSync(configjs, 'utf-8').replace(/[\t\r\s\n\s]/g, '');
var mathPaths = requirejsConfigString.match(/config=({.+})if\(/);
var requirejsConfig = eval('(' + mathPaths[1] + ')');
var requirejsConfigCorejs = eval('(' + mathPaths[1] + ')');
//requirejsConfigCorejs.preserveFiles=true;
delete requirejsConfigCorejs.exclude; //core.js压缩去掉exclude参数

//corejs paths
var corejsPaths = [paths.js + '/libs/require.js', configjs, paths.js + '/libs/core.js'];

function handleError(err) {
    gutil.beep();
    gutil.log(err.toString());
    notify.onError("Error: <%= error.message %>")(err);
    this.emit('end');
}

/*!
 * @desc 合并多个文件流只执行最后一个
 * @author qiqiboy
 */
function one(callback) {
    var last;
    return through.obj(function(file, enc, cb) {
        last = file;
        cb();
    }, function(cb) {
        this.push(last);
        callback && callback();
        cb();
    });
}

function all() {
    var files = [];
    return through.obj(function(file, enc, cb) {
        files.push(file);
        cb();
    }, function(cb) {
        var self = this;
        files.forEach(function(file) {
            self.push(file);
        });
        cb();
    });
}

gulp.task('buildClean', function(cb) {
    del([paths.build + '/**'], cb); //清理目录下相关文件
});

gulp.task('buildHtml', function() {
    return gulp.src(['**/!(_)*.{html,php}', '!{build,'+ paths.js +', '+ paths.css +', '+ paths.img +', node_modules}/**'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(gulp.dest(paths.build))
        .pipe(notify({
            onLast: true,
            message: "buld html complete!"
        }));
});

gulp.task('buildCss', function() {
    return gulp.src([paths.css + '/**/!(_)*.{less,scss,sass}'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
        }))
        .pipe(autoprefixer({
            cascade: false,
            browsers: autoprefixer_config
        }))
        .pipe(csscomb())
        .pipe(minifycss({
            compatibility: 'ie7',
            keepSpecialComments: 0,
            keepBreaks: false
        }))
        .pipe(header(comment))
        .pipe(gulp.dest(paths.build + '/' + paths.css))
        .pipe(notify({
            onLast: true,
            message: "build css complete!"
        }));
});

gulp.task('buildJs', function() {
    gulp.src(paths.corejs)
        .pipe(uglify())
        .pipe(header('window.DEV=false;'))
        .pipe(header(comment))
        .pipe(gulp.dest(paths.build + '/' + path.dirname(paths.corejs)));

    return gulp.src([paths.js + '/**/!(_)*.js', '!' + paths.js + '/{libs,modules,app,node_modules,components,bower_components}/**/*', '!' + paths.js + '/core.js'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(amdOptimize(file.relative.replace(/\.js$/i, ''), requirejsConfig))
                .pipe(concat(file.relative));
        }))
        .pipe(uglify())
        .pipe(header(comment))
        .pipe(gulp.dest(paths.build + '/' + paths.js))
        .pipe(notify({
            onLast: true,
            message: "build js complete!"
        }));
});

gulp.task('buildImage', function() {
    return gulp.src(paths.img + '/**/!(_)*.{jpg,jpeg,png,gif,svg,webp}')
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.build + '/' + paths.img))
        .pipe(notify({
            onLast: true,
            message: "build images complete!"
        }));
});

gulp.task('buildOther', function() {
    return gulp.src(paths.other)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(gulp.dest(paths.build));
});

gulp.task('html', function() {
    return gulp.src(['**/!(_)*.{html,php}', '!{build,'+ paths.js +', '+ paths.css +', '+ paths.img +', node_modules}/**'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(one())
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for html"
        }));
});

gulp.task('image', function() {
    var src = paths.img + '/**/!(_)*.{jpg,jpeg,png,gif,svg,webp}';
    return gulp.src(src)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(one())
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for image"
        }));
});

gulp.task('js', function() {
    var src = paths.js + '/**/!(_)*.js';
    return gulp.src([src, '!' + paths.js + '/{libs,node_modules,bower_components}/**/*', '!' + paths.js + '/core.js'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(one())
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for js"
        }));
});

gulp.task('corejs', function() {
    var name = path.basename(paths.corejs, '.js');

    return gulp.src(corejsPaths)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            if (file.relative != 'require.js' && file.relative != 'config.js') {
                return stream
                    .pipe(amdOptimize(file.relative.replace(/\.js/g, ''), requirejsConfigCorejs))
                    .pipe(concat(file.relative));
            }
            return stream;
        }))
        .pipe(concat(paths.corejs))
        .pipe(footer('require([\'' + name + '\']);'))
        .pipe(gulp.dest('./'))
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for corejs"
        }));
});

gulp.task('css', function() {
    var src = paths.css + '/**/!(_)*.{less,sass,scss}';
    return gulp.src(src)
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
        }))
        .pipe(autoprefixer({
            cascade: false,
            browsers: autoprefixer_config
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
        .pipe(gulp.dest(paths.css))
        .pipe(livereload({
            quiet: true
        }))
        .pipe(notify({
            onLast: true,
            message: "browser reload for css"
        }));
});


gulp.task('hash', function() {
    var staticConfig = {};
    var fileCount = 0;
    var requirePaths = {};

    return gulp.src([paths.build + '/**/*.{html,js,css,png,jpg,jpeg,gif,webp,svg}', '!' + paths.build + '/dist/**'])
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(sort(function(file1, file2) {
            var extname1 = path.extname(file1.relative),
                extname2 = path.extname(file2.relative);
            if (extname1 == '.html') {
                return 1;
            }

            if (extname1 == '.css') {
                return extname2 == '.html' ? -1 : 1;
            }

            if (file1.relative == paths.corejs) {
                return extname2 == '.html' ? -1 : 1;
            }

            if (file2.relative == paths.corejs) {
                return -1;
            }

            if (extname2 == '.css') {
                return -1;
            }

            return file1.relative <= file2.relative ? -1 : 1;
        }))
        .pipe(foreach(function(stream, file) {
            var relative = file.relative;
            var oldPath = file.path;
            var extname = path.extname(relative);
            var isCorejs = relative == paths.corejs;

            if (isCorejs) {
                stream = stream.pipe(header('window.SCRIPT_PATHS=' + JSON.stringify(requirePaths) + ';\n\n'));
            }

            return extname ? stream
                .pipe(extname == '.css' ? replace(/(?:src=|url\(\s*)['"]?([^'"\)(\?|#)]+)['"]?\s*\)?/gm, function(match, src) {
                    var imgPath = path.relative('../', path.normalize(src));
                    if (staticConfig[imgPath]) {
                        return match.replace(src, cdnUrl + '/' + staticConfig[imgPath]);
                    }
                    return match;
                }) : extname == '.html' ? replace(/<(?:link|img|script)[^>]*?(?:href|src)\s*=\s*['"]?([^'"{}>\)(\?|#)]+)['"]?/gm, function(match, src) {
                    var filePath = path.relative('./', path.normalize(src));
                    if (staticConfig[filePath]) {
                        return match.replace(src, cdnUrl + '/' + staticConfig[filePath]);
                    }
                    return match;
                }) : gutil.noop())
                .pipe(extname == '.html' ? gutil.noop() : hash({
                    template: '<%= name %>.<%= hash %><%= ext %>'
                }))
                .pipe(extname == '.html' ? gulp.dest(paths.build) : one(function() {
                    staticConfig[relative] = file.relative;
                    if (extname == '.js' && !isCorejs) {
                        requirePaths[path.relative(paths.js, relative).replace(/\.js$/gi, '')] = cdnUrl + '/' + file.relative.replace(/\.js$/gi, '');
                    }
                    //del(oldPath);
                })) : stream;
        }))
        .pipe(gulp.dest(paths.build + '/dist'))
        .pipe(one(function() {
            var staticConfigSort = {};
            Object.keys(staticConfig).sort().forEach(function(key) {
                staticConfigSort[key] = staticConfig[key];
            });
            rf.writeFileSync(paths.build + '/config.static.json', JSON.stringify(staticConfigSort, null, '\t'), 'utf-8');
        }))
        .pipe(notify({
            onLast: true,
            message: "静态资源打包处理完毕！"
        }));
});

gulp.task('cdn', function() {
    var failNum = 0;
    var exitsNum = 0;
    var uploadNum = 0;
    var files = [];

    return gulp.src(paths.build + '/dist/**/*.{js,css,png,jpg,jpeg,gif,webp,svg}')
        .pipe(plumber({
            errorHandler: handleError
        }))
        .pipe(through.obj(function(file, enc, cb) {
            var dirname = path.dirname(file.relative),
                extname = path.extname(file.relative),
                basename = path.basename(file.relative, extname);

            if (file._contents) {
                if (oldStaticConfig[dirname + '/' + basename.split('.').slice(0, -1).join('.') + extname] == file.relative) {
                    exitsNum++;
                    console.log(gutil.colors.green('已存在：' + file.relative));
                } else {
                    files.push(file);
                }
            }

            cb();
        }, function(cb) {
            var self = this;
            var delay = 0;

            if (files.length) {
                files.forEach(function(file) {
                    var error;
                    setTimeout(function() {
                        gulp.src(file.path)
                            .pipe(plumber({
                                errorHandler: function(err) {
                                    failNum++;
                                    error = true;
                                    gutil.beep();
                                    console.log(gutil.colors.red('上传失败(' + err.message + ')：' + file.relative));
                                    this.emit('end');
                                }
                            }))
                            .pipe(rsync({
                                root: paths.build + '/dist',
                                silent: true,
                                hostname: 'static',
                                compress: true,
                                destination: '/data0/webservice/static' + cdnPath
                            }))
                            .pipe(one(function() {
                                if (!error) {
                                    uploadNum++;
                                    console.log(gutil.colors.magenta('已上传：' + file.relative));
                                }

                                if (uploadNum + failNum == files.length) {
                                    showResult(cb);
                                }
                            }));
                    }, delay += 100);
                    self.push(file);
                });
            } else {
                showResult(cb);
            }
        }));

    function showResult(cb) {
        console.log(gutil.colors[failNum ? 'red' : 'cyan']('+++++++++++++++++++++++++++++++\n 文件上传完毕(' + gutil.colors.blue(cdnPath) + ') \n ' + gutil.colors.magenta('成功：' + uploadNum) + ' \n ' + gutil.colors.red('失败:' + failNum) + ' \n ' + gutil.colors.green('重复：' + exitsNum) + '\n+++++++++++++++++++++++++++++++'));
        if (!failNum) {
            rf.writeFileSync(paths.configFile, rf.readFileSync(paths.build + '/config.static.json'), 'utf-8');
            del([paths.build + '/dist', paths.build + '/config.static.json'], function(){
                console.log(gutil.colors.blue("配置文件已经更新: " + path.resolve(paths.configFile)));
                cb();
            });
        } else {
            console.log(gutil.colors.red("文件未全部上传，请单独运行") + gutil.colors.green(' gulp cdn ') + gutil.colors.red("命令!"));
            cb();
        }
    }
});

gulp.task('watch', function() { //监听文件改变触发相应任务
    livereload.listen();

    gulp.watch(['**/*.{html,php}', '!{build,'+ paths.js +', '+ paths.css +', '+ paths.img +'}/**/*.{html,php}'], ['html']);
    gulp.watch([paths.js + '/**/*.js', '!' + paths.js + '/core.js'].concat(corejsPaths.map(function(path) {
        return '!' + path;
    })), ['js']);
    gulp.watch(corejsPaths.concat(Object.keys(requirejsConfig.paths).map(function(name) {
        return paths.js + '/' + requirejsConfig.paths[name] + '.js';
    })), ['corejs']);
    gulp.watch(paths.css + '/**/*.{less,sass,scss}', ['css']);
    gulp.watch(paths.img + '/**/*.{jpg,jpeg,png,gif,svg,webp}', ['image']);
});

gulp.task('default', ['watch']);
gulp.task('build', ['buildClean'], function() {
    gulp.start('buildHtml', 'buildCss', 'buildImage', 'buildJs', 'buildOther');
});
