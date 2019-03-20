const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  gigId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  channelId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bookerId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  deejayId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Message;
