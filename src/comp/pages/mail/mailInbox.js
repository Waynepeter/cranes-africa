
import React from 'react';
import ContentHeader from '../../master/contentHeader';

function MailInbox() {

  return (
  <>
    <ContentHeader headerData={
      { title: "Inbox", subTitle: "e-mail", pageName: "E-mail/Inbox" }
    }/>
    
    <section className="content container-fluid">

    </section>
  </>
  );
}

export default MailInbox;