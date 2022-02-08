
import React from 'react';
import { useLocation } from 'react-router-dom';

function MenuLMailbox() {
  const location = useLocation();
  const linkArray = location.pathname.split(":");
  const pageRoute = linkArray[0];

  return (
    <li className={
        pageRoute === "/mail-inbox" || pageRoute === "/mail-compose" || 
        pageRoute === "/mail-sent" || pageRoute === "/mail-draft" || pageRoute === "/mail-junk" || 
        pageRoute === "/mail-trash" 
        ? "treeview active" : "treeview"
      }>
      <a href="#">
        <i className="fa fa-envelope"></i> <span>Mailbox</span>
        <span className="pull-right-container">
          <i className="fa fa-angle-left pull-right"></i>
          <small className="label pull-right bg-yellow">12</small>
          <small className="label pull-right bg-blue">16</small>
          <small className="label pull-right bg-green">5</small>
        </span>
      </a>
      <ul className="treeview-menu">
        <li className={pageRoute === "/mail-inbox" ? "active" : ""}>
          <a href="/mail-inbox">Inbox
            <span className="pull-right-container">
              <span className="label label-success pull-right">13</span>
            </span>
          </a>
        </li>
        <li className={pageRoute === "/mail-compose" ? "active" : ""}><a href="/mail-compose">Compose</a></li>
        <li className={pageRoute === "/mail-sent" ? "active" : ""}><a href="/mail-sent">Sent</a></li>
        <li className={pageRoute === "/mail-draft" ? "active" : ""}>
          <a href="/mail-draft">Drafts
            <span className="pull-right-container">
              <span className="label label-primary pull-right">13</span>
            </span>
          </a>
        </li>
        <li className={pageRoute === "/mail-junk" ? "active" : ""}>
          <a href="/mail-junk">Junk
            <span className="pull-right-container">
              <span className="label label-warning pull-right">13</span>
            </span>
          </a>
        </li>
        <li className={pageRoute === "/mail-trash" ? "active" : ""}><a href="/mail-trash">Trash</a></li>
      </ul>
    </li>
  );
}

export default MenuLMailbox;