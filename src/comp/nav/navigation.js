
import React, { useState, useEffect } from 'react';

function Navigation() {
  const [ navState, setNavState ] = useState(false);

  useEffect(() => {
    if (navState)
      document.body.classList.add('open');
    if (!navState)
      document.body.classList.remove('open');
  }, [navState]);

  const toggleNav = () => setNavState(!navState);

  return (
  <>
    <div className="side_menu">
			<ul className="list menu_right">
				<li><a href="/">Home</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/services">Services</a></li>
				<li><a href="/portfolio">Portfolio</a></li>
				{/* <li><a href="/blog-home">Blog</a></li> */}
				<li><a href="/faq">FAQ</a></li>
				<li><a href="/contacts">Contacts</a></li>
			</ul>
    </div>
    
    <div className="canvus_menu">
      <div className="container">
        <div className="float-right">
          <div className="toggle_icon" title="Menu" onClick={toggleNav}>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

export default Navigation;