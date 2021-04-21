require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '600s'})
}

module.exports = generateAccessToken