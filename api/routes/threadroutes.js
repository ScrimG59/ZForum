const express = require('express')
const { getAllThreads } = require('../services/threadservice')
const { getUserById } = require('../services/userservice')
const { getPostsbyThreadId } = require('../services/postservice') 
const Thread = require('../models/thread') 
const Post = require('../models/post')
const router = express.Router()

// HTTP-Get to get all Threads
router.get('/', async (req, res) => {
    let threads = await getAllThreads()
    let threadList = [];

    for(thread of threads) {
        const userOfThread = await getUserById(thread.User_Id)
        const posts = await getPostsbyThreadId(thread.Id)
        const postList = await getPosts(posts)
        const newThread = new Thread(thread.Id, thread.Title, thread.Description, thread.CreationDate, userOfThread, thread.Content, postList)

        threadList.push(newThread)
    }

    return res.status(200).json({
        Threads: threadList
    })
})

// helper method to get all posts of a thread
const getPosts = async (posts) => {
    let postList = [];

    for(post of posts) {
        const userOfPost = await getUserById(post.User_Id)
        const newPost = new Post(post.Id, post.Content, userOfPost, post.CreationDate)

        postList.push(newPost)
    }

    return postList
}

router.get('/:id')

module.exports = router