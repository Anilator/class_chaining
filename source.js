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
