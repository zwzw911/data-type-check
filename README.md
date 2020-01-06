# data-type-check
data-type-check includes some basic data type function to simplify coding  

## install
npm instsall dataTypeCheck  

## usage
data-type-check include 2 parts: base and extend  
base provide basic js data type check and extend provide some extend data type check  

`const {base, extend}=require('dataTypeCheck')`    
`base.isArray(value)`: check value is regular array or not, return boolean(object return false).  
`base.isObject(value)`: check value is regular object or not, return boolean(Null return false).  
`base.isString(value)`: check value is string or not, return boolean  
