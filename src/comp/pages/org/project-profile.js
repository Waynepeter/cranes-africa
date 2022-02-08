
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchProject, updateProject, deleteProjects, fetchModules } from '../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../master/contentHeader';

function ProjectProfile({
    fetchProject, fetchProjectData, updateProject, updateProjectData, deleteProjects, deleteProjectsData, 
    fetchModules, fetchModulesData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, name: '', date: '', description: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchProject(uuid.substring(1));
    fetchModules();
  }, []);

  useEffect(() => {
    if (fetchProjectData.fetchProject && Object.entries(fetchProjectData.fetchProject).length > 0) {
      setState({
        ...state,
        moduleId: fetchProjectData.fetchProject.module.id,
        name: fetchProjectData.fetchProject.name,
        date: fetchProjectData.fetchProject.date,
        description: fetchProjectData.fetchProject.description,
      });
    }
  }, [fetchProjectData.fetchProject]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', fetchProjectData.fetchProject.uuid);
      formData.append('oldPhoto', fetchProjectData.fetchProject.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('date', state.date);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      updateProject(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteProjects({ projects: [{ parameter: fetchProjectData.fetchProject.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchProject(uuid.substring(1));
      fetchModules();
      setReload(false);
    }
  }, [updateProjectData.updateProject]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Project", subTitle: "Profile", pageName: "Project / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
      { deleteProjectsData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting project...</>
      : deleteProjectsData.error ?
        <pre>{JSON.stringify(deleteProjectsData.error, null, 2)}</pre>
      : deleteProjectsData.deleteProjects.length > 0 ?
        <Redirect to="/project-registry" />
      : null }

      { updateProjectData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating project...</>
      : updateProjectData.error ?
        <pre>{JSON.stringify(updateProjectData.error, null, 2)}</pre>
      : updateProjectData.updateProject && Object.entries(updateProjectData.updateProject).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated project</h4>
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
                  <i className="fa fa-trash"></i> Delete Project
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/project-registry">
                  <i className="fa fa-external-link"></i> Project Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { fetchProjectData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading catalogue...</>
        : fetchProjectData.error ?
          <pre>{JSON.stringify(fetchProjectData.error, null, 2)}</pre>
        : fetchProjectData.fetchProject && Object.entries(fetchProjectData.fetchProject).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(fetchProjectData.fetchProject, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={fetchProjectData.fetchProject.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <label>Project Date [{new Date(Number(fetchProjectData.fetchProject.date)).toISOString()}] <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    className="form-control input-sm" 
                    defaultValue={fetchProjectData.fetchProject.date} 
                    onChange={e => setState({ ...state, date: Date.parse(e.target.value) })}
                    placeholder="Project Date"
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
                      defaultValue={fetchProjectData.fetchProject.moduleId}
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
                  data={fetchProjectData.fetchProject.description}
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
    fetchProjectData: state.fetchProjectData,
    updateProjectData: state.updateProjectData,
    deleteProjectsData: state.deleteProjectsData,
    fetchModulesData: state.fetchModulesData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProject: parameter => dispatch(fetchProject(parameter)),
    updateProject: project => dispatch(updateProject(project)),
    deleteProjects: projects => dispatch(deleteProjects(projects)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProfile);