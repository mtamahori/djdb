const router = require('express').Router();
const { Deejay } = require('../db/models')

// GET ALL
router.get('/', function(req, res, next) {
  Deejay.findAll({})
    .then(deejays => {
      res.status(200).json(deejays)
    })
    .catch(next)
})

// GET
router.get('/:id', function(req, res, next) {
  Deejay.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(deejay => {
    res.status(200).json(deejay)
  })
  .catch(next)
})

// POST
router.post('/', function(req, res, next) {
  Deejay.create(req.body)
    .then(deejay => {
      res.status(201).json(deejay)
    })
    .catch(next)
})

// PUT
router.put('/:id', function(req, res, next) {
  Deejay.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(deejay => {
    return deejay.update(req.body)
  })
  .then(updatedDeejay => {
    res.status(200).json(updatedDeejay)
  })
  .catch(next)
})

// DELETE
router.delete('/:id', function(req, res, next) {
  Deejay.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(deejay => {
    deejay.destroy()
  })
  .then(() => {
    res.status(204).end()
  })
  .catch(next)
})

module.exports = router
