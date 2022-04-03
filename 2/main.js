"use strict";
function parse(commands) {
    function createCommand(directive, value) {
        return function (state) {
            if (directive === 'forward')
                state.position += value;
            if (directive === 'up')
                state.depth -= value;
            if (directive === 'down')
                state.depth += value;
            return state;
        };
    }
    var parsedCommands = commands
        .split('\n')
        .map(function (command) {
        var pair = command.split(' ');
        return createCommand(pair[0], Number.parseInt(pair[1]));
    });
    return parsedCommands;
}
function execute(commands) {
    var state = {
        depth: 0,
        position: 0
    };
    for (var _i = 0, commands_1 = commands; _i < commands_1.length; _i++) {
        var command = commands_1[_i];
        var newState = command(state);
        Object.assign(state, newState);
    }
    return state.depth * state.position;
}
module.exports = { parse: parse, execute: execute };
