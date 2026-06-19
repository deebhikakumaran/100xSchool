// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

function updateTime() {
    const date = new Date();

    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    const time24 = `${hh}:${mm}::${ss}`

    let hours12 = date.getHours();
    const ampm = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12;
    hours12 = hours12 ? hours12 : 12;
    const hh12 = String(hours12).padStart(2, '0');

    const time12 = `${hh12}:${mm}::${ss} ${ampm}`

    // clear console is to replace. 
    console.clear();
    console.log("current 24period: ", time24);
    console.log("current 12period: ", time12);
}

setInterval(updateTime, 1000);