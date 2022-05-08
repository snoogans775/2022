"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeFishyHashMap = exports.computeLazy = exports.parseArrayToHashMap = exports.parse = void 0;
function parse(input) {
    return input.split(',').map(function (str) { return parseInt(str); });
}
exports.parse = parse;
function parseArrayToHashMap(input) {
    var hashMap = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    };
    for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
        var fishy = input_1[_i];
        hashMap[fishy]++;
    }
    return hashMap;
}
exports.parseArrayToHashMap = parseArrayToHashMap;
function computeLazy(days, fishies) {
    var _loop_1 = function (i) {
        var newFishies = [];
        // console.log(`Day ${i} Start`, fishies)
        fishies = fishies.map(function (fish) {
            if (fish === 0) {
                newFishies.push(8);
                return 6;
            }
            else {
                return fish - 1;
            }
        });
        fishies = __spreadArray(__spreadArray([], fishies), newFishies);
    };
    // I had a fancy array.reduce here, but it felt like code golf
    for (var i = 0; i < days; i++) {
        _loop_1(i);
    }
    return fishies;
}
exports.computeLazy = computeLazy;
function computeFishyHashMap(days, inputHash) {
    var hash = inputHash;
    for (var i = 0; i < days; i++) {
        hash = update(hash);
    }
    return hash;
    function update(hash) {
        var newHash = {};
        var newFishies = hash[0];
        // Decrement each fishy counter
        for (var key in hash) {
            if (Number(key) === 0)
                continue;
            newHash[Number(key) - 1] = hash[Number(key)];
            newHash[8] = 0;
        }
        // Create new fishies
        newHash[8] += newFishies;
        newHash[6] += newFishies;
        return newHash;
    }
}
exports.computeFishyHashMap = computeFishyHashMap;
