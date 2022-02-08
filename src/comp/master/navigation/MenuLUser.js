import React from 'react';

function MenuLUser() {

  return (
    <div className="user-panel">
      <div className="pull-left image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="" />
      </div>
      <div className="pull-left info">
        <p>Johnmark I</p>
        <a href="/"><i className="fa fa-circle text-success"></i> Online</a>
      </div>
    </div>
  );
}

export default MenuLUser;