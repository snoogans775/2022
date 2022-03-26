"use strict";
var array = process.argv[2].split('\n').map(function (n) { return Number.parseInt(n); });
var result = countIncrements(array);
console.log(result);
function countIncrements(list) {
    return list.reduce(function (prev, curr, index, arr) {
        return arr[index] < arr[index + 1] ? prev + 1 : prev;
    }, 0);
}
module.exports = { countIncrements: countIncrements };
