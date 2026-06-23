const jwt = require('jsonwebtoken');
const jwtPassword = 'secret_key';

/**
 * Generates a JWT that includes a user's role (admin or guest).
 * * @param {string} username - The user's email.
 * @param {string} role - The user's role, must be either 'admin' or 'guest'.
 * @returns {string|null} A JWT if role is valid; otherwise null.
 */
function signJwtWithRole(username, role) {
    const isRoleValid = ['admin', 'guest'].includes(role)
    if(!isRoleValid) return null;
    return jwt.sign({username, role}, jwtPassword)
}

/**
 * Checks if a given token belongs to an admin.
 * * @param {string} token - The JWT string.
 * @returns {boolean} True if the role in the payload is 'admin', false otherwise.
 */
function isAdmin(token) {
    try{
        const decoded = jwt.verify(token, jwtPassword);
        if(decoded.role === 'admin') return true
        else return false;
    }
    catch(err) {
        return false
    }
}

module.exports = {
    signJwtWithRole,
    isAdmin,
    jwtPassword
};