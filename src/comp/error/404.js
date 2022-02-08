
import React from 'react';
import Navigation from '../nav/navigation';
import Footer from '../nav/footer';

function Error404() {

  return (
    <>
      <Navigation />

      <header
        className="hero-banner"
        style={{ background: 'url("dist/img/project-bg.png") left center no-repeat', backgroundsize: 'cover' }}>
        <a className="navbar-brand" href=""><img src="dist/img/logo.png" alt="" /></a>
        <div className="container">
          <h2 className="section-intro__subtitle">Error 404</h2>
          <div className="btn-group breadcrumb">
            <a href="/" className="btn">Home</a><span className="btn btn--rightBorder">Error 404</span>
          </div>
        </div>
      </header>

      <section className="sample-text-area">
        <div className="container">
          <h3 className="text-heading">404 Resource Not Found</h3>
          <p className="sample-text">
            To a pile of cardboard boxes full of shiny new, retail-ready DVDs, with UPC barcodes and polywrap sitting on
            your doorstep? You need to create eye-popping artwork and have your project replicated. Using a reputable full service
            DVD Replication company like PacificDisc, Inc. to partner with is certainly a helpful option to ensure a professional
            end result, but to help with your DVD replication project, here are 4 easy steps to follow for good DVD replication results.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Error404;