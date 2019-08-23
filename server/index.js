const path = require('path')
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const passport = require('passport')
// @ts-ignore
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({db})
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
module.exports = app

// global Mocha hook used for resource cleanup.
// otherwise, Mocha never quits after tests.

if (process.env.NODE_ENV === 'test') {
  after('close the session store', () =>
  sessionStore.stopExpiringSessions())
}

if (process.env.NODE_ENV !== 'production') require('../secrets')

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const createApp = () => {
  //logging middleware
  app.use(morgan('dev'))

  //body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  //session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'boruthecat',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  //auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  //static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  //any requests with an extension (.js, .css, etc) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  //serve index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  //error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  //start listening and create 'server' object representing the server
  const server = app.listen(PORT, () =>
    console.log(`You are now tuned in to port ${PORT}`))

  //set up socket control
  const io = socketio(server)
  require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

//evaluates to TRUE when this file is run directly from the CLI.
//evaluates to FALSE if this file is required by another module, i.e. test suite

if (require.main === module) {
  bootApp()
} else {
  createApp()
}
