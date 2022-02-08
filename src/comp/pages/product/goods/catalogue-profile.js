
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCatalogue, updateCatalogue, deleteCatalogues, fetchModules } from '../../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function CatalogueProfile({
    fetchCatalogue, catalogueFetchData, updateCatalogue, catalogueUpdateData, deleteCatalogues, cataloguesDeleteData, 
    fetchModules, fetchModulesData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, name: '', tagline: '', description: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchCatalogue(uuid.substring(1));
    fetchModules();
  }, []);

  useEffect(() => {
    if (catalogueFetchData.catalogueFetch && Object.entries(catalogueFetchData.catalogueFetch).length > 0) {
      setState({
        ...state,
        moduleId: catalogueFetchData.catalogueFetch.module.id,
        name: catalogueFetchData.catalogueFetch.name,
        tagline: catalogueFetchData.catalogueFetch.tagline,
        description: catalogueFetchData.catalogueFetch.description,
      });
    }
  }, [catalogueFetchData.catalogueFetch]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', catalogueFetchData.catalogueFetch.uuid);
      formData.append('oldPhoto', catalogueFetchData.catalogueFetch.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('tagline', state.tagline);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      updateCatalogue(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteCatalogues({ catalogues: [{ parameter: catalogueFetchData.catalogueFetch.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchCatalogue(uuid.substring(1));
      fetchModules();
      setReload(false);
    }
  }, [catalogueUpdateData.catalogueUpdate]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Catalogue", subTitle: "Profile", pageName: "Catalogue / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
      { cataloguesDeleteData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting catalogue...</>
      : cataloguesDeleteData.error ?
        <pre>{JSON.stringify(cataloguesDeleteData.error, null, 2)}</pre>
      : cataloguesDeleteData.cataloguesDelete.length > 0 ?
        <Redirect to="/product-catalogue-registry" />
      : null }

      { catalogueUpdateData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating catalogue...</>
      : catalogueUpdateData.error ?
        <pre>{JSON.stringify(catalogueUpdateData.error, null, 2)}</pre>
      : catalogueUpdateData.catalogueUpdate && Object.entries(catalogueUpdateData.catalogueUpdate).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated catalogue</h4>
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
                  <i className="fa fa-trash"></i> Delete Catalogue
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/product-catalogue-registry">
                  <i className="fa fa-external-link"></i> Catalogue Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { catalogueFetchData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading catalogue...</>
        : catalogueFetchData.error ?
          <pre>{JSON.stringify(catalogueFetchData.error, null, 2)}</pre>
        : catalogueFetchData.catalogueFetch && Object.entries(catalogueFetchData.catalogueFetch).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(catalogueFetchData.catalogueFetch, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={catalogueFetchData.catalogueFetch.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <label>Tagline <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={catalogueFetchData.catalogueFetch.tagline} 
                    onChange={e => setState({ ...state, tagline: e.target.value })}
                    placeholder="Tagline"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                { fetchModulesData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading modules...<br/></>
                : fetchModulesData.error ?
                  <pre className="text-center text-danger">Problem loading modules</pre>
                :  fetchModulesData.modules ?
                  <div className="form-group">
                    <label>Module <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={catalogueFetchData.catalogueFetch.moduleId}
                      onChange={e => setState({ ...state, moduleId: e.target.value })}
                    >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
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
                  data={catalogueFetchData.catalogueFetch.description}
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
    catalogueFetchData: state.catalogueFetchData,
    catalogueUpdateData: state.catalogueUpdateData,
    cataloguesDeleteData: state.cataloguesDeleteData,
    fetchModulesData: state.fetchModulesData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCatalogue: parameter => dispatch(fetchCatalogue(parameter)),
    updateCatalogue: catalogue => dispatch(updateCatalogue(catalogue)),
    deleteCatalogues: catalogues => dispatch(deleteCatalogues(catalogues)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueProfile);