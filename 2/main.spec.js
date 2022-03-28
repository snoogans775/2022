const assert = require('assert')
const fs = require('fs')
const {parse, execute} = require('./main.js')

describe('Day 2', () => {
    describe('Part 1', () => {
        const input = fs.readFileSync('./2/input1.txt').toString()
        it('parses commands from input', () => {
            return assert.ok(parse(input))
        })
        it('correctly calculates distance', () => {
            const commands = parse(input)
            const result = execute(commands)
            return assert.equal(result, 150)
        })
    })
})