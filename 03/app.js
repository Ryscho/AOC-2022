const fs = require("fs");

function parseFile(fileName) {
    const rawData = fs.readFileSync(fileName, { encoding: "utf-8" });
    const data = rawData.split("\r\n");
    return data;
}

function badgeToScore(badge) {
    const charCode = badge.charCodeAt(0);
    if (charCode > 96) {
        return charCode - 96;
    } else {
        return charCode - 38;
    }
}

function problemOne(filename) {
    const rucksacks = parseFile(filename);
    let sum = 0;
    for (const rucksackItems of rucksacks) {
        const firstHalf = rucksackItems.slice(0, rucksackItems.length / 2);
        const secondHalf = rucksackItems.slice(rucksackItems.length / 2);
        for (const badge of firstHalf) {
            if (secondHalf.includes(badge)) {
                sum += badgeToScore(badge);
                break;
            }
        }
    }
    console.log("What is the sum of the priorities of those item types?", sum);
}

function problemTwo(filename) {
    const rucksacks = parseFile(filename);
    let sum = 0;
    for (
        let groupStartIndex = 0;
        groupStartIndex < rucksacks.length;
        groupStartIndex += 3
    ) {
        const firstRucksack = rucksacks[groupStartIndex];
        const secondRucksack = rucksacks[groupStartIndex + 1];
        const thirdRucksack = rucksacks[groupStartIndex + 2];
        for (const badge of firstRucksack) {
            if (
                secondRucksack.includes(badge) &&
                thirdRucksack.includes(badge)
            ) {
                sum += badgeToScore(badge);
                break;
            }
        }
    }
    console.log("What is the sum of the priorities of those item types?", sum);
}

problemOne(process.argv[2]);
problemTwo(process.argv[2]);
