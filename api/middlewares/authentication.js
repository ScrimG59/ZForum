const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']
  // if there's an authHeader split it, so we only get the token
  // otherwise return undefined
  const token = authHeader && authHeader.split(' ')[1]

  if(token === null) {
      return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if(err) {
          return res.sendStatus(403)
      } 
      next()
  })
}

module.exports = authenticate