// ## Write to a file

// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("node:fs");

const content = "hello 100xschool team. thank you for organising this. i am having fun doing these assignments. this bootcamp improved my focus and consistency. thank you."

fs.writeFile("file2.txt", content, "utf-8", (err)=>{
    if(err) {
        console.error("error writing the content.");
        return;
    }
    console.log("content added in file2.txt");
})

console.log("write to a file is done")