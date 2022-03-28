"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var data = fetch('https://adventofcode.com/2021/day/1/input');
console.log(data);
// const array: Array<number> = parseWindows(process.argv[2]);
// console.log(array);
function parseIncrements(string) {
    var array = string.split('\n').map(function (n) { return Number.parseInt(n); });
    return array;
}
function parseWindows(string) {
    function extractKeys(line) {
        var breakPoint = line.indexOf(' ');
        return line
            .slice(breakPoint, line.length)
            .split(' ').join('').split('');
    }
    function filterUnique(key, index, self) {
        return self.indexOf(key) === index;
    }
    function extractLinesFromString(string) {
        return string
            .split('\n')
            .map(function (line) { return line.split(' ').filter(function (char) { return char.length > 0; }); })
            .map(function (line) {
            var keys = line.slice(1, line.length);
            return [line[0], keys];
        });
    }
    var keys = string
        .split('\n')
        .map(extractKeys)
        .flat()
        .filter(filterUnique)
        .reduce(function (acc, curr) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[curr] = 0, _a)));
    }, {});
    var stringAsLines = extractLinesFromString(string);
    for (var _i = 0, stringAsLines_1 = stringAsLines; _i < stringAsLines_1.length; _i++) {
        var line = stringAsLines_1[_i];
        for (var _a = 0, _b = line[1]; _a < _b.length; _a++) {
            var key = _b[_a];
            keys[key] += Number.parseInt(line[0]);
        }
    }
    return Object.values(keys);
}
function computeWindows(list) {
    var windows = [];
    for (var i = 0; i < list.length; i++) {
        if (!(list[i + 1] || list[i + 2]))
            continue;
        var sum = list[i] + list[i + 1] + list[i + 2];
        windows.push(sum);
    }
    return windows;
}
function countIncrements(list) {
    return list.reduce(function (prev, curr, index, arr) {
        return arr[index] < arr[index + 1] ? prev + 1 : prev;
    }, 0);
}
module.exports = { countIncrements: countIncrements, computeWindows: computeWindows, parseWindows: parseWindows };
