import { Router } from "express"
import { updateUserSchema } from "../config.js";
import { userModel } from "../db.js";

const router = Router()

// this route should be accessible only if the user is logged in.
// but user sends the token to this endpoint only if logged in.
router.put("/", async (req, res)=> {
    try {
        const userId = req.userId;
        const {success, data} = updateUserSchema.safeParse(req.body)

        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
    
        await userModel.findByIdAndUpdate(userId, data, { new: true });
        return res.status(203).json({message: "user profile updated"})
    }
    catch(err) {
        if (err.name === 'ZodError') {
            return res.status(400).json({ error: err.errors[0].message });
        }
        return res.status(500).json({error: err.message})
    }
})

router.get("/bulk", async (req, res)=>{
    try {
        const filter = req.query.filter || ""
        const filteredUsers = await userModel.find({
            $or: [
                {email:{$regex:filter, $options:"i"}},
                {firstName:{$regex:filter, $options:"i"}},
                {lastName:{$regex:filter, $options:"i"}}
            ]
        }).select("-password")
        return res.status(200).json({users: filteredUsers})
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
})

export default router;