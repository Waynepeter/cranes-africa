
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ContentHeader from '../../master/contentHeader';
import { fetchDesignation, deleteDesignations, updateDesignation, fetchModules } from '../../../redux';

function DesignationProfile({
    fetchDesignation, fetchDesignationData, deleteDesignations, deleteDesignationsData, updateDesignation, 
    updateDesignationData, fetchModules, fetchModulesData
  }) {
  let sleepTime = 1000;

  const { uuid } = useParams();
  const [ deletion, setDeletion ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ state, setState ] = useState({
    moduleId: 0, name: '', shortHand: '', jobRequirements: '', jobDescription: ''
  });

  useEffect(() => {
    fetchDesignation(uuid.substring(1));
    fetchModules();
  }, []);

  useEffect(() => {
    if (fetchDesignationData.fetchDesignation) {
      setState({ ...state,
        moduleId: fetchDesignationData.fetchDesignation.moduleId,
        name: fetchDesignationData.fetchDesignation.name,
        shortHand: fetchDesignationData.fetchDesignation.shortHand,
        jobRequirements: fetchDesignationData.fetchDesignation.jobRequirements,
        jobDescription: fetchDesignationData.fetchDesignation.jobDescription,
      });
    }
  }, [fetchDesignationData.fetchDesignation]);

  useEffect(() => {
    if (deletion) {
      deleteDesignations({ designations: [{ parameter: fetchDesignationData.fetchDesignation.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    let timer;

    if (update) {
      let formData = new FormData();

      formData.append('parameter', fetchDesignationData.fetchDesignation.uuid);
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('shortHand', state.shortHand);
      formData.append('jobRequirements', state.jobRequirements);
      formData.append('jobDescription', state.jobDescription);
      updateDesignation(formData);

      timer = setTimeout(() => {
        fetchDesignation(uuid.substring(1));
        setUpdate(false);
      }, sleepTime);
      return () => clearTimeout(timer);
    }
  }, [update]);

  const handleDelete = () => setDeletion(true);
  const handleSubmit = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Profile", subTitle: "Designation", pageName: "Designation/Profile" }} />
    
    <section className="content container-fluid">
      { deleteDesignationsData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting designation...</>
      : deleteDesignationsData.error ?
        <pre>{JSON.stringify(deleteDesignationsData.error, null, 2)}</pre>
      : deleteDesignationsData.deleteDesignations.length > 0 ?
        <h5 className="text-success text-center">
          <i className="fa fa-check"></i> Success! Deleted designation
          <Redirect to="/designation-registry" />
        </h5>
      : null }

      { updateDesignationData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating designation...</>
      : updateDesignationData.error ?
        <pre>{JSON.stringify(updateDesignationData.error, null, 2)}</pre>
      : Object.entries(updateDesignationData.updateDesignation).length > 0 ?
        <h5 className="text-success text-center">
          <i className="fa fa-check"></i> Success! Updated designation
        </h5>
      : null }
      
      <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
          <li className="active"><a href="#profile" data-toggle="tab">Profile</a></li>
          <li><a href="#manage" data-toggle="tab">Manage</a></li>
          <li><a href="#statistics" data-toggle="tab">Statistics</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <i className="fa fa-bars"></i> Action <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li role="presentation">
                <a role="menuitem" tabIndex="-1" onClick={handleDelete}><i className="fa fa-trash"></i> Delete</a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabIndex="-1" href="/designation-registry">Designations</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(fetchDesignationData.fetchDesignation, null, 2)}</pre>
          </div>

          <div className="tab-pane" id="manage">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="form-group">
                    <label>Designation Name</label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Designation name" 
                      defaultValue={state.name}
                      onChange={e => setState({ ...state, name: e.target.value })} />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="form-group">
                    <label>Short Hand</label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Short hand" 
                      defaultValue={state.shortHand}
                      onChange={e => setState({ ...state, shortHand: e.target.value })} />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  { fetchModulesData.modules ?
                    <div className="form-group">
                      <label>Module</label>
                      <select
                        className="form-control select2 input-sm"
                        defaultValue={state.moduleId}
                        onChange={e => setState({ ...state, moduleId: e.target.value })}
                        style={{ width: "100%" }}>
                        {fetchModulesData.modules.map((mdl, index) => <option value={mdl.id} key={index}>{mdl.name}</option>)}
                      </select>
                    </div>
                  : null }
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <label>Job Description</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={fetchDesignationData.fetchDesignation.jobDescription ? 
                          fetchDesignationData.fetchDesignation.jobDescription : ""}
                    onChange={( e, editor ) => setState({...state, jobDescription: editor.getData() })}
                    onReady={(editor) => {
                      editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()));
                    }}
                  />
                  <label>Job Requirements</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={fetchDesignationData.fetchDesignation.jobRequirements ?
                          fetchDesignationData.fetchDesignation.jobRequirements : ""}
                    onChange={( e, editor ) => setState({...state, jobRequirements: editor.getData() })}
                    onReady={(editor) => {
                      editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()));
                    }}
                  />
                  <button type="submit" className="btn btn-success btn-sm">
                    <i className="fa fa-upload"></i> Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        
          <div className="tab-pane" id="statistics">
            <h1>Designation statistics will go here...</h1>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    fetchDesignationData: state.fetchDesignationData,
    deleteDesignationsData: state.deleteDesignationsData,
    updateDesignationData: state.updateDesignationData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDesignation: parameter => dispatch(fetchDesignation(parameter)),
    deleteDesignations: designation => dispatch(deleteDesignations(designation)),
    updateDesignation: designation => dispatch(updateDesignation(designation)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignationProfile);