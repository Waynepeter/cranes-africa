
import React from 'react';

function Reset() {

  return (
    <div className="login-box">
      <div className="login-logo">
        <a href="/">
          <b>Admin</b>DASH
        </a>
      </div>
      <div className="login-box-body">
        <p className="login-box-msg">Sign in to start your session</p>

        <form action="/#" method="post">
          <div className="form-group has-feedback">
            <input type="password" className="form-control" placeholder="Password" />
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>

          <div className="form-group has-feedback">
            <input type="password" className="form-control" placeholder="Confirm Password" />
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>

          <div className="row">
            <div className="col-xs-8"></div>
            <div className="col-xs-4">
              <button type="submit"
                 className="btn btn-primary btn-block btn-flat">Submit</button>
            </div>
          </div>
        </form>

        <a href="/#">Log in with another account</a>
        <br /><br />
        <div className="social-auth-links text-center">
          <p>All Rights Reserved 2021</p>
        </div>
      </div>
    </div>
  );
}

export default Reset;