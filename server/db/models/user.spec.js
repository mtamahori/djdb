// /* global describe beforeEach it */

// const {expect} = require('chai')
// const db = require('../index')
// const User = db.model('user')

// describe('User model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('instanceMethods', () => {
//     describe('correctPassword', () => {
//       let max

//       beforeEach(async () => {
//         max = await User.create({
//           email: 'max@max.max',
//           password: 'boru'
//         })
//       })

//       it('returns true if the password is correct', () => {
//         expect(max.correctPassword('boru')).to.be.equal(true)
//       })

//       it('returns false if the password is incorrect', () => {
//         expect(max.correctPassword('bowu')).to.be.equal(false)
//       })
//     }) // end describe('correctPassword')
//   }) // end describe('instanceMethods')
// }) // end describe('User model')
