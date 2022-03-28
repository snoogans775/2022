const assert = require('assert')
const fs = require('fs')
const { countIncrements, computeWindows, parseWindows } = require('./main.js')

describe('Day One', () => {
    describe('Part 1', () => {
        const input = [199,
            200,
            208,
            210,
            200,
            207,
            240,
            269,
            260,
            263]
        it('should count the number of incremented steps', () => {
            return assert.equal(countIncrements(input), 7)
        })
    })
    describe('Part 2', () => {
        let input = '';
        fs.readFile('./1/part2input.txt', 'UTF-8', (err, data) => {
            if(err) throw new Error(err);
            input = data;
        })
        it('should parse a list of increments by a set of windows', () => {
           const parsed = parseWindows(input);
           return assert.equal(countIncrements(parsed), 5);
        })
    })
})