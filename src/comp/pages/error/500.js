
import React from 'react';
import ContentHeader from '../../master/contentHeader';

function Error500() {

  return (
  <>
    <ContentHeader headerData={
      { title: "500 Internal Server Error", subTitle: "error", pageName: "500 ISE" }
    }/>
    
    <section className="content container-fluid">
      <div className="error-page">
        <h2 className="headline text-red">500</h2>

        <div className="error-content">
          <h3><i className="fa fa-warning text-red"></i> Oops! Something went wrong.</h3>
          <p>
            We will work on fixing that right away.
            Meanwhile, you may <a href="/dashboard">return to dashboard</a> or try using the search form.
          </p>
          <form className="search-form">
            <div className="input-group">
              <input type="text" name="search" className="form-control" placeholder="Search" />

              <div className="input-group-btn">
                <button type="submit" name="submit" className="btn btn-danger btn-flat">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </>
  );
}

export default Error500;