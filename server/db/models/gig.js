const Sequelize = require('sequelize')
const db = require('../db')

const Gig = db.define('gig', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false
  },
  compensation: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Gig;
