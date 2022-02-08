
import React from 'react';
import { connect } from 'react-redux';
import { parseHTML } from '../util';
import Navigation from './nav/navigation';
import Footer from './nav/footer';
import CFG from '../config.json';

function Portfolio({ organizationData }) {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"
  ];

  return (<>
    <Navigation />

    <header
      className="hero-banner"
      style={{ background: 'url("dist/img/project-bg.png") left center no-repeat', backgroundsize: 'cover' }}>
      <a className="navbar-brand" href=""><img src="dist/img/logo.png" alt="" /></a>
      <div className="container">
        <h2 className="section-intro__subtitle">Our Portfolio</h2>
        <div className="btn-group breadcrumb">
          <a href="/" className="btn">Home</a><span className="btn btn--rightBorder">Our Portfolio</span>
        </div>
      </div>
    </header>

    <section className="portfolio section-margin">
      <div className="container">
        <div className="section-intro">
          <h4 className="section-intro__title">OUR PORTFOLIO</h4>
          <h2 className="section-intro__subtitle bottom-border">Latest Completed Projects</h2>
        </div>
        { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
        : organizationData.error ? <pre className="text-danger">Unable to load data</pre> 
        : organizationData.organization.projects ? organizationData.organization.projects.map((project, index) =>
          <div className="row align-items-end pb-md-5 mb-4" key={project.uuid}>
            <div className="col-md-7 mb-4 mb-md-0">
              <div className="portfolio__img">
                <img className="img-fluid" src={`${window.baseURL}/${project.photo}`} alt="" />
              </div>
            </div>
            <div className="col-md-5 mb-5 pl-xl-5">
              <h4 className="section-intro__title left-border">
                {months[new Date(Number(project.date)).getMonth()]}, {new Date(Number(project.date)).getFullYear()}
              </h4>
              <h2 className="section-intro__subtitle small">{project.name}</h2>
              {parseHTML(project.description.substring(0, 500))}
              <a className="btn btn--rightBorder mt-3" href={`/portfolio-details:${index}`}>Read More</a>
            </div>
          </div>)
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
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);