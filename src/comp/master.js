
import React from 'react';
import MainHeader from './master/navigation/mainHeader';
import MainSidebar from './master/navigation/mainSidebar';
import ContentWrapper from './master/contentWrapper';
import MainFooter from './master/navigation/mainFooter';
import ControlSidebar from './master/navigation/controlSidebar';

function Master() {

  return (
    <div className="wrapper">
      <MainHeader />
      <MainSidebar />
      <div className="content-wrapper">
        <ContentWrapper />
      </div>
      <MainFooter />
      <ControlSidebar />
      <div className="control-sidebar-bg"></div>
    </div>
  );
}

export default Master;