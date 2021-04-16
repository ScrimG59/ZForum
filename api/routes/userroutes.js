const express = require('express')
const router = express.Router()
const { getAllUsers, addUser } = require('../services/userservice')

router.get('/', async (req, res) => {
    let users = await getAllUsers()
    console.log(users)
    res.status(200).json({
        Users: users,
    })
  })
  
router.post('/add', async(req, res) => {
    const user = req.body
    const id = await addUser(user)
    res.status(201).json('Created new user with ID: '+ id)
});

module.exports = router