
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-responsive-tabs';
import { fetchFAQCats } from '../redux';
import { parseHTML } from '../util';
import CFG from '../config.json';
import 'react-responsive-tabs/styles.css';
import Navigation from './nav/navigation';
import Footer from './nav/footer';

function FAQ({ organizationData, fetchFAQCats, fetchFAQCatsData }) {
  useEffect(() => fetchFAQCats(), []);

  function getTabs(faqcats) {
    return faqcats.map((faqcat, index) => ({
      title: faqcat.name,
      getContent: () => {
        return(
          <div className="accordion-left mt-2">
            <dl className="accordion">
            { faqcat.faqs.map((faq, index) => (
                <div key={faq.uuid}>
                  <dt><a href="" className={ index === 1 ? "text-success active" : "text-success" }>{faq.question}</a></dt>
                  <dd>{parseHTML(faq.answer)}</dd>
                </div>
              ))
            }
            </dl>
          </div>
        )
      },
      key: index,
      tabClassName: 'tab',
      panelClassName: 'panel',
    }));
  }

  return (
    <>
    <Navigation />

    <header
      className="hero-banner"
      style={{ background: 'url("dist/img/project-bg.png") left center no-repeat', backgroundsize: 'cover' }}>
      <a className="navbar-brand" href=""><img src="dist/img/logo.png" alt="" /></a>
      <div className="container">
        <h2 className="section-intro__subtitle">F A Q</h2>
        <div className="btn-group breadcrumb">
          <a href="/" className="btn">Home</a><span className="btn btn--rightBorder">F A Q</span>
        </div>
      </div>
    </header>

    <section className="sample-text-area">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="menu-content pb-70 col-lg-8">
            <div className="title text-center">
              <h1 className="mb-10">Are you stuck or in need of help?</h1>
              <p>Here are frequently asked questions to help address your concerns. If you didn't get what you were looking for, 
                feel free to <a href="/contacts">contact our help desk</a>. We are happy to help!
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
          { fetchFAQCatsData.loading ? <><br/><img className="spinner-20" src={CFG.preLoader} alt=""/> Loading data...<br/></>
          : fetchFAQCatsData.error ? <pre className="text-danger">Unable to load data</pre>
          : fetchFAQCatsData.fetchFAQCats ?
            <Tabs
              items={getTabs(fetchFAQCatsData.fetchFAQCats)}
              transformWidth={800}
              transform={false}
              showInkBar={true}
              showMoreLabel="..."
              tabsWrapperClass="tabs-wrapper"
              tabClassName="tabs"
              panelClassName="tabs-panel"
            />
          : <pre className="text-danger">Something went wrong</pre>}
          </div>
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
    fetchFAQCatsData: state.fetchFAQCatsData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchFAQCats: () => dispatch(fetchFAQCats()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FAQ);