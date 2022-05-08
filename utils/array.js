function isEqualTo(array) {
    const evaluatedArray = this.map((item, index) => {
        return array[index] === item
    })
    return !evaluatedArray.includes(false)
}

module.exports = { isEqualTo }