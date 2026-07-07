import { useState, useMemo } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);
    
    const expensiveCalculation = (n) => {
        if(n < 0) return 0;
        if(n === 0 || n === 1) return 1;
        let result = 1;
        for(let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    const expensiveValue = useMemo(() => expensiveCalculation(input), [input]);

    return (
        <div className="container">
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}