# data-type-check
data-type-check includes some basic data type function to simplify coding  

## install
npm instsall data-type-check  

## usage
data-type-check include 2 parts: base and extend. base provide basic js data type check and extend provide some extend data type check  

`const {base, extend}=require('dataTypeCheck')`    
`base.isArray(value)`  
check value is regular array or not. Use ES6 internal function Array.isArray(). return boolean(object return false).  
`base.isObject(value)`  
check value is regular object or not, return boolean(Null return false).  
`base.isString(value)`  
check value is string or not, return boolean  
`base.isDate(value)`  
check **string** value can be convert to date or not, return boolean  
`base.isInt(value)`  
check value is integer or not. Use ES6 internal function Number.isInteger(). return boolean.   
`base.isFloat(value)`  
check value is float or not. return boolean.  
`base.isBoolean(value)`  
check value is boolean or not. return boolean.   

`extend.isSetValue(value)` 
check value is undefined/null or not. return boolean.   
`extend.isEmpty(value)` 
check value: if is undefined/null, return true; if array with zero element([]), return true; if string "", return true;if object with zero key({}), return true; other return false.   
`extend.isNumberPositive(value)`  
check value is positive, value must be number. return boolean.  
`extend.isNumberNegative(value)`  
check value is negative, value must be number. return boolean.  
`extend.isFolder(value)`  
check value is folder. return boolean.  
`extend.isFile(value)`  
check value is file. return boolean.  
`extend.isFileReadable(value)`  
check value is file and readable. return boolean.  
