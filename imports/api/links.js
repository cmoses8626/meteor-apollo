import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('linksPub', function () {
    return Links.find({ userId: this.userId });
  });
};

Meteor.methods({
  'links.insert'(url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: 'Your link'
      }
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      lastVisitedAt: null,
      visitedCount: 0
    });
  },
  'links.setVisibility'(_id, visibility) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: { type: String, min: 1 },
      visibility: { type: Boolean }
    }).validate({ _id, visibility});

    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible: visibility }
    });
  },
  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: { type: String, min: 1 }
    }).validate({ _id });

    Links.update({ _id }, {
      $set: { lastVisitedAt: new Date().getTime() },
      $inc: { visitedCount: 1 }
    });
  }
});
