// Problem Description – Event Loop Execution Order
//
// You are given a script that mixes synchronous code, Promises (microtasks),
// and timers (macrotasks).
//
// Your task is to understand and predict the order in which the logs
// are printed to the console.
//


function eventLoopRace() {
    console.log("sync code 1");

    setTimeout(()=>{
        console.log("macro task ig");
    }, 0);

    Promise.resolve().then(()=> {
        console.log("micro tasks.")
    })
    console.log("syc code 2");
}

eventLoopRace()

module.exports = eventLoopRace;
