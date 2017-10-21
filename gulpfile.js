//引入gulp模块
var gulp = require('gulp');
//调用gulp模块的插件一些方法
var $ = require('gulp-load-plugins')();
//启动服务时调用的地址
var open = require('open');
//定义App的属性文件路径
var app = {
    srcPath:'src/',
    devPath:'dev/',
    prdPath:'dist/'
};
// 拷贝浏览器要用的一些库文件
gulp.task('lib',function(){
    gulp.src(['bower_components/**/*.js'])
        .pipe(gulp.dest(app.devPath + 'lib'))
        .pipe(gulp.dest(app.prdPath + 'lib'))
        //通知浏览器刷新
        .pipe($.connect.reload());
});
// 拷贝浏览器要用的一些库文件
gulp.task('bootstrap',function(){
    gulp.src(['bower_components/bootstrap/**/*'])
        .pipe(gulp.dest(app.devPath + 'lib/bootstrap'))
        .pipe(gulp.dest(app.prdPath + 'lib/bootstrap'))
        //通知浏览器刷新
        .pipe($.connect.reload());
});
//html文件处理
gulp.task('html',function(){
   //读取html文件
   gulp.src(app.srcPath + '**/*.html')
   //拷贝html文件
   .pipe(gulp.dest(app.devPath))
   .pipe(gulp.dest(app.prdPath))
   .pipe($.connect.reload());
});
//拷贝json文件
gulp.task('json',function(){
    gulp.src(app.srcPath +'data/**/*.json')
    .pipe(gulp.dest(app.devPath + 'data'))
    .pipe(gulp.dest(app.prdPath + 'data'))
    .pipe($.connect.reload());
});
//css文件 压缩 编译 拷贝
gulp.task('less',function(){
   gulp.src(app.srcPath + 'style/**/*.less')
    //编译less文件
   .pipe($.less())
   //拷贝css文件到开发目录
   .pipe(gulp.dest(app.devPath + 'css'))
    //压缩css文件
   .pipe($.cssmin())
    //拷贝css文件到发布目录文件
   .pipe(gulp.dest(app.prdPath + 'css'))
   .pipe($.connect.reload());
});
//js文件处理 合并 压缩 拷贝
gulp.task('js',function(){
    gulp.src(app.srcPath + '**/*.js')
    //合并js文件
    .pipe($.concat('index.js'))
    //拷贝到开发目录文件
    .pipe(gulp.dest(app.devPath + 'js'))
    //压缩js文件
    .pipe($.uglify())
    //拷贝js文件到发布目录
    .pipe(gulp.dest(app.prdPath + 'js'))
    .pipe($.connect.reload());
});
//图片文件处理 压缩 拷贝
gulp.task('image',function(){
   gulp.src(app.srcPath + 'image/**/*')
   .pipe(gulp.dest(app.devPath + 'image'))
    //压缩图片
   .pipe($.imagemin())
   .pipe(gulp.dest(app.prdPath + 'image'))
   .pipe($.connect.reload());
});
gulp.task('bulid',['image','less','js','html','lib','json','bootstrap']);
//清除任务
gulp.task('clean',function(){
    gulp.src([app.prdPath,app.devPath])
    .pipe($.clean())
});
//定义服务
gulp.task('serve',['bulid'],function(){
   $.connect.server({

       root:[app.prdPath],
       livereload:true,
       port:3000
   });
   open('http://localhost:3000');
   //监听文件
   gulp.watch('bower_components/**/*',['lib']);
   gulp.watch(app.srcPath + '**/*.html',['html']);
   gulp.watch(app.srcPath + 'data/**/*.json',['json']);
   gulp.watch(app.srcPath + 'image/**/*',['image']);
   gulp.watch(app.srcPath + 'style/**/*.less',['less']);
   gulp.watch(app.srcPath + '**/*.js',['js']);
});
gulp.task('default',['serve']);
