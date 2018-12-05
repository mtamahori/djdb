const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
});

module.exports = Review;
