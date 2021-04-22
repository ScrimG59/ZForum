const jwt = require('jsonwebtoken')
const { getUserById } = require('../services/userservice')

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']
  // if there's an authHeader split it, so we only get the token
  // otherwise return undefined
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)

  if(token === null) {
      return res.status(401).send('Header is empty.')
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if(err) {
        return res.status(403).send('Not valid token.')
      }

      // ensure that this user exists in the database
      const userFromDb = await getUserById(user.Id)
      if(!userFromDb) {
        return res.status(403).send('User in token couldnt be found in database.')
      }
      next()
  })
}

module.exports = authenticate