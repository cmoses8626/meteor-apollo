import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('linksPub');
      let links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    if (this.state.links.length == 0) {
      return (
        <div className='item'>
          <p className='item__status-message'>No hidden links</p>
        </div>
      )
    }
    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
    });
  }
  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
