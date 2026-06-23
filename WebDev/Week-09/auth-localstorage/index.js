const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { authMiddleware } = require("./middleware");

const app = express();
// json middleware is exported by express itself
app.use(express.json());
dotenv.config();

// file-based dbs, mongodb, postgres
const notes = [];
const users = [];

// frontend endpoints
app.get("/", (req, res) => {
  res.status(200).sendFile("C:\\Users\\91949\\Documents\\100xSchool\\WebDev\\Week-09\\client\\index.html");
});

app.get("/signup", (req, res) => {
  res.status(200).sendFile("C:\\Users\\91949\\Documents\\100xSchool\\WebDev\\Week-09\\client\\signup.html");

})

app.get("/signin", (req, res) => {
  res.status(200).sendFile("C:\\Users\\91949\\Documents\\100xSchool\\WebDev\\Week-09\\client\\signin.html");

})

// backend endpoints
// check status codes across all endpoints

app.post("/signup", (req, res) => {
    const { username, password } = req.body;
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: "Username already exists" });
    }
    // put isVerified: false by default.
    users.push({ username, password });
    // send mail to confirm verification. 
    res.status(201).json({ message: "User created" });
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        res.status(403).json({ message: "Invalid credentials" });
        return;
    }
    // why the need of jwt? we can't share username and pass in headers which is risky to store in frontend. its anti-pattern.
    // we can't send username alone in header instead of token. because if we know username of others, we can access their account. so thats wrong execution.
    // send random string to frontend as token
    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
})

// authenticated endpoint
app.post("/notes", authMiddleware, (req, res) => {
    const username = req.username
    // now check whether this username is in db. and it exists. checked with token but recheck here. maybe the user is banned already. 

    const note = req.body.note;
    notes.push({ note, username });
    res.status(201).json({ message: "Note added" });
});

// authenticated endpoint
app.get("/notes", authMiddleware, (req, res) => {
    const username = req.username
    const userNotes = notes.filter(note => note.username === username);
    res.status(200).json({ notes: userNotes });
});

app.listen(3000);