import React, { useState, useMemo } from 'react';
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
        { name: 'Tomato', value: 100 },
    ]);

    const memoizedTotalValue = useMemo(()=> {
        return items.reduce((sum, item) => sum+item.value, 0)
    }, [items])

    return (
        <div className='container'>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: {memoizedTotalValue}</p>
        </div>
    );
};
