// Problem Statement:
// Write a function identity that takes an argument of any type and returns the same type.

export function identity<T>(a: T): T {
    return a;
}
