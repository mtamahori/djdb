const User = require('./user')
const Booker = require('./booker')
const Deejay = require('./deejay')
const Gig = require('./gig')
const Message = require('./message')
const Review = require('./review')


// Associations

User.hasOne(Deejay);
User.hasOne(Booker);

// Deejay.belongsTo(User);

Deejay.hasMany(Gig);
Deejay.hasMany(Message);
Deejay.hasMany(Review);

Gig.belongsTo(Deejay);
Message.belongsTo(Deejay);
Review.belongsTo(Deejay);

// Booker.belongsTo(User);

Booker.hasMany(Gig);
Booker.hasMany(Message);
Booker.hasMany(Review);

Gig.belongsTo(Booker);
Message.belongsTo(Booker);
Review.belongsTo(Booker);

Gig.hasMany(Message);
Gig.hasMany(Review);


// Central export for model definitions

module.exports = {
  User,
  Booker,
  Deejay,
  Gig,
  Message,
  Review
};
