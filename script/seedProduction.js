'use strict'

const db = require('../server/db')
const Promise = require('bluebird')
const { User, Booker, Deejay, Gig, Channel, Message } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')

  const users = await Promise.each([

  ])

  const bookers = await Promise.each([

  ])

  const deejays = await Promise.each([

  ])

  const gigs = await Promise.each([

  ])

  const channels = await Promise.each([

  ])

  const messages = await Promise.each([

  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${bookers.length} bookers`)
  console.log(`seeded ${deejays.length} deejays`)
  console.log(`seeded ${gigs.length} gigs`)
  console.log(`seeded ${channels.length} channels`)
  console.log(`seeded ${messages.length} messages`)
  console.log(`seeded successfully`)

}



async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCodee = 1
  } finally {
    console.log('closing db connection ')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed;
