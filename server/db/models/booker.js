const Sequelize = require('sequelize')
const db = require('../db')

const Booker = db.define('booker', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Booker;