/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    if (str.length === 0) {
        return 0;
    }

    str = str.toLowerCase();

    const vowels = ["a", "e", "i", "o", "u"];
    let count = 0;

    for (let each of str) {
        if (vowels.includes(each)) {
            count++;
        }
    }

    return count;
}

module.exports = countVowels;