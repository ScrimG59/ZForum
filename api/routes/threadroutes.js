const express = require('express')
const { getAllThreads, getThreadById } = require('../services/threadservice')
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
        const newThread = new Thread(thread.Id, thread.Title, thread.Description, thread.CreationDate, userOfThread.Forename, userOfThread.Id, thread.Content, postList)

        threadList.push(newThread)
    }

    return res.status(200).json(threadList)
})

// HTTP-Get to get one certain thread
router.get('/:id', async (req, res) => {
    let thread = await getThreadById(req.params.id)
    const userOfThread = await getUserById(thread.User_Id)
    const posts = await getPostsbyThreadId(thread.Id) 
    const postList = await getPosts(posts)
    const newThread = new Thread(thread.Id, thread.Title, thread.Description, thread.CreationDate, userOfThread.Forename, userOfThread.Id, thread.Content, postList)
    return res.status(200).json(newThread)
})

// helper method to get all posts of a thread
const getPosts = async (posts) => {
    let postList = [];

    for(post of posts) {
        const userOfPost = await getUserById(post.User_Id)
        const newPost = new Post(post.Id, post.Content, userOfPost.Forename, userOfPost.Id, post.CreationDate)

        postList.push(newPost)
    }

    return postList
}

router.get('/:id')

module.exports = router