import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div className='boxed-view'>
      <div className='boxed-view__box'>
        <h1>Page not found</h1>
        <p>This page will self-destruct in...</p>
        <Link to="/" className='button button--link'>E.T. go home</Link>
      </div>
    </div>
  )
}
