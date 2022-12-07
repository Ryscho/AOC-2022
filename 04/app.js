const fs = require("fs");

function parseFile(fileName) {
    return fs
        .readFileSync(fileName, { encoding: "utf-8" })
        .replace(/\r/g, "")
        .trim()
        .split("\n");
}

function problemOne(filename) {
    const data = parseFile(filename);
    const result = data.map((line) => {
        const [[int1a, int1b], [int2a, int2b]] = line
            .split(",")
            .map((interval) => interval.split("-").map(Number));
        if (int1a <= int2a && int1b >= int2b) {
            return 1;
        } else if (int1a >= int2a && int1b <= int2b) {
            return 1;
        }
        return 0;
    });
    const sum = result.reduce((a, b) => a + b, 0);
    console.log(sum);
}

function problemTwo(filename) {
    const data = parseFile(filename);
    const result = data.map((line) => {
        const [[int1a, int1b], [int2a, int2b]] = line
            .split(",")
            .map((interval) => interval.split("-").map(Number));
        if (int1a <= int2a && int1b >= int2b) {
            return 1;
        } else if (int1a >= int2a && int1b <= int2b) {
            return 1;
        } else if (int1a <= int2a && int2a && int1b >= int2a) {
            return 1;
        } else if (int1a <= int2b && int1b >= int2b) {
            return 1;
        }
        return 0;
    });
    const sum = result.reduce((a, b) => a + b, 0);
    console.log(sum);
}

problemOne(process.argv[2]);
problemTwo(process.argv[2]);
