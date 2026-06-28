const express = require("express")
const pool = require("./config/db")
const submitRoutes = require("./routes/submit")
const progressRoutes = require("./routes/progress")

const app=express()
app.use(express.json())

app.use("/submit", submitRoutes)
app.use("/progress", progressRoutes)

app.get("/", (req, res)=>{
    res.status(200).json({message: "server is healthy."})
})

app.listen(3000)