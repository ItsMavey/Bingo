
let usedNumbers = new Set();

let minValue = 0;
let maxValue = 99;

export function generateUniqueRandomNumber(min, max) {
    if (usedNumbers.size >= (max - min + 1)) {
        throw new Error("All numbers in the range have been used.");
    }
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (usedNumbers.has(randomNumber));
    usedNumbers.add(randomNumber);
    return randomNumber;
}

export function resetUsedNumbers() {
    usedNumbers.clear();
}


