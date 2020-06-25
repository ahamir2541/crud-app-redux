import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import EventList from '../EventList/EventList'
import {  updateEvent } from '../EventActions'

const mapState = (state) => ({
  events : state.events 
})

const actions = {
  updateEvent,
}

class EventDashboard extends Component {

  hanleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    
    const {events} = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList 
          deleteEvent={this.hanleDeleteEvent}
          onEventEdit={this.handleEditEvent}
          events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);