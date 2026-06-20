// Problem Description – Chunk Array
//
// When dealing with large datasets, it's often necessary to process them
// in smaller batches (chunks) to avoid overloading the CPU or I/O.
//
// Your task is to implement a function `chunkArray(array, size)` that
// splits an array into sub-arrays of a maximum specified size.
//
// Requirements:
// 1. The function should return a new array containing the chunks.
// 2. The last chunk might be smaller than the specified size.
// 3. Handle edge cases like empty arrays or chunk size <= 0.
//
// This is a prerequisite for common patterns like batching API calls.

function chunkArray(array, size) {
    let newArr = [];

    if (size <= 0 || array.length===0) {
        return [];
    }

    const n = array.length;
    const chunkCount = Math.ceil(n / size);

    for (let i = 0; i < chunkCount; i++) {
        let start = i * size;
        let end = start + size;

        let subArr = array.slice(start, end);
        newArr.push(subArr);
    }

    return newArr;
}

module.exports = chunkArray;
