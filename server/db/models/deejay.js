const Sequelize = require('sequelize')
const db = require('../db')

const Deejay = db.define('deejay', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  website: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  styleTags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    allowNull: true
  },
});

module.exports = Deejay;
