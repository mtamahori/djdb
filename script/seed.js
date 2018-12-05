'use strict'

const db = require('../server/db')
const { User, Booker, Deejay, Gig, Message, Review } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'max@max.com', password: '123'}),
    User.create({email: 'meri@meri.com', password: '123'}),
    User.create({email: 'miles@miles.com', password: '123'}),
    User.create({email: 'maeve@maeve.com', password: '123'}),
  ])

  const bookers = await Promise.all([
    Booker.create({name: 'Max', email: 'max@booker.com', phone: '3108693703', userId: 1}),
    Booker.create({name: 'Meri', email: 'meri@booker.com', phone: '7818012471', userId: 2}),
    Booker.create({name: 'Miles', email: 'miles@booker.com', phone: '4043846952', userId: 3}),
    Booker.create({name: 'Maeve', email: 'maeve@booker.com', phone: '2072660335', userId: 4})
  ])

  const deejays = await Promise.all([
    Deejay.create({name: 'Max', email: 'max@deejay.com', phone: '3108693703', userId: 1}),
    Deejay.create({name: 'Meri', email: 'meri@deejay.com', phone: '7818012471', userId: 2}),
    Deejay.create({name: 'Miles', email: 'miles@deejay.com', phone: '4043846952', userId: 3}),
    Deejay.create({name: 'Maeve', email: 'maeve@deejay.com', phone: '2072660335', userId: 4})
  ])

  const gigs = await Promise.all([
    Gig.create({name: 'Bar Night', date: '12/05/18', time: '22:00-01:00', location: 'UChicago', compensation: 20, deejayId: 1, bookerId: 4}),
    Gig.create({name: 'Erotic Wobble', date: '12/06/18', time: '21:00-02:00', location: 'Hyde Park', compensation: 30, deejayId: 2, bookerId: 3}),
    Gig.create({name: 'METER', date: '12/07/18', time: '21:00-01:00', location: 'Meter Room', compensation: 40, deejayId: 3, bookerId: 2}),
    Gig.create({name: 'H.A.S.', date: '12/08/18', time: '15:00-20:00', location: 'Humboldt Park', compensation: 50, deejayId: 4, bookerId: 1})
  ])

  // erotic wobble, meter, HAS

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${bookers.length} bookers`)
  console.log(`seeded ${deejays.length} deejays`)
  console.log(`seeded ${gigs.length} gigs`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
