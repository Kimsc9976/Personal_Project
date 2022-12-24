const randToken = require('rand-token');
const jwt = require('jsonwebtoken');

const secretKey = require('../src/inform/secretkey.js').secretkey;
const options = require('../src/inform/secretkey.js').option;

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
    sign: async (user) => {
      try{
        const payload = {
          idx: user[0].uuid,
          ID: user[0].ID,
        };
        const result = {
          //sign메소드를 통해 access token 발급
          token: jwt.sign(payload, secretKey, options),
          refreshToken: randToken.uid(256)
        };
        return result;
      }
      catch(err)
      {
        throw err;
      }
    },
    verify: async (token) => {
        let decoded;
        try 
        {
            decoded = jwt.verify(token, secretKey);
        } 
        catch (err) 
        {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                return TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return TOKEN_INVALID;
            }
        }
        return decoded;
    }
}