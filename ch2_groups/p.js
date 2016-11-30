var f = function (a,b,c) {
    return [a,b,c];
};
var g = function (a,b,c) {
    return [a,c,b];
}
var h = function (a,b,c) {
    return [b,a,c];
}
var i = function (a,b,c) {
    return [b,c,a];
}
var j = function (a,b,c) {
    return [c,a,b];
};
var k = function (a,b,c) {
    return [c,b,a];
};

var helper = function (a,m) {
    return m(a[0],a[1],a[2]);
};

var dec = function (f) { return {name:f.name,func: function (a) { return helper(a,f); } }};

var funcs = [f,g,h,i,j,k];
var better_functions =  funcs.map(dec);

var init = ['a','b','c'];
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
console.log(t);

