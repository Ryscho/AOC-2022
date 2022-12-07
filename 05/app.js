const fs = require("fs");

function parseFile(fileName) {
    return fs
        .readFileSync(fileName, { encoding: "utf-8" })
        .replace(/\r/g, "")
        .split("\n\n");
}

function getStacks(data) {
    const hstacksTemp = [];
    const initial = data[0].split("\n");
    const numRows = initial.length - 1;
    const numCols = initial[0].length;
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
        hstacksTemp.push([]);
        for (let rowIndex = numRows - 1; rowIndex >= 0; rowIndex--) {
            const line = initial[rowIndex]
                .replace(/\[/g, " ")
                .replace(/\]/g, " ");
            hstacksTemp[colIndex].push(line[colIndex]);
        }
    }
    const hstacks = [];
    for (let i = 0; i < hstacksTemp.length; i++) {
        if (hstacksTemp[i][0] != " ") {
            const stackToCopy = [];
            for (const box of hstacksTemp[i]) {
                if (box != " ") {
                    stackToCopy.push(box);
                }
            }
            hstacks.push(stackToCopy);
        }
    }
    return hstacks;
}

function makeTheMoves(stacks, moves, model) {
    moves.split("\n").map((move) => {
        const parts = move.split(" ");
        const moveNum = Number(parts[1]);
        const fromCol = Number(parts[3]) - 1;
        const toCol = Number(parts[5]) - 1;

        if (model == "9000") {
            for (let i = 0; i < moveNum; i++) {
                const boxToMove = stacks[fromCol].splice(-1);
                stacks[toCol].push(...boxToMove);
            }
        } else if (model == "9001") {
            const boxToMove = stacks[fromCol].splice(-1 * moveNum);
            stacks[toCol].push(...boxToMove);
        }
    });
}

function problemOne(filename) {
    const data = parseFile(filename);
    const hstacks = getStacks(data);

    const moves = data[1];
    makeTheMoves(hstacks, moves, "9000");
    let result = "";
    for (const stack of hstacks) {
        result += stack.slice(-1);
    }

    console.log(result);
}

function problemTwo(filename) {
    const data = parseFile(filename);
    const hstacks = getStacks(data);

    const moves = data[1];
    makeTheMoves(hstacks, moves, "9001");
    let result = "";
    for (const stack of hstacks) {
        result += stack.slice(-1);
    }

    console.log(result);
}

problemOne(process.argv[2]);
problemTwo(process.argv[2]);
