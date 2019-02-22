'use strict'

const db = require('../server/db')
const Promise = require('bluebird');
const { User, Booker, Deejay, Gig, Message } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.each([
    {email: 'max@user.com', password: '123'},
    {email: 'meri@user.com', password: '123'},
    {email: 'miles@user.com', password: '123'},
    {email: 'maeve@user.com', password: '123'},
    {email: 'jason@user.com', password: '123'},
    {email: 'jake@user.com', password: '123'},
    {email: 'ray@user.com', password: '123'},
    {email: 'tom@user.com', password: '123'},
    {email: 'paddy@user.com', password: '123'},
    {email: 'pam@user.com', password: '123'},
  ], (user) => {
    return User.create(user);
  })

  const bookers = await Promise.each([
    {name: 'Max', email: 'max@booker.com', phone: '3108693703', userId: 1},
    {name: 'Meri', email: 'meri@booker.com', phone: '7818012471', userId: 2},
    {name: 'Miles', email: 'miles@booker.com', phone: '4043846952', userId: 3},
    {name: 'Maeve', email: 'maeve@booker.com', phone: '2072660335', userId: 4},
    {name: 'Jason', email: 'jason@booker.com', phone: '0123456789', userId: 5}
  ], (booker) => {
    return Booker.create(booker);
  })

  const deejays = await Promise.each([
    {name: 'Max', email: 'max@deejay.com', phone: '3108693703', userId: 1},
    {name: 'Meri', email: 'meri@deejay.com', phone: '7818012471', userId: 2},
    {name: 'Miles', email: 'miles@deejay.com', phone: '4043846952', userId: 3},
    {name: 'Maeve', email: 'maeve@deejay.com', phone: '2072660335', userId: 4}
  ], (deejay) => {
    return Deejay.create(deejay);
  })

  const gigs = await Promise.each([
    {name: 'Bar Night', date: '2018/11/18', time: '10:00pm - 1:00am', location: 'UChicago', compensation: '20', deejayId: 1, bookerId: 3},
    {name: 'Erotic Wobble', date: '2018/0/18', time: '9:00pm - 2:00am', location: 'Hyde Park', compensation: '30', deejayId: 2, bookerId: 1},
    {name: 'METER', date: '2017/10/18', time: '9:00pm - 1:00am', location: 'Meter Room', compensation: '40', deejayId: 2, bookerId: 1},
    {name: 'Humboldt Arboreal Society', date: '2019/5/6', time: '3:00pm - 8:00pm', location: 'Humboldt Park', compensation: 'fun', deejayId: 1, bookerId: 1},
    {name: 'Punch House', date: '2019/1/19', time: '10:00pm - 2:00am', location: 'Punch House', compensation: '150', deejayId: 1, bookerId: 4},
    {name: 'Smartbar', date: '2019/3/20', time: '10:00pm - 4:00am', location: 'Smartbar', compensation: '150', deejayId: 1, bookerId: 5},

    {name: 'Max bar tunes', date: '2019/2/1', time: '9:00pm - 2:00am', location: 'TBD', compensation: '100', deejayId: 1},
    {name: 'Max party', date: '2019/2/2', time: '9:00pm - 2:00am', location: 'TBD', compensation: '100', deejayId: 1},
    {name: 'Miles big mix', date: '2019/2/3', time: '9:00pm - 2:00am', location: 'TBD', compensation: '100', deejayId: 3},
    {name: 'Meri big mix', date: '2019/2/4', time: '9:00pm - 2:00am', location: 'TBD', compensation: '100', deejayId: 2},

    {name: 'Open Humboldt', date: '2019/7/10', time: '12:00pm - 8:00pm', location: 'Humboldt Park', compensation: 'fun', bookerId: 1, deejayInvites: [2]},
    {name: 'Open House Party', date: '2019/6/10', time: '12:00pm - 10:00pm', location: 'Albany Park', compensation: 'fun', bookerId: 1},
    {name: 'Open Danny\'s', date: '2019/2/20', time: '10:00pm - 2:00am', location: 'Danny\'s', compensation: '150', bookerId: 2},
    {name: 'Open Whistler', date: '2019/1/15', time: '10:00pm - 2:00am', location: 'The Whistler', compensation: '150', bookerId: 3},
    {name: 'Open Constellation', date: '2019/8/19', time: '10:00pm - 2:00am', location: 'Constellation', compensation: '150', bookerId: 4},
    {name: 'Open Smartbar', date: '2019/4/2', time: '10:00pm - 5:00am', location: 'smartbar', compensation: '250', bookerId: 5}
  ], (gig) => {
    return Gig.create(gig);
  })

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
