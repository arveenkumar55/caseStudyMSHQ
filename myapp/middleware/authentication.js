const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const algorithm = 'aes-256-cbc';
 
const key = crypto.randomBytes(32);
 
const iv = crypto.randomBytes(16);

// get config vars
dotenv.config();


const encrypt =  (password) =>
        bcrypt.genSalt(10)
        .then((salt => bcrypt.hash(password, salt)))
        .then(hash => hash)

     const comparePassword =  (password, hashPassword) =>
        bcrypt.compare(password, hashPassword)
        .then(resp => resp)


 function generateAccessToken(username) {
    return jwt.sign({username}, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  }

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET , (err,user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      // console.log('user', user)

      req.user = {}
      req.user.ID = user.username.split('-')[0]
      req.user.email = user.username.split('-')[1]
      req.user.cusTechRole = user.username.split('-')[2]
      next()
    })
  }

  module.exports = {generateAccessToken, authenticateToken, encrypt, comparePassword}