const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/bookers', require('./bookers'))
router.use('/deejays', require('./deejays'))
router.use('/gigs', require('./gigs'))
router.use('/channels', require('./channels'))
router.use('/messages', require('./messages'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
