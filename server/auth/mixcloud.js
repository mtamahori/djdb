// package no longer works due to some TypeScript issue (?)
// soundcloud API registration is closed, so cannot obtain clientID and clientSecret
// consider implementing Google OAuth, though this does not have any real use in the way that Mixcloud or Soundcloud could

const passport = require('passport')
const router = require('express').Router()
const MixCloudStrategy = require('passport-mixcloud').Strategy
const { User } = require('../db/models')

if (!process.env.MIXCLOUD_CLIENT_ID || !process.env.MIXCLOUD_CLIENT_SECRET) {
  console.log('Mixcloud client ID and/or secret not found. Skipping Mixcloud OAuth.')
} else {
  const mixcloudConfig = {
    clientID: process.env.MIXCLOUD_CLIENT_ID,
    clientSecret: process.env.MIXCLOUD_CLIENT_SECRET,
    callbackURL: process.env.MIXCLOUD_CALLBACK
  }

  const strategy = new MixCloudStrategy(
    mixcloudConfig,
    (accessToken, refreshToken, profile, done) => {
      const username = profile.username;

      User.find({where: { username }})
      .then(foundUser => {
        if (!foundUser) {
        User.create({ username })
        .then(createdUser => {
          let user = { id: createdUser.id, user: createdUser, access: accessToken, refreshToken }
          return done(null, user)
        })
      }
      else {
        let user = { id: foundUser.id, user: foundUser, access: accessToken, refreshToken }
        return done(null, user)
      }
    })
      .catch(done)
    }
  )

  passport.use(strategy)

  router.get('/', passport.authenticate('mixcloud'))

  router.get(
    '/callback',
    passport.authenticate('mixcloud', {
      successRedirect: '/home',
      failureRedirect: '/'
    })
  )
}

module.exports = router
