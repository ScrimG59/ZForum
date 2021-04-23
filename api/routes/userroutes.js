require('dotenv').config()

const express = require('express')
const router = express.Router()
const { getAllUsers, addUser, getUserById } = require('../services/userservice')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {addRefreshToken, deleteRefreshToken} = require('../services/tokenservice')
const generateAccessToken = require('../utils/tokenGenerator')
const authenticate = require('../middlewares/authentication')

// gets all users
router.get('/', async (req, res) => {
    let users = await getAllUsers()
    res.status(200).json({
        Users: users,
    })
})

// gets certain user by id
router.get('/account/:id', authenticate, async (req, res) => {
    const userId = req.params.id
    const user = await getUserById(userId)
    if(user) {
        return res.status(200).json(user)
    }
    return res.status(400).send('User not found')
})
 
// HTTP-Post to register a new user  
router.post('/register', async (req, res) => {
    const user = req.body
    const userList = await getAllUsers()
    const foundUser = userList.find(u => u.Email === user.Email || u.Username === user.Username)

    if(foundUser) {
        return res.status(400).send('User with given Username or Email already exists.')
    }

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(user.Password, salt)
        user.Password = hashedPassword
    }
    catch {
        res.status(500).send()
    }

    const id = await addUser(user)
    console.log(id)
    res.status(201).json('Created new user with ID: '+ id)
});

// HTTP-Post to login a user
router.post('/login', async (req, res) => {
    const userList = await getAllUsers()
    const loggedInUser = req.body
    const user = userList.find(u => u.Email === loggedInUser.Email)

    if(!user) {
        return res.status(400).send('Cannot find user with given email.')
    }

    try {
        if(await bcrypt.compare(loggedInUser.Password, user.Password)) {
            const accesstoken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            addRefreshToken(refreshToken)
            const loginUser = {Token: accesstoken, RefreshToken: refreshToken}
            return res.status(200).json(loginUser)
        }
        return res.status(400).send('Wrong password.')
    } catch {
        return res.status(500).send('Internal Error.')
    }
});

router.post('/logout', async (req, res) => {
    await deleteRefreshToken(req.body.RefreshToken)
    return res.status(200).json('Successfully logged out.')
});

module.exports = router