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
    var total_perms = fact(n);
    var ret = [];
    while (i > 0) {
        s.push(i);
        i--;
    }
    while (total_perms > 0) {
        ret.push(makePerm(s,total_perms));
        total_perms--;
    }
    return ret;
};
/*
1 [1,2,3]
2 [1,3,2]
3 [3,1,2]
4 [3,2,1]
5 [2,3,1]
6 [2,1,3]
*/
var makePerm = function (set,n) {
    set = set.slice();
    n--; // 0 align this
    var i = set.length-1;
    var swap;
    while (n>0) {
        if (i == 0) {
            i = set.length-1;
        }
        swap = set[i];
        set[i] = set[i-1];
        set[i-1] = swap;
        //console.log(swap);
        //console.log(set);
        i--;
        n--;
    }
    return function () {
        return set;
    }
};

var table = {};
var primary_table = {};
var t = [];
better_functions.forEach(function (f) {
    primary_table[f.func(init).toString()] =  f.name;
});
better_functions.forEach(function (f) {
    var r = [];
    better_functions.forEach(function(g) {
        var v = f.func(g.func(init));
        table[f.name+"x"+g.name] = v;
        r.push(primary_table[v.toString()]); 
    });
    t.push(r);
});

