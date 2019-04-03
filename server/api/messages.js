const router = require('express').Router();
const { Message } = require('../db/models');

// GET ALL MESSAGES
router.get('/', function(req, res, next) {
  Message.findAll({})
    .then(messages => {
      res.status(200).json(messages)
    })
    .catch(next)
})

// GET ONE MESSAGE
router.get('/:id', function(req, res, next) {
  Message.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(message => {
    res.status(200).json(message)
  })
  .catch(next)
})

// POST MESSAGE
router.post('/', function(req, res, next) {
  Message.create(req.body)
    .then(message => {
      res.status(201).json(message)
    })
    .catch(next)
})

// PUT MESSAGE
router.put('/:id', function(req, res, next) {
  Message.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(message => {
    return message.update(req.body)
  })
  .then(updatedMessage => {
    res.status(200).json(updatedMessage)
  })
  .catch(next)
})

// DELETE MESSAGE
router.delete('/:id', function(req, res, next) {
  Message.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(message => {
    message.destroy()
  })
  .then(() => {
    res.status(204).end()
  })
  .catch(next)
})

module.exports = router;
