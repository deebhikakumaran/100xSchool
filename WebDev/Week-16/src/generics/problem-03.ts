// Problem Statement:
// Write a function mergeObjects that merges two objects and returns a new object with all properties.

export function mergeObjects<T extends object, U extends object>(a: T, b: U): T & U {
    return {...a, ...b}
}
