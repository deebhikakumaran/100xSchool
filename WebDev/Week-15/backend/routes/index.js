import { Router } from "express"
import { userModel, accountModel } from "../db.js"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { SignupSchema, SigninSchema } from "../config.js"

const router = Router()

router.post("/signup", async (req, res) => {
    try {
        const { success, data } = SignupSchema.safeParse(req.body)

        const existingUser = await userModel.findOne({ email: data.email })
        if (existingUser) return res.status(400).json({ error: "user already exists" })

        const hashedPassword = await bcrypt.hash(data.password, 10) //10 rounds of salt

        const user = await userModel.create({
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName
        })

        await accountModel.create({
            userId: user._id
        })

        return res.status(201).json({ message: "signed up successfully" })
    }
    catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors[0].message });
        }
        res.status(500).json({ error: err.message })
    }
})

router.post("/signin", async (req, res) => {
    try {
        const { success, data } = SigninSchema.safeParse(req.body);

        const user = await userModel.findOne({ email: data.email })
        if (!user) return res.status(404).json({ error: "user doesn't exist" })

        const isPasswordValid = await bcrypt.compare(data.password, user.password)
        if (!isPasswordValid) return res.status(400).json({ error: "invalid creds" })
        
        const token = jwt.sign({ id: user._id }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: '1h'  
            })
        // 1hour session for payment things
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            maxAge: 60 * 60 * 1000, 
            sameSite: "lax",
        })
        return res.status(201).json({ id: user._id, message: "signed in successfully" })
    }
    catch (err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors[0].message });
        }
        return res.status(500).json({ error: err.message })
    }
})

export default router;