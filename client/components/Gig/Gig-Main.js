// NOTE: This component is no longer used. It has been refactored and deconstructed into the components whose filenames begin with "Gig-Main...," which are located in this directory

// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { Button, Grid } from 'semantic-ui-react'
// import { withRouter } from 'react-router-dom'
// import dateFns from 'date-fns'
// import GigList from './Gig-List'
// import NewGigForm from './New-Gig-Form'
// import DeejayList from '../Deejay/Deejay-List'
// import BookerList from '../Booker/Booker-List'
// import FilterGigs from './Filter-Gigs'
// import FilterBookers  from '../Booker/Filter-Bookers'
// import FilterDeejays from '../Deejay/Filter-Deejays'

// class GigMain extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       viewNewGigForm: false,
//       viewOpenGigList: false,
//       viewPastGigList: false,
//       viewUpcomingGigList: false,
//       viewBrowseGigs: false,
//       viewBrowseDeejays: false,
//       viewBrowseBookers: false,
//     }
//   }

//   render() {
//     const { currentBooker, currentDeejay } = this.props;

//     return (
//       <Grid>
//         <Grid.Row columns={2} textAlign="center">
//           <Grid.Column>
//             <Button
//               onClick={() => {
//                 this.state.viewPastGigList === false ?
//                 this.setState({ viewPastGigList: true }) :
//                 this.setState({ viewPastGigList: false })
//               }}
//               size="massive">
//               Past Bookings
//             </Button>
//             {
//               this.state.viewPastGigList && (
//                 this.renderPastGigList()
//               )
//             }
//           </Grid.Column>
//           <Grid.Column>
//             <Button
//               onClick={() => {
//                 this.state.viewUpcomingGigList === false ?
//                 this.setState({ viewUpcomingGigList: true }) :
//                 this.setState({ viewUpcomingGigList: false })
//               }}
//               size="massive">
//               Upcoming Bookings
//             </Button>
//             {
//               this.state.viewUpcomingGigList && (
//                 this.renderUpcomingGigList()
//               )
//             }
//           </Grid.Column>
//         </Grid.Row>

//         {
//           currentDeejay &&
//             <Grid.Row columns={2} textAlign="center">
//               <Grid.Column>
//                     <Button
//                       onClick={() => {
//                         this.state.viewBrowseGigs === false ?
//                         this.setState({ viewBrowseGigs: true }) :
//                         this.setState({ viewBrowseGigs: false })
//                       }}
//                       size="massive">
//                       Browse Open Bookings
//                     </Button>
//                 {
//                   this.state.viewBrowseGigs && (
//                     this.renderBrowseGigs()
//                   )
//                 }
//               </Grid.Column>
//               <Grid.Column>
//                 <Button
//                   onClick={() => {
//                     this.state.viewBrowseBookers === false ?
//                     this.setState({ viewBrowseBookers : true }) :
//                     this.setState({ viewBrowseBookers: false })
//                   }}
//                   size="massive">
//                   Browse Bookers
//                 </Button>
//                 {
//                   this.state.viewBrowseBookers && (
//                     this.renderBrowseBookers()
//                   )
//                 }
//               </Grid.Column>
//             </Grid.Row>
//         }

//         {
//           currentBooker &&
//           <Grid.Row columns={2} textAlign="center">
//             <Grid.Column>
//               <Button
//                 onClick={() => {
//                   this.state.viewNewGigForm === false ?
//                   this.setState({ viewNewGigForm: true }) :
//                   this.setState({ viewNewGigForm: false })
//                 }}
//                 size="massive">
//                 New Booking
//               </Button>
//               {
//                 this.state.viewNewGigForm && (
//                   this.renderNewGigForm()
//                 )
//               }
//             </Grid.Column>
//             <Grid.Column>
//               <Button
//                 onClick={() => {
//                   this.state.viewOpenGigList === false ?
//                   this.setState({ viewOpenGigList: true }) :
//                   this.setState({ viewOpenGigList: false })
//                 }}
//                 size="massive">
//                 Open Bookings
//               </Button>
//               {
//                 this.state.viewOpenGigList && (
//                   this.renderOpenGigList()
//                 )
//               }
//             </Grid.Column>
//           </Grid.Row>
//         }
//         {
//           currentBooker &&
//           <Grid.Row columns={1} textAlign="center">
//               <Grid.Column>
//                 <Button
//                   onClick={() => {
//                     this.state.viewBrowseDeejays === false ?
//                     this.setState({ viewBrowseDeejays: true }) :
//                     this.setState({ viewBrowseDeejays: false })
//                   }}
//                   size="massive">
//                   Browse Deejays
//                 </Button>
//                 {
//                   this.state.viewBrowseDeejays && (
//                     this.renderBrowseDeejays()
//                   )
//                 }
//               </Grid.Column>
//           </Grid.Row>
//         }
//       }

//       </Grid>
//     )
//   }

