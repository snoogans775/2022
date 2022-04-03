const assert = require('assert')
const fs = require('fs')
const {parseGammaRate} = require('./main.js')

describe('Day 3', () => {
    describe('Part 1', () => {
        const input = fs.readFileSync('./3/input1.txt').toString();
        const gammaRate = parseGammaRate(input);
        return assert.equal(Number.parseInt(gammaRate, 2), 22);
    })
})