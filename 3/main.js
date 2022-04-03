"use strict";
var input = process.argv[2];
var gammaRate = parseGammaRate(input);
var epsilonRate = gammaRate
    .split('')
    .map(function (digit) { return digit == '0' ? '1' : '0'; })
    .join('');
var decGamma = Number.parseInt(gammaRate, 2);
var decEpsilon = Number.parseInt(epsilonRate, 2);
console.log(decGamma * decEpsilon);
function parseGammaRate(input) {
    var lines = input
        .split('\n')
        .map(function (line) { return line.split(''); });
    var hash = {};
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        // too tired to avoid side effects...refactor
        line.map(function (digit, index) { return hash[index + 1] += digit; });
    }
    return getGamma(hash);
    // oh god why is undefined the first of each line? curse you javascript
    function getGamma(hash) {
        var gammaRate = '';
        for (var entry in hash) {
            var line = hash[entry];
            var gammaBinaryBit = line.replace('undefined', '');
            var value = gammaBinaryBit
                .split('')
                .filter(function (bit) { return bit == '0'; })
                .length > gammaBinaryBit.length / 2
                ? 0 : 1;
            gammaRate += value;
        }
        return gammaRate;
    }
}
module.exports = { parseGammaRate: parseGammaRate };
