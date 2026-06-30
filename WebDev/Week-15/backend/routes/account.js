import { Router } from "express"
import { accountModel, userModel } from "../db.js";
import { transferSchema } from "../config.js";
import mongoose from "mongoose";

const router = Router()

router.get("/balance", async (req, res)=>{
    try {
        const userId = req.userId;
        const account = await accountModel.findOne({userId})
        if(!account) return res.status(400).json({error: "account doesn't exist"})
        return res.status(200).json({id: userId, balance: account.balance})
    }
    catch(err) {
        return res.status(500).json({error: "internal server error"})
    }
})

router.post("/transfer", async (req, res)=>{
    // check recipient is valid user
    // prevent self transfer
    // check for valid sender account
    // check whether sender has the balance required
    // check for valid recipient account
    // send amount
    const session = await mongoose.startSession();
    await session.startTransaction()
    try {
        const userId = req.userId;
        const result = transferSchema.safeParse(req.body);

        if (!result.success) {
            throw new Error(result.error.errors[0].message);
        }

        const data = result.data;

        const recipient=await userModel.findOne({_id:data.to.toString()})
        if(!recipient) {
            await session.abortTransaction();
            return res.status(400).json({error: "recipient is not a valid user"})
        }
        if(data.to===userId.toString()) {
            await session.abortTransaction();
            return res.status(400).json({error: "user can't send money to himself"})
        }
        const senderAccount = await accountModel.findOne({userId})
        if(!senderAccount) {
            await session.abortTransaction();
            return res.status(400).json({error: "sender account doesn't exist"})
        }
        const isSufficientBalance = senderAccount.balance >= data.amount
        if(!isSufficientBalance) {
            await session.abortTransaction();
            return res.status(404).json({error: "insufficient balance"})
        }
        const toAccount = await accountModel.findOne({userId: data.to})
        if(!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({error: "recipient account doesn't exist"})
        }
        await accountModel.updateOne(
            {userId},
            {$inc: {balance:-data.amount}}).session(session);
        await accountModel.updateOne(
            {userId:data.to},
            {$inc: {balance:data.amount}}).session(session);

        await session.commitTransaction()
        return res.status(200).json({id: userId, balance: senderAccount.balance})
    }
    catch(err) {
        await session.abortTransaction()
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors[0].message });
        }
        return res.status(500).json({error: err.message})
    }
    finally {
        session.endSession()
    }
})

export default router;