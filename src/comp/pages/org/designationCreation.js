
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ContentHeader from '../../master/contentHeader';
import { createDesignation, fetchModules } from '../../../redux';

function DesignationCreation({
    createDesignation, createDesignationData, fetchModules, fetchModulesData
  }) {
  let sleepTime = 1000;

  const [ save, setSave ] = useState(false);
  const [ state, setState ] = useState({
    moduleId: 0, name: '', shortHand: '', jobRequirements: '', jobDescription: ''
  });

  useEffect(() => fetchModules(), []);
  useEffect(() => {
    if (fetchModulesData.modules.length > 0) setState({...state, moduleId: fetchModulesData.modules[0].id});
  }, [fetchModulesData.modules]);
  useEffect(() => {
    let timer;

    if (save) {
      let formData = new FormData();

      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('shortHand', state.shortHand);
      formData.append('jobRequirements', state.jobRequirements);
      formData.append('jobDescription', state.jobDescription);
      createDesignation(formData);

      timer = setTimeout(() => {
        fetchModules();
        setSave(false);
      }, sleepTime);
      return () => clearTimeout(timer);
    }
  }, [save]);

  const handleSubmit = e => {
    e.preventDefault();
    setSave(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Manage", subTitle: "Designation", pageName: "Designation/Manage" }}/>

    <section className="content container-fluid">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active"><a href="#create" data-toggle="tab">New Designation</a></li>
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#"> More <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
              <li role="presentation" class="divider"></li>
              <li role="presentation"><a role="menuitem" tabindex="-1" href="/designation-registry">Designations</a></li>
            </ul>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="create">
            { createDesignationData.loading ?
              <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Saving category...</>
            : createDesignationData.error ?
              <pre>{JSON.stringify(createDesignationData.error, null, 2)}</pre>
            : Object.entries(createDesignationData.createDesignation).length > 0 ?
              <h5 className="text-success text-center"><i className="fa fa-check"></i> Success! saved</h5>
            : null }
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Designation name" 
                      onChange={e => setState({ ...state, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="form-group">
                    <label>Shorthand</label>
                    <input
                      type="text"
                      className="form-control input-sm"
                      placeholder="Designation shorthand" 
                      onChange={e => setState({ ...state, shortHand: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  { fetchModulesData.modules ?
                    <div className="form-group">
                      <label>Module</label>
                      <select
                        className="form-control select2 input-sm"
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
                    placeholder="Job description"
                    onChange={( e, editor ) => setState({...state, jobDescription: editor.getData()})}
                    onReady={(editor) => {
                      editor.editing.view.change(writer => 
                        writer.setStyle("height", "205px", editor.editing.view.document.getRoot()));
                    }}
                  />
                  <label>Job Requirements</label>
                  <CKEditor
                    editor={ClassicEditor}
                    placeholder="Job requirements"
                    onChange={( e, editor ) => setState({...state, jobRequirements: editor.getData()})}
                    onReady={(editor) => {
                      editor.editing.view.change(writer => 
                        writer.setStyle("height", "205px", editor.editing.view.document.getRoot()));
                    }}
                  />
                  <button type="submit" className="btn btn-success btn-sm mt-5">
                    <i className="fa fa-upload"></i> Save Designation
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    createDesignationData: state.createDesignationData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createDesignation: category => dispatch(createDesignation(category)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignationCreation);