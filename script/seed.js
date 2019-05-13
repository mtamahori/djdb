'use strict'

const db = require('../server/db')
const Promise = require('bluebird');
const { User, Booker, Deejay, Gig, Channel, Message } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.each([
    {email: 'max@email.com', password: '123'},
    {email: 'meri@email.com', password: '123'},
    {email: 'miles@email.com', password: '123'},
    {email: 'maeve@email.com', password: '123'},
    {email: 'jason@email.com', password: '123'},
    {email: 'jake@email.com', password: '123'},
    {email: 'ray@email.com', password: '123'},
    {email: 'tom@email.com', password: '123'},
    {email: 'paddy@email.com', password: '123'},
    {email: 'merrick@email.com', password: '123'},
    {email: 'alicia@email.com', password: '123'},
    {email: 'sam@email.com', password: '123'},

    {email: 'smartbar@email.com', password: '123'},
    {email: 'dannys@email.com', password: '123'},
    {email: 'punchhouse@email.com', password: '123'},
    {email: 'whistler@email.com', password: '123'},
    {email: 'boozebox@email.com', password: '123'},
    {email: 'hideout@email.com', password: '123'},
    {email: 'arboreal@email.com', password: '123'},
    {email: 'underground@email.com', password: '123'}
  ], (user) => {
    return User.create(user);
  })

  const bookers = await Promise.each([
    {name: 'Max', email: 'max@email.com', phone: '3108693703', userId: 1, bio: 'This is Max booker bio description very useful and long much text'},
    {name: 'Smartbar', email: 'smartbar@email.com', phone: '1234567890', userId: 13},
    {name: 'Dannys', email: 'dannys@email.com', phone: '1234567890', userId: 14},
    {name: 'Punch House', email: 'punchhouse@email.com', phone: '1234567890', userId: 15},
    {name: 'Whistler', email: 'whistler@email.com', phone: '1234567890', userId: 16},
    {name: 'Booze Box', email: 'boozebox@email.com', phone: '1234567890', userId: 17},
    {name: 'Hideout', email: 'hideout@email.com', phone: '1234567890', userId: 18},
    {name: 'Humboldt Arboreal Society', email: 'arboreal@email.com', phone: '1234567890', userId: 19},
    {name: 'Underground', email: 'underground@email.com', phone: '1234567890', userId: 20}
  ], (booker) => {
    return Booker.create(booker);
  })

  const deejays = await Promise.each([
    {name: 'Max', email: 'max@email.com', phone: '3108693703', userId: 1, bio: 'This is Max booker bio description very useful and long much text', styleTags: ['house', 'disco']},
    {name: 'Meri', email: 'meri@email.com', phone: '7818012471', userId: 2},
    {name: 'Miles', email: 'miles@email.com', phone: '4043846952', userId: 3},
    {name: 'Maeve', email: 'maeve@email.com', phone: '2072660335', userId: 4},
    {name: 'Jason', email: 'jason@email.com', phone: '1234567890', userId: 5},
    {name: 'Jake', email: 'jake@email.com', phone: '1234567890', userId: 6},
    {name: 'Ray', email: 'ray@email.com', phone: '1234567890', userId: 7},
    {name: 'Tom', email: 'tom@email.com', phone: '1234567890', userId: 8},
    {name: 'Paddy', email: 'paddy@email.com', phone: '1234567890', userId: 9},
    {name: 'Merrick', email: 'merrick@email.com', phone: '1234567890', userId: 10},
    {name: 'Alicia', email: 'alicia@email.com', phone: '1234567890', userId: 11},
    {name: 'Sam', email: 'sam@email.com', phone: '1234567890', userId: 12}
  ], (deejay) => {
    return Deejay.create(deejay);
  })

  const gigs = await Promise.each([
    {name: 'Bar Night', date: '2018/11/18', time: '10:00pm - 1:00am', location: 'UChicago', compensation: '20', deejayId: 1, bookerId: 1},
    {name: 'Erotic Wobble', date: '2018/0/18', time: '9:00pm - 2:00am', location: 'Hyde Park', compensation: '30', deejayId: 2, bookerId: 1},
    {name: 'METER', date: '2017/10/18', time: '9:00pm - 1:00am', location: 'Meter Room', compensation: '40', deejayId: 2, bookerId: 1},
    {name: 'Humboldt Arboreal Society', date: '2019/5/6', time: '3:00pm - 8:00pm', location: 'Humboldt Park', compensation: 'fun', deejayId: 3, bookerId: 8},
    {name: 'Past Punch House', date: '2019/1/19', time: '10:00pm - 2:00am', location: 'Punch House', compensation: '150', deejayId: 1, bookerId: 4},
    {name: 'Smartbar', date: '2019/3/20', time: '10:00pm - 4:00am', location: 'Smartbar', compensation: '150', deejayId: 1, bookerId: 2},
    {name: 'Humboldt Arboreal Society Kickoff', date: '2019/7/10', time: '12:00pm - 8:00pm', location: 'Humboldt Park', compensation: 'fun', bookerId: 8},
    {name: 'Max House Party', date: '2019/6/10', time: '12:00pm - 10:00pm', location: 'Albany Park', compensation: 'fun', bookerId: 1, styleTags: ['jazz', 'soul', 'disco', 'boogie', 'house', 'techno']},
    {name: 'Open Format at BoozeBox', date: '2019/5/8', time: '9:00pm - 2:00am', location: 'Booze Box', compensation: '150', bookerId: 6},
    {name: 'Clark St Jams at Hideout', date: '2019/5/20', time: '11:00pm - 3:00am', location: 'Hideout', compensation: '50', bookerId: 7},
    {name: 'Underground Party', date: '2019/7/1', time: '11:00pm - 7:00am', location: 'TBA', compensation: '200', bookerId: 9},
    {name: 'Monday at Danny\'s', date: '2019/5/20', time: '10:00pm - 2:00am', location: 'Danny\'s', compensation: '150', bookerId: 3},
    {name: 'Night at the Whistler', date: '2019/4/15', time: '10:00pm - 2:00am', location: 'The Whistler', compensation: '150', bookerId: 5},
    {name: 'Smartbar Opening Slot', date: '2019/4/2', time: '10:00pm - 5:00am', location: 'smartbar', compensation: '250', bookerId: 2}
  ], (gig) => {
    return Gig.create(gig);
  })

  const channels = await Promise.each([
    { name: 'Max + Smartbar', bookerId: 2, deejayId: 1, bookerLastRead: new Date('April 9, 2019 03:34:01'), deejayLastRead: new Date('April 9, 2019 03:24:01') },
    { name: 'Max + Dannys', bookerId: 3, deejayId: 1, bookerLastRead: new Date('April 10, 2019 04:44:01'), deejayLastRead: new Date('April 10, 2019 04:34:01')},
    { name: 'Max + Punch House', bookerId: 4, deejayId: 1, bookerLastRead: new Date('April 11, 2019 03:44:01'), deejayLastRead: new Date('April 11, 2019 03:34:01')},
    { name: 'Max + Whistler', bookerId: 5, deejayId: 1, bookerLastRead: new Date('April 12, 2019 04:44:01'), deejayLastRead: new Date('April 12, 2019 04:34:01')}
  ], (channel) => {
    return Channel.create(channel);
  })

  const messages = await Promise.each([
    { content: 'Hello Max', timestamp: new Date('April 9, 2019 03:24:00'), channelId: 1, bookerId: 2},
    { content: 'Hello Smartbar', timestamp: new Date('April 9, 2019 03:34:00'), channelId: 1, deejayId: 1},

    { content: 'Hello Max', timestamp: new Date('April 10, 2019 04:34:00'), channelId: 2, bookerId: 3},
    { content: 'Hello Dannys', timestamp: new Date('April 10, 2019 04:44:00'), channelId: 2, deejayId: 1},

    { content: 'Hello Max', timestamp: new Date('April 11, 2019 03:34:00'), channelId: 3, bookerId: 4},
    { content: 'Hello Punch House', timestamp: new Date('April 11, 2019 03:44:00'), channelId: 3, deejayId: 1},

    { content: 'Hello Max', timestamp: new Date('April 12, 2019 04:34:00'), channelId: 4, bookerId: 5},
    { content: 'Hello Whistler', timestamp: new Date('April 12, 2019 04:44:00'), channelId: 4, deejayId: 1},
  ], (message) => {
    return Message.create(message)
  })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${bookers.length} bookers`)
  console.log(`seeded ${deejays.length} deejays`)
  console.log(`seeded ${gigs.length} gigs`)
  console.log(`seeded ${channels.length} channels`)
  console.log(`seeded ${messages.length} messages`)
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
