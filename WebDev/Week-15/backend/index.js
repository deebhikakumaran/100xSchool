import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./db.js";
import authMiddleware from "./middleware.js"
import publicRoutes from "./routes/index.js"
import userRoutes from "./routes/user.js"
import accountRoutes from "./routes/account.js"

dotenv.config()

const app = express()
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json())

connectDB();

app.use("/user", publicRoutes)
app.use("/user", authMiddleware, userRoutes)
app.use("/account", authMiddleware, accountRoutes)

app.get("/", (req, res)=>{
    res.status(200).json({message: "hi there"})
})

app.listen(3000)