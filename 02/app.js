const fs = require("fs");

function parseFile(fileName) {
    const rawData = fs.readFileSync(fileName, { encoding: "utf-8" });
    const data = rawData.split("\r\n");
    const array = [];
    for (const d of data) {
        array.push(d.split(" "));
    }
    return array;
}

const readableMove = {
    A: "Rock",
    B: "Paper",
    C: "Scissors",
    firstStrategy: {
        X: "Rock",
        Y: "Paper",
        Z: "Scissors",
    },
    secondStrategy: {
        X: "Lose",
        Y: "Draw",
        Z: "Win",
    },
};

const moveToPoints = {
    Rock: 1,
    Paper: 2,
    Scissors: 3,
};

const resultToPoints = {
    Win: 6,
    Draw: 3,
    Lose: 0,
};

function myWinScore(opponentMoveCoded, myMoveCoded, strategy) {
    const opponentMove = readableMove[opponentMoveCoded];
    const myMove = readableMove[strategy][myMoveCoded];
    let resultPoints;
    switch (opponentMove) {
        case "Rock":
            // First Strategy Moves
            if (myMove == "Rock") {
                resultPoints = resultToPoints["Draw"] + moveToPoints[myMove];
            } else if (myMove == "Paper") {
                resultPoints = resultToPoints["Win"] + moveToPoints[myMove];
            } else if (myMove == "Scissors") {
                resultPoints = resultToPoints["Lose"] + moveToPoints[myMove];
            }
            // Second Strategy Moves
            if (myMove == "Lose") {
                resultPoints =
                    resultToPoints[myMove] + moveToPoints["Scissors"];
            } else if (myMove == "Draw") {
                resultPoints = resultToPoints[myMove] + moveToPoints["Rock"];
            } else if (myMove == "Win") {
                resultPoints = resultToPoints[myMove] + moveToPoints["Paper"];
            }
            break;
        case "Paper":
            // First Strategy Moves
            if (myMove == "Rock") {
                resultPoints = resultToPoints["Lose"] + moveToPoints[myMove];
            } else if (myMove == "Paper") {
                resultPoints = resultToPoints["Draw"] + moveToPoints[myMove];
            } else if (myMove == "Scissors") {
                resultPoints = resultToPoints["Win"] + moveToPoints[myMove];
            }
            // Second Strategy Moves
            if (myMove == "Lose") {
                resultPoints = resultToPoints[myMove] + moveToPoints["Rock"];
            } else if (myMove == "Draw") {
                resultPoints = resultToPoints[myMove] + moveToPoints["Paper"];
            } else if (myMove == "Win") {
                resultPoints =
                    resultToPoints[myMove] + moveToPoints["Scissors"];
            }
            break;
        case "Scissors":
            // First Strategy Moves
            if (myMove == "Rock") {
                resultPoints = resultToPoints["Win"] + moveToPoints[myMove];
            } else if (myMove == "Paper") {
                resultPoints = resultToPoints["Lose"] + moveToPoints[myMove];
            } else if (myMove == "Scissors") {
                resultPoints = resultToPoints["Draw"] + moveToPoints[myMove];
            }
            // Second Strategy Moves
            if (myMove == "Lose") {
                resultPoints = resultToPoints[myMove] + moveToPoints["Paper"];
            } else if (myMove == "Draw") {
                resultPoints =
                    resultToPoints[myMove] + moveToPoints["Scissors"];
            } else if (myMove == "Win") {
                resultPoints = resultToPoints[myMove] + moveToPoints["Rock"];
            }
            break;
        default:
            break;
    }
    return resultPoints;
}

function problemOne(filename) {
    const rockPaperScissorRounds = parseFile(filename);
    let totalScore = 0;
    for (const [opponentMove, myMove] of rockPaperScissorRounds) {
        totalScore += myWinScore(opponentMove, myMove, "firstStrategy");
    }

    console.log(
        "AOC2022, 02-01: What would your total score be if everything goes exactly according to your strategy guide?",
        totalScore
    );
}

function problemTwo(filename) {
    const rockPaperScissorRounds = parseFile(filename);
    let totalScore = 0;
    for (const [opponentMove, myMove] of rockPaperScissorRounds) {
        totalScore += myWinScore(opponentMove, myMove, "secondStrategy");
    }

    console.log(
        "AOC2022, 02-01: Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?",
        totalScore
    );
}

problemOne(process.argv[2]);
problemTwo(process.argv[2]);
