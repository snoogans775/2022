interface Coordinate {
  x: number;
  y: number;
}

function parseInput(input: string): Array<Coordinate> | undefined {
  // split lines
  const lines: Array<string> = input.split("\n");
  // convert lines to coordinates
  const lineNodes: Array<Array<Coordinate>> = lines.map((line) => {
    const [first, second] = line.split(" -> ");
    const start = commaPairToCoordinate(first);
    const end = commaPairToCoordinate(second);
    return [start, end];
  });
  // filter horizontal and vertical lines
  const filteredLines = lineNodes.filter(linesFilter);
  // for each line, find intermediate points
  const extendedLinePoints = filteredLines.map(fillOutLine);

  return extendedLinePoints.flat();

  // Functions
  function commaPairToCoordinate(pair: string): Coordinate {
    return pair.split(",").reduce(
      (acc, value, index) => {
        if (index == 0) acc.x = parseInt(value);
        if (index == 1) acc.y = parseInt(value);
        return acc;
      },
      { x: 0, y: 0 }
    );
  }

  function linesFilter(line: Array<Coordinate>): boolean {
    return line[0].x == line[1].x || line[0].y == line[1].y;
  }

  function fillOutLine(line: Array<Coordinate>): Array<Coordinate> {
    if (line[0].x === line[1].x) return fillVerticalLine(line);
    if (line[0].y === line[1].y) return fillHorizontalLine(line);
    throw new Error("Non-orthogonal Line Found!");
    return line;

    function fillVerticalLine(line: Array<Coordinate>): Array<Coordinate> {
      // find north point of vertical line
      const northPoint = line[0].y < line[1].y ? line[0] : line[1];
      const southPoint = line[0].y > line[1].y ? line[0] : line[1];
      const sortedPoints = [northPoint, southPoint];
      // add intermediate coordinates to line
      let intermediatePoints: Array<Coordinate> = [];
      const start = sortedPoints[0].y;
      const end = sortedPoints[1].y;
      for (let i = start + 1; i < end; i++) {
        intermediatePoints.push({ x: line[0].x, y: i });
      }
      return [...sortedPoints, ...intermediatePoints];
    }
    function fillHorizontalLine(line: Array<Coordinate>): Array<Coordinate> {
      // find west and east point of horizontal line
      const westPoint = line[0].x < line[1].x ? line[0] : line[1];
      const eastPoint = line[0].x > line[1].x ? line[0] : line[1];
      const sortedPoints = [westPoint, eastPoint];
      // add intermediate coordinates to line
      let intermediatePoints: Array<Coordinate> = [];
      const start = sortedPoints[0].x;
      const end = sortedPoints[1].x;
      for (let i = start + 1; i < end; i++) {
        intermediatePoints.push({ x: i, y: line[0].y });
      }
      return [...sortedPoints, ...intermediatePoints];
    }
  }
}

function computeDangerZones(lines: Array<Coordinate>): number {
  const dangerZones = lines.reduce((acc, curr, index, lines) => {
    const firstIndex = lines.findIndex(l => l.x === curr.x && l.y === curr.y) 
    if(index !== firstIndex) return acc;
    const otherOccurrences = lines.filter(l => l.x === curr.x && l.y === curr.y);
    acc += otherOccurrences.length > 1 ? 1 : 0;
    return acc;
  }, 0);

  // We double count because we look at all occurences, hacky!
  return dangerZones;
}

module.exports = { parseInput, computeDangerZones };
