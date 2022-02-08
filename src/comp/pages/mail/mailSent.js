
import React from 'react';
import ContentHeader from '../../master/contentHeader';

function MailSent() {

  return (
  <>
    <ContentHeader headerData={
      { title: "Sent", subTitle: "e-mail", pageName: "E-mail/Sent" }
    }/>
    
    <section className="content container-fluid">

    </section>
  </>
  );
}

export default MailSent;