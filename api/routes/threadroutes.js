const express = require('express')
const { getAllThreads } = require('../services/threadservice')
const { getUserOfThread } = require('../services/userservice') 
const Thread = require('../models/thread') 
const router = express.Router()

// HTTP-Get to get all Threads
router.get('/', async (req, res) => {
    let threads = await getAllThreads()
    let threadList = [];

    for(thread of threads) {
        const userOfThread = await getUserOfThread(thread.User_Id)
        const newThread = new Thread(thread.Id, thread.Title, thread.Description, thread.CreationDate, userOfThread, thread.Content)

        threadList.push(newThread)
    }

    return res.status(200).json({
        Threads: threadList
    })
})

module.exports = router