
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux';

function Login({ loginUser, loginProfile }) {

  const [ credentials, setCredentials ] = useState({ parameter: '', password: '', rememberMe: false });

  const postCredentials = () => {
    loginUser(credentials);
  }

  return (
//     <Route exact path="/">
//   {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
// </Route>
    <div className="login-box">
      <div className="login-logo">
        <a href="/">
          <b>Admin</b>DASH
        </a>
      </div>
      <div className="login-box-body">
        <p className="login-box-msg">Sign in to start your session</p>
        { loginProfile.loading ?
            <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Authenticating...</>
          : loginProfile.error ?
            <pre>{JSON.stringify(loginProfile.error, null, 2)}</pre>
          : Object.entries(loginProfile.data).length > 0 ?
            <>
              <pre>{JSON.stringify(loginProfile.data.email, null, 2)}</pre>
              <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Redirecting to dashboard
            </>
          : null }
        <form>
          <div className="form-group has-feedback">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={credentials.parameter}
              onChange={e => setCredentials({ ...credentials, parameter: e.target.value })}
            />
            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={credentials.password}
              onChange={e => setCredentials({ ...credentials, password: e.target.value })}
            />
            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div className="row">
            <div className="col-xs-8">
              <div className="checkbox icheck">
                <label>
                  <input
                    type="checkbox"
                    checked={credentials.rememberMe}
                    onChange={e => setCredentials({ ...credentials, rememberMe: !credentials.rememberMe })}
                  /> 
                  Remember Me
                </label>
              </div>
            </div>
            <div className="col-xs-4">
              <button type="button" className="btn btn-primary btn-block btn-flat" onClick={postCredentials} >
                Sign In
              </button>
            </div>
          </div>
        </form>

        <a href="/#">I forgot my password</a><br/>
        <div className="social-auth-links text-center"><p>All Rights Reserved 2021</p></div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loginProfile: state.loginProfile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: credentials => dispatch(loginUser(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);