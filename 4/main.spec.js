const assert = require('assert')
const fs = require('fs')
const {parseSequence, parseBoards, evaluateResults} = require('./main.js')

describe('Day 4', () => {
    describe('Part 1', () => {
        const input = fs.readFileSync('./4/input1.txt').toString()
        it('parses sequence from input', () => {
            const result = parseSequence(input);
            assert.ok(result instanceof Array);
        })
        it('parses boards from input', () => {
            const boards = parseBoards(input);
            assert.ok( boards[0] instanceof Array);
        })
        it('evaluates the winning board', () => {
            const boards = parseBoards(input);
            const sequence = parseSequence(input);
            const results = evaluateResults(sequence, boards);
            assert.ok(results instanceof Array);
        })
        it('evaluates the last board to win', () => {
            const boards = parseBoards(input);
            const sequence = parseSequence(input);
            const results = evaluateResults(sequence, boards); 
            assert.ok(results instanceof Array);
        })
    })
})