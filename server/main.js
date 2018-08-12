import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Links } from '../imports/api/links';
import '../imports/api/users';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    !!link ? (
      res.statusCode = 302,
      res.setHeader('location', link.url),
      res.end(),
      Meteor.call('links.trackVisit', _id)
    ) : (
      next()
    )
  });
});
