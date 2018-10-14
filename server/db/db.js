const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false
  }
)

module.exports = db

// global Mocha hook used for resource cleanup.
// otherwise, Mocha never quits after tests.

if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
