interface Tile {
    value: number,
    active: boolean
}

interface Result {
    finisher: number,
    board: Array<Array<Tile>>,
    inactiveSum: number,
    score: number
}

function parseSequence(input: string): Array<number> {
    const sequenceIndex = 0;
    return input
        .split('\n')[sequenceIndex]
        .split(',')
        .map(str => Number.parseInt(str));
}

function parseBoards(input: string): Array<Array<Array<Tile>>> {
    const boardsIndex = 1;
    const boardsAsStrings: Array<string> = input.split('\n\n').slice(boardsIndex)

    const boards = boardsAsStrings
        .map(boardAsString => {
            return boardAsString
                .split('\n')
                .map((row: string) => parseRow(row))
        })

    function parseRow(row: string): Array<Tile> {
        let result: Array<Tile> = [];
        for (let char = 0; char < row.length - 1; char += 3) {
            const value = row.slice(char, char + 2);
            result.push({
                value: Number.parseInt(value),
                active: false
            });
        }
        return result;
    }
    return boards;
}

function evaluateResults(sequence: Array<number>, boards: Array<Array<Array<Tile>>>): Array<Result> {
    let winners: Array<Result> = [];
    for (let value of sequence) {
        
        boards = boards.map(board => {
            for (let row of board) {
                for (let tile of row) {
                    if(tile.active === true) continue;
                    tile.active = tile.value === value;
                }
            }
            return board;
        })
        let result = boards.filter((board, idx) => {
            const isWinner = detectCompleteRows(board)
            || detectCompleteColumns(board)
            || detectCompleteDiagonals(board);
            if(isWinner) winners.push({
                finisher: value,
                board: board,
                inactiveSum: getSumOfInactiveTiles(board),
                score: value * getSumOfInactiveTiles(board) 
            });
            if(isWinner) boards.splice(idx, 1)
        });
    }
    return winners;
}

function detectCompleteRows(board: Array<Array<Tile>>): boolean {
    let result = false;
    for (let row of board) {
        const activeTilesInRow = row.filter(cell => cell.active === true);
        result = activeTilesInRow.length === row.length
        if(result === true) break;
    }
    return result;
}

function detectCompleteColumns(board: Array<Array<Tile>>): boolean {
    for (let row = 0; row < board.length; row++) {
        let isActiveColumn = true;
        for (let col = 0; col < board[row].length; col++) {
            if (board[col][row].active === false) isActiveColumn = false;
        }
        if (isActiveColumn) return true;
    }
    return false;
}
function detectCompleteDiagonals(board: Array<Array<Tile>>): boolean {
    // we assume it's square because diagonal amirite?
    let isActiveDiagonal = true;
    // test upper left to lower right
    isActiveDiagonal = true;
    for (let i = 0; i < board.length; i++) {
        if (board[i][i].active === false) {
            isActiveDiagonal = false;
        }
    }
    if(isActiveDiagonal) return true;

    // test lower left to upper right
    isActiveDiagonal = true;
    for (let i = 0; i < board.length; i++) {
        if (board[(board.length - 1) - i][i].active === false) {
            isActiveDiagonal = false;
        }
    }
    if(isActiveDiagonal) return true;
    return false;
}

function getSumOfInactiveTiles(board: Array<Array<Tile>>): number {
    return board.reduce((acc, row) => {
        const sumOfRow = row.reduce((acc, tile) => {
            if(tile.active == false) acc += tile.value;
            return acc;
        }, 0)
        acc += sumOfRow;
        return acc;
    }, 0);
}

module.exports = { parseSequence, parseBoards, evaluateResults, getSumOfInactiveTiles }