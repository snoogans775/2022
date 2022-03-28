


// const array: Array<number> = parseWindows(process.argv[2]);
// console.log(array);
function parseIncrements(string: string): Array<number> {
    const array = string.split('\n').map((n: string) => Number.parseInt(n));
    return array;
}

function parseWindows(string: string): Array<number> {
    function extractKeys(line: string) {
        const breakPoint = line.indexOf(' ');
        return line
            .slice(breakPoint, line.length)
            .split(' ').join('').split('')
    }
    function filterUnique(key: any, index: number, self: Array<string>): boolean {
        return self.indexOf(key) === index;
    }
    function extractLinesFromString(string: string): Array<any> {
        return string
            .split('\n')
            .map(line => line.split(' ').filter(char => char.length > 0))
            .map(line => {
                const keys = line.slice(1, line.length);
                return [line[0], keys];
            })
    }

    const keys: {[index: string]: number} = string
        .split('\n')
        .map(extractKeys)
        .flat()
        .filter(filterUnique)
        .reduce((acc, curr) => ({...acc, [curr]: 0}), {})
        
    const stringAsLines = extractLinesFromString(string);
    for( let line of stringAsLines) {
        for( let key of line[1]) {
            keys[key] += Number.parseInt(line[0])
        }
    }
    return Object.values(keys);
}

function computeWindows(list: Array<number>): Array<number> {
    let windows: Array<number> = [];
    for(let i = 0; i < list.length; i++) {
        if(!(list[i+1] || list[i+2])) continue;
        const sum: number = list[i] + list[i+1] + list[i+2];
        windows.push(sum);
    }
    return windows;
}

function countIncrements(list: Array<number>): number {
    return list.reduce((prev, curr, index, arr) => {
        return arr[index] < arr[index + 1] ? prev + 1 : prev;
    }, 0 as number)
}

module.exports = { countIncrements, computeWindows, parseWindows }