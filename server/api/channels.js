const router = require('express').Router();
const { Channel, Message } = require('../db/models');

// GET ALL CHANNELS
router.get('/', function(req, res, next) {
  Channel.findAll({})
    .then(channels => {
      res.status(200).json(channels)
    })
    .catch(next)
})

// GET CHANNEL MESSAGES
router.get('/:channelId/messages', function(req, res, next) {
  Message.findAll({
    where: {
      channelId: req.params.channelId
    }
  })
  .then(messages => {
    res.status(200).json(messages)
  })
  .catch(next)
})

// CREATE CHANNEL
router.post('/', function(req, res, next) {
  Channel.create(req.body)
    .then(channel => {
      res.status(201).json(channel)
    })
    .catch(next)
})

// EDIT CHANNEL
router.put('/:id', function(req, res, next) {
  Channel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(channel => {
    return channel.update(req.body)
  })
  .then(updatedChannel => {
    res.status(200).json(updatedChannel)
  })
  .catch(next)
})


// DELETE CHANNEL
router.delete('/:id', function(req, res, next) {
  Channel.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(channel => {
    channel.destroy()
  })
  .then(() => {
    res.status(204).end()
  })
  .catch(next)
})

module.exports = router;
