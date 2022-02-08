
import React from 'react';
import { connect } from 'react-redux';
import { parseHTML } from '../util';
import Navigation from './nav/navigation';
import Footer from './nav/footer';
import CFG from '../config.json';

function About({ organizationData }) {
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

    <section className="about section-margin mb-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
            <div className="about__img text-center text-md-left mb-5 mb-md-0">
              <img className="img-fluid" src="dist/img/about.png" alt="" />
              <a href="#/" className="about__img__date text-center">
                <h3>3</h3>
                <p>Years <br/> of Creativity</p>
              </a>
            </div>
          </div>
          <div className="col-md-7 pl-xl-5">
            <div className="section-intro">
              <h4 className="section-intro__title">About our Company</h4>
              <h2 className="section-intro__subtitle">We've been designing <br/> Awesome Since 2018</h2>
            </div>
            { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
            : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
            : organizationData.organization.description ?
              parseHTML(organizationData.organization.description.substring(0, 450))
            : <pre className="text-danger">Something went wrong</pre> }
            <a className="btn btn--rightBorder mt-4" href="/about-details">Read More</a>
          </div>
        </div>
      </div>
    </section>
    
    <section className="overview section-margin mt-0">
      <div className="container">
        <div className="row">
        { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
        : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
        : organizationData.organization.funfacts ?
          organizationData.organization.funfacts.map(funfact =>
          <div className="col-sm-6 col-lg-4 col-xl-3 mb-4 mb-xl-0" key={funfact.uuid}>
            <div className="media align-items-center overview__single">
              <span className="overview__single__icon"><i className={funfact.icon}></i></span>
              <div className="media-body">
                <h3>{funfact.value}+</h3>
                <p>{funfact.name}</p>
              </div>
            </div>
          </div>)
        : <pre className="text-danger">Something went wrong</pre> }
        </div>
      </div>
    </section>
    
    <section className="tips tips-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h2 className="section-intro__subtitle">Get to Know Project Estimate?</h2>
            <p>There is a moment in the life of any aspiring astronomer that it is time to buy that first telescope. 
              It’s exciting to think about setting up your own viewing station whether that is on the deck
            </p>
          </div>
          <div className="col-lg-5 text-center text-lg-right">
            <a className="btn btn-dark btn--leftBorder btn--rightBorder" href="/contacts">Get Estimate</a>
          </div>
        </div>
      </div>
    </section>

    <section className="testimonial section-margin">
      <div className="container">
        <div className="section-intro">
          <h4 className="section-intro__title">OUR Testimonial</h4>
          <h2 className="section-intro__subtitle bottom-border">What People Say About Us</h2>
        </div>
        <div className=" owl-theme testimonialCarousel">
        { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
        : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
        : organizationData.organization.testimonials ?
          organizationData.organization.testimonials.map(testimonial =>
          <div className="item" key={testimonial.uuid}>{/* owl-carousel */}
            <div className="media testimonial__slide">
              <img className="img-fluid mr-4" src={`${window.baseURL}/${testimonial.photo}`} width="120" height="125" alt="" />
              <div className="media-body">
                <blockquote>{parseHTML(testimonial.testimony)}</blockquote>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.company}</p>
              </div>
            </div>
          </div>)
        : <pre className="text-danger">Something went wrong</pre> }
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
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(About);