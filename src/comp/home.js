
import React from 'react';
import { connect } from 'react-redux';
import { parseHTML } from '../util';
import Navigation from './nav/navigation';
import Footer from './nav/footer';
import CFG from '../config.json';

function Home({ organizationData }) {
  const months = [
    "January", "February", "March", "April", "May", "June", "July", 
    "August", "September", "October", "November", "December"
  ];

  return (<>
    <Navigation />

    <header>
      <div className="hero">
        <a className="navbar-brand" href="/">
          <img src="dist/img/logo.png" alt=""/>
        </a>
        <div className=" owl-theme heroCarousel">
          <div className="item">
            <div className="hero__slide">
              <img src="dist/img/hero-3.png" alt="" />
              <div className="hero__slideContent text-center">
                <h1>Dream Heaven City</h1>
                <p>If you are looking at blank cassettes on the web Lorem ipsum dolor sit amet, consectetur adipisicing  eiusmod tempor incididunt.</p>
                <a className="btn btn--leftBorder btn--rightBorder" href="#/">Details</a>							
                <span className="hero__slideContent--right"></span>
              </div>
            </div>
          </div>
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
            : <pre className="text-danger">Something went wrong</pre>}
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
        : <pre className="text-danger">Something went wrong</pre>}
        </div>
      </div>
    </section>

    <section className="portfolio section-margin">
      <div className="container">
        <div className="section-intro">
          <h4 className="section-intro__title">OUR PORTFOLIO</h4>
          <h2 className="section-intro__subtitle bottom-border">Latest Completed Projects</h2>
        </div>
        { organizationData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
        : organizationData.error ? <pre className="text-danger">Unable to load data</pre>
        : organizationData.organization.projects ? <>

          { organizationData.organization.projects.length > 0 ?
          <div className="row align-items-end pb-md-5 mb-4">
            <div className="col-md-7 mb-4 mb-md-0">
              <div className="portfolio__img">
                <img className="img-fluid" src={`${window.baseURL}/${organizationData.organization.projects[0].photo}`} alt="" />
              </div>
            </div>
            <div className="col-md-5 mb-5 pl-xl-5">
              <h4 className="section-intro__title left-border">
                {months[new Date(Number(organizationData.organization.projects[0].date)).getMonth()]},
                {` ${new Date(Number(organizationData.organization.projects[0].date)).getFullYear()}`}
              </h4>
              <h2 className="section-intro__subtitle small">{organizationData.organization.projects[0].name}</h2>
              {parseHTML(organizationData.organization.projects[0].description.substring(0, 200))}
              <a className="btn btn--rightBorder mt-3" href="/portfolio-details:0">Read More</a>
            </div>
          </div>
          : null }
          
          { organizationData.organization.projects.length > 1 ?
          <div className="row align-items-end pb-md-5 mb-4">
            <div className="col-md-5 mb-5 pr-xl-5 order-2 order-md-1">
              <h4 className="section-intro__title left-border">
                {months[new Date(Number(organizationData.organization.projects[1].date)).getMonth()]},
                {` ${new Date(Number(organizationData.organization.projects[1].date)).getFullYear()}`}
              </h4>
              <h2 className="section-intro__subtitle small">{organizationData.organization.projects[1].name}</h2>
              {parseHTML(organizationData.organization.projects[1].description.substring(0, 200))}
              <a className="btn btn--rightBorder mt-3" href="/portfolio-details:1">Read More</a>
            </div>
            <div className="col-md-7 mb-4 mb-md-0 order-1 order-md-2">
              <div className="portfolio__img">
                <img className="img-fluid" src={`${window.baseURL}/${organizationData.organization.projects[1].photo}`} alt="" />
              </div>
            </div>
          </div>
          : null }

          { organizationData.organization.projects.length > 2 ?
          <div className="row align-items-end pb-md-5 mb-4">
            <div className="col-md-7 mb-4 mb-md-0">
              <div className="portfolio__img">
                <img className="img-fluid" src={`${window.baseURL}/${organizationData.organization.projects[2].photo}`} alt="" />
              </div>
            </div>
            <div className="col-md-5 mb-5 pl-xl-5">
              <h4 className="section-intro__title left-border">
                {months[new Date(Number(organizationData.organization.projects[2].date)).getMonth()]},
                {` ${new Date(Number(organizationData.organization.projects[2].date)).getFullYear()}`}
              </h4>
              <h2 className="section-intro__subtitle small">{organizationData.organization.projects[2].name}</h2>
              {parseHTML(organizationData.organization.projects[2].description.substring(0, 200))}
              <a className="btn btn--rightBorder mt-3" href={`/portfolio-details:2`}>Read More</a>
            </div>
          </div>
          : null }

          { organizationData.organization.projects.length > 3 ?
          <div className="row align-items-end pb-md-5 mb-4">
            <div className="col-md-5 mb-5 pr-xl-5 order-2 order-md-1">
              <h4 className="section-intro__title left-border">
                {months[new Date(Number(organizationData.organization.projects[3].date)).getMonth()]},
                {` ${new Date(Number(organizationData.organization.projects[3].date)).getFullYear()}`}
              </h4>
              <h2 className="section-intro__subtitle small">{organizationData.organization.projects[3].name}</h2>
              {parseHTML(organizationData.organization.projects[3].description.substring(0, 200))}
              <a className="btn btn--rightBorder mt-3" href="/portfolio-details:3">Read More</a>
            </div>
            <div className="col-md-7 mb-4 mb-md-0 order-1 order-md-2">
              <div className="portfolio__img">
                <img className="img-fluid" src={`${window.baseURL}/${organizationData.organization.projects[3].photo}`} alt="" />
              </div>
            </div>
          </div>
          : null }

          </>
        : <pre className="text-danger">Something went wrong</pre>}
        <div className="text-center pt-2">
          <a href="/portfolio" className="btn btn--rightBorder btn--leftBorder">Load More Projects</a>
        </div>
      </div>
    </section>

    <section className="tips tips-bg">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h2 className="section-intro__subtitle">Get to Know Project Estimate?</h2>
            <p>There is a moment in the life of any aspiring astronomer that it is time to buy that first telescope. 
              It’s exciting to think about setting up your own viewing station whether that is on the deck</p>
          </div>
          <div className="col-lg-5 text-center text-lg-right">
            <a className="btn btn-dark btn--leftBorder btn--rightBorder" href="#/">Get Estimate</a>
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
          <div className="item" key={testimonial.uuid}>
            <div className="media testimonial__slide">
              <img className="img-fluid mr-4" src={`${window.baseURL}/${testimonial.photo}`} width="120" height="125" alt="" />
              <div className="media-body">
                <blockquote>{parseHTML(testimonial.testimony)}</blockquote>
                <h3>{testimonial.name}</h3>
                <p>{testimonial.company}</p>
              </div>
            </div>
          </div>)
        : <pre className="text-danger">Something went wrong</pre>}
        </div>
      </div>
    </section>

    <Footer />
  </>
  );
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);