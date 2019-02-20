import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateGig } from '../../store'
import { List, Button } from 'semantic-ui-react'
import history from '../../history'

class DeejayDetailBrowse extends Component {
  constructor (props) {
    super(props)

    this.handleBookingInvite = this.handleBookingInvite.bind(this);
    this.handleBookingAccept = this.handleBookingAccept.bind(this);
    this.handleBookingDecline = this.handleBookingDecline.bind(this);
  }

  // REFACTORING ATTEMPT START
  render () {
    const { currentDeejayBrowse } = this.props;
    const { currentGig } = this.props.location.state;
    const conditions = this.getBools();

    const bools = `${conditions.isCurrentGig}-${conditions.isCurrentDeejayBrowse}-${conditions.hasDeejay}-${conditions.isApplicant}-${conditions.isInvite}-${conditions.hasDeclinedApp}-${conditions.hasDeclinedInv}`

    return (
      <div>
        {{
          //eslint-disable-next-line no-useless-computed-key
          ['true-true-false-false-false-false-false']:
          <Button
            size="massive"
            onClick={(event) => this.handleBookingInvite(event)}
          >
          Send Booking Request
          </Button>
        }[bools]}
      </div>
    )
  }

  getBools() {
    const { currentDeejayBrowse } = this.props;
    const { currentGig } = this.props.location.state;
    return {
      isCurrentGig: !!currentGig,
      isCurrentDeejayBrowse: !!currentDeejayBrowse,
      hasDeejay: !!currentGig.deejayId,
      isApplicant: currentGig.deejayApplicants.includes(currentDeejayBrowse.id),
      isInvite: currentGig.deejayInvites.includes(currentDeejayBrowse.id),
      hasDeclinedApp: currentGig.declinedApps.includes(currentDeejayBrowse.id),
      hasDeclinedInv: currentGig.declinedInvs.includes(currentDeejayBrowse.id)
    }
  }
  // REFACTORING ATTEMPT END

  // PREVIOUS ATTEMPT

  // render() {
  //   const { currentDeejayBrowse } = this.props;
  //   const { currentGig } = this.props.location.state;

  //   if (!currentDeejayBrowse) {
  //     return <h1>Error Loading Deejay Details</h1>
  //   }

  //   if (!currentGig) {
  //     return (
  //       <div>
  //         <h3>Deejay Details</h3>
  //         {
  //           <List key={currentDeejayBrowse.id} >
  //             <List.Item icon='users' content={currentDeejayBrowse.name} />
  //             <List.Item icon='marker' content='Chicago, IL' />
  //             <List.Item icon='mail' content={currentDeejayBrowse.email} />
  //             <List.Item icon='phone' content={currentDeejayBrowse.phone} />
  //           </List>
  //         }
  //       </div>
  //     )
  //   }

  //   else if (currentDeejayBrowse) {
  //     return (
  //       <div>
  //       <h3>Deejay Details</h3>
  //         {
  //           <List key={currentDeejayBrowse.id} >
  //             <List.Item icon='users' content={currentDeejayBrowse.name} />
  //             <List.Item icon='marker' content='Chicago, IL' />
  //             <List.Item icon='mail' content={currentDeejayBrowse.email} />
  //             <List.Item icon='phone' content={currentDeejayBrowse.phone} />
  //           </List>
  //         }
  //         {
  //           !currentGig.deejayId &&
  //           currentGig.deejayInvites.indexOf(currentDeejayBrowse.id) === -1 &&
  //           currentGig.deejayApplicants.indexOf(currentDeejayBrowse.id) === -1 &&
  //           <Button
  //             size='massive'
  //             onClick={(event) => this.handleBookingInvite(event)}
  //             >
  //             Send Booking Request
  //           </Button>
  //         }
  //         {
  //           currentGig.deejayApplicants.indexOf(currentDeejayBrowse.id) !== -1 &&
  //           <div>
  //           <Button
  //             size='massive'
  //             onClick={(event) => this.handleBookingAccept(event)}
  //             >
  //             Accept Booking Request
  //           </Button>
  //           <Button
  //             size='massive'
  //             onClick={(event) => this.handleBookingDecline(event)}
  //             >
  //             Decline Booking Request
  //           </Button>
  //           </div>
  //         }
  //         {
  //           currentGig.deejayId === currentDeejayBrowse.id &&
  //           <div>
  //             <Button
  //               size='massive'
  //               onClick={(event) => this.handleBookingRetract(event)}
  //             >
  //             Retract Booking
  //             </Button>
  //           </div>
  //         }
  //         {
  //           currentGig.deejayInvites.indexOf(currentDeejayBrowse.id) !== -1 &&
  //           currentGig.declinedApps.indexOf(currentDeejayBrowse.id) === -1 &&
  //           currentGig.declinedInvs.indexOf(currentDeejayBrowse.id) === -1 &&
  //           <div>
  //             <Button
  //               size='massive'
  //               onClick={(event) => this.handleBookingRetractInvite(event)}
  //             >
  //             Retract Booking Request
  //             </Button>
  //           </div>
  //         }
  //       </div>
  //     )
  //   }
  // }

