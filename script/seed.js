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
    {email: 'underground@email.com', password: '123'},
  ], (user) => {
    return User.create(user);
  })

  const bookers = await Promise.each([
    {name: 'Max', email: 'max@email.com', phone: '1234567890', userId: 1, bio: 'This is booker bio for Max, bio for Max here.'},
    {name: 'Smartbar', email: 'smartbar@email.com', phone: '1234567890', userId: 13, bio: 'This is booker bio for Smartbar, bio for Smartbar here.'},
    {name: 'Dannys', email: 'dannys@email.com', phone: '1234567890', userId: 14, bio: 'This is booker bio for Dannys, bio for Dannys here.'},
    {name: 'Punch House', email: 'punchhouse@email.com', phone: '1234567890', userId: 15, bio: 'This is booker bio for Punch House, bio for Punch House here.'},
    {name: 'Whistler', email: 'whistler@email.com', phone: '1234567890', userId: 16, bio: 'This is booker bio for Whistler, bio for Whistler here.'},
    {name: 'Booze Box', email: 'boozebox@email.com', phone: '1234567890', userId: 17, bio: 'This is booker bio for Booze Box, bio for Booze Box here.'},
    {name: 'Hideout', email: 'hideout@email.com', phone: '1234567890', userId: 18, bio: 'This is booker bio for Hideout, bio for Hidout here.'},
    {name: 'Humboldt Arboreal Society', email: 'arboreal@email.com', phone: '1234567890', userId: 19, bio: 'We love trees yes we do yes we do'},
    {name: 'Underground', email: 'underground@email.com', phone: '1234567890', userId: 20, bio: 'This is very cool bio for very cool underground booker.'}
  ], (booker) => {
    return Booker.create(booker)
  })

  const deejays = await Promise.each([
    {name: 'Max', email: 'max@email.com', phone: '1234567890', userId: 1, bio: 'This is deejay bio for Max, bio for Max here.', styleTags: ['jazz', 'funk', 'disco', 'boogie', 'house', 'techno']},
    {name: 'Meri', email: 'meri@email.com', phone: '1234567890', userId: 2, bio: 'This is deejay bio for Meri, bio for Meri here.', styleTags: ['house', 'techno']},
    {name: 'Miles', email: 'miles@email.com', phone: '1234567890', userId: 3, bio: 'This is deejay bio for Miles, bio for Miles here.', styleTags: ['funk', 'disco', 'house', 'techno', 'bangers']},
    {name: 'Maeve', email: 'maeve@email.com', userId: 4, bio: 'This is deejay bio for Maeve, bio for Maeve here.', styleTags: ['house', 'techno']},
    {name: 'Jason', email: 'jason@email.com', userId: 5, bio: 'This is deejay bio for Jason, bio for Jason here.', styleTags: ['house', 'techno', 'bangers']},
    {name: 'Jake', email: 'jake@email.com', userId: 6, bio: 'This is deejay bio for Jake, bio for Jake here.', styleTags: ['soul', 'disco', 'house', 'techno']},
    {name: 'Ray', email: 'ray@email.com', userId: 7, bio: 'This is deejay bio for Ray, bio for Ray here.', styleTags: ['disco', 'house']},
    {name: 'Tom', email: 'tom@email.com', userId: 8, bio: 'This is deejay bio for Tom, bio for Tom here', styleTags: ['house', 'techno', 'bangers']},
    {name: 'Paddy', email: 'paddy@email.com', userId: 9, bio: 'This is deejay bio for Paddy, bio for Paddy here.', styleTags: ['techno', 'bangers']},
    {name: 'Merrick', email: 'merrick@email.com', userId: 10, bio: 'This is deejay bio for Merrick, bio for Merrick here.', styleTags: ['disco', 'funk', 'house', 'acid']},
    {name: 'Alicia', email: 'alicia@email.com', userId: 11, bio: 'This is deejay bio for Alicia, bio for Alicia here.', styleTags: ['techno', 'acid']},
    {name: 'Sam', email: 'sam@email.com', userId: 12, bio: 'This is deejay bio for Sam, bio for Sam here.', styleTags: ['house', 'techno', 'acid', 'bangers']}
  ], (deejay) => {
    return Deejay.create(deejay);
  })

  const gigs = await Promise.each([
    {name: 'Bar Night', date: '2018/11/18', time: '10:00pm - 1:00am', location: 'UChicago', compensation: '20', deejayId: 1, bookerId: 1, styleTags: ['house', 'techno', 'bangers']},
    {name: 'Erotic Wobble', date: '2018/0/18', time: '9:00pm - 2:00am', location: 'Hyde Park', compensation: '30', deejayId: 2, bookerId: 1, styleTags: ['house', 'techno', 'bangers']},
    {name: 'METER', date: '2017/10/18', time: '9:00pm - 1:00am', location: 'Meter Room', compensation: '40', deejayId: 2, bookerId: 1, styleTags: ['house', 'techno', 'bangers']},
    {name: 'Humboldt Arboreal Society', date: '2019/5/6', time: '3:00pm - 8:00pm', location: 'Humboldt Park', compensation: 'fun', deejayId: 3, bookerId: 8, styleTags: ['ambient', 'soundtrack', 'jazz', 'soul', 'funk', 'disco', 'boogie', 'house']},
    {name: 'Past Punch House', date: '2019/1/19', time: '10:00pm - 2:00am', location: 'Punch House', compensation: '150', deejayId: 1, bookerId: 4, styleTags: ['soul', 'funk', 'disco', 'boogie', 'hip-hop', 'dub']},
    {name: 'Smartbar', date: '2019/3/20', time: '10:00pm - 4:00am', location: 'Smartbar', compensation: '150', deejayId: 1, bookerId: 2, styleTags: ['house', 'techno']},
    {name: 'Humboldt Arboreal Society Kickoff', date: '2019/7/10', time: '12:00pm - 8:00pm', location: 'Humboldt Park', compensation: 'fun', bookerId: 8, styleTags: ['ambient', 'soundtrack', 'jazz', 'soul', 'funk', 'disco', 'boogie', 'house'], deejayApplicants: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
    {name: 'Max House Party #1', date: '2019/6/10', time: '12:00pm - 10:00pm', location: 'Albany Park', compensation: 'fun', bookerId: 1, styleTags: ['jazz', 'soul', 'funk', 'disco', 'boogie', 'house', 'techno', 'acid'], deejayInvites: [5, 6, 7, 8, 9, 10, 11, 12]},
    {name: 'Open Format at BoozeBox', date: '2019/6/8', time: '9:00pm - 2:00am', location: 'Booze Box', compensation: '150', deejayId: 1, bookerId: 6, styleTags: ['soul', 'funk', 'hip-hop', 'disco']},
    {name: 'Clark St Jams at Hideout', date: '2019/5/20', time: '11:00pm - 3:00am', location: 'Hideout', compensation: '75', bookerId: 7, styleTags: ['house', 'techno'], deejayApplicants: [1]},
    {name: 'Underground Party', date: '2019/7/1', time: '11:00pm - 7:00am', location: 'TBA', compensation: '200', bookerId: 9, styleTags: ['techno', 'acid', 'bangers'], deejayApplicants: [1, 2, 3, 4, 5, 6]},
    {name: 'Monday at Danny\'s', date: '2019/5/20', time: '10:00pm - 2:00am', location: 'Danny\'s', compensation: '150', bookerId: 3, styleTags: ['jazz', 'dub', 'soul', 'disco', 'boogie'], deejayApplicants: [2, 4, 6, 8], deejayInvites: [1, 3, 5, 7, 9]},
    {name: 'Night at the Whistler', date: '2019/6/15', time: '10:00pm - 2:00am', location: 'The Whistler', compensation: '150', bookerId: 5, styleTags: ['jazz', 'soul', 'disco']},
    {name: 'Smartbar Opening Slot', date: '2019/7/2', time: '10:00pm - 5:00am', location: 'smartbar', compensation: '250', bookerId: 2, styleTags: ['ambient', 'house', 'techno'], deejayApplicants: [2, 3, 4, 6, 7, 8], deejayInvites: [1]},
    {name: 'Punch House Residency', date: '2019/6/1', time: '9:00pm - 2:00am', location: 'Punch House', compensation: '150', deejayId: 1, bookerId: 4, styleTags: ['soul', 'funk', 'disco', 'boogie', 'house', 'ambient']},
    {name: 'Max Patio Party #1', date: '2019/5/10', time: '12:00pm - 10:00pm', location: 'Albany Park', compensation: 'fun', deejayId: 2, bookerId: 1, styleTags: ['jazz', 'soul', 'funk', 'disco', 'boogie', 'house', 'techno', 'acid'], deejayApplicants: [2, 3, 4], deejayInvites: [5, 6, 7, 8, 9, 10, 11, 12]},
    {name: 'Max House Party #2', date: '2019/9/10', time: '12:00pm - 10:00pm', location: 'Albany Park', compensation: 'fun', bookerId: 1, styleTags: ['jazz', 'soul', 'funk', 'disco', 'boogie', 'house', 'techno', 'acid'], deejayApplicants: [2, 3, 4], deejayInvites: [5, 6, 7, 8, 9, 10, 11, 12]},
    {name: 'Max Patio Party #2', date: '2019/8/10', time: '12:00pm - 10:00pm', location: 'Albany Park', compensation: 'fun', bookerId: 1, styleTags: ['jazz', 'soul', 'funk', 'disco', 'boogie', 'house', 'techno', 'acid'], deejayApplicants: [2, 3, 4, 5, 6]},
    {name: 'Max House Party #3', date: '2019/6/20', time: '12:00pm - 10:00pm', location: 'Albany Park', compensation: 'fun', bookerId: 1, styleTags: ['jazz', 'soul', 'funk', 'disco', 'boogie', 'house', 'techno', 'acid'], deejayInvites: [5, 6, 7, 11, 12]},
  ], (gig) => {
    return Gig.create(gig);
  })

  const channels = await Promise.each([
    { name: 'Max + Smartbar', bookerId: 2, deejayId: 1, bookerLastRead: new Date('April 9, 2019 03:34:01'), deejayLastRead: new Date('April 9, 2019 03:24:01') },
    { name: 'Max + Dannys', bookerId: 3, deejayId: 1, bookerLastRead: new Date('April 10, 2019 04:44:01'), deejayLastRead: new Date('April 10, 2019 04:34:01')},
    { name: 'Max + Punch House', bookerId: 4, deejayId: 1, bookerLastRead: new Date('April 11, 2019 03:44:01'), deejayLastRead: new Date('April 11, 2019 03:34:01')},
    { name: 'Max + Whistler', bookerId: 5, deejayId: 1, bookerLastRead: new Date('April 12, 2019 04:44:01'), deejayLastRead: new Date('April 12, 2019 04:34:01')},

    { name: 'Max + Meri', bookerId: 1, deejayId: 2, deejayLastRead: new Date('May 15, 2019 08:00:00') },
    { name: 'Max + Miles', bookerId: 1, deejayId: 3, deejayLastRead: new Date('May 15, 2019 08:00:00') }
  ], (channel) => {
    return Channel.create(channel);
  })

  const messages = await Promise.each([
    { content: 'Hello Max', timestamp: new Date('April 9, 2019 03:24:00'), channelId: 1, bookerId: 2},
    { content: 'Hello Smartbar', timestamp: new Date('April 9, 2019 03:34:00'), channelId: 1, deejayId: 1},
    { content: 'YO MAX', timestamp: new Date('May 9, 2019 03:24:00'), channelId: 1, bookerId: 2},

    { content: 'Hello Max', timestamp: new Date('April 10, 2019 04:34:00'), channelId: 2, bookerId: 3},
    { content: 'Hello Dannys', timestamp: new Date('April 10, 2019 04:44:00'), channelId: 2, deejayId: 1},
    { content: 'YO MAX', timestamp: new Date('May 10, 2019 03:34:00'), channelId: 2, bookerId: 3},

    { content: 'Hello Max', timestamp: new Date('April 11, 2019 03:34:00'), channelId: 3, bookerId: 4},
    { content: 'Hello Punch House', timestamp: new Date('April 11, 2019 03:44:00'), channelId: 3, deejayId: 1},
    { content: 'YO MAX', timestamp: new Date('May 11, 2019 03:34:00'), channelId: 3, bookerId: 4},

    { content: 'Hello Max', timestamp: new Date('April 12, 2019 04:34:00'), channelId: 4, bookerId: 5},
    { content: 'Hello Whistler', timestamp: new Date('April 12, 2019 04:44:00'), channelId: 4, deejayId: 1},
    { content: 'YO MAX', timestamp: new Date('May 12, 2019 03:34:00'), channelId: 4, bookerId: 5},

    { content: 'Hey Max', timestamp: new Date('May 15, 2019 06:00:00'), channelId: 5, deejayId: 2 },
    { content: 'Hey Max', timestamp: new Date('May 15, 2019 07:00:00'), channelId: 5, deejayId: 2 },
    { content: 'Hey Max', timestamp: new Date('May 15, 2019 08:00:00'), channelId: 5, deejayId: 2 },

    { content: 'Hey Max', timestamp: new Date('May 15, 2019 06:00:00'), channelId: 6, deejayId: 3 },
    { content: 'Hey Max', timestamp: new Date('May 15, 2019 07:00:00'), channelId: 6, deejayId: 3 },
    { content: 'Hey Max', timestamp: new Date('May 15, 2019 08:00:00'), channelId: 6, deejayId: 3 }
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
