
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchValue, updateValue, deleteValues, fetchModules } from '../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../master/contentHeader';

function Value({
    fetchValue, fetchValueData, updateValue, updateValueData, deleteValues, deleteValuesData, 
    fetchModules, fetchModulesData
  }) {
  const { uuid } = useParams();
  const [ deletion, setDeletion ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ reload, setReload ] = useState(false);
  const [ state, setState ] = useState({
    moduleId: null, name: '', rating: 1, narration: '', icon: '', photo: null
  });

  useEffect(() => {
    fetchModules();
    fetchValue(uuid.substring(1));
  }, []);

  useEffect(() => {
    if (fetchValueData.fetchValue.uuid) {
      setState({
        ...state,
        moduleId: fetchValueData.fetchValue.module.id,
        name: fetchValueData.fetchValue.name,
        rating: fetchValueData.fetchValue.rating,
        narration: fetchValueData.fetchValue.narration,
        icon: fetchValueData.fetchValue.icon,
      });
    }
  }, [fetchValueData.fetchValue]);

  useEffect(() => {
    if (deletion) {
      deleteValues({ values: [{ parameter: fetchValueData.fetchValue.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', fetchValueData.fetchValue.uuid);
      formData.append('oldPhoto', fetchValueData.fetchValue.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('rating', state.rating);
      formData.append('narration', state.narration);
      formData.append('icon', state.icon);
      formData.append('photo', state.photo);
      updateValue(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (reload) {
      fetchModules();
      fetchValue(uuid.substring(1));
      setReload(false);
    }
  }, [updateValueData.updateValue]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Value", subTitle: "Profile", pageName: "Value / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
        { deleteValuesData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting Value...</>
        : deleteValuesData.error ?
          <pre>{JSON.stringify(deleteValuesData.error, null, 2)}</pre>
        : deleteValuesData.deleteValues.length > 0 ?
          <Redirect to="/values" />
        : null }

        { updateValueData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating Value...</>
        : updateValueData.error ?
          <pre>{JSON.stringify(updateValueData.error, null, 2)}</pre>
        : updateValueData.updateValue && Object.entries(updateValueData.updateValue).length > 0 ?
          <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated Value</h4>
        : null }

        <ul className="nav nav-tabs">
          <li className="active"><a href="#manage" data-toggle="tab">Manage</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              More Actions <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li role="presentation">
                <a role="menuitem" tabindex="-1" onClick={handleDelete}><i className="fa fa-trash"></i> Delete Value</a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/values"><i className="fa fa-external-link"></i> Values</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { fetchValueData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading Value...</>
        : fetchValueData.error ?
          <pre>{JSON.stringify(fetchValueData.error, null, 2)}</pre>
        : fetchValueData.fetchValue && Object.entries(fetchValueData.fetchValue).length > 0 ?
          <div className="tab-pane active" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    placeholder="Name"
                    defaultValue={fetchValueData.fetchValue.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                  />
                </div>
                { fetchModulesData.modules ?
                <div className="form-group">
                  <label>Module <span className="text-danger">*</span></label>
                  <select 
                    className="form-control input-sm"
                    defaultValue={fetchValueData.fetchValue.module.id}
                    onChange={e => setState({ ...state, moduleId: e.target.value })}
                  >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                  </select>
                </div>
                : null }
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Associated photo <span className="text-danger">*</span></label>
                      <input
                        type="file"
                        className="form-control input-sm"
                        placeholder="Associated photo"
                        onChange={e => setState({ ...state, photo: e.target.files[0]})}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Rating <span className="text-danger">*</span></label>
                      <select 
                        className="form-control input-sm"
                        defaultValue={fetchValueData.fetchValue.rating}
                        onChange={e => setState({ ...state, rating: e.target.value })}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Icon (HTML Tag)</label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    placeholder="Icon (HTML Tag)"
                    defaultValue={fetchValueData.fetchValue.icon} 
                    onChange={e => setState({ ...state, icon: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label>Narration <span className="text-danger">*</span></label>
                <CKEditor
                  editor={ClassicEditor}
                  data={fetchValueData.fetchValue.narration}
                  onChange={( e, editor ) => setState({...state, narration: editor.getData()})}
                  onReady={editor => editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()))}
                />
                <button type="submit" className="btn btn-success btn-sm mt-5" >Save</button>
              </div>
            </form>
          </div>
        : null }
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    fetchValueData: state.fetchValueData,
    updateValueData: state.updateValueData,
    deleteValuesData: state.deleteValuesData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchValue: parameter => dispatch(fetchValue(parameter)),
    updateValue: value => dispatch(updateValue(value)),
    deleteValues: values => dispatch(deleteValues(values)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Value);