import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import browserHistory from '../api/history';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
  const title = props.title;

  const onLogout = () => {
    Accounts.logout();
    browserHistory.push('/');
  };

  return (
    <div className='header'>
      <div className='header__items'>
        <h1 className='header__title'>{title}</h1>
        <button className='button button--link-text' onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default PrivateHeader;
