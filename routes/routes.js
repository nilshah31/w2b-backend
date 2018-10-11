const express        = require('express')
const router         = express.Router()

router.use('/users',require('./user'))
router.all('/*',(req,res) => {
  res.status(404).send({
    error_code :"404",
    message    :"Api Not found"
  })  
})

module.exports = router;
