const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

// note: getter methods on password and salt make '.password' and '.salt' act like functions, which hide them when serializing to JSON. This is a hack to get around Sequelize's lack of a 'private' option.

// MODEL DEFINITION

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    // validate: {
    //   isEmail: true
    // }
  },
  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  mixcloudId: {
    type: Sequelize.STRING
  }
})

module.exports = User

// INSTANCE METHODS

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

// CLASS METHODS

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

// HOOKS

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
