import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVisible: true
    }
  }
  componentDidMount() {
    this.visibilityTracker = Tracker.autorun(() => {
      this.setState({
        showVisible: Session.get('showVisible')
      })
    });
  }
  componentWillUnmount() {
    this.visibilityTracker.stop();
  }
  onChange(e) {
    Session.set('showVisible', !e.target.checked);
  }
  render() {
    return (
      <div>
        <label className='checkbox'>
          <input
            type='checkbox'
            className='checkbox__input'
            checked={!this.state.showVisible}
            onChange={this.onChange.bind(this)}/>
          show hidden links
        </label>
      </div>
    )
  }
}
