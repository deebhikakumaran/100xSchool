const jwt = require('jsonwebtoken');
const jwtPassword = 'secret_key';

/**
 * Generates a "Short-Lived" JWT that expires in 1 minute.
 * * @param {string} username - The user's email.
 * @returns {string} A JWT that will be invalid after 60 seconds.
 */
function signShortLivedToken(username) {
    return jwt.sign({username}, jwtPassword, {expiresIn: 60})
}

/**
 * Checks if a token is still valid or has expired.
 * * @param {string} token - The JWT string.
 * @returns {string} Returns "valid", "expired", or "invalid".
 */
function checkTokenStatus(token) {
    try {
        jwt.verify(token, jwtPassword);

        // tryna do manually
        const decoded = jwt.decode(token)
        const now = Math.floor(Date.now()/1000)
        if(decoded && decoded.exp > now) return "valid"
        // return "valid"
    }
    catch(err) {
        if(err.name === "TokenExpiredError") return "expired"
        return "invalid"
    }
}

module.exports = {
    signShortLivedToken,
    checkTokenStatus,
    jwtPassword
};