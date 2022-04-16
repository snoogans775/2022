const assert = require("assert");
const fs = require("fs");
const { parseInput, computeDangerZones } = require("./main.js");

describe("Day 5", () => {
  const input = fs.readFileSync("./5/input1.txt").toString();
  it("parses input to coordinate pairs", () => {
    const output = parseInput(input);
    assert.ok(output instanceof Array);
  });
  it("only computes the first instance of duplicate coordinates", () => {
      const input = `0,0 -> 8,0
      0,0 -> 8,0
      0,0 -> 8,0`;
      const coordinates = parseInput(input);
      const output = computeDangerZones(coordinates);
      assert.equal(output, 9)
  })
  it("computes danger zones", async () => {
    const lines = parseInput(input);
    const output = computeDangerZones(lines);
    assert.equal(output, 5);
  });
});
