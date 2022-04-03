const input = process.argv[2];
const gammaRate = parseGammaRate(input);
const epsilonRate = gammaRate
    .split('')
    .map(digit => digit == '0' ? '1' : '0')
    .join('');
const decGamma = Number.parseInt(gammaRate, 2);
const decEpsilon = Number.parseInt(epsilonRate, 2);
console.log(decGamma * decEpsilon);


function parseGammaRate(input: string): string {
    const lines = input
        .split('\n')
        .map(line => line.split(''))

    const hash: {[digit: string]: string} = {}
    for(let line of lines) {
        // too tired to avoid side effects...refactor
        line.map((digit, index) => hash[index+1] += digit)
    }
    return getGamma(hash);

    // oh god why is undefined the first of each line? curse you javascript
    function getGamma(hash: {[index:string]: string}): string {
        let gammaRate: string = '';
        for(let entry in hash) {
            let line = hash[entry];
            const gammaBinaryBit = line.replace('undefined', '');
            const value = gammaBinaryBit
            .split('')
            .filter((bit: string) => bit =='0')
            .length > gammaBinaryBit.length / 2 
            ? 0 : 1;
            gammaRate += value;
        }
        
        return gammaRate;
    }
}

module.exports = { parseGammaRate }