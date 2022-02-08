
import React from 'react';
import MenuRHome from './MenuRHome';
import MenuRSettings from './MenuRSettings';

function ControlSidebar() {

  return (
    <aside className="control-sidebar control-sidebar-dark">
      <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
        <li className="active">
          <a href="/#control-sidebar-home-tab" data-toggle="tab"><i className="fa fa-home"></i></a>
        </li>
        <li>
          <a href="/#control-sidebar-settings-tab" data-toggle="tab"><i className="fa fa-gears"></i></a>
        </li>
      </ul>
      <div className="tab-content">

        <MenuRHome />

        <div className="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
        
        <MenuRSettings />

      </div>
    </aside>
  );
}

export default ControlSidebar;