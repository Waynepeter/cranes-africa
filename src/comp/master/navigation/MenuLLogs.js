import React from 'react';
import { useLocation } from 'react-router-dom';

function MenuLLogs() {
  const location = useLocation();
  const linkArray = location.pathname.split(":");
  const pageRoute = linkArray[0];

  return (
  <>
    <li className="header">SYSTEM LOGS</li>
    <li className={ pageRoute === "/log-fatal" ? "active" : "" }>
      <a href="/log-fatal">
        <i className="fa fa-circle-o text-purple"></i> <span>Fatal</span>
        <span className="pull-right-container">
          <small className="label pull-right bg-purple">12</small>
        </span>
      </a>
    </li>
    <li className={ pageRoute === "/log-error" ? "active" : "" }>
      <a href="/log-error">
        <i className="fa fa-circle-o text-red"></i> <span>Error</span>
        <span className="pull-right-container">
          <small className="label pull-right bg-red">12</small>
        </span>
      </a>
    </li>
    <li className={ pageRoute === "/log-warning" ? "active" : "" }>
      <a href="/log-warning">
        <i className="fa fa-circle-o text-yellow"></i> <span>Warning</span>
        <span className="pull-right-container">
          <small className="label pull-right bg-yellow">12</small>
        </span>
      </a>
    </li>
    <li className={pageRoute === "/log-info" ? "active" : "" }>
      <a href="/log-info">
        <i className="fa fa-circle-o text-green"></i> <span>Information</span>
        <span className="pull-right-container">
          <small className="label pull-right bg-green">12</small>
        </span>
      </a>
    </li>
    {/* <li className={pageRoute === "/log-trace" ? "active" : "" }>
      <a href="/log-trace">
        <i className="fa fa-circle-o text-aqua"></i> <span>Trace</span>
        <span className="pull-right-container">
          <small className="label pull-right bg-aqua">12</small>
        </span>
      </a>
    </li> */}
  </>
  );
}

export default MenuLLogs;