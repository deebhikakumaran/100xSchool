import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const cookie = req.cookies.token
    if(!cookie) {
        return res.status(403).json({error: "unauthorized. signin again."})
    }

    try {
        const decoded = jwt.verify(cookie, process.env.JWT_SECRET)
        const userId = decoded.id
        req.userId = userId
        next()
    }
    catch(err){
        return res.status(401).json({error: "invalid token"})
    }
    
}

export default authMiddleware