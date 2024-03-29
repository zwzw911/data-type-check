'use strict'
const fs=require('fs')
const moment=require("moment")
//基本类型检测
const base= {
    isArray(obj) {
        return Array.isArray(obj)  //ES6引入的新方法
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
        return moment(date,['YYYY-MM-DD',moment.ISO_8601],true).isValid()
    },
    isDateTime(date){
        // console.log(date)
        return moment(date,['YYYY-MM-DD HH:mm:ss',moment.ISO_8601],true).isValid()
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
    },

    isRegExp(value){
        return Object.prototype.toString.call(value).includes('RegExp')
    },
    /** 从客户端输入的日期，必须是字符形式，以便用正则进行过滤。因为moment当前会接受整数（包括字符形式的整数），转换成合法的日期。
     * */
    isStringDate(value,reg=/^(?:19|20)\d{2}-(?:0\d|1[1-2])-(?:0\d|[1-2]\d|3[0-1])/){
        //首先判断是否为字符
        if(false===this.isString(value)){
            return false
        }
        //然后判断是否正确匹配（大致匹配）
        if(false===reg.test(value)){
            return false
        }
        //最后用moment判断是否合法
        return moment(value).isValid()
    },
    isStringDateTime(value,reg=/^(?:19|20)\d{2}-(?:0\d|1[1-2])-(?:0\d|[1-2]\d|3[0-1])(?:\s|T)(?:[0|1]\d|2[0-3]):[0-5]\d:[0-5]\d(\.\d{3})?(?:\s*|Z)?$/){
        //首先判断是否为字符
        if(false===this.isString(value)){
            return false
        }
        value=value.trim()
        //然后判断是否正确匹配（大致匹配）
        if(false===reg.test(value)){
            return false
        }
        //最后用moment判断是否合法
        return moment(value).isValid()
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
// const {log}=console
const mysql={
    /*
    *   @value:
    *   @unsign：是否为无符号，默认是无符号
    *   return; boolean
    *   */
    isTinyInt(value,unsign=true){
        if(false===base.isInt(value)){
            return false
        }
        if(true===unsign){
            return value>=0 && value<=255
        }else{
            return value>=-128 && value<=127
        }
    },
    isSmallInt(value,unsign=true){
        if(false===base.isInt(value)){
            return false
        }
        if(true===unsign){
            return value>=0 && value<=65535
        }else{
            return value>=-32768 && value<=32767
        }
    },
    isMediumInt(value,unsign=true){
        if(false===base.isInt(value)){
            return false
        }
        if(true===unsign){
            return value>=0 && value<=16777215
        }else{
            return value>=-8388608 && value<=8388607
        }
    },
    isInt(value,unsign=true){
        if(false===base.isInt(value)){
            return false
        }
        if(true===unsign){
            return value>=0 && value<=4294967295
        }else{
            return value>=-2147483648 && value<=2147483647
        }
    },
    //JS中，bigInt使用n表示。
    //为了避免混淆，mysql不使用bigint
/*    isBigInt(value,unsign=true){
        if(false===base.isInt(value)){
            return false
        }
        if(true===unsign){
            return value>=0 && value<=18446744073709551615n
        }else{
            return value>=-9223372036854775808n && value<=9223372036854775807n
        }
    },*/
}
module.exports={
    base,
    extend,
    mysql,
}
