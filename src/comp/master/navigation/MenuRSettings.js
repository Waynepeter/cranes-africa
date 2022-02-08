
import React from 'react';

function MenuRSettings() {

  return (
    <div className="tab-pane" id="control-sidebar-settings-tab">
      <form method="post">
        <h3 className="control-sidebar-heading">General Settings</h3>

        <div className="form-group">
          <label className="control-sidebar-subheading">
            <input type="checkbox" className="pull-left" checked onChange={() => {}}/> 
            Report system bugs
          </label>

          <p>Developer will receive all errors</p>
        </div>
      </form>
    </div>
  );
}

export default MenuRSettings;