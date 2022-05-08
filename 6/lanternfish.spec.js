const assert = require('assert')
const fs = require('fs')
const { parse, parseArrayToHashMap, computeLazy, computeFishyHashMap } = require('./lanternfish.js')
const { isEqualTo } = require('../utils/array')

describe('Level 1', () => {
    it('parses an array of fish', () => {
        const input = '0,4,3,6'
        return assert.ok(parse(input) instanceof Array)
    })
    it('can correctly calculate fish spawns', () => {
        const input = '3,4,3,1,2'
        const expectedOutput = [0,1,0,5,6,7,8]
        const expectedNumberOfFishies = 26
        const computedFishies = computeLazy(18, parse(input))
        // Adding function as a property for fun
        // computedFishies.isEqualTo = isEqualTo
        // return assert.ok(computedFishies.isEqualTo(expectedOutput))
        return assert.equal(computedFishies.length, expectedNumberOfFishies)
    })
    it('can calculate fish spawns as a hash map', () => {
        const input = '3,4,3,1,2'
        const expectedNumberOfFishies = 15
        const computedFishyHashMap = computeFishyHashMap(11, parseArrayToHashMap(parse(input)))
        const computedSumOfFishies = Object.values(computedFishyHashMap).reduce((acc, curr) => {
            return acc += curr;
        })
        return assert.equal(computedSumOfFishies, expectedNumberOfFishies)
    })
    it('can calculate fish spawn from large inputs', () => {
        const input = fs.readFileSync('./6/input1.txt').toString()
        const fishyHashMap = parseArrayToHashMap(parse(input))
        const computedFishyHashMap = computeFishyHashMap(256, fishyHashMap)
        const sum = Object.values(computedFishyHashMap).reduce((acc, curr) => {
            return acc += curr;
        })
        console.log(sum)
        return assert.ok(typeof sum == 'number')
    })
})
