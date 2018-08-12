import React from 'react';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      modalOpen: false,
      error: null
    };
    this.urlInput = React.createRef();
    this.focusUrlInput = this.focusUrlInput.bind(this);
  }
  onChange(e) {
    this.setState({
      url: e.target.value
    });
  }
  onSubmit(e) {
    const url = this.state.url;
    e.preventDefault();
    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.handleModalClose();
        } else {
          this.setState({ error: err.reason })
        }
      });
    }
  }
  focusUrlInput() {
    // Put focus on URL input when modal opens
    this.urlInput.current.focus();
  }
  handleModalClose() {
    this.setState({
      url: '',
      modalOpen: false,
      error: null
    });
  }
  render() {
    return (
      <div>
        <button className='button' onClick={() => this.setState({modalOpen: true})}>+Add Link</button>
        <Modal
          isOpen={this.state.modalOpen}
          ariaHideApp={false}
          onAfterOpen={this.focusUrlInput}
          onRequestClose={this.handleModalClose.bind(this)}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'>
          <form className='boxed-view__form' onSubmit={this.onSubmit.bind(this)}>
            <h1>Add Link!</h1>
            { this.state.error ? <p>{this.state.error}</p> : null }
            <input
              type='text'
              ref={this.urlInput}
              value={this.state.url}
              onChange={this.onChange.bind(this)}
              placeholder='URL'/>
              <button
                className='button'
                onClick={() => this.setState({error: null})}>
                Add Link
              </button>
              <button
                type='button'
                className='button button--secondary'
                onClick={this.handleModalClose.bind(this)}>
                Cancel
              </button>
            </form>
        </Modal>
      </div>
    );
  }
}
