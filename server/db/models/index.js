const User = require('./user')
const Booker = require('./booker')
const Deejay = require('./deejay')
const Gig = require('./gig')
const Message = require('./message')


// Associations

User.hasOne(Deejay);
User.hasOne(Booker);

// Deejay.belongsTo(User);

Deejay.hasMany(Gig);
Deejay.hasMany(Message);

Gig.belongsTo(Deejay);
Message.belongsTo(Deejay);

// Booker.belongsTo(User);

Booker.hasMany(Gig);
Booker.hasMany(Message);

Gig.belongsTo(Booker);
Message.belongsTo(Booker);

Gig.hasMany(Message);


// Central export for model definitions

module.exports = {
  User,
  Booker,
  Deejay,
  Gig,
  Message,
};
