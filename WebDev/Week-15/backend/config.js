import {z} from "zod"

export const SignupSchema = z.object({
    email:z.string().email("invalid email"),
    password:z.string().min(6, "password must be atleast 6 letters"),
    firstName:z.string("fistname is required"),
    lastName: z.string("lastname is required")
})

export const SigninSchema = z.object({
    email:z.string().email("invalid email"),
    password:z.string(),
})

export const updateUserSchema = z.object({
    password: z.string().min(6, "password must be atleast 6 letters").optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
})

export const transferSchema = z.object({
    to: z.string().refine((e)=>{return /^[0-9a-fA-F]{24}$/.test(e)}, "invalid user") ,
    amount: z.number("enter valid amount").positive("amount must be positive")
})