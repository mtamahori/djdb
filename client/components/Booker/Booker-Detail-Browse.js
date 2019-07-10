import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GigListStatic } from '../index'
import { createChannel } from '../../store'
import { List, Button } from 'semantic-ui-react'
import history from '../../history'
import dateFns from 'date-fns'
require('../../../public/stylesheets/profile.css')

// FOR DEEJAYS
// THIS IS THE COMPONENT DEEJAYS SEE WHEN THEY BROWSE BOOKERS
// IT ALLOWS THE DEEJAY TO VIEW THE BOOKER'S PROFILE INFO, VIEW THEIR PAST GIGS, AND SEND A MESSAGE

class BookerDetailBrowse extends Component {
  constructor(props) {
    super(props);

    this.handleCreateChannel = this.handleCreateChannel.bind(this);
  }

  render() {
    const { currentDeejay } = this.props.location.state;
    const { channels, currentBookerBrowse } = this.props;

    let currentChannel;

    let channelCheck = channels.filter(channel => (channel.bookerId === currentBookerBrowse.id) && (channel.deejayId === currentDeejay.id))

    channelCheck.length ?
    currentChannel = channelCheck[0] :
    currentChannel = null;

    if (!currentBookerBrowse) {
      return <div>Loading!</div>
    }

    else if (currentBookerBrowse) {
      return (
        <div className="booker-profile-container">
          {
            this.renderBookerDetails(currentBookerBrowse)
          }
          {
            !currentChannel &&
            this.renderCreateChannel()
          }
          {
            currentChannel &&
            this.renderSendMessage(currentChannel, currentDeejay)
          }
          {
            this.renderBookerPastGigs(currentBookerBrowse)
          }
        </div>
      )
    }
  }

  renderBookerDetails(booker) {
    return (
      <div className="booker-profile-detail">
        <h3>Booker Details</h3>
        {
          <List key={booker.id}>
            <List.Item icon="users" content={booker.name} />
            <List.Item icon="marker" content="Chicago, IL" />
            <List.Item icon="mail" content={booker.email} />
            <List.Item icon="phone" content={booker.phone} />
            <List.Item>
            <List.Content>
              <List.Header>Bio</List.Header>
              <List.Description>{booker.bio}</List.Description>
            </List.Content>
            </List.Item>
          </List>
        }
      </div>
    )
  }

  renderBookerPastGigs(currentBooker) {
    const { gigs } = this.props;
    let pastGigs = gigs.filter(gig => {
      return (
        gig.bookerId === currentBooker.id &&
        this.pastDateCheck(gig)
      )
    })
    return (
      pastGigs.length
      ?
      <div>
        <h3>This Booker's Past Gigs:</h3>
        <GigListStatic gigs={pastGigs} />
      </div>
      :
      <h3>This Booker Has Not Hosted and Event Yet</h3>
    )
  }

  renderCreateChannel() {
    return (
      <div>
        <Button
          size="massive"
          onClick={(event) => this.handleCreateChannel(event)}
        >Start a Chat Channel
        </Button>
      </div>
    )
  }

  renderSendMessage(channel, currentDeejay) {
    return (
      <div>
        <NavLink
          activeClassName="active"
          to={{
            pathname: `/inbox/deejay/channels/${channel.id}`,
            state: {
              channel: channel,
              currentDeejay: currentDeejay
            }
          }}
        >
          <Button
            size="massive"
            >Send Message
          </Button>
        </NavLink>
      </div>
    )
  }

  pastDateCheck(gig) {
    let gigDateArr = gig.date.split('/')
    let gigYear = gigDateArr[0]
    let gigMonth = gigDateArr[1]
    let gigDate = gigDateArr[2]
    return dateFns.isBefore(new Date(gigYear, gigMonth, gigDate), Date.now())
  }

  handleCreateChannel(event) {
    event.preventDefault();
    const { channels, createChannel, currentBookerBrowse } = this.props;
    const { currentDeejay } = this.props.location.state;
    const newChannel = { name: currentDeejay.name + ' + ' + currentBookerBrowse.name, bookerId: currentBookerBrowse.id, deejayId: currentDeejay.id }

    let channelCheck = channels.filter(channel => (channel.deejayId === currentDeejay.id) && (channel.bookerId === currentBookerBrowse.id))

    !channelCheck.length && createChannel(newChannel)

    history.push('/inbox')
  }
}

const mapState = ({ user, bookers, channels, gigs }, ownProps) => {
  const bookerParamId = Number(ownProps.match.params.id)
  return {
    user,
    bookers,
    channels,
    gigs,
    currentBookerBrowse: bookers.filter(booker => booker.id === bookerParamId)[0]
  }
}

const mapDispatch = { createChannel };

export default connect(mapState, mapDispatch)(BookerDetailBrowse);
