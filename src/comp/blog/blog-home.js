
import React from 'react';
import Navigation from '../nav/navigation';
import Footer from '../nav/footer';

function BlogHome() {

  return (
    <>
    <Navigation />

    <header
      className="hero-banner"
      style={{ background: 'url("dist/img/project-bg.png") left center no-repeat', backgroundsize: 'cover' }}>
      <a className="navbar-brand" href=""><img src="dist/img/logo.png" alt="" /></a>
      <div className="container">
        <h2 className="section-intro__subtitle">Our Blog</h2>
        <div className="btn-group breadcrumb">
          <a href="/" className="btn">Home</a><span className="btn btn--rightBorder">Our Blog</span>
        </div>
      </div>
    </header>
    
    <section className="post-content-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 posts-list">
            <div className="single-post row">
              <div className="col-lg-3  col-md-3 meta-details">
                <ul className="tags">
                  <li><a href="#">Food,</a></li>
                  <li><a href="#">Technology,</a></li>
                  <li><a href="#">Politics,</a></li>
                  <li><a href="#">Lifestyle</a></li>
                </ul>
                <div className="user-details row">
                  <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">Mark wiens</a> <span className="lnr lnr-user"></span></p>
                  <p className="date col-lg-12 col-md-12 col-6"><a href="#">12 Dec, 2017</a> <span className="lnr lnr-calendar-full"></span></p>
                  <p className="view col-lg-12 col-md-12 col-6"><a href="#">1.2M Views</a> <span className="lnr lnr-eye"></span></p>
                  <p className="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span className="lnr lnr-bubble"></span></p>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 ">
                <div className="feature-img">
                  <img className="img-fluid" src="dist/img/blog/feature-img1.jpg" alt="" />
                </div>
                <a className="posts-title" href="/blog-details:34567823"><h3>Astronomy Binoculars A Great Alternative</h3></a>
                <p className="excert">
                  MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money
                  on boot camp when you can get the MCSE study materials yourself at a fraction.
                </p>
                <a href="/blog-details:34567823" className="primary-btn">View More</a>
              </div>
            </div>
            <div className="single-post row">
              <div className="col-lg-3  col-md-3 meta-details">
                <ul className="tags">
                  <li><a href="#">Food,</a></li>
                  <li><a href="#">Technology,</a></li>
                  <li><a href="#">Politics,</a></li>
                  <li><a href="#">Lifestyle</a></li>
                </ul>
                <div className="user-details row">
                  <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">Mark wiens</a> <span className="lnr lnr-user"></span></p>
                  <p className="date col-lg-12 col-md-12 col-6"><a href="#">12 Dec, 2017</a> <span className="lnr lnr-calendar-full"></span></p>
                  <p className="view col-lg-12 col-md-12 col-6"><a href="#">1.2M Views</a> <span className="lnr lnr-eye"></span></p>
                  <p className="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span className="lnr lnr-bubble"></span></p>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 ">
                <div className="feature-img">
                  <img className="img-fluid" src="dist/img/blog/feature-img2.jpg" alt="" />
                </div>
                <a className="posts-title" href="/blog-details:34567823"><h3>The Basics Of Buying A Telescope</h3></a>
                <p className="excert">
                  MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money
                  on boot camp when you can get the MCSE study materials yourself at a fraction.
                </p>
                <a href="/blog-details:34567823" className="primary-btn">View More</a>
              </div>
            </div>
            <div className="single-post row">
              <div className="col-lg-3  col-md-3 meta-details">
                <ul className="tags">
                  <li><a href="#">Food,</a></li>
                  <li><a href="#">Technology,</a></li>
                  <li><a href="#">Politics,</a></li>
                  <li><a href="#">Lifestyle</a></li>
                </ul>
                <div className="user-details row">
                  <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">Mark wiens</a> <span className="lnr lnr-user"></span></p>
                  <p className="date col-lg-12 col-md-12 col-6"><a href="#">12 Dec, 2017</a> <span className="lnr lnr-calendar-full"></span></p>
                  <p className="view col-lg-12 col-md-12 col-6"><a href="#">1.2M Views</a> <span className="lnr lnr-eye"></span></p>
                  <p className="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span className="lnr lnr-bubble"></span></p>
                </div>
              </div>
              <div className="col-lg-9 col-md-9">
                <div className="feature-img">
                  <img className="img-fluid" src="dist/img/blog/feature-img3.jpg" alt="" />
                </div>
                <a className="posts-title" href="/blog-details:34567823"><h3>The Glossary Of Telescopes</h3></a>
                <p className="excert">
                  MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money
                  on boot camp when you can get the MCSE study materials yourself at a fraction.
                </p>
                <a href="/blog-details:34567823" className="primary-btn">View More</a>
              </div>
            </div>
            <div className="single-post row">
              <div className="col-lg-3  col-md-3 meta-details">
                <ul className="tags">
                  <li><a href="#">Food,</a></li>
                  <li><a href="#">Technology,</a></li>
                  <li><a href="#">Politics,</a></li>
                  <li><a href="#">Lifestyle</a></li>
                </ul>
                <div className="user-details row">
                  <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">Mark wiens</a> <span className="lnr lnr-user"></span></p>
                  <p className="date col-lg-12 col-md-12 col-6"><a href="#">12 Dec, 2017</a> <span className="lnr lnr-calendar-full"></span></p>
                  <p className="view col-lg-12 col-md-12 col-6"><a href="#">1.2M Views</a> <span className="lnr lnr-eye"></span></p>
                  <p className="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span className="lnr lnr-bubble"></span></p>
                </div>
              </div>
              <div className="col-lg-9 col-md-9">
                <div className="feature-img">
                  <img className="img-fluid" src="dist/img/blog/feature-img4.jpg" alt="" />
                </div>
                <a className="posts-title" href="/blog-details:34567823"><h3>The Night Sky</h3></a>
                <p className="excert">
                  MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money
                  on boot camp when you can get the MCSE study materials yourself at a fraction.
                </p>
                <a href="/blog-details:34567823" className="primary-btn">View More</a>
              </div>
            </div>
            <div className="single-post row">
              <div className="col-lg-3 col-md-3 meta-details">
                <ul className="tags">
                  <li><a href="#">Food,</a></li>
                  <li><a href="#">Technology,</a></li>
                  <li><a href="#">Politics,</a></li>
                  <li><a href="#">Lifestyle</a></li>
                </ul>
                <div className="user-details row">
                  <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">Mark wiens</a> <span className="lnr lnr-user"></span></p>
                  <p className="date col-lg-12 col-md-12 col-6"><a href="#">12 Dec, 2017</a> <span className="lnr lnr-calendar-full"></span></p>
                  <p className="view col-lg-12 col-md-12 col-6"><a href="#">1.2M Views</a> <span className="lnr lnr-eye"></span></p>
                  <p className="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span className="lnr lnr-bubble"></span></p>
                </div>
              </div>
              <div className="col-lg-9 col-md-9">
                <div className="feature-img">
                  <img className="img-fluid" src="dist/img/blog/feature-img5.jpg" alt="" />
                </div>
                <a className="posts-title" href="/blog-details:34567823"><h3>Telescopes 101</h3></a>
                <p className="excert">
                  MCSE boot camps have its supporters and its detractors. Some people do not understand why you should have to spend money
                  on boot camp when you can get the MCSE study materials yourself at a fraction.
                </p>
                <a href="/blog-details:34567823" className="primary-btn">View More</a>
              </div>
            </div>
            <nav className="blog-pagination justify-content-center d-flex">
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link" aria-label="Previous">
                    <span aria-hidden="true">
                      <span className="lnr lnr-chevron-left"></span>
                    </span>
                  </a>
                </li>
                <li className="page-item"><a href="#" className="page-link">01</a></li>
                <li className="page-item active"><a href="#" className="page-link">02</a></li>
                <li className="page-item"><a href="#" className="page-link">03</a></li>
                <li className="page-item"><a href="#" className="page-link">04</a></li>
                <li className="page-item"><a href="#" className="page-link">09</a></li>
                <li className="page-item">
                  <a href="#" className="page-link" aria-label="Next">
                    <span aria-hidden="true">
                      <span className="lnr lnr-chevron-right"></span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-4 sidebar-widgets">
            <div className="widget-wrap">
              <div className="single-sidebar-widget search-widget">
                <form className="search-form" action="#">
                  <input 
                    placeholder="Search Posts" 
                    name="search" 
                    type="text" 
                    onfocus="this.placeholder = ''" 
                    onblur="this.placeholder = 'Search Posts'"
                  />
                  <button type="submit"><i className="fa fa-search"></i></button>
                </form>
              </div>
              <div className="single-sidebar-widget user-info-widget">
                <img src="dist/img/blog/user-info.png" alt="" />
                <a href="#"><h4>Charlie Barber</h4></a>
                <p>
                  Senior blog writer
                </p>
                <ul className="social-links">
                  <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-github"></i></a></li>
                  <li><a href="#"><i className="fab fa-behance"></i></a></li>
                </ul>
                <p>
                  Boot camps have its supporters andit sdetractors. Some people do not understand why you should have to spend money on boot
                  camp when you can get. Boot camps have itssuppor ters andits detractors.
                </p>
              </div>
              <div className="single-sidebar-widget popular-post-widget">
                <h4 className="popular-title">Popular Posts</h4>
                <div className="popular-post-list">
                  <div className="single-post-list d-flex flex-row align-items-center">
                    <div className="thumb">
                      <img className="img-fluid" src="dist/img/blog/pp1.jpg" alt="" />
                    </div>
                    <div className="details">
                      <a href="/blog-details:34567823"><h6>Space The Final Frontier</h6></a>
                      <p>02 Hours ago</p>
                    </div>
                  </div>
                  <div className="single-post-list d-flex flex-row align-items-center">
                    <div className="thumb">
                      <img className="img-fluid" src="dist/img/blog/pp2.jpg" alt="" />
                    </div>
                    <div className="details">
                      <a href="/blog-details:34567823"><h6>The Amazing Hubble</h6></a>
                      <p>02 Hours ago</p>
                    </div>
                  </div>
                  <div className="single-post-list d-flex flex-row align-items-center">
                    <div className="thumb">
                      <img className="img-fluid" src="dist/img/blog/pp3.jpg" alt="" />
                    </div>
                    <div className="details">
                      <a href="/blog-details:34567823"><h6>Astronomy Or Astrology</h6></a>
                      <p>02 Hours ago</p>
                    </div>
                  </div>
                  <div className="single-post-list d-flex flex-row align-items-center">
                    <div className="thumb">
                      <img className="img-fluid" src="dist/img/blog/pp4.jpg" alt="" />
                    </div>
                    <div className="details">
                      <a href="/blog-details:34567823"><h6>Asteroids telescope</h6></a>
                      <p>02 Hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="single-sidebar-widget ads-widget">
                <a href="#"><img className="img-fluid" src="dist/img/blog/ads-banner.jpg" alt="" /></a>
              </div>
              <div className="single-sidebar-widget post-category-widget">
                <h4 className="category-title">Post Catgories</h4>
                <ul className="cat-list">
                  <li>
                    <a href="#" className="d-flex justify-content-between">
                      <p>Technology</p>
                      <p>37</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex justify-content-between">
                      <p>Lifestyle</p>
                      <p>24</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex justify-content-between">
                      <p>Fashion</p>
                      <p>59</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex justify-content-between">
                      <p>Art</p>
                      <p>29</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex justify-content-between">
                      <p>Food</p>
                      <p>15</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex justify-content-between">
                      <p>Architecture</p>
                      <p>09</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="d-flex justify-content-between">
                      <p>Adventure</p>
                      <p>44</p>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="single-sidebar-widget newsletter-widget">
                <h4 className="newsletter-title">Newsletter</h4>
                <p>
                  Here, I focus on a range of items and features that we use in life without giving them a second thought.
                </p>
                <div className="form-group d-flex flex-row">
                  <div className="col-autos">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text"><i className="fa fa-envelope" aria-hidden="true"></i>
                        </div>
                      </div>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="inlineFormInputGroup" 
                        placeholder="Enter email" 
                        onfocus="this.placeholder = ''"
                        onblur="this.placeholder = 'Enter email'"
                      />
                    </div>
                  </div>
                  <a href="#" className="bbtns">Subcribe</a>
                </div>
                <p className="text-bottom">You can unsubscribe at any time</p>
              </div>
              <div className="single-sidebar-widget tag-cloud-widget">
                <h4 className="tagcloud-title">Tag Clouds</h4>
                <ul>
                  <li><a href="#">Technology</a></li>
                  <li><a href="#">Fashion</a></li>
                  <li><a href="#">Architecture</a></li>
                  <li><a href="#">Fashion</a></li>
                  <li><a href="#">Food</a></li>
                  <li><a href="#">Technology</a></li>
                  <li><a href="#">Lifestyle</a></li>
                  <li><a href="#">Art</a></li>
                  <li><a href="#">Adventure</a></li>
                  <li><a href="#">Food</a></li>
                  <li><a href="#">Lifestyle</a></li>
                  <li><a href="#">Adventure</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
    </>
  );
}

export default BlogHome;