const express = require('express')
const { getAllThreads } = require('../services/threadservice')
const router = express.Router()

router.get('/', async (req, res) => {
    let threads = await getAllThreads()

    return res.status(200).json({
        Threads: threads
    })
})

module.exports = router