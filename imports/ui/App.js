import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Switch, Route, Redirect } from 'react-router-dom';
import Signup from './Signup';
import LinksListContainer from './LinksListContainer';
import Login from './Login';
import NotFound from './NotFound';

export default class App extends React.Component {
  render() {
    return (
      <div id='app'>
        <Switch>
          <Route exact path='/' render={() => (
            Meteor.userId() ? (
              <Redirect to='/links'/>
            ) : (
              <Login/>
            )
          )}/>
          <Route path='/signup' render={() => (
            Meteor.userId() ? (
              <Redirect to='/links'/>
            ) : (
              <Signup/>
            )
          )}/>
          <Route exact path='/links' render={() => (
            Meteor.userId() ? (
              <LinksListContainer/>
            ) : (
              <Redirect to='/'/>
            )
          )}/>
          <Route component={NotFound}/> {/* This will always match at end of Switch */}
        </Switch>
      </div>
    );
  }
}
