"use strict";
function parseSequence(input) {
    var sequenceIndex = 0;
    return input
        .split('\n')[sequenceIndex]
        .split(',')
        .map(function (str) { return Number.parseInt(str); });
}
function parseBoards(input) {
    var boardsIndex = 1;
    var boardsAsStrings = input.split('\n\n').slice(boardsIndex);
    var boards = boardsAsStrings
        .map(function (boardAsString) {
        return boardAsString
            .split('\n')
            .map(function (row) { return parseRow(row); });
    });
    function parseRow(row) {
        var result = [];
        for (var char = 0; char < row.length - 1; char += 3) {
            var value = row.slice(char, char + 2);
            result.push({
                value: Number.parseInt(value),
                active: false
            });
        }
        return result;
    }
    return boards;
}
function evaluateResults(sequence, boards) {
    var winners = [];
    var _loop_1 = function (value) {
        boards = boards.map(function (board) {
            for (var _i = 0, board_1 = board; _i < board_1.length; _i++) {
                var row = board_1[_i];
                for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
                    var tile = row_1[_a];
                    if (tile.active === true)
                        continue;
                    tile.active = tile.value === value;
                }
            }
            return board;
        });
        var result = boards.filter(function (board, idx) {
            var isWinner = detectCompleteRows(board)
                || detectCompleteColumns(board)
                || detectCompleteDiagonals(board);
            if (isWinner)
                winners.push({
                    finisher: value,
                    board: board,
                    inactiveSum: getSumOfInactiveTiles(board),
                    score: value * getSumOfInactiveTiles(board)
                });
            if (isWinner)
                boards.splice(idx, 1);
        });
    };
    for (var _i = 0, sequence_1 = sequence; _i < sequence_1.length; _i++) {
        var value = sequence_1[_i];
        _loop_1(value);
    }
    return winners;
}
function detectCompleteRows(board) {
    var result = false;
    for (var _i = 0, board_2 = board; _i < board_2.length; _i++) {
        var row = board_2[_i];
        var activeTilesInRow = row.filter(function (cell) { return cell.active === true; });
        result = activeTilesInRow.length === row.length;
        if (result === true)
            break;
    }
    return result;
}
function detectCompleteColumns(board) {
    for (var row = 0; row < board.length; row++) {
        var isActiveColumn = true;
        for (var col = 0; col < board[row].length; col++) {
            if (board[col][row].active === false)
                isActiveColumn = false;
        }
        if (isActiveColumn)
            return true;
    }
    return false;
}
function detectCompleteDiagonals(board) {
    // we assume it's square because diagonal amirite?
    var isActiveDiagonal = true;
    // test upper left to lower right
    isActiveDiagonal = true;
    for (var i = 0; i < board.length; i++) {
        if (board[i][i].active === false) {
            isActiveDiagonal = false;
        }
    }
    if (isActiveDiagonal)
        return true;
    // test lower left to upper right
    isActiveDiagonal = true;
    for (var i = 0; i < board.length; i++) {
        if (board[(board.length - 1) - i][i].active === false) {
            isActiveDiagonal = false;
        }
    }
    if (isActiveDiagonal)
        return true;
    return false;
}
function getSumOfInactiveTiles(board) {
    return board.reduce(function (acc, row) {
        var sumOfRow = row.reduce(function (acc, tile) {
            if (tile.active == false)
                acc += tile.value;
            return acc;
        }, 0);
        acc += sumOfRow;
        return acc;
    }, 0);
}
module.exports = { parseSequence: parseSequence, parseBoards: parseBoards, evaluateResults: evaluateResults, getSumOfInactiveTiles: getSumOfInactiveTiles };
