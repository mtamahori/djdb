const Sequelize = require('sequelize')
const db = require('../db')

const Channel = db.define('channel', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  deejayId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  bookerId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  deejayLastRead: {
    type: Sequelize.DATE,
    allowNull: true
  },
  bookerLastRead: {
    type: Sequelize.DATE,
    allowNull: true
  }
},
{
  indexes: [
    {
      unique: true,
      fields: ['deejayId', 'bookerId']
    }
  ]
})

module.exports = Channel
