
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './comp/login';
import Lock from './comp/lock';
import Recover from './comp/recover';
import Reset from './comp/reset';
import Master from './comp/master';
import CFG from './config.json';

if (CFG.environment === 'development') {
  window.imgBaseURL = `${CFG.development.scheme}://${CFG.development.host}:${CFG.development.port}`;
}

if (CFG.environment === 'production') {
  window.imgBaseURL = `${CFG.production.scheme}://${CFG.production.host}`;
}

function App({ loginProfile }) {

  let status = {
    isLoggedIn: true,
    isLocked  : false,
    isRecovery: false,
    isReset   : false
  };

  // if (loginProfile && loginProfile.data && Object.entries(loginProfile.data).length > 0) {
  //   status.isLoggedIn = true;
  // }

  switch (true) {
    case status.isLoggedIn:
      document.body.classList.add('skin-green');
      document.body.classList.add('sidebar-mini');
      document.body.classList.add('sidebar-collapse');
      document.body.classList.remove('login-page');
      document.body.classList.remove('lockscreen');

      return (
        <div className="App">
          <Router>
            <Master />
          </Router>
        </div>
      );

    case status.isLocked:
      document.body.classList.remove('skin-green');
      document.body.classList.remove('sidebar-mini');
      document.body.classList.remove('sidebar-collapse');
      document.body.classList.remove('login-page');
      document.body.classList.add('lockscreen');

      return (
        <div className="App">
          <Lock />
        </div>
      );

    case status.isRecovery:
      document.body.classList.remove('skin-green');
      document.body.classList.remove('sidebar-mini');
      document.body.classList.remove('sidebar-collapse');
      document.body.classList.remove('login-page');
      document.body.classList.add('lockscreen');

      return (
        <div className="App">
          <Recover />
        </div>
      );

    case status.isReset:
      document.body.classList.remove('skin-green');
      document.body.classList.remove('sidebar-mini');
      document.body.classList.remove('sidebar-collapse');
      document.body.classList.remove('login-page');
      document.body.classList.add('lockscreen');

      return (
        <div className="App">
          <Reset />
        </div>
      );
  
    default:
      document.body.classList.remove('skin-green');
      document.body.classList.remove('sidebar-mini');
      document.body.classList.remove('sidebar-collapse');
      document.body.classList.remove('lockscreen');
      document.body.classList.add('login-page');

      return (
        <div className="App">
          <Login />
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    loginProfile: state.loginProfile
  }
}

export default connect(mapStateToProps)(App);
