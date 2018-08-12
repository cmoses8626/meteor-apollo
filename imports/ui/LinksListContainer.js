import React from 'react';
import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import AddLink from './AddLink';
import LinksListFilter from './LinksListFilter';

export default LinksListContainer = () => {
  return (
    <div>
      <PrivateHeader title='Short Lnk'/>
      <div className='page-content'>
        <LinksListFilter/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
}
