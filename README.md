# Simple sugar for ES5 classes using syntax close to ES6
This tiny library has only 2 functions to use: `newClass()` and `extend()`.  
The usage syntax is close to ES6, but there are differencies:
- properties initialized in constructor will not be inherited.  
inheritable properties may be set as properties of Parent's prototype: `parent.prototype.newProp = '...'`    
- no support for `super()` and another ES6 keywords.

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
    function Grandfather(n){ this.name = n }, // new class constructor. Important: this function's name will be the Class name
    function getName(){ return this.name });  // methods for prototype
    
var Father = extend(
    Grandfather,    // parent's constructor for inheritance
    function Father(n,j){ this.name = n; this.job = j; }, // new class constructor
    function getJob(){ return this.job });                // methods for prototype
    
var Son = extend(
    Father,
    function Son(n,h){ this.name=n; this.hobby = h; });
    
var g = new Grandfather('bob');
var f = new Father('jonh', 'developer');
var s = new Son('mike', 'arts');
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
    Constructor = Constructor || function newClass(){};
    
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
