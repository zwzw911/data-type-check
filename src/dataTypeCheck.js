'use strict'
const fs=require('fs')

//基本类型检测
const base= {
    isArray(obj) {
        //return obj && typeof obj === 'object' && Array == obj.constructor;
        // return obj instanceof Array
        return Array.isArray(obj)  //ES6引入的新方法
        // return typeof obj === 'object'  && obj!==null && Array == obj.constructor;
    },

    isObject(obj){
        //return obj && typeof obj === 'object' && Object == obj.constructor;
        //如果添加obj的话，和bool值&&后，变成obj，而不是bool了
        // ‘’ && false 等于 ''       false  && ''   等于 false
        //null && false 等于 null         false  && null   等于 false
        //undefined && false 等于 undefined           false  && undefined   等于 false
        //null也是object，所以需要排除
        return typeof obj === 'object' && obj!==null && Object == obj.constructor;
    },
    isString(value){
        return typeof value === 'string'
    },
    //检查是否有效日期; 返回boolean
    //只接受字符形式的日期
    isDate(date) {

        // let parsedDate=new Date(date)
        return this.isString(date) && new Date(date).toLocaleString() !==  'Invalid Date'
    },
    //不考虑字符串且只考虑有限数字
    isInt(value) {
        return Number.isInteger(value)
    },
    //数字只考虑有限数字
    isNumber(value) {
        return typeof value === 'number' && false===Number.isNaN(value) && true===Number.isFinite(value)
    },
    //如果不是整数，就是浮点。注意浮点会四舍五入，1.9999999999999999===2，从而变成int
    //只考虑有限数字
    isFloat(value){
        //this.Int已经排除了NaN
        return typeof value === 'number' && false === this.isInt(value) && true===Number.isFinite(value)
    },

    isBoolean(value){
        return (typeof value === 'boolean')
    }

}

//扩展检测
const extend={
    //变量是否已经赋值
    isSetValue(variant){
        return (undefined !== variant && null !== variant)
    },
    //已经赋值，赋的值是不是为空（string:空字符串；object:{},array:[]），数值:NaN/Infinity都认为不是空
    isEmpty(value) {
        //没有赋值，认为是空
        if (false===this.isSetValue(value)){
            return true
        }

        if(base.isString(value)){
            //"" === value  和 0 === value.length 的效果等价，取其中之一即可
            return (0 === value.length || "" === value.trim());
        }
        if(base.isObject(value)){
            return 0 === Object.keys(value).length
        }
        if(base.isArray(value)){
            return  0 === value.length
        }
        //其他类型（例如数值 NaN/Infinity），默认不空
        return false
    },
    //必须保证传入的变量是Number
    isNumberPositive(value) {
        // return base.isNumber(value)  && Math.sign(value) === 1
        return  Math.sign(value) === 1
    },
    //必须保证传入的变量是Number
    isNumberNegative(value) {
        return Math.sign(value) === -1
    },
    isFolder(path) {
        return base.isString(path) && fs.existsSync(path) && fs.statSync(path).isDirectory()
    },

    isFile(file) {
        return base.isString(file) && fs.existsSync(file) && fs.statSync(file).isFile()
    },

    isFileReadable(file){
        return this.isFile(file) && undefined===fs.accessSync(file,2)  //421 = rwx
    },
/*    isObjectId(value){
        return this.isString(value) && regex.objectId.test(value)
    }*/
}
module.exports={
    base,
    extend
}
