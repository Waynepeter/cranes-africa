
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendSubscription } from '../../redux';
import { parseHTML, isEmpty } from '../../util';
import CFG from '../../config.json';

function Footer({ organizationData, sendSubscription, sendSubscriptionData }) {
  const todaysDate = new Date();
  const [ year, setYear ] = useState(todaysDate.getFullYear());
  const [ moduleId, setModuleId ] = useState(0);
  const [ email, setEmail ] = useState('');
  const [ subscribe, setSubscribe ] = useState(false);

  useEffect(() => {
    if (organizationData.organization.id) setModuleId(organizationData.organization.id);
  }, [organizationData.organization]);

  useEffect(() => {
    if (subscribe) {
      !isEmpty(email) ? sendSubscription({ moduleId, email }) : alert('Kindly provide an email address');
    }
    setSubscribe(false);
  }, [subscribe]);

  const onClick = () => setSubscribe(true);

  return (
  <footer className="footer footer-bg">
		<div className="container">
			<div className="row">
				<div className="col-sm-4 col-lg-3 mb-4 mb-lg-0 text-left">
					<h3 className="footer__title">Top Services</h3>
					<ul className="footer__link">
          { organizationData.loading ? <><img className="spinner" src={CFG.preLoader} alt=""/> Loading data...</>
          : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
          : organizationData.organization.services ?
            organizationData.organization.services.map((service, index) => 
            <li key={service.uuid}>
              <a href={`/service-details:${index}`}>{service.name}</a>
            </li>)
          : <pre className="text-danger">Something went wrong</pre> }
					</ul>
				</div>
				<div className="col-sm-4 col-lg-3 mb-4 mb-lg-0 text-left">
					<h3 className="footer__title">Quick Links</h3>
					<ul className="footer__link">
						<li><a href="/blog-home">Our Blog</a></li>
						<li><a href="/terms-of-service">Terms Of Service</a></li>
						<li><a href="/privacy-policy">Privacy Policy</a></li>
						<li><a href="/confidentiality">Trust &amp; Confidentiality</a></li>
					</ul>
				</div>
				<div className="col-sm-4 col-lg-2 mb-4 mb-lg-0 text-left">
					<h3 className="footer__title">Resources</h3>
					<ul className="footer__link">
						<li><a href="/about">About Us</a></li>
						<li><a href="/services">Our Services</a></li>
						<li><a href="/contacts">Contact Us</a></li>
						<li><a href="/faq">F A Q</a></li>
					</ul>
				</div>
				<div className="col-sm-8 col-lg-4 mb-4 mb-lg-0 text-left">
					<h3 className="footer__title">Newsletter</h3>
					<p>
            You can trust us. We only send industry updates, job offers and service notifications. 
            Subscribe to our newsletter to stay upto date
          </p>
					<div className="form-subscribe">
						<div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email Address"
                value={email}
                required={true}
                onChange={e => setEmail(e.target.value)}
              />
							<div className="input-group-append">
								<button className="btn-append" type="button" onClick={onClick}><i className="lnr lnr-arrow-right"></i></button>
							</div>
						</div>
					</div>
          { sendSubscriptionData.loading ? <><img src={CFG.preLoader} className="spinner" /> Processing request...</>
          : sendSubscriptionData.error ? <pre className="text-danger">Unable to process request</pre>
          : sendSubscriptionData.sendSubscription && Object.entries(sendSubscriptionData.sendSubscription).length > 0 ?
            <h5 className="text-success mt-3">We have emailed you a confirmation link!</h5>
          : null }
				</div>
			</div>
			<div className="d-sm-flex justify-content-between footer__bottom top-border">
				<p>Copyright &copy; {year} All rights reserved | <a href="https://martecranes.com" target="_blank">Marte Cranes</a></p>
				<ul className="social-icons mt-2 mt-sm-0">
					<li><a href="#/"><i className="fab fa-facebook-f"></i></a></li>
					<li><a href="#/"><i className="fab fa-twitter"></i></a></li>
					<li><a href="#/"><i className="fab fa-linkedin"></i></a></li>
					<li><a href="#/"><i className="fab fa-instagram"></i></a></li>					
				</ul>
			</div>
		</div>
	</footer>
  );
}

const mapStateToProps = state => {
  return {
    organizationData: state.organizationData,
    sendSubscriptionData: state.sendSubscriptionData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sendSubscription: subscrptionData => dispatch(sendSubscription(subscrptionData)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);