function parse(commands: string): Array<Function> {
    function createCommand(directive: string, value: number) {
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