//   renderNewGigForm() {
//     const { currentBooker } = this.props;
//       return (
//         <NewGigForm currentBooker={currentBooker} key={currentBooker.id} />
//       )
//   }

//   renderOpenGigList() {
//     const { currentBooker, gigs } = this.props;
//     let openGigs;

//       openGigs = gigs.filter(gig => {
//         return (
//           gig.bookerId === currentBooker.id &&
//           gig.deejayId === null &&
//           this.futureDateCheck(gig)
//         )
//       })
//       return (
//         openGigs.length
//         ?
//         <div>
//           <GigList currentBooker={currentBooker} gigs={openGigs} />
//         </div>
//         :
//         <h3>You Have No Open Bookings Right Now</h3>
//       )
//   }

//   renderPastGigList() {
//     const { currentBooker, currentDeejay, gigs } = this.props;
//     let pastGigs;

//     if (currentBooker) {
//       pastGigs = gigs.filter(gig => {
//         return (
//           gig.bookerId === currentBooker.id &&
//           this.pastDateCheck(gig)
//         )
//       })
//       return (
//         pastGigs.length
//         ?
//         <div>
//           <GigList currentBooker={currentBooker} gigs={pastGigs} />
//         </div>
//         :
//         <h3>You Have No Past Gigs Yet</h3>
//       )
//     }

//     else if (currentDeejay) {
//       pastGigs = gigs.filter(gig => {
//         return (
//           gig.deejayId === currentDeejay.id &&
//           this.pastDateCheck(gig)
//         )
//       })
//       return (
//         pastGigs.length
//         ?
//         <div>
//           <GigList currentDeejay={currentDeejay } gigs={pastGigs} />
//         </div>
//         :
//         <h3>You Have No Past Gigs Yet</h3>
//       )
//     }
//   }

//   renderUpcomingGigList() {
//     const { currentBooker, currentDeejay, gigs } = this.props;
//     let upcomingGigs;

//     if (currentBooker) {
//       upcomingGigs = gigs.filter(gig => {
//         return (
//           gig.bookerId === currentBooker.id &&
//           gig.deejayId !== null &&
//           this.futureDateCheck(gig)
//         )
//       })
//       return (
//         upcomingGigs.length
//         ?
//         <div>
//          <GigList currentBooker={currentBooker} gigs={upcomingGigs} />
//         </div>
//         :
//         <h3>You Have No Upcoming Bookings Right Now</h3>
//       )
//     }

//     else if (currentDeejay) {
//       upcomingGigs = gigs.filter(gig => {
//         return (
//           gig.deejayId === currentDeejay.id &&
//           gig.bookerId !== null &&
//           this.futureDateCheck(gig)
//         )
//       })
//       return (
//         upcomingGigs.length
//         ?
//         <div>
//          <GigList currentDeejay={currentDeejay} gigs={upcomingGigs} />
//         </div>
//         :
//         <h3>You Have No Upcoming Bookings Right Now</h3>
//       )
//     }
//   }

//   renderBrowseDeejays() {
//     const { deejays, currentBooker } = this.props;
//     return (
//       <FilterDeejays deejays={deejays} currentBooker={currentBooker} />
//     )
//   }

//   renderBrowseBookers() {
//     const { bookers, currentDeejay } = this.props;
//     return (
//       <FilterBookers bookers={bookers} currentDeejay={currentDeejay} />
//     )
//   }

//   renderBrowseGigs() {
//     const { currentDeejay, gigs } = this.props;

//     if (currentDeejay) {
//       let openGigs = gigs.filter(gig => {
//         return (
//           gig.deejayId === null &&
//           gig.deejayInvites.indexOf(currentDeejay.id) === -1 &&
//           gig.deejayApplicants.indexOf(currentDeejay.id) === -1 &&
//           gig.declinedApps.indexOf(currentDeejay.id) === -1 &&
//           gig.declinedInvs.indexOf(currentDeejay.id) === -1 &&
//           this.futureDateCheck(gig)
//         )
//       })
//       return (
//         <div>
//           <FilterGigs gigs={openGigs} currentDeejay={currentDeejay} />
//         </div>
//       )
//     }
//   }

//   pastDateCheck(gig) {
//     let gigDateArr = gig.date.split('/')
//     let gigYear = gigDateArr[0]
//     let gigMonth = gigDateArr[1]
//     let gigDate = gigDateArr[2]
//     return dateFns.isBefore(new Date(gigYear, gigMonth, gigDate), Date.now())
//   }

//   futureDateCheck(gig) {
//     let gigDateArr = gig.date.split('/')
//     let gigYear = gigDateArr[0]
//     let gigMonth = gigDateArr[1]
//     let gigDate = gigDateArr[2]
//     return dateFns.isAfter(new Date(gigYear, gigMonth, gigDate), Date.now())
//   }

// }

// const mapState = ({ gigs, deejays, bookers }) => ({ gigs, deejays, bookers });
// const mapDispatch = null;

// export default withRouter(connect(mapState, mapDispatch)(GigMain))
