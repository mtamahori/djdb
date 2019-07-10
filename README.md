DJDB
by Tamahori

// WHAT IT DOES

DJDB is a booking service for local deejays and talent buyers.
Users can sign up for free and create a deejay profile and a booker profile.
Features are generally the same, but some will differ depending on what mode a user is in.

The general functionality is as follows:

Both bookers and deejays can view various lists of gigs (invitations, applications, past, upcoming, open, etc).
Both bookers and deejays can view gigs corresponding to the calendar UI.
Both bookers and deejays can send messages to one another.

Bookers have the ability to view a list of deejays.
Bookers can invite deejays to play a particular gig.
Bookers can accept/decline/retract booking requests from deejays.

Deejays have the ability to view a list of open gigs.
Deejays can apply to play open gigs.
Deejays can accept/decline/retract booking requests from bookers.

There is also basis scheduling functionality; bookers and deejays both have

// WHY I MADE IT

DJDB is a response to a problem that I have encountered in my experience as a deejay in Chicago: it is difficult to get gigs,especially if you are just getting started. The old paradigm of networking will always remain, as it should. However, both deejays and bookers could benefit from having easy access to lists of local gigs and talent, respectively. Deejays are always trying to get booked, and bookers can often benefit from bringing in some new blood.

The goal of DJDB is to make the browsing and booking process easier for both deejays and bookers.

// HOW IT WORKS



// // CLIENT (hierarchy)

Deejay
Booker
Gig
Calendar
Channel
Message

DeejayDetailBrowse
BookerDetailBrowse

props

  currentBooker
  currentDeejay

// // SERVER

Express Server

Postgres Database

Sequelize ORM

