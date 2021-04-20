require('dotenv').config()

const express = require('express')
const router = express.Router()
const { getRefreshToken } = require('../services/tokenservice')
const jwt = require('jsonwebtoken')
const generateAccessToken = require('../utils/tokenGenerator')

router.post('/', async (req, res) => {
    const refreshToken = req.body.RefreshToken

    if(!refreshToken) {
        return res.status(401).send('No Token in header.')
    }

    const tokenFromDb = await getRefreshToken(refreshToken)

    if(tokenFromDb != refreshToken) {
        return res.status(401).send('Tokens dont match.')
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(401).send('Refresh token not valid.')
        }


        const accesstoken = generateAccessToken({name: user.Username})
        return res.status(201).json(accesstoken)
    })
})

module.exports = router