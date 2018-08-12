import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
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

    if (password.length < 8) {
      this.setState({error: 'Password must be at least 8 characters'});
      return;
    }

    Accounts.createUser({email, password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }
  render() {
    return (
      <div className='boxed-view'>
        <div className='boxed-view__box'>
          <h1>Join Short Lnk</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)} noValidate className='boxed-view__form'>
            <input type='email' ref={this.emailInput} name='email' placeholder='Email'/>
            <input type='password' ref={this.passwordInput} name='password' placeholder='Password'/>
            <button className='button'>Create Account</button>
          </form>
          <Link to='/'>Already have an account?</Link>
        </div>
      </div>
    );
  }
}
