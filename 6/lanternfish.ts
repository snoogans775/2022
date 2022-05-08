interface fishyHashMap {[key: number]: number}

function parse(input: string): Array<number> {
    return input.split(',').map(str => parseInt(str));
}
function parseArrayToHashMap(input: Array<number>): fishyHashMap {
    const hashMap: fishyHashMap = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0
    }
    for(let fishy of input) {
        hashMap[fishy]++
    }
    return hashMap;
}

function computeLazy(days: number, fishies: Array<number>): Array<number> {
    // I had a fancy array.reduce here, but it felt like code golf
    for(let i = 0; i < days; i++) {
        let newFishies: Array<number> = []
        // console.log(`Day ${i} Start`, fishies)
        fishies = fishies.map(fish => {
            if(fish === 0) {
                newFishies.push(8)
                return 6
            } else {
                return fish - 1
            }
        })
        fishies = [...fishies, ...newFishies]
        // console.log(`Day ${i} End`, fishies)
    }
    return fishies
}

function computeFishyHashMap(days: number, inputHash: fishyHashMap): fishyHashMap {
    let hash: fishyHashMap = inputHash
    for(let i = 0; i < days; i++) {
        hash = update(hash)
    }
    return hash;

    function update(hash: fishyHashMap): fishyHashMap {
        const newHash: fishyHashMap = {}
        const newFishies = hash[0]
        
        // Decrement each fishy counter
        for(let key in hash) {
            if(Number(key) === 0) continue
            newHash[Number(key) - 1] = hash[Number(key)] 
            newHash[8] = 0
        }
        // Create new fishies
        newHash[8] += newFishies
        newHash[6] += newFishies
        return newHash
    }
}

export {
    parse,
    parseArrayToHashMap,
    computeLazy,
    computeFishyHashMap
}