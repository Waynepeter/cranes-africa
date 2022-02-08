
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchSalemode, updateSalemode, deleteSalemodes, fetchModules, fetchDistributions
} from '../../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function SalemodeProfile({
    fetchSalemode, salemodeFetchData, updateSalemode, salemodeUpdateData, deleteSalemodes, salemodesDeleteData, 
    fetchModules, fetchModulesData, fetchDistributions, distributionsFetchData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, distributionId: 0, name: '', description: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchSalemode(uuid.substring(1));
    fetchModules();
    fetchDistributions();
  }, []);

  useEffect(() => {
    if (salemodeFetchData.salemodeFetch 
      && Object.entries(salemodeFetchData.salemodeFetch).length > 0) {
      setState({
        ...state,
        moduleId: salemodeFetchData.salemodeFetch.module.id,
        distributionId: salemodeFetchData.salemodeFetch.distribution.id,
        name: salemodeFetchData.salemodeFetch.name,
        description: salemodeFetchData.salemodeFetch.description,
      });
    }
  }, [salemodeFetchData.salemodeFetch]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', salemodeFetchData.salemodeFetch.uuid);
      formData.append('oldPhoto', salemodeFetchData.salemodeFetch.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('distributionId', state.distributionId);
      formData.append('name', state.name);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      updateSalemode(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteSalemodes({ salemodes: [{ parameter: salemodeFetchData.salemodeFetch.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchSalemode(uuid.substring(1));
      fetchModules();
      fetchDistributions();
      setReload(false);
    }
  }, [salemodeUpdateData.salemodeUpdate]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Sale Mode", subTitle: "Profile", pageName: "Sale Mode / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
      { salemodesDeleteData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting sale mode...</>
      : salemodesDeleteData.error ?
        <pre>{JSON.stringify(salemodesDeleteData.error, null, 2)}</pre>
      : salemodesDeleteData.salemodesDelete.length > 0 ?
        <Redirect to="/product-salemode-registry" />
      : null }

      { salemodeUpdateData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating sale mode...</>
      : salemodeUpdateData.error ?
        <pre>{JSON.stringify(salemodeUpdateData.error, null, 2)}</pre>
      : salemodeUpdateData.salemodeUpdate && Object.entries(salemodeUpdateData.salemodeUpdate).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated sale mode</h4>
      : null }

        <ul className="nav nav-tabs">
          <li className="active"><a href="#profile" data-toggle="tab">Profile</a></li>
          <li><a href="#manage" data-toggle="tab">Manage</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              Actions <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li role="presentation">
                <a role="menuitem" tabindex="-1" onClick={handleDelete}>
                  <i className="fa fa-trash"></i> Delete Sale Mode
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/product-salemode-registry">
                  <i className="fa fa-external-link"></i> Sale Mode Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { salemodeFetchData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading sale mode...</>
        : salemodeFetchData.error ?
          <pre>{JSON.stringify(salemodeFetchData.error, null, 2)}</pre>
        : salemodeFetchData.salemodeFetch && Object.entries(salemodeFetchData.salemodeFetch).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(salemodeFetchData.salemodeFetch, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={salemodeFetchData.salemodeFetch.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                { fetchModulesData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading modules...<br/></>
                : fetchModulesData.error ?
                  <pre className="text-center text-danger">Problem loading modules</pre>
                :  fetchModulesData.modules ?
                  <div className="form-group">
                    <label>Module <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={salemodeFetchData.salemodeFetch.moduleId}
                      onChange={e => setState({ ...state, moduleId: e.target.value })}
                    >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                    </select>
                  </div>
                : null }
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                { distributionsFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading distributions...<br/></>
                : distributionsFetchData.error ?
                  <pre className="text-center text-danger">Problem loading distributions</pre>
                :  distributionsFetchData.distributionsFetch ?
                  <div className="form-group">
                    <label>Distribution <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={salemodeFetchData.salemodeFetch.distribution.id}
                      onChange={e => setState({ ...state, distributionId: e.target.value })}
                    >{distributionsFetchData.distributionsFetch.map(dstr => <option value={dstr.id} key={dstr.uuid}>{dstr.name}</option>)}
                    </select>
                  </div>
                : null }
                <div className="form-group">
                  <label>Cover photo <span className="text-danger">*</span></label>
                  <input
                    type="file"
                    className="form-control input-sm"
                    onChange={e => setState({ ...state, photo: e.target.files[0]})}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label>Description <span className="text-danger">*</span></label>
                <CKEditor
                  editor={ClassicEditor}
                  data={salemodeFetchData.salemodeFetch.description}
                  onChange={( e, editor ) => setState({...state, description: editor.getData()})}
                  onReady={editor => editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()))}
                />
                <button type="submit" className="btn btn-success btn-sm mt-5" >Save Changes</button>
              </div>
            </form>
          </div>
          </>
        : null }
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    salemodeFetchData: state.salemodeFetchData,
    salemodeUpdateData: state.salemodeUpdateData,
    salemodesDeleteData: state.salemodesDeleteData,
    fetchModulesData: state.fetchModulesData,
    distributionsFetchData: state.distributionsFetchData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchSalemode: parameter => dispatch(fetchSalemode(parameter)),
    updateSalemode: salemode => dispatch(updateSalemode(salemode)),
    deleteSalemodes: salemodes => dispatch(deleteSalemodes(salemodes)),
    fetchModules: () => dispatch(fetchModules()),
    fetchDistributions: () => dispatch(fetchDistributions()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalemodeProfile);