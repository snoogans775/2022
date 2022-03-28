function parse(commands: string): Array<Function> {
    function createCommand(directive: string, value: number) {
        // "forward": "position",
        // "down": (depth: number, val: number) => depth + val,
        // "up": (depth: number, val: number) => depth - val
        return function(state: {position: number, depth: number}) {
            if(directive === 'forward') state.position += value;
            if(directive === 'up') state.depth -= value;
            if(directive === 'down') state.depth += value;
            return state;
        }
    }
    const parsedCommands = commands
        .split('\n')
        .map(command => {
            const pair = command.split(' ');
            return createCommand(pair[0], Number.parseInt(pair[1]))
        })
    // mapping to function with value in closure would be very cool
    // but I'm having a brainfart right now because it's very late
    // .map((pair: Array<string>) => commandMethods[pair[0]] );

    return parsedCommands;
}

function execute(commands: Array<Function>): number {
    let state = {
        depth: 0,
        position: 0
    }
    for (let command of commands) {
        const newState = command(state);
        Object.assign(state, newState);
    }

    return state.depth * state.position;
}

module.exports = { parse, execute }