const router = require('express').Router();
const { Gig } = require('../db/models')

// GET ALL
router.get('/', function(req, res, next) {
  Gig.findAll({})
    .then(gigs => {
      res.status(200).json(gigs)
    })
    .catch(next)
})

// GET
router.get('/:id', function(req, res, next) {
  Gig.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(gig => {
    res.status(200).json(gig)
  })
  .catch(next)
})

// POST
router.post('/', function(req, res, next) {
  Gig.create(req.body)
    .then(gig => {
      res.status(201).json(gig)
    })
    .catch(next)
})

// PUT
router.put('/:id', function(req, res, next) {
  Gig.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(gig => {
    return gig.update(req.body)
  })
  .then(updatedGig => {
    res.status(200).json(updatedGig)
  })
  .catch(next)
})

// DELETE
router.delete('/:id', function(req, res, next) {
  Gig.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(gig => {
    gig.destroy()
  })
  .then(() => {
    res.status(204).end()
  })
  .catch(next)
})

module.exports = router
