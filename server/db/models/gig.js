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
    type: Sequelize.STRING,
    allowNull: false
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  styleTags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    allowNull: true
  },
  deejayApplicants: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [],
    allowNull: true
  },
  deejayInvites: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [],
    allowNull: true
  },
  declinedApps: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [],
    allowNull: true
  },
  declinedInvs: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: [],
    allowNull: true
  }
});

module.exports = Gig;
