
import React from 'react';

function Lock() {

  return (
    <div className="lockscreen-wrapper">
      <div className="lockscreen-logo">
        <a href="/">
          <b>Admin</b>LTE
        </a>
      </div>
      <div className="lockscreen-name">John Doe</div>

      <div className="lockscreen-item">
        <div className="lockscreen-image">
          <img src="../../dist/img/user1-128x128.jpg" alt="" />
        </div>
        
        <form className="lockscreen-credentials">
          <div className="input-group">
            <input type="password" className="form-control" placeholder="password" />

            <div className="input-group-btn">
              <button type="button" className="btn">
                <i className="fa fa-arrow-right text-muted"></i>
              </button>
            </div>
          </div>
        </form>

      </div>
      
      <div className="help-block text-center">
        Enter your password to retrieve your session
      </div>
      <div className="text-center">
        <a href="/#">Or sign in as a different user</a>
      </div>
      <div className="lockscreen-footer text-center">
        Copyright &copy; 2014-2016 
        <b>
          <a href="/#" className="text-black">Company Name</a>
        </b>
        <br />
        All rights reserved
      </div>
    </div>
  );
}

export default Lock;