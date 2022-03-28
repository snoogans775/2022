const assert = require('assert')
const fetch = require('axios')
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
        const input = `199  A      
        200  A B    
        208  A B C  
        210    B C D
        200  E   C D
        207  E F   D
        240  E F G  
        269    F G H
        260      G H
        263        H`;
        it('should parse a list of increments by a set of windows', async function() {
            const data =fetch('https://adventofcode.com/2021/day/1/input')
                console.log(response)
                return assert.ok(response)
        })
    })
})