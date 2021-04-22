const express = require('express')
const router = express.Router()
const authenticate = require('../middlewares/authentication')

// function that depends on the authenticate-middleware, 
// that checks if the token thats in the request body is valid and the user behind the token actually exists in database
router.get('/', authenticate, (req, res) => {
    return res.status(200).json('Ok')
})

module.exports = router