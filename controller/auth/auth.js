const config = require('../../config.json')
const jwt    = require('jsonwebtoken')
module.exports = {
  verifyUser: function (req, res, next) {
    const authToken = req.get('authToken');
    validateAuthToken(authToken)
      .then(() => {
        next()
      })
      .catch((err) => {
        res.status(403).send({
          error_code: "403",
          message: "Valid authToken is required"
        })
      })
  },
  generateAuthToken: async function(user){
    return jwt.sign({ user }, config.dev.secret_key);
  },
  getDecodedData: async function(authToken){
    return jwt.decode(authToken)
  }
}
async function validateAuthToken(authToken) {
  return jwt.verify(authToken, config.dev.secret_key)
}