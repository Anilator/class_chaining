# Simple sugar to make classes in ES5 using syntax close to ES6
This tiny library has only 2 functions to use: `newClass()` and `extend()`

Simple usage:
```js
var Grandfather = newClass();
var Father = extend(Grandfather);

var g = new Grandfather();
var f = new Father();
```
`newClass()` creates and returnes a function to use with `new` keyword as a constructor.  
`extend()` creates and returns a constructor which prototype is inherited from parent's prototype.

***

Extended usage:
```js
var Grandfather = newClass(
    function Grandfather(n){ this.name = n }, // new class constructor
    function getName(){ return this.name });  // methods for prototype
    
var Father = extend(
    Grandfather,    // parent's constructor for inheritance
    function Father(n,j){ this.name = n; this.job = j; }, // new class constructor
    function getJob(){ return this.job });                // methods for prototype
    
var g = new Grandfather();
var f = new Father();
```
In this case `f` inherits methods from `Father.prototype` and `Grandfather.prototype`.  
`f` also gets it's own properties those were set by `Father()`.

***
# Installation
The source code is so small so you may paste it to the browser's console and play with it:
```js
function newClass(Constructor){
    Constructor = Constructor || function newClass(){};
    for (var i=1; i < arguments.length; i++) {
        var method = arguments[i];
        var methodName = getFunctionName(method);
        Constructor.prototype[methodName] = method;
    }
    return Constructor;
}
function extend(ParentConstructor, Constructor){
    function F(){}; // empty Constructor to avoid ParentConstructor running
    F.prototype = ParentConstructor.prototype;
    Constructor.prototype = new F();
    Constructor.prototype.constructor = Constructor;

    for (var i=2; i < arguments.length; i++) {
        var method = arguments[i];
        var methodName = getFunctionName(method);
        Constructor.prototype[methodName] = method;
    }
    return Constructor;
}
function getFunctionName(f){ return f.toString().match(/^function\s*([^\s(]+)/)[1]; }
```
