import React from 'react';

function MenuRHome() {

  return (
    <div className="tab-pane active" id="control-sidebar-home-tab">
          
      <h3 className="control-sidebar-heading">Recent Activity</h3>
      <ul className="control-sidebar-menu">
        <li>
          <a href="/">
            <i className="menu-icon fa fa-birthday-cake bg-red"></i>

            <div className="menu-info">
              <h4 className="control-sidebar-subheading">Langdon's Birthday</h4>

              <p>Will be 23 on April 24th</p>
            </div>
          </a>
        </li>
      </ul>

      <h3 className="control-sidebar-heading">Tasks Progress</h3>
      <ul className="control-sidebar-menu">
        <li>
          <a href="/">
            <h4 className="control-sidebar-subheading">
              Custom Template Design
              <span className="pull-right-container">
                  <span className="label label-danger pull-right">70%</span>
                </span>
            </h4>

            <div className="progress progress-xxs">
              <div className="progress-bar progress-bar-danger" style={{width: '70%'}}></div>
            </div>
          </a>
        </li>
      </ul>

    </div>
  );
}

export default MenuRHome;