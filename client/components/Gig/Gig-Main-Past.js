import React from 'react'
import { Button } from 'semantic-ui-react'

// VIEW PAST GIGS

const PastGigList = (props) => {
  const { toggleView, toggleCalendar } = props;
  return (
    <div>
      <Button
        onClick={() => {
          toggleView('viewPastGigs')
          toggleCalendar('pastGigs')
        }}
        size="massive">
        Past Bookings
      </Button>
    </div>
  )
}

export default PastGigList;

// class PastGigList extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       view: false
//     }

//     this.handleClick = this.handleClick.bind(this)
//   }

//   render() {
//     return (
//       <div>
//         <Button
//           onClick={this.handleClick}
//           size="massive"
//         >Past Bookings
//         </Button>
//         {
//           this.state.view && this.renderPastGigList()
//         }
//       </div>
//     )
//   }

//   renderPastGigList() {
//     const { currentBooker, currentDeejay, gigs } = this.props;
//     let pastGigs;

//     if (currentBooker) {
//       pastGigs = this.getBookerPastGigs(currentBooker, gigs)
//       return (
//         pastGigs.length ?
//         <GigList currentBooker={currentBooker} gigs={pastGigs} /> :
//         <h3>You Have No Past Gigs Yet</h3>
//       )
//     }

//     else if (currentDeejay) {
//       pastGigs = this.getDeejayPastGigs(currentDeejay, gigs)
//       return (
//         pastGigs.length ?
//         <GigList currentDeejay={currentDeejay } gigs={pastGigs} /> :
//         <h3>You Have No Past Gigs Yet</h3>
//       )
//     }
//   }

//   // the reason for the handleClick is that setCalendarGigs cannot be called within a render method; components should only be pure functions of props and state.

//   handleClick(event) {
//     const { currentBooker, currentDeejay, gigs, setCalendarGigs } = this.props;
//     let pastGigs;

//     event.preventDefault();
//     this.setState(state => ({
//       view: !state.view
//     }))

//     //the check below for this.state.view should really be true, but because of the async nature of setState, the behavior I want (i.e. setCalendarGigs is dispatched only if the view is set to true) only works if it is checking for false. Consider it brittle

//     if (currentBooker) {
//       pastGigs = this.getBookerPastGigs(currentBooker, gigs)
//       return (
//         pastGigs.length &&
//         this.state.view === false &&
//         setCalendarGigs(pastGigs)
//       )
//     }

//     else if (currentDeejay) {
//       pastGigs = this.getDeejayPastGigs(currentDeejay, gigs)
//       return (
//         pastGigs.length &&
//         this.state.view === false &&
//         setCalendarGigs(pastGigs)
//       )
//     }
//   }

//   getBookerPastGigs(currentBooker, gigs) {
//     return gigs.filter(gig => {
//       return (
//         gig.bookerId === currentBooker.id &&
//         this.pastDateCheck(gig)
//       )
//     })
//   }

//   getDeejayPastGigs(currentDeejay, gigs) {
//     return gigs.filter(gig => {
//       return (
//         gig.deejayId === currentDeejay.id &&
//         this.pastDateCheck(gig)
//       )
//     })
//   }

//   pastDateCheck(gig) {
//     let gigDateArr = gig.date.split('/')
//     let gigYear = gigDateArr[0]
//     let gigMonth = gigDateArr[1]
//     let gigDate = gigDateArr[2]
//     return dateFns.isBefore(new Date(gigYear, gigMonth, gigDate), Date.now())
//   }
// }

// const mapState = null;
// const mapDispatch = ({ setCalendarGigs });

// export default connect(mapState, mapDispatch)(PastGigList)
