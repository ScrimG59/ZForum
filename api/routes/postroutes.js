const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authentication')
const { addPost } = require('../services/postservice')

router.post('/add', authenticate, async (req, res) => {
    const post = req.body
    if(!post) {
        return res.status(401).send('No post.')
    }
    const id = await addPost(post)
    return res.status(201).json(`Created new post: ${req.body.CreationDate}`)
})

module.exports = router