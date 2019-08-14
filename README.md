# DJDB

  by Max Tamahori
  in Chicago, IL
  2018-2019

---------------- WHY IT EXISTS / WHO IT IS FOR

DJDB is a response to a problem that I have encountered in my experience as a deejay in Chicago: it is difficult to get booked for gigs. The old paradigm of networking will always remain, as it should. However, both deejays and bookers could benefit from having easy access to lists of local gigs and talent, respectively. Deejays are always trying to get booked, and bookers can often benefit from bringing in some new blood.

The goal of DJDB is to make the browsing and booking process easier for both deejays and bookers.

---------------- GETTING STARTED

Clone the repository from https://github.com/mtamahori/djdb.

Then, run the following scripts:

(1) npm install
(2) npm seed
(3) npm run start-dev

The first script will install all dependencies using npm.
The second script will seed the database.
The third script will run the Webpack build and start the server.

---------------- ABOUT THE SEED FILE

The seed file creates 20 user instances (name, email, password). Some of them represent individuals while others resemble venues that have a dedicated talent buyer. The former are used to create deejay instances, while the latter are used to create booker instances. A number of assorted gigs are also created, along with a few chat channels and messages.

---------------- HOW THE APP WORKS (FROM A USER'S PERSPECTIVE)

DJDB is a booking service for local deejays and talent buyers.
Users can sign up for free and create a deejay profile and a booker profile.
Features for both are generally the same, but some will differ depending on what mode a user is in.

Here is a very general overview of the core functionality:

Users can sign up for a basic profile that provides two additional options: a booker

Both bookers and deejays can view various lists of gigs on their profiles (invitations, applications, past, upcoming, open, etc).
Both bookers and deejays can view gigs corresponding to the calendar UI.
Both bookers and deejays can send messages to one another.

Bookers can view a list of deejays.
Bookers can invite deejays to play a particular gig, and retract if necessary.
Bookers can accept or decline applications from deejays.

Deejays can view a list of open gigs.
Deejays can apply to play open gigs, and retract if necessary.
Deejays can accept or decline invitations from bookers.

---------------- HOW THE APP WORKS (FROM A DEVELOPER'S PERSPECTIVE)

-------- HIGH LEVEL OVERVIEW:

Server
  - Node.js application
  - Express server and API
  - Postgres database using Sequelize ORM

  In development, the Postgres database defaults to connecting via "postgres://localhost:5432/djdb".

Client
  - React application using Redux (react-redux) state management
  - Semantic UI component library
  - Webpack build tool
  - Babel JS compiler

  Each component has a single in-line comment (after the imports) which explains the component's basic function.

-------- THE NITTY GRITTY:
