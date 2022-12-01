const fs = require("fs");

function parseFile(fileName) {
    const rawData = fs.readFileSync(fileName, { encoding: "utf-8" });
    const dataSplitByElf = rawData.split("\r\n\r\n");
    const caloriesPerElf = [];
    for (const elfData of dataSplitByElf) {
        const caloriesStringArray = elfData.split("\r\n");
        const caloriesNumberArray = caloriesStringArray.map((x) => Number(x));
        caloriesPerElf.push(caloriesNumberArray);
    }
    return caloriesPerElf;
}

function findSum(numbers) {
    let sum = 0;
    for (const number of numbers) {
        sum += number;
    }
    return sum;
}

function findHighestCalories(caloriesPerElf, topElvesCount) {
    let highestCalorieCounts = [];

    for (const elfCalories of caloriesPerElf) {
        const calorieCount = findSum(elfCalories);
        const smallestCalorieCountSoFar = highestCalorieCounts[0];
        if (
            highestCalorieCounts.length < topElvesCount ||
            calorieCount > smallestCalorieCountSoFar
        ) {
            highestCalorieCounts.push(calorieCount);
            highestCalorieCounts.sort((a, b) => a - b);
            highestCalorieCounts = highestCalorieCounts.slice(
                -1 * topElvesCount
            );
        }
    }
    return findSum(highestCalorieCounts);
}

function problemOne(filename) {
    const caloriesPerElf = parseFile(filename);
    const calorieCount = findHighestCalories(caloriesPerElf, 1);
    console.log(
        "AOC 2022, 01-01: Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?",
        calorieCount
    );
}

function problemTwo(filename) {
    const caloriesPerElf = parseFile(filename);
    const calorieCount = findHighestCalories(caloriesPerElf, 3);
    console.log(
        "AOC 2022, 01-02: Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?",
        calorieCount
    );
}

problemOne(process.argv[2]);
problemTwo(process.argv[2]);
