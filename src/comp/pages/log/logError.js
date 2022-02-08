
import React from 'react';
import ContentHeader from '../../master/contentHeader';

function LogError() {

  return (
  <>
    <ContentHeader headerData={
      { title: "Error", subTitle: "log", pageName: "Log/Error" }
    }/>
    
    <section className="content container-fluid">

    </section>
  </>
  );
}

export default LogError;