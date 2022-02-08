
import React from 'react';
import { connect } from 'react-redux';
import { parseHTML } from '../util';
import Navigation from './nav/navigation';
import Footer from './nav/footer';
import CFG from '../config.json';

function AboutDetails({ organizationData }) {

  return (<>
    <Navigation />

    <header
      className="hero-banner"
      style={{ background: 'url("dist/img/project-bg.png") left center no-repeat', backgroundsize: 'cover' }}>
      <a className="navbar-brand" href=""><img src="dist/img/logo.png" alt="" /></a>
      <div className="container">
        <h2 className="section-intro__subtitle">About Us</h2>
        <div className="btn-group breadcrumb">
          <a href="/" className="btn">Home</a><span className="btn btn--rightBorder">About Us</span>
        </div>
      </div>
    </header>

    <section className="sample-text-area">
      <div className="container sample-text">
      { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
      : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
      : organizationData.organization.description ? parseHTML(organizationData.organization.description) 
      : <pre className="text-danger">Something went wrong</pre>}
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
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutDetails);