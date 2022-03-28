function parse(commands: string): Array<Array<string>> {
    const commandMethods: { [index: string]: Function } = {
        "forward": (position: number, val: number) => position + val,
        "down": (depth: number, val: number) => depth + val,
        "up": (depth: number, val: number) => depth - val
    }
    const parsedCommands = commands
        .split('\n')
        .map(command => command.split(' '))
    // mapping to function with value in closure would be very cool
    // but I'm having a brainfart right now because it's very late
    // .map((pair: Array<string>) => commandMethods[pair[0]] );

    return parsedCommands;
}

function execute(commands: Array<Array<string>>): number {
    let depth = 0;
    let position = 0;
    for (let command of commands) {
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

module.exports = { parse, execute }