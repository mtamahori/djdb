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
      const MixCloudId = profile.id

      User.find({where: { MixCloudId }})
      .then(foundUser => {
        if (!foundUser) {
        User.create({ name, email, mixcloudId })
        .then(createdUser => {
          let user = { id: createdUser.id, user: createdUser, access: accessToken, refreshToken }
          return done(null, user)
        })
      }
      else {
        let user = { vid: foundUser.id, user: foundUser, access: accessToken, refreshToken }
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

// DOCS - strategy

// passport.use(new MixCloudStrategy({
//   clientID: CLIENT_ID,
//   clientSecret: CLIENT_SECRET
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ MixCloudId: profile.id }, function (err, user) {
//     return done(err, user);
//   });
// }
// ));

// DOCS - authentication

// app.get('/auth/mixcloud',
//   passport.authorize('mixcloud'));

// app.get('/auth/mixcloud/callback',
//   passport.authorize('mixcloud', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
