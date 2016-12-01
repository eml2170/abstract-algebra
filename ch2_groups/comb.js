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
    var ii = n;
    var i = 1;
    var total_perms = fact(n);
    var ret = [];
    while (i <= ii) {
        s.push(i);
        i++;
    }
    i=1;
    while (i<=total_perms) {
        ret.push(makePerm(s,i));
        i++;
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
    set = set.slice(); // clone this set
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
        i--;
        n--;
    }
    return nameFunction(function (ns) {
        if (!ns) { return set; }
        var clone_ns = ns.slice(); // clone this set
        var i,ii;
        // [2,1,3] = set
        // [1,2,3] = ns
        // [2,1,3] = clone_ns
        for (i=0,ii=set.length;i<ii;i++) {
            var index = set[i]-1;
            clone_ns[i] = ns[index];
        }
        return clone_ns;
    });
};

var computeTable = function (n) {
    var better_functions = getSymmetricSet(n);

    var table = {};
    var primary_table = {};
    var t = [];
    var init = better_functions[0].func(); // get an initial set
    better_functions.forEach(function (f) {
        primary_table[f.func().toString()] =  f.name;
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
    console.log(primary_table);
    console.log(table);
    return t;
};

console.log(computeTable(3));

