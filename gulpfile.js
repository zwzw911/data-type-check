/**
 * Created by 张伟 on 2020/1/3.
 */
'use strict'
//1. npm install --global gulp-cli
//2. npm install gulp gulp-minify --save-dev

const gulp = require('gulp');
const minify = require('gulp-minify');

//使用async，防止返回流，出现报错
async function compress(){
    gulp.src(['./src/*.js'])
        .pipe(minify({noSource:true}))
        .pipe(gulp.dest('dist'))
}

exports.default=compress