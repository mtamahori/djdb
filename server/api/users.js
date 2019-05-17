const router = require('express').Router()
const { User } = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // send only id and username fields, rather than also including encrypted passwords
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', function(req, res, next) {
  User.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(user => {
    return user.update(req.body)
  })
  .then(updatedUser => {
    res.status(200).json(updatedUser)
  })
  .catch(next)
})

module.exports = router
