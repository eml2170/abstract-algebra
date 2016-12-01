var nameFunction = (function () { 
    var itoa = String.fromCharCode;
    var initCharCode = 'a'.charCodeAt(0);
    var i = 0;
    var ALPHA_LIMIT = 26;
    return function (f) {
        if (i >= ALPHA_LIMIT) {
            throw new Error();
        }
        return {name:itoa(initCharCode+i++),func:f};
    }
})();

var fact = function (n) {
    var p = 1;
    while (n > 0) {
        p*=n;
        n--;
    }
    return p;
};

var getSymmetricSet = function (n) {
    var s = [];
    var i = n;
    while (i > 0) {
        s.push(i);
        i--;
    }

};
