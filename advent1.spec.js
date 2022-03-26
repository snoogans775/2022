const assert = require('assert')
const {countIncrements} = require('./advent1.js')

describe('advent1', () => {
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
    describe('hoistingTest', () => {
        it('should count the number of incremented steps', () => {
            return assert.equal(countIncrements(input), 7)
        })
    })
})