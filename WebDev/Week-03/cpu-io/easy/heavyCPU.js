// Problem Description – Blocking CPU-Intensive Task
//
// You are given a function that performs a large number of calculations
// synchronously using a loop.
//
// Your task is to observe and understand how a CPU-heavy synchronous
// operation blocks the JavaScript event loop, preventing other code
// (such as timers or async callbacks) from running until it completes.


function heavyCPU(iterations) {
    for(let i=0; i<iterations; i++) {
        continue;
    }
    console.log("cpu intensive task check.")
}

heavyCPU(10000000000);

module.exports = heavyCPU;
