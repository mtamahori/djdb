const router = require('express').Router()
const { User } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // send only id and email fields, rather than also including encrypted passwords
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = router
