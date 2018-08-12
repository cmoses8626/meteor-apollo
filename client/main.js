import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Router } from 'react-router-dom';
import { Session } from 'meteor/session';
import browserHistory from '../imports/api/history';
import onAuthChange from '../imports/routes/routes';
import App from '../imports/ui/App';

import './main.html';
import '../imports/startup/simple-schema-configuration.js';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
  Session.set('showVisible', true),
  ReactDOM.render((
    <Router history={browserHistory}>
      <App/>
    </Router>
  ), document.getElementById("app"));
});
