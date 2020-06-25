import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../../feature/Nav/NavBar/NavBar'
import HomePage from '../../feature/Home/Home'
import EventDashBoard from '../../feature/event/EventDashBoard/EventDashboard'
import EventDetailPage from '../../feature/event/EventDetailPage/EventDetailPage'
import PeopleDashBoard from '../../feature/User/PeopleDashBoard/PeopleDashBoard'
import UserDetailPage from '../../feature/User/UserDetailPage/UserDetailPage'
import SettingDashBoard from '../../feature/User/SettingDashBoard/SettingDashBoard'
import EventForm from '../../feature/event/EventForm/EventForm'
import TestComponent from '../../feature/Testarea/TestComponent'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <NavBar />
              <Container className="main">
                <Switch>
                <Route path="/events" component={EventDashBoard} />
                <Route path="/test" component={TestComponent} />
                <Route path="/event/:id" component={EventDetailPage} />
                <Route path="/manage/:id" component={EventForm} />
                <Route path="/people" component={PeopleDashBoard} />
                <Route path="/profile/:id" component={UserDetailPage} />
                <Route path="/settings" component={SettingDashBoard} />
                <Route path="/createEvent" component={EventForm} />
                </Switch>
              </Container>
            </div>
          )}
        />
      </div>

    );
  }
}

export default App;