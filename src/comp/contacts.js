
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { sendContactMessage } from '../redux';
import { isEmpty } from '../util';
import CFG from '../config.json';
import Navigation from './nav/navigation';
import Footer from './nav/footer';

function Contacts({ organizationData, sendContactMessage, sendContactMessageData }) {
  const [ submit, setSubmit ] = useState(false);
  const [ state, setState ] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    if (submit) {
      let formData = new FormData();

      if (!isEmpty(state.name) && !isEmpty(state.email) && 
          !isEmpty(state.subject) && !isEmpty(state.message)) {
        formData.append('name', state.name);
        formData.append('email', state.email);
        formData.append('subject', state.subject);
        formData.append('message', state.message);
        sendContactMessage(formData);
      } else {
        alert("All fields are required");
      }
      setSubmit(false);
    }
  }, [submit]);

  const onSubmit = e => {
    e.preventDefault();
    setSubmit(true);
  }

  return (<>
    <Navigation />

    <header
      className="hero-banner"
      style={{ background: 'url("dist/img/project-bg.png") left center no-repeat', backgroundsize: 'cover' }}>
      <a className="navbar-brand" href=""><img src="dist/img/logo.png" alt="" /></a>
      <div className="container">
        <h2 className="section-intro__subtitle">Contact Us</h2>
        <div className="btn-group breadcrumb">
          <a href="/" className="btn">Home</a><span className="btn btn--rightBorder">Contact Us</span>
        </div>
      </div>
    </header>
    
    <section className="section-margin">
      <div className="container">
        {/* <div className="d-none d-sm-block mb-5 pb-4">
          <div id="map" style={{ height: '420px' }}></div>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDpfS1oRGreGSBU5HHjMmQ3o5NLw7VdJ6I&callback=initMap"></script>
        </div> */}

        <div className="row align-items-center">
          <div className="col-md-4 col-lg-3 mb-4 mb-md-0">
          { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
          : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
          : organizationData.organization.addresses ?
            organizationData.organization.addresses.map(address => (
            <div className="media contact-info" key={address.uuid}>
              <span className="contact-info__icon"><i className="lnr lnr-home"></i></span>
              <div className="media-body">
                <h3>{address.city}</h3>
                <p>
                  {address.street}<br/>
                  {address.suite}<br/>
                  {address.zipcode} {address.city}<br/>
                  {address.phone1} / {address.phone2}<br/>
                  {address.email1}<br/>
                  {address.email2}
                </p>
              </div>
            </div>
            ))
          : <pre className="text-danger">Something went wrong</pre>}
          </div>

          <div className="col-md-8 col-lg-9">
            <form onSubmit={onSubmit} className="form-contact">
              <div className="row">
                <div className="col-12">
                { sendContactMessageData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Processing request...<br/></>
                : sendContactMessageData.error ? <pre className="text-danger">Unable to process request</pre>
                : sendContactMessageData.sendContactMessage && Object.entries(sendContactMessageData.sendContactMessage).length > 0 ?
                  <h5 className="text-success">Your message has been sent. We will get back to you shortly</h5>
                : null }
                </div>
                <div className="col-lg-5">
                  <div className="form-group">
                    <input
                      type="text"
                      required={true}
                      value={state.name}
                      onChange={e => setState({ ...state, name: e.target.value })}
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      required={true}
                      value={state.email}
                      onChange={e => setState({ ...state, email: e.target.value })}
                      placeholder="Enter your email address"
                      pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" 
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      required={true}
                      value={state.subject}
                      onChange={e => setState({ ...state, subject: e.target.value })}
                      placeholder="Enter message subject"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="form-group">
                    <textarea
                      className="form-control different-control w-100"
                      cols="30" rows="6" 
                      required={true}
                      value={state.message}
                      onChange={e => setState({ ...state, message: e.target.value })}
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="form-group text-center text-md-right">
                <button type="submit" className="btn active btn--leftBorder">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </>);
}

const mapStateToProps = state => {
  return {
    organizationData: state.organizationData,
    sendContactMessageData: state.sendContactMessageData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sendContactMessage: formData => dispatch(sendContactMessage(formData))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);