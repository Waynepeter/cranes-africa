
import React from 'react';
import { connect } from 'react-redux';
import { parseHTML } from '../util';
import Navigation from './nav/navigation';
import Footer from './nav/footer';
import CFG from '../config.json';

function Services({ organizationData }) {

  return (<>
    <Navigation />

    <header
      className="hero-banner"
      style={{ background: 'url("dist/img/project-bg.png") left center no-repeat', backgroundsize: 'cover' }}>
      <a className="navbar-brand" href=""><img src="dist/img/logo.png" alt="" /></a>
      <div className="container">
        <h2 className="section-intro__subtitle">Our Services</h2>
        <div className="btn-group breadcrumb">
          <a href="/" className="btn">Home</a><span className="btn btn--rightBorder">Our Services</span>
        </div>
      </div>
    </header>

    <section className="service section-margin mb-5 pb-5">
      <div className="container">
        <div className="section-intro">
          <h4 className="section-intro__title">OUR Services</h4>
          <h2 className="section-intro__subtitle bottom-border">Our Offered Services</h2>
        </div>

        <div className="row">
        { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
        : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
        : organizationData.organization.services ? organizationData.organization.services.map((service, index) =>
          <div className="col-sm-6 col-lg-4" key={service.uuid}>
            <div className="media service__single">
              <a href={`/service-details:${index}`}>
                <span className="service__singleIcon"><i className={service.icon}></i></span>
              </a>
              <div className="media-body">
                <a href={`/service-details:${index}`}><h3>{service.name}</h3></a>
                {parseHTML(service.description.substring(0, 75))}
              </div>
            </div>
          </div>)
        : <pre className="text-danger">Something went wrong</pre>}
        </div>
      </div>
    </section>
    
    <section className="tips tips-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h2 className="section-intro__subtitle">Get to Know Project Estimate?</h2>
            <p>
              There is a moment in the life of any aspiring astronomer that it is time to buy that first telescope. 
              It’s exciting to think about setting up your own viewing station whether that is on the deck
            </p>
          </div>
          <div className="col-lg-5 text-center text-lg-right">
            <a className="btn btn-dark btn--leftBorder btn--rightBorder" href="/contacts">Get Estimate</a>
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
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);