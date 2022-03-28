"use strict";
var input = process.argv[2];
var commands = parse(input);
var result = execute(commands);
console.log(result);
function parse(commands) {
    var commandMethods = {
        "forward": function (position, val) { return position + val; },
        "down": function (depth, val) { return depth + val; },
        "up": function (depth, val) { return depth - val; }
    };
    var parsedCommands = commands
        .split('\n')
        .map(function (command) { return command.split(' '); });
    // mapping to function with value in closure would be very cool
    // but I'm having a brainfart right now because it's very late
    // .map((pair: Array<string>) => commandMethods[pair[0]] );
    return parsedCommands;
}
function execute(commands) {
    var depth = 0;
    var position = 0;
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var command = commands_1[_i];
        //whoops! should have made the state an object...
        if (command[0] === 'forward') {
            position += Number.parseInt(command[1]);
        }
        if (command[0] === 'down') {
            depth += Number.parseInt(command[1]);
        }
        if (command[0] === 'up') {
            depth -= Number.parseInt(command[1]);
        }
    }
    return depth * position;
}
module.exports = { parse: parse, execute: execute };
