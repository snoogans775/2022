"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
function parseInput(input) {
    // split lines
    var lines = input.split("\n");
    // convert lines to coordinates
    var lineNodes = lines.map(function (line) {
        var _a = line.split(" -> "), first = _a[0], second = _a[1];
        var start = commaPairToCoordinate(first);
        var end = commaPairToCoordinate(second);
        return [start, end];
    });
    // filter horizontal and vertical lines
    var filteredLines = lineNodes.filter(linesFilter);
    // for each line, find intermediate points
    var extendedLinePoints = filteredLines.map(fillOutLine);
    return extendedLinePoints.flat();
    // Functions
    function commaPairToCoordinate(pair) {
        return pair.split(",").reduce(function (acc, value, index) {
            if (index == 0)
                acc.x = parseInt(value);
            if (index == 1)
                acc.y = parseInt(value);
            return acc;
        }, { x: 0, y: 0 });
    }
    function linesFilter(line) {
        return line[0].x == line[1].x || line[0].y == line[1].y;
    }
    function fillOutLine(line) {
        if (line[0].x === line[1].x)
            return fillVerticalLine(line);
        if (line[0].y === line[1].y)
            return fillHorizontalLine(line);
        throw new Error("Non-orthogonal Line Found!");
        return line;
        function fillVerticalLine(line) {
            // find north point of vertical line
            var northPoint = line[0].y < line[1].y ? line[0] : line[1];
            var southPoint = line[0].y > line[1].y ? line[0] : line[1];
            var sortedPoints = [northPoint, southPoint];
            // add intermediate coordinates to line
            var intermediatePoints = [];
            var start = sortedPoints[0].y;
            var end = sortedPoints[1].y;
            for (var i = start + 1; i < end; i++) {
                intermediatePoints.push({ x: line[0].x, y: i });
            }
            return __spreadArray(__spreadArray([], sortedPoints), intermediatePoints);
        }
        function fillHorizontalLine(line) {
            // find west and east point of horizontal line
            var westPoint = line[0].x < line[1].x ? line[0] : line[1];
            var eastPoint = line[0].x > line[1].x ? line[0] : line[1];
            var sortedPoints = [westPoint, eastPoint];
            // add intermediate coordinates to line
            var intermediatePoints = [];
            var start = sortedPoints[0].x;
            var end = sortedPoints[1].x;
            for (var i = start + 1; i < end; i++) {
                intermediatePoints.push({ x: i, y: line[0].y });
            }
            return __spreadArray(__spreadArray([], sortedPoints), intermediatePoints);
        }
    }
}
function computeDangerZones(lines) {
    var dangerZones = lines.reduce(function (acc, curr, index, lines) {
        var firstIndex = lines.findIndex(function (l) { return l.x === curr.x && l.y === curr.y; });
        if (index !== firstIndex)
            return acc;
        var otherOccurrences = lines.filter(function (l) { return l.x === curr.x && l.y === curr.y; });
        acc += otherOccurrences.length > 1 ? 1 : 0;
        return acc;
    }, 0);
    // We double count because we look at all occurences, hacky!
    return dangerZones;
}
module.exports = { parseInput: parseInput, computeDangerZones: computeDangerZones };
