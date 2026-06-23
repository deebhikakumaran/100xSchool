const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if(!token) {
        res.status(403).json({ message: "token missing" });
        return;
    }

    // verify token and extract username
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const username = decoded.username;
    if(!username) {
        res.status(403).json({ message: "malformed token" })
    }

    req.username = username;

    next();
}

module.exports = { authMiddleware }