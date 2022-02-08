
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchDistribution, updateDistribution, deleteDistributions, fetchModules, fetchCatalogues
} from '../../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function DistributionProfile({
    fetchDistribution, distributionFetchData, updateDistribution, distributionUpdateData, deleteDistributions, distributionsDeleteData, 
    fetchModules, fetchModulesData, fetchCatalogues, cataloguesFetchData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, catalogueId: 0, name: '', description: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchDistribution(uuid.substring(1));
    fetchModules();
    fetchCatalogues();
  }, []);

  useEffect(() => {
    if (distributionFetchData.distributionFetch 
      && Object.entries(distributionFetchData.distributionFetch).length > 0) {
      setState({
        ...state,
        moduleId: distributionFetchData.distributionFetch.module.id,
        catalogueId: distributionFetchData.distributionFetch.catalogue.id,
        name: distributionFetchData.distributionFetch.name,
        description: distributionFetchData.distributionFetch.description,
      });
    }
  }, [distributionFetchData.distributionFetch]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', distributionFetchData.distributionFetch.uuid);
      formData.append('oldPhoto', distributionFetchData.distributionFetch.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('catalogueId', state.catalogueId);
      formData.append('name', state.name);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      updateDistribution(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteDistributions({ distributions: [{ parameter: distributionFetchData.distributionFetch.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchDistribution(uuid.substring(1));
      fetchModules();
      fetchCatalogues();
      setReload(false);
    }
  }, [distributionUpdateData.distributionUpdate]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Distribution", subTitle: "Profile", pageName: "Distribution / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
      { distributionsDeleteData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting distribution...</>
      : distributionsDeleteData.error ?
        <pre>{JSON.stringify(distributionsDeleteData.error, null, 2)}</pre>
      : distributionsDeleteData.distributionsDelete.length > 0 ?
        <Redirect to="/product-distribution-registry" />
      : null }

      { distributionUpdateData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating distribution...</>
      : distributionUpdateData.error ?
        <pre>{JSON.stringify(distributionUpdateData.error, null, 2)}</pre>
      : distributionUpdateData.distributionUpdate && Object.entries(distributionUpdateData.distributionUpdate).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated distribution</h4>
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
                  <i className="fa fa-trash"></i> Delete Distribution
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/product-distribution-registry">
                  <i className="fa fa-external-link"></i> Distribution Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { distributionFetchData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading distribution...</>
        : distributionFetchData.error ?
          <pre>{JSON.stringify(distributionFetchData.error, null, 2)}</pre>
        : distributionFetchData.distributionFetch && Object.entries(distributionFetchData.distributionFetch).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(distributionFetchData.distributionFetch, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={distributionFetchData.distributionFetch.name} 
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
                      defaultValue={distributionFetchData.distributionFetch.moduleId}
                      onChange={e => setState({ ...state, moduleId: e.target.value })}
                    >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                    </select>
                  </div>
                : null }
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                { cataloguesFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading catalogues...<br/></>
                : cataloguesFetchData.error ?
                  <pre className="text-center text-danger">Problem loading catalogues</pre>
                :  cataloguesFetchData.cataloguesFetch ?
                  <div className="form-group">
                    <label>Catalogue <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={distributionFetchData.distributionFetch.catalogueId}
                      onChange={e => setState({ ...state, catalogueId: e.target.value })}
                    >{cataloguesFetchData.cataloguesFetch.map(ctlg => <option value={ctlg.id} key={ctlg.uuid}>{ctlg.name}</option>)}
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
                  data={distributionFetchData.distributionFetch.description}
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
    distributionFetchData: state.distributionFetchData,
    distributionUpdateData: state.distributionUpdateData,
    distributionsDeleteData: state.distributionsDeleteData,
    fetchModulesData: state.fetchModulesData,
    cataloguesFetchData: state.cataloguesFetchData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchDistribution: parameter => dispatch(fetchDistribution(parameter)),
    updateDistribution: catalogue => dispatch(updateDistribution(catalogue)),
    deleteDistributions: catalogues => dispatch(deleteDistributions(catalogues)),
    fetchModules: () => dispatch(fetchModules()),
    fetchCatalogues: () => dispatch(fetchCatalogues()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DistributionProfile);