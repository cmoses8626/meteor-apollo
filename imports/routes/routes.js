import browserHistory from '../api/history';
import React from 'react';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export default function onAuthChange(isAuthenticated) {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};
