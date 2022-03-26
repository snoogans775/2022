const array = process.argv[2].split('\n').map((n: string) => Number.parseInt(n));
const result = countIncrements(array);
console.log(result);

function countIncrements(list: Array<number>): number {
    return list.reduce((prev, curr, index, arr) => {
        return arr[index] < arr[index + 1] ? prev + 1 : prev;
    }, 0 as number)
}

module.exports = { countIncrements }