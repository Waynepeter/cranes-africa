
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ContentHeader from '../master/contentHeader';
import { fetchNode, fetchNetwork, fetchStats } from '../../redux';

function Dashboard({
  nodeData, networkData, statsData, fetchNode, fetchNetwork, fetchStats }) {

  useEffect(() => {
    fetchNode();
    fetchNetwork();
    fetchStats();
  }, []);

  return (
  <>
    <ContentHeader headerData={{ title: "Dashboard", subTitle: "Administrator", pageName: "Dashboard" }}/>
    
    <section className="content container-fluid">
      
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon bg-aqua"><i className="fa fa-gift"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Appointments</span>
              <span className="info-box-number">00<small></small></span>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon bg-green"><i className="ion ion-ios-cart-outline"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Orders</span>
              <span className="info-box-number">00</span>
            </div>
          </div>
        </div>
        
        <div className="clearfix visible-sm-block"></div>

        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon bg-yellow"><i className="ion ion-ios-people-outline"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">New Members</span>
              <span className="info-box-number">00</span>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="info-box">
            <span className="info-box-icon bg-red"><i className="fa fa-newspaper-o"></i></span>
            <div className="info-box-content">
              <span className="info-box-text">Subscribers</span>
              <span className="info-box-number">00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="box box-info">
            <div className="box-header with-border">
              <h3 className="box-title">Node Information</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
              </div>
            </div>
            <div className="box-body">
              <pre>
              { nodeData.loading ?
                <img src="dist/img/spinner/spinner-6.gif" style={{ width: '37px', height: '37px'}} />
              : nodeData.error ?
                <pre>{JSON.stringify(nodeData.error, null, 2)}</pre>
              : nodeData.node ?
                <pre>{JSON.stringify(nodeData.node, null, 2)}</pre>
              : null }
              </pre>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">Statistics</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
              </div>
            </div>
            <div className="box-body">
              <pre>
              { statsData.loading ?
                <img src="dist/img/spinner/spinner-6.gif" style={{ width: '37px', height: '37px'}} />
              : statsData.error ?
                <pre>{JSON.stringify(statsData.error, null, 2)}</pre>
              : statsData.stats ?
                <pre>{JSON.stringify(statsData.stats, null, 2)}</pre>
              : null }
              </pre>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="box box-info">
            <div className="box-header with-border">
              <h3 className="box-title">Network Information</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
              </div>
            </div>
            <div className="box-body">
              <pre>
              { networkData.loading ?
                <img src="dist/img/spinner/spinner-6.gif" style={{ width: '37px', height: '37px'}} />
              : networkData.error ?
                <pre>{JSON.stringify(networkData.error, null, 2)}</pre>
              : networkData.network ?
                <pre>{JSON.stringify(networkData.network, null, 2)}</pre>
              : null }
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    nodeData: state.nodeData,
    networkData: state.networkData,
    statsData: state.statsData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNode: () => dispatch(fetchNode()),
    fetchNetwork: () => dispatch(fetchNetwork()),
    fetchStats: () => dispatch(fetchStats())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);