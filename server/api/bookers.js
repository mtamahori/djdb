const router = require('express').Router();
const { Booker } = require('../db/models')

// GET ALL
router.get('/', function(req, res, next) {
  Booker.findAll({})
    .then(bookers => {
      res.status(200).json(bookers)
    })
    .catch(next)
})

// GET
router.get('/:id', function(req, res, next) {
  Booker.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(booker => {
    res.status(200).json(booker)
  })
  .catch(next)
})

// POST
router.post('/', function(req, res, next) {
  Booker.create(req.body)
    .then(booker => {
      res.status(201).json(booker)
    })
    .catch(next)
})

// PUT
router.put('/:id', function(req, res, next) {
  Booker.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(booker => {
    return booker.update(req.body)
  })
  .then(updatedBooker => {
    res.status(200).json(updatedBooker)
  })
  .catch(next)
})

// DELETE
router.delete('/:id', function(req, res, next) {
  Booker.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(booker => {
    booker.destroy()
  })
  .then(() => {
    res.status(204).end()
  })
  .catch(next)
})

module.exports = router
