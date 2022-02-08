
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchService, updateService, deleteServices, fetchModules } from '../../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function ServiceProfile({
    fetchService, fetchServiceData, updateService, updateServiceData, deleteServices, deleteServicesData, 
    fetchModules, fetchModulesData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, name: '', icon: '', description: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchService(uuid.substring(1));
    fetchModules();
  }, []);

  useEffect(() => {
    if (fetchServiceData.fetchService && Object.entries(fetchServiceData.fetchService).length > 0) {
      setState({
        ...state,
        moduleId: fetchServiceData.fetchService.module.id,
        name: fetchServiceData.fetchService.name,
        icon: fetchServiceData.fetchService.icon,
        description: fetchServiceData.fetchService.description,
      });
    }
  }, [fetchServiceData.fetchService]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', fetchServiceData.fetchService.uuid);
      formData.append('oldPhoto', fetchServiceData.fetchService.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('icon', state.icon);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      updateService(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteServices({ services: [{ parameter: fetchServiceData.fetchService.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchService(uuid.substring(1));
      fetchModules();
      setReload(false);
    }
  }, [updateServiceData.updateService]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Service", subTitle: "Profile", pageName: "Service / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
      { deleteServicesData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting service...</>
      : deleteServicesData.error ?
        <pre>{JSON.stringify(deleteServicesData.error, null, 2)}</pre>
      : deleteServicesData.deleteServices.length > 0 ?
        <Redirect to="/service-registry" />
      : null }

      { updateServiceData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating service...</>
      : updateServiceData.error ?
        <pre>{JSON.stringify(updateServiceData.error, null, 2)}</pre>
      : updateServiceData.updateService && Object.entries(updateServiceData.updateService).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated service</h4>
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
                  <i className="fa fa-trash"></i> Delete Service
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/service-registry">
                  <i className="fa fa-external-link"></i> Service Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { fetchServiceData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading service...</>
        : fetchServiceData.error ?
          <pre>{JSON.stringify(fetchServiceData.error, null, 2)}</pre>
        : fetchServiceData.fetchService && Object.entries(fetchServiceData.fetchService).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(fetchServiceData.fetchService, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={fetchServiceData.fetchService.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <label>Font Icon <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={fetchServiceData.fetchService.icon} 
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
                      defaultValue={fetchServiceData.fetchService.moduleId}
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
                  data={fetchServiceData.fetchService.description}
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
    fetchServiceData: state.fetchServiceData,
    updateServiceData: state.updateServiceData,
    deleteServicesData: state.deleteServicesData,
    fetchModulesData: state.fetchModulesData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchService: parameter => dispatch(fetchService(parameter)),
    updateService: service => dispatch(updateService(service)),
    deleteServices: services => dispatch(deleteServices(services)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceProfile);