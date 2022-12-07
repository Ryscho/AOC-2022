const fs = require("fs");

function parseFile(fileName) {
    return fs
        .readFileSync(fileName, { encoding: "utf-8" })
        .replace(/\r/g, "")
        .replace(/\$/g, "")
        .split("\n");
}

function addSizeToHigherDirectories(directorySizes, path, amt) {
    if (!directorySizes[path]) {
        directorySizes[path] = 0;
    }
    directorySizes[path] += amt;
    const upPath = path.split(",").slice(0, -1).join();
    if (upPath) {
        addSizeToHigherDirectories(directorySizes, upPath, amt);
    }
}

function getDirectorySizes(directories) {
    const directorySizes = {};
    for (const path in directories) {
        const directory = directories[path];
        if (!directorySizes[path]) {
            directorySizes[path] = 0;
        }
        let fileSum = 0;
        for (const file of directory) {
            fileSum += Number(file);
        }
        addSizeToHigherDirectories(directorySizes, path, fileSum);
    }
    return directorySizes;
}

function getDirectories(data) {
    const directories = {};
    let currentDirectory = [];
    for (const line of data) {
        const [cmd, flag] = line.trim().split(" ");
        if (cmd == "cd" && flag == "..") {
            currentDirectory.pop();
        } else if (cmd == "cd") {
            currentDirectory.push(flag);
        } else if (cmd != "ls" && cmd != "dir") {
            if (!directories[currentDirectory]) {
                directories[currentDirectory] = [cmd];
            } else {
                directories[currentDirectory].push(cmd);
            }
        }
    }
    return directories;
}

function problemOne(filename) {
    const data = parseFile(filename);
    const directories = getDirectories(data);
    const directorySizes = getDirectorySizes(directories);

    let sum = 0;
    for (const dir in directorySizes) {
        const size = directorySizes[dir];
        if (size <= 100000) {
            sum += size;
        }
    }
    console.log(sum);
}

function problemTwo(filename) {
    const data = parseFile(filename);
    const directories = getDirectories(data);
    const directorySizes = getDirectorySizes(directories);

    const maxSpace = 70000000;
    const updateSpace = 30000000;
    const currentSpace = directorySizes["/"];
    const unusedSpace = maxSpace - currentSpace;
    const possibleCandidatesToDelete = [];
    for (const dir in directorySizes) {
        const size = directorySizes[dir];
        if (unusedSpace + size > updateSpace) {
            possibleCandidatesToDelete.push(dir);
        }
    }

    let smallestSize = Infinity;
    for (const pc of possibleCandidatesToDelete) {
        const size = directorySizes[pc];
        if (size < smallestSize) {
            smallestSize = size;
        }
    }
    console.log(smallestSize);
}

problemOne(process.argv[2]);
problemTwo(process.argv[2]);
