import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();
    let email = this.emailInput.current.value.trim();
    let password = this.passwordInput.current.value.trim();
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({error: "Unable to login. Check email and password."});
      } else {
        this.setState({error: ''});
      }
    });
  }
  render() {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
            <input type='email' ref={this.emailInput} name='email' placeholder='Email'/>
            <input type='password' ref={this.passwordInput} name='password' placeholder='Password'/>
            <button className='button'>Login</button>
          </form>
          <Link to='/signup'>Need an account?</Link>
        </div>
      </div>
    );
  }
}
