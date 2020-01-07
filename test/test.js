/**
 * Created by 张伟 on 2020/1/5.
 */
'use strict'
/*被测函数*/
// const {base,extend}=require('../dist/dataTypeCheck-min')
const {base,extend}=require('../src/dataTypeCheck')
const assert=require('assert')
const os=require('os')

describe('all test', function() {
    if('Windows_NT'!==os.type()){
        console.error('test case not support run in linux')
        return
    }
    let expectResult=new Array(24)

    let  testData=new Array(24)
    testData[0]=1
    testData[1]=1.99999999999999999999999       //是否当成整数2处理
    testData[2]=1.9999999                       //是否当成浮点数
    testData[3]=-1
    testData[4]=-0.000000000000000000000001     //小于1的值会被用科学计数法表示，所以不会是整数
    testData[5]=true
    testData[6]='true'                          //是否当成boolean处理
    testData[7]=[]
    testData[8]='[]'                            //是否当成boolean处理
    testData[9]={}
    testData[10]='{}'
    testData[11]=null
    testData[12]='null'
    testData[13]=undefined
    testData[14]='undefined'
    testData[15]=NaN
    testData[16]='NaN'
    testData[17]=Infinity
    testData[18]='Infinity'
    testData[19]='2019-10-10'
    testData[20]='2019-13-13'                   //invalid date
    testData[21]=''
    testData[22]='C:/'
    testData[23]='C:/Windows/win.ini'

    describe('base', function() {
        //Rest all expected data to false
        beforeEach(function(){
            expectResult.fill(false)
        })

        it('base.isArray',function(){
            expectResult[7]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isArray(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })

        it('base.isObject',function(){
            expectResult[9]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isObject(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })

        it('base.isString',function(){
            expectResult[6]=true
            expectResult[8]=true
            expectResult[10]=true
            expectResult[12]=true
            expectResult[14]=true
            expectResult[16]=true
            expectResult[18]=true
            expectResult[19]=true
            expectResult[20]=true
            expectResult[21]=true
            expectResult[22]=true
            expectResult[23]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isString(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })

        it('base.isDate',function(){
            expectResult[19]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isDate(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })

        it('base.isInt',function(){
            expectResult[0]=true
            expectResult[1]=true
            expectResult[3]=true
            // expectResult[4]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isInt(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })

        it('base.isNumber',function(){
            expectResult[0]=true
            expectResult[1]=true
            expectResult[2]=true
            expectResult[3]=true
            expectResult[4]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isNumber(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })

        it('base.isFloat',function(){
            expectResult[2]=true
            expectResult[4]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isFloat(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })

        it('base.isBoolean',function(){
            expectResult[5]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isBoolean(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })
    })


    describe('extend', function() {
        //Rest all expected data to false
        beforeEach(function(){
            expectResult.fill(false)
        })

        it('extend.isSetValue',function(){
            expectResult.fill(true)
            expectResult[11]=false
            expectResult[13]=false
            let realResult=[]
            testData.map(x=>realResult.push(extend.isSetValue(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })
        it('extend.isEmpty',function(){
            expectResult[7]=true
            expectResult[9]=true
            expectResult[11]=true
            expectResult[13]=true
            expectResult[21]=true
            let realResult=[]
            testData.map(x=>realResult.push(extend.isEmpty(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })
        it('extend.isNumberNegative',function(){
            expectResult[3]=true
            expectResult[4]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isNumber(x) && extend.isNumberNegative(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })
        it('extend.isNumberPositive',function(){
            expectResult[0]=true
            expectResult[1]=true
            expectResult[2]=true
            let realResult=[]
            testData.map(x=>realResult.push(base.isNumber(x) && extend.isNumberPositive(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })
        it('extend.isFolder',function(){
            expectResult[22]=true
            let realResult=[]
            testData.map(x=>realResult.push(extend.isFolder(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })
        it('extend.isFile',function(){
            expectResult[23]=true
            let realResult=[]
            testData.map(x=>realResult.push(extend.isFile(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })
        it('base.isFileReadable',function(){
            expectResult[23]=true
            let realResult=[]
            testData.map(x=>realResult.push(extend.isFileReadable(x)))
            assert.deepStrictEqual(expectResult.join(' '),realResult.join(' '))
        })        
    })
})