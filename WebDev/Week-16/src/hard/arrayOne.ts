// Problem 1: Find the Minimum Value in an Array
// Problem Statement
// Write a function that takes an array of positive integers as input and returns the minimum value in the array.

// Input and Output
// Example Input 1: [10, 2, 8, 6]
// Example Output 1: 2
// Example Input 2: [7]
// Example Output 2: 7
// Example Input 3: []
// Example Output 3: Throws an error: "Array cannot be empty"

export function findMinimumValue(arr: number[]) {
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }
    const positiveNumbers = arr.filter(num => num > 0);
    
    if (positiveNumbers.length === 0) {
        throw new Error("can't send negative values.");
    }
    return Math.min(...positiveNumbers)
}

