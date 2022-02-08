
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSubscription, deleteSubscriptions } from '../../../redux';
import ContentHeader from '../../master/contentHeader';

function Subscription({
    fetchSubscription, fetchSubscriptionData, deleteSubscriptions, deleteSubscriptionsData
  }) {
  const { uuid } = useParams();
  let sleepTime = 1000;
  
  const [ deletion, setDeletion ] = useState(false);

  useEffect(() => fetchSubscription(uuid.substring(1)), []);

  // useEffect(() => {
  //   let timer;
  //   if (update) {
  //     updatePermission({
  //       parameter: permissionData.permission.uuid,
  //       name: newPermissionName
  //     });
  //     timer = setTimeout(() => {
  //       fetchPermission(uuid.substring(1));
  //       setUpdate(false);
  //     }, sleepTime);
  //     return () => clearTimeout(timer);
  //   }
  // }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteSubscriptions({ subscriptions: [{ parameter: fetchSubscriptionData.fetchSubscription.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  return (
  <>
    <ContentHeader headerData={{ title: "Subscription", subTitle: "Profile", pageName: "Subscription / Profile" }}/>
    
    <section className="content container-fluid">

      <div className="box box-primary">
        <div className="box-body">

          <pre>{JSON.stringify(fetchSubscriptionData, null, 2)}</pre>
          
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    fetchSubscriptionData: state.fetchSubscriptionData,
    deleteSubscriptionsData: state.deleteSubscriptionsData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSubscription: parameter => dispatch(fetchSubscription(parameter)),
    deleteSubscriptions: subscriptions => dispatch(deleteSubscriptions(subscriptions)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);