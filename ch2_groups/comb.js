var itoa = String.fromCharCode;
var initCharCode = 'a'.charCodeAt(0);
var i = 0;
var ALPHA_LIMIT = 26;
while (i<ALPHA_LIMIT) {
    console.log(i,itoa(initCharCode+i));
    i++;
}
