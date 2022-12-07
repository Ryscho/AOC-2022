const fs = require("fs");

function parseFile(fileName) {
    return fs
        .readFileSync(fileName, { encoding: "utf-8" })
        .replace(/\r/g, "")
        .split("");
}

function findUniqueString(data, markerLength) {
    for (let i = 0; i < data.length; i++) {
        let marker = [];
        for (let j = 0; j < markerLength; j++) {
            marker.push(data[i + j]);
        }
        if (marker.length == new Set(marker).size) {
            return i + markerLength;
        }
    }
}

function problemOne(filename) {
    const data = parseFile(filename);
    const result = findUniqueString(data, 4);
    console.log(result);
}

function problemTwo(filename) {
    const data = parseFile(filename);

    const result = findUniqueString(data, 14);
    console.log(result);
}

problemOne(process.argv[2]);
problemTwo(process.argv[2]);
