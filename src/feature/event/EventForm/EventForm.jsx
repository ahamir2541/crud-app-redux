import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import cuid from 'cuid'
import moment from 'moment'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { createEvent, updateEvent } from '../EventActions'
import TextInput from '../../../app/common/Form/TextInput'
import TextArea from '../../../app/common/Form/TextArea'
import SelectInput from '../../../app/common/Form/SelectInput'
import DateInput from '../../../app/common/Form/DateInput'

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id

    let event = {}

    if (eventId && state.events.length > 0) {
        event = state.events.filter(event => event.id === eventId)[0]
    }

    return {
        initialValues : event
    }
}

const actions = {
    createEvent,
    updateEvent
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
    title : isRequired({message : 'The event title is required'}),
    category : isRequired({message : 'The event title is required'}),
    description : composeValidators(
        isRequired({message : 'Please enter a description'}),
        hasLengthGreaterThan(4)({message : 'Description needs to be at least 5 character'})
    )(),
    city : isRequired('city'),
    venue : isRequired('venue'),
    date : isRequired('date'),
})

class EventForm extends Component {

    onSubmitForm = values => {
        values.date = moment(values.date).format()
        if (this.props.initialValues.id) {
            this.props.updateEvent(values)
            this.props.history.goBack()
        } else {
            const newEvent = {
                ...values,
                id: cuid(),
                hostPhotoURL: '/assets/user.png',
                hostedBy : 'Bob'
            }
            this.props.createEvent(newEvent)
            this.props.history.push('/events')
        }
    }

    render() {
        const { invalid, submitting, pristine } = this.props
        return (
            <Grid>
                <Grid.Column>
                    <Segment>
                        <Header sub color="teal" content="Event Details" />
                        <Form onSubmit={this.props.handleSubmit(this.onSubmitForm)}>
                            <Field
                                name="title"
                                type="text"
                                component={TextInput} placeholder="Give your event a name" />
                            <Field
                                name="category"
                                type="text"
                                component={SelectInput} 
                                
                                options={category}
                                placeholder="whate is your event about" />
                            <Field
                                name="description"
                                type="text"
                                rows={3}
                                component={TextArea} placeholder="tell us about your" />
                            <Header sub color="teal" content="Event Location Details" />
                            <Field
                                name="city"
                                type="text"
                                component={TextInput} placeholder="Event city" />
                            <Field
                                name="venue"
                                type="text"
                                component={TextInput} placeholder="Event venue" />
                            <Field
                                name="date"
                                type="text"
                                component={TextInput} placeholder="Date and Time of event" />
                            {/* <Field
                                name="date"
                                type="text"
                                component={DateInput} 
                                dateFormat="YYYY/MM/DD HH:mm"
                                timeFormat="HH:mm"
                                showTimeSelect
                                placeholder="Date not work" /> */}
                            <Button disabled={ invalid || submitting || pristine } positive type="submit">
                                Submit
                            </Button>
                            <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default connect(mapState, actions)(reduxForm({ form: 'eventForm', enableReinitialize : true, validate })(EventForm));