const User = require('./user')
const Booker = require('./booker')
const Deejay = require('./deejay')
const Gig = require('./gig')
const Channel = require('./channel')
const Message = require('./message')

User.hasOne(Deejay);
User.hasOne(Booker);

Deejay.hasMany(Gig);
Deejay.hasMany(Channel);
Deejay.hasMany(Message);

Booker.hasMany(Gig);
Booker.hasMany(Channel);
Booker.hasMany(Message);

Channel.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true
});
Message.belongsTo(Channel);

module.exports = {
  User,
  Booker,
  Deejay,
  Gig,
  Channel,
  Message,
};
