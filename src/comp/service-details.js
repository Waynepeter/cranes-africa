
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { parseHTML } from '../util';
import { useParams } from 'react-router-dom';
import Navigation from './nav/navigation';
import Footer from './nav/footer';
import CFG from '../config.json';

function PortfolioDetails({ organizationData }) {
  const { index } = useParams();

  return (<>
    <Navigation />

    { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
    : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
    : organizationData.organization.services ? <>
      <header
        className="hero-banner"
        style={{ background: `url('dist/img/project-bg.png') left center no-repeat`, backgroundsize: 'cover' }}>
        <a className="navbar-brand" href=""><img src="dist/img/logo.png" alt="" /></a>
        <div className="container">
          <h2 className="section-intro__subtitle">{organizationData.organization.services[index.substring(1)].name}</h2>
          <div className="btn-group breadcrumb">
            <a href="/" className="btn">Home</a><span className="btn btn--rightBorder">Service</span>
          </div>
        </div>
      </header>

      <section className="sample-text-area">
        <div className="container">
        { index.substring(1) ? <>
          <h2>{organizationData.organization.services[index.substring(1)].name}</h2>
          {parseHTML(organizationData.organization.services[index.substring(1)].description)}
          </>
        : <Redirect to="/portfolio" /> }
        </div>
      </section>
      </>
    : <pre className="text-danger">Something went wrong</pre>}

    <Footer />
  </>);
}

const mapStateToProps = state => {
  return {
    organizationData: state.organizationData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PortfolioDetails);