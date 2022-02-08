
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchFunfact, updateFunfact, deleteFunfacts, fetchModules } from '../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../master/contentHeader';

function FunFactProfile({
    fetchFunfact, fetchFunfactData, updateFunfact, updateFunfactData, deleteFunfacts, deleteFunfactsData, 
    fetchModules, fetchModulesData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, name: '', value: '', icon: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchFunfact(uuid.substring(1));
    fetchModules();
  }, []);

  useEffect(() => {
    if (fetchFunfactData.fetchFunfact && Object.entries(fetchFunfactData.fetchFunfact).length > 0) {
      setState({
        ...state,
        moduleId: fetchFunfactData.fetchFunfact.module.id,
        name: fetchFunfactData.fetchFunfact.name,
        value: fetchFunfactData.fetchFunfact.value,
        icon: fetchFunfactData.fetchFunfact.icon,
      });
    }
  }, [fetchFunfactData.fetchFunfact]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', fetchFunfactData.fetchFunfact.uuid);
      formData.append('oldPhoto', fetchFunfactData.fetchFunfact.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('value', state.value);
      formData.append('icon', state.icon);
      formData.append('photo', state.photo);

      updateFunfact(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteFunfacts({ funfacts: [{ parameter: fetchFunfactData.fetchFunfact.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchFunfact(uuid.substring(1));
      fetchModules();
      setReload(false);
    }
  }, [updateFunfactData.updateFunfact]);

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
      { deleteFunfactsData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting fun fact...</>
      : deleteFunfactsData.error ?
        <pre>{JSON.stringify(deleteFunfactsData.error, null, 2)}</pre>
      : deleteFunfactsData.deleteFunfacts.length > 0 ?
        <Redirect to="/funfacts-registry" />
      : null }

      { updateFunfactData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating fun fact...</>
      : updateFunfactData.error ?
        <pre>{JSON.stringify(updateFunfactData.error, null, 2)}</pre>
      : updateFunfactData.updateFunfact && Object.entries(updateFunfactData.updateFunfact).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated fun fact</h4>
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
                  <i className="fa fa-trash"></i> Delete Fun fact
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/funfacts-registry">
                  <i className="fa fa-external-link"></i> Fun fact Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { fetchFunfactData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading fun fact...</>
        : fetchFunfactData.error ?
          <pre>{JSON.stringify(fetchFunfactData.error, null, 2)}</pre>
        : fetchFunfactData.fetchFunfact && Object.entries(fetchFunfactData.fetchFunfact).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(fetchFunfactData.fetchFunfact, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={fetchFunfactData.fetchFunfact.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <label>Value <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={fetchFunfactData.fetchFunfact.value} 
                    onChange={e => setState({ ...state, value: e.target.value })}
                    placeholder="Value"
                  />
                </div>
                <div className="form-group">
                  <label>Font Icon <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={fetchFunfactData.fetchFunfact.icon} 
                    onChange={e => setState({ ...state, icon: e.target.value })}
                    placeholder="Font Icon"
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
                      defaultValue={fetchFunfactData.fetchFunfact.moduleId}
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
    fetchFunfactData: state.fetchFunfactData,
    updateFunfactData: state.updateFunfactData,
    deleteFunfactsData: state.deleteFunfactsData,
    fetchModulesData: state.fetchModulesData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchFunfact: parameter => dispatch(fetchFunfact(parameter)),
    updateFunfact: funfact => dispatch(updateFunfact(funfact)),
    deleteFunfacts: funfacts => dispatch(deleteFunfacts(funfacts)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FunFactProfile);