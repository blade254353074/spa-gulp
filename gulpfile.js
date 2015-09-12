(function() {
    'use strict';
    // npm install gulp gulp-sass gulp-tmod gulp-minify-html gulp-minify-css gulp-autoprefixer gulp-jshint gulp-uglify gulp-imagemin imagemin-pngquant gulp-rename gulp-clean gulp-rev gulp-concat gulp-cache gulp-notify gulp-util gulp-plumber url gulp-browserify browser-sync proxy-middleware yargs gulp-if gulp-rev-collector gulp-sourcemaps jquery director --save-dev
    var gulp = require('gulp'),
        sass = require('gulp-sass'), // css预处理器 —— sass
        tmodjs = require('gulp-tmod'), // 前端html模板预处理器
        // 语法为artTemplate
        minifyhtml = require('gulp-minify-html'), // html压缩
        minifycss = require('gulp-minify-css'), // css压缩
        autoprefixer = require('gulp-autoprefixer'), // css兼容前缀处理
        jshint = require('gulp-jshint'), // js代码质量检测
        uglify = require('gulp-uglify'), // js压缩混淆工具
        imagemin = require('gulp-imagemin'), // 图片压缩工具
        pngquant = require('imagemin-pngquant'), // png图片无损压缩工具
        cache = require('gulp-cache'), // 缓存工具，用于图片
        rename = require('gulp-rename'), // 重命名工具
        clean = require('gulp-clean'), // 目录清理工具
        merge = require('merge2'), //
        postcss = require('gulp-postcss'), //
        csswring = require('csswring'), // 压缩css而不压缩sourcemap
        concat = require('gulp-concat'), // 多文件合并工具
        sourcemaps = require('gulp-sourcemaps'), // sourcemap工具
        rev = require('gulp-rev'), // 对资源文件添加MD5后缀
        revCollect = require('gulp-rev-collector'), // MD5路径引用替换工具
        notify = require('gulp-notify'), // 文字提醒工具
        util = require('gulp-util'), // gulp插件工具包
        plumber = require('gulp-plumber'), // 处理报错，让任务继续进行
        url = require('url'), // url处理插件
        browserify = require('gulp-browserify'), // browserify - js打包工具，
        // 让浏览器用上CommonJS规范
        browsersync = require('browser-sync'), // Live CSS Reload &
        // 浏览器同步
        proxy = require('proxy-middleware'), // http(s) proxy as connect middleware
        // 后端接口代理
        // 实现前后端分离开发
        // 前端action接口路径前需要加/api
        gulpif = require('gulp-if'), // 有条件的运行任务
        argv = require('yargs').argv; //

    console.log(argv);

    function errrHandler(e) {
        util.beep(); // 控制台发声,错误时beep一下
        util.log(e); // 打印获取的错误
    }

    var proxyOpts = url.parse('http://192.168.0.124'); // Take a URL string, and return an object.
    proxyOpts.route = '/api';
    var proxyOptsImg = url.parse('http://192.168.0.124/uploads');
    proxyOptsImg.route = '/uploads';

    var debug = true; // 开发模式

    var src = 'src/', // 开发路径
        dist = 'webapp/', // 服务根目录
        assets = dist + 'assets/'; // js, css, img资源输出目录

    // 入口页面为index
    var page = ['index', 'mobile'];
    var configList = []; // 配置配置数组
    var taskList = []; // 配置任务数组

    function configMake(page, src, dist, assets) {
        if (!src) {
            src = 'src/'; // 开发路径
        }
        if (!dist) {
            dist = 'dist/'; // 服务根目录
        }
        if (!assets) {
            assets = dist + 'assets/'; // js, css, img资源输出目录
        }
        for (var idx = 0; idx < page.length; idx++) {
            var pageName = page[idx];
            var taskCfg = {};
            var taskSrc = src + pageName + '/',
                taskAssets = assets + pageName + '/';
            taskCfg.tpl = {
                src: taskSrc + 'tpl/**/*.html',
                base: taskSrc + 'tpl',
                output: taskSrc + 'js'
            };
            taskCfg.html = {
                src: taskSrc + 'html/index.html',
                dest: dist + pageName
            };
            if (pageName === 'index') {
                taskCfg.html.dest = dist;
            }
            taskCfg.rev = {
                src: taskSrc + 'rev/**/*.json',
                css: taskSrc + 'rev/css',
                js: taskSrc + 'rev/js'
            };
            taskCfg.css = {
                src: taskSrc + 'css/**/*.css',
                sass: taskSrc + 'css/sass/**/*.scss',
                dest: taskAssets + 'css'
            };
            taskCfg.js = {
                index: taskSrc + 'js/index.js',
                src: taskSrc + 'js/**/*.js',
                dest: taskAssets + 'js'
            };
            taskCfg.imgs = {
                src: taskSrc + 'imgs/*',
                dest: taskAssets + 'imgs'
            };
            taskCfg.fonts = {
                src: taskSrc + 'fonts/**/*',
                dest: taskAssets + 'fonts'
            };
            if (pageName === 'index') {
                taskCfg.favicon = {
                    src: taskSrc + 'favicon/*.ico',
                    dest: dist
                };
            }
            configList[idx] = taskCfg; // 返回配置configList
        }
        return configList;
    }

    // 任务注册
    function taskMake(page, src, dist, assets) {
        if (!src) {
            src = 'src/'; // 开发路径
        }
        if (!dist) {
            dist = 'dist/'; // 服务根目录
        }
        if (!assets) {
            assets = dist + 'assets/'; // js, css, img资源输出目录
        }
        for (var idx = 0; idx < page.length; idx++) {
            (function(idx) {

                var pageName = page[idx];
                var _taskName = pageName + '-';
                var taskObj = {};

                var taskConfig = configList[idx]; // 获取当前索引的任务对象
                // for (var name in configList[idx]) {
                //     taskArr.push(_taskName + name);
                // }
                taskObj = {
                    tmodjs: _taskName + 'tmodjs',
                    html: _taskName + 'html',
                    css: _taskName + 'css',
                    css4rev: _taskName + 'css4rev',
                    js: _taskName + 'js',
                    js4rev: _taskName + 'js4rev',
                    rev: _taskName + 'rev',
                    imgs: _taskName + 'imgs',
                    fonts: _taskName + 'fonts'
                };
                if (pageName === 'index') {
                    taskObj.favicon = _taskName + 'favicon';
                }

                gulp.task(taskObj.tmodjs, function() {
                    return gulp.src(taskConfig.tpl.src)
                        .pipe(plumber({
                            errorHandler: errrHandler
                        }))
                        .pipe(tmodjs({
                            base: taskConfig.tpl.base, // html模板路径
                            escape: false, // 是否过滤 XSS。如果后台给出的
                            // 数据已经进行了 XSS 过滤，
                            // 就可以关闭模板的过滤以提升模板渲染效率
                            compress: true, // 是否压缩 HTML 多余空白字符
                            type: 'default', // 输出的模块类型，可选：default、cmd、amd、commonjs
                            combo: true, // 是否合并模板（仅针对于 default 类型的模块）
                            runtime: 'template.js', // 合并后的js文件名
                            minify: false, // js代码混淆 - 否
                            output: taskConfig.tpl.output // 输出template.js路径
                        }));
                });

                gulp.task(taskObj.html, function() {
                    return gulp.src(taskConfig.html.src)
                        .pipe(minifyhtml())
                        .pipe(gulp.dest(taskConfig.html.dest))
                        .pipe(notify({
                            message: 'html 压缩成功!'
                        }));
                });

                gulp.task(taskObj.css, function() {
                    return merge(
                            gulp.src(taskConfig.css.src)
                            .pipe(sourcemaps.init()),
                            gulp.src(taskConfig.css.sass)
                            .pipe(sourcemaps.init())
                            .pipe(sass.sync())
                            .pipe(sourcemaps.write())
                        )
                        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4')) // 添加兼容前缀
                        .pipe(postcss([csswring]))
                        .pipe(concat('style.min.css')) // css合并为style.min.css
                        //.pipe(minifycss())                  // 压缩处理成一行
                        .pipe(sourcemaps.write()) // 将sourcemap写入文件
                        .pipe(gulp.dest(taskConfig.css.dest)) // 输出文件到dest目录
                        .pipe(notify({
                            message: 'css 压缩成功!'
                        }));
                });

                gulp.task(taskObj.css4rev, function() {
                    return merge(
                            gulp.src(taskConfig.css.src),
                            gulp.src(taskConfig.css.sass)
                            .pipe(sass.sync())
                        )
                        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'ios 6', 'android 2.3.4')) // 添加兼容前缀
                        .pipe(concat('style.min.css')) // css合并为style.min.css
                        .pipe(minifycss()) // 压缩处理成一行
                        .pipe(gulp.dest(taskConfig.css.dest)) // 输出文件到dest目录
                        .pipe(rev()) // 文件名加MD5后缀
                        .pipe(gulp.dest(taskConfig.css.dest)) // 输出文件到dest目录
                        .pipe(rev.manifest()) // 生成一个rev-manifest.json
                        .pipe(gulp.dest(taskConfig.rev.css)) // 将 rev-manifest.json保存到rev目录内
                        .pipe(notify({
                            message: 'css 压缩成功!'
                        }));
                });

                gulp.task(taskObj.js, function() {
                    return gulp.src(taskConfig.js.index) // 获取src/js/index.js的文件流
                        .pipe(plumber({
                            errorHandler: errrHandler
                        }))
                        // .pipe(jshint('.jshintrc'))
                        // .pipe(jshint.reporter('default'))
                        .pipe(browserify({
                            insertGlobals: true,
                            debug: debug
                        })) // 将js文件打包为commonjs模块
                        .pipe(rename({
                            suffix: '.min'
                        }))
                        .pipe(gulpif(debug === false, uglify())) // 将js混淆并压缩
                        .pipe(gulp.dest(taskConfig.js.dest)) // 输出文件到dest目录
                        .pipe(notify({
                            message: 'js 压缩成功!'
                        }));
                });

                gulp.task(taskObj.js4rev, function() {
                    return gulp.src(taskConfig.js.index) // 获取src/js/index.js的文件流
                        .pipe(plumber({
                            errorHandler: errrHandler
                        }))
                        // .pipe(jshint('.jshintrc'))
                        // .pipe(jshint.reporter('default'))
                        .pipe(browserify({
                            insertGlobals: true,
                            debug: debug
                        })) // 将js文件打包为commonjs模块
                        .pipe(concat('index.min.js')) // js合并为index.min.js
                        .pipe(gulpif(debug === false, uglify())) // 将js混淆并压缩
                        .pipe(gulp.dest(taskConfig.js.dest)) // 输出文件到dest目录
                        .pipe(rev()) // 文件名加MD5后缀
                        .pipe(gulp.dest(taskConfig.js.dest)) // 输出文件到dest目录
                        .pipe(rev.manifest()) // 生成一个rev-manifest.json
                        .pipe(gulp.dest(taskConfig.rev.js)) // 将 rev-manifest.json保存到rev目录内
                        .pipe(notify({
                            message: 'js 压缩成功!'
                        }));
                });

                gulp.task(taskObj.rev, [taskObj.css4rev, taskObj.js4rev], function() {
                    return gulp.src([taskConfig.rev.src, taskConfig.html.src]) // 读取 rev-manifest.json 文件
                        // 和需要进行资源名替换的文件
                        .pipe(revCollect({
                            replaceReved: true
                        })) // 执行文件内css,js名的替换
                        .pipe(minifyhtml())
                        .pipe(gulp.dest(taskConfig.html.dest)); // 替换后的文件输出的目录
                });

                gulp.task(taskObj.imgs, function() {
                    return gulp.src(taskConfig.imgs.src)
                        .pipe(cache(imagemin({
                            svgoPlugins: [{
                                removeViewBox: false
                            }],
                            optimizationLevel: 3,
                            progressive: true,
                            interlaced: true,
                            use: [pngquant()]
                        })))
                        .pipe(gulp.dest(taskConfig.imgs.dest));
                });

                gulp.task(taskObj.fonts, function() {
                    return gulp.src(taskConfig.fonts.src)
                        .pipe(gulp.dest(taskConfig.fonts.dest));
                });

                if (pageName === 'index') {
                    var favCfg = taskConfig.favicon;
                    gulp.task(taskObj.favicon, function() {
                        return gulp.src(favCfg.src)
                            .pipe(cache(imagemin({
                                svgoPlugins: [{
                                    removeViewBox: false
                                }],
                                optimizationLevel: 3,
                                progressive: true,
                                interlaced: true,
                                use: [pngquant()]
                            })))
                            .pipe(gulp.dest(favCfg.dest));
                    });
                }

                taskList[idx] = taskObj;
            }(idx));
        }
        return taskList;
    }


    configMake(page, src, dist, assets);
    taskMake(page, src, dist, assets);

    gulp.task('clean', function() {
        cache.clearAll();
        return gulp.src(dist, {
                read: false
            })
            .pipe(clean())
            .pipe(notify({
                message: 'clean 执行完毕!'
            }));
    });

    var preWatch = [];
    var defaultBegin = [];
    var preBs = [];
    for (var idx = 0; idx < taskList.length; idx++) {
        var taskName = taskList[idx];
        preWatch.push(taskName.html);
        defaultBegin.push(taskName.tmodjs);
        preBs.push(taskName.rev, taskName.imgs, taskName.fonts);
        if (taskName.favicon) {
            preBs.push(taskName.favicon);
        }
    }

    gulp.task('bs', function() {
        browsersync({
            files: dist,
            open: true,
            server: {
                baseDir: dist,
                middleware: [proxy(proxyOpts), proxy(proxyOptsImg)]
            }
        });
    });

    gulp.task('browser-sync', preBs, function() {
        gulp.start('bs');
    });

    gulp.task('watch', preWatch, function() {
        for (var idx = 0; idx < configList.length; idx++) {
            (function(idx) {
                var cfg = configList[idx],
                    tlist = taskList[idx];
                gulp.watch(cfg.tpl.src, [tlist.tmodjs]);
                gulp.watch(cfg.html.src, [tlist.html]);
                gulp.watch([cfg.css.sass, cfg.css.src], [tlist.css]);
                gulp.watch(cfg.js.src, [tlist.js]);
                gulp.watch(cfg.imgs.src, [tlist.imgs]);
            }(idx));
        }
        gulp.start('bs');
    });

    gulp.task('default', ['clean'], function() {
        gulp.start(defaultBegin); // 先完成tmodjs编译
        gulp.start('browser-sync');
    });

}());
