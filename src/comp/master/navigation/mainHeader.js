
import React from 'react';
import MenuMessage from './MenuTMessage';
import MenuNotifications from './MenuTNotifications';
import MenuTasks from './MenuTTasks';
import MenuUser from './MenuTUser';

function MainHeader() {

  return (
    <header className="main-header">

      <a href="/" className="logo">
        <span className="logo-mini"><b>A</b>LTD</span>
        <span className="logo-lg"><b>Admin</b> Dash</span>
      </a>

      <nav className="navbar navbar-static-top" role="navigation">
        <a href="/#" className="sidebar-toggle" data-toggle="push-menu" role="button">
          <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            {/* <MenuMessage />
            <MenuNotifications />
            <MenuTasks />
            <MenuUser />
            <li>
              <a href="/#" data-toggle="control-sidebar">
                <i className="fa fa-gears"></i>
              </a>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;