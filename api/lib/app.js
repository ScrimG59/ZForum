// imports
const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('../routes/userroutes')
const threadRoutes = require('../routes/threadroutes')
const tokenRoutes = require('../routes/tokenroutes')
const postRoutes = require('../routes/postroutes')
const authenticateRoutes = require('../routes/authenticateroutes')
 
// setting up the port of api
const port = 3000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/user', userRoutes)
app.use('/api/thread', threadRoutes)
app.use('/api/token', tokenRoutes)
app.use('/api/post', postRoutes)
app.use('/api/authenticate', authenticateRoutes)

app.listen(port, () => {
  console.log(`App live at http://localhost:${port}`)
})