  handleBookingInvite(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props
    const { currentGig } = this.props.location.state
    if (currentGig.deejayInvites.indexOf(currentDeejayBrowse.id) === -1) {
      currentGig.deejayInvites.push(currentDeejayBrowse.id);
      updateGig(currentGig);
      history.push('/booker');
    }
    else {
      console.log('You have already sent a booking request to this Deejay!')
    }
  }

  handleBookingAccept(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props;
    const { currentGig } = this.props.location.state;

    if (!currentGig.deejayId) {
      for (let i = 0; i < currentGig.deejayApplicants.length; i++) {
        if (currentGig.deejayApplicants[i] === currentDeejayBrowse.id) {
          currentGig.deejayApplicants.splice(i, 1)
          break;
        }
      }
      currentGig.deejayId = currentDeejayBrowse.id;
      updateGig(currentGig);
      history.push('/booker');
    }
  }

  handleBookingDecline(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props;
    const { currentGig } = this.props.location.state;

    for (let i = 0; i < currentGig.deejayApplicants.length; i++) {
      if (currentGig.deejayApplicants[i] === currentDeejayBrowse.id) {
        currentGig.deejayApplicants.splice(i, 1)
        currentGig.declinedApps.push(currentDeejayBrowse.id);
        break;
      }
    }
      updateGig(currentGig);
      history.push('/booker');
  }

  handleBookingRetractInvite(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props;
    const { currentGig } = this.props.location.state;

    for (let i = 0; i < currentGig.deejayInvites.length; i++) {
      if (currentGig.deejayInvites[i] === currentDeejayBrowse.id) {
        currentGig.deejayInvites.splice(i, 1)
        currentGig.declinedInvs.push(currentDeejayBrowse.id);
        break;
      }
    }
      updateGig(currentGig);
      history.push('/booker')
  }

  handleBookingRetract(event) {
    event.preventDefault();
    const { currentDeejayBrowse, updateGig } = this.props;
    const { currentGig } = this.props.location.state;

    for (let i = 0; i < currentGig.deejayApplicants.length; i++) {
      if (currentGig.deejayApplicants[i] === currentDeejayBrowse.id) {
        currentGig.deejayApplicants.splice(i, 1)
        currentGig.declinedApps.push(currentGig.deejayId)
        break;
      }
    }

    for (let i = 0; i < currentGig.deejayInvites.length; i++) {
      if (currentGig.deejayInvites[i] === currentDeejayBrowse.id) {
        currentGig.deejayInvites.splice(i, 1)
        currentGig.declinedInvs.push(currentGig.deejayId)
        break;
      }
    }

      currentGig.deejayId = null;
      updateGig(currentGig);
      history.push('/booker')
  }

  handleID(id, arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] === id) {
        arr1.splice(i, 1)
        arr2 && arr2.push(id)
      }
    }
  }

}

const mapState = ({ user, deejays }, ownProps) => {
  const deejayParamId = Number(ownProps.match.params.id)
  return {
    user,
    deejays,
    currentDeejayBrowse: deejays.filter(deejay => deejay.id === deejayParamId)[0]
  }
}
const mapDispatch = { updateGig };

export default connect(mapState, mapDispatch)(DeejayDetailBrowse)

