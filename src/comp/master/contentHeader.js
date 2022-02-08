import React from 'react';

function ContentHeader(props) {
  const { title, subTitle, pageName } = props.headerData;
  
  return (
    <section className="content-header">
      <h1>
        {title}
        <small>{subTitle}</small>
      </h1>
      <ol className="breadcrumb">
        <li><a href="/"><i className="fa fa-home"></i> Home</a></li>
        <li className="active">{pageName}</li>
      </ol>
    </section>
  );
}

export default ContentHeader;