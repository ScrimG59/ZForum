// imports
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('../routes/userroutes')
const threadRoutes = require('../routes/threadroutes')

// setting up the port of api
const port = 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/threads', threadRoutes)

app.listen(port, () => {
  console.log(`App live at http://localhost:${port}`)
})