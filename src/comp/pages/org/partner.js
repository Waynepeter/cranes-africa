
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchPartner, updatePartner, deletePartners, fetchModules } from '../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../master/contentHeader';

function Partner({
    fetchPartner, fetchPartnerData, updatePartner, updatePartnerData, deletePartners, deletePartnersData, 
    fetchModules, fetchModulesData
  }) {
  const { uuid } = useParams();
  const [ deletion, setDeletion ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ reload, setReload ] = useState(false);
  const [ state, setState ] = useState({
    moduleId: null, name: '', narration: '', icon: '', photo: null
  });

  useEffect(() => {
    fetchModules();
    fetchPartner(uuid.substring(1));
  }, []);

  useEffect(() => {
    if (fetchPartnerData.fetchPartner.uuid) {
      setState({
        ...state,
        moduleId: fetchPartnerData.fetchPartner.module.id,
        name: fetchPartnerData.fetchPartner.name,
        narration: fetchPartnerData.fetchPartner.narration,
        icon: fetchPartnerData.fetchPartner.icon,
      });
    }
  }, [fetchPartnerData.fetchPartner]);

  useEffect(() => {
    if (deletion) {
      deletePartners({ partners: [{ parameter: fetchPartnerData.fetchPartner.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', fetchPartnerData.fetchPartner.uuid);
      formData.append('oldPhoto', fetchPartnerData.fetchPartner.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('narration', state.narration);
      formData.append('icon', state.icon);
      formData.append('photo', state.photo);
      updatePartner(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (reload) {
      fetchModules();
      fetchPartner(uuid.substring(1));
      setReload(false);
    }
  }, [updatePartnerData.updatePartner]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Partner", subTitle: "Profile", pageName: "Partner / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
      { deletePartnersData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting Partner...</>
      : deletePartnersData.error ?
        <pre>{JSON.stringify(deletePartnersData.error, null, 2)}</pre>
      : deletePartnersData.deletePartners.length > 0 ?
        <Redirect to="/partners" />
      : null }

      { updatePartnerData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating Partner...</>
      : updatePartnerData.error ?
        <pre>{JSON.stringify(updatePartnerData.error, null, 2)}</pre>
      : updatePartnerData.updatePartner && Object.entries(updatePartnerData.updatePartner).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated Partner</h4>
      : null }

        <ul className="nav nav-tabs">
          <li className="active"><a href="#manage" data-toggle="tab">Manage</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              More Actions <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li role="presentation">
                <a role="menuitem" tabindex="-1" onClick={handleDelete}><i className="fa fa-trash"></i> Delete Partner</a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/partners"><i className="fa fa-external-link"></i> Partners</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { fetchPartnerData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading Partner...</>
        : fetchPartnerData.error ?
          <pre>{JSON.stringify(fetchPartnerData.error, null, 2)}</pre>
        : fetchPartnerData.fetchPartner && Object.entries(fetchPartnerData.fetchPartner).length > 0 ?
        
          <div className="tab-pane active" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    placeholder="Name"
                    defaultValue={fetchPartnerData.fetchPartner.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                  />
                </div>
                { fetchModulesData.modules ?
                <div className="form-group">
                  <label>Module <span className="text-danger">*</span></label>
                  <select 
                    className="form-control input-sm"
                    defaultValue={fetchPartnerData.fetchPartner.module.id}
                    onChange={e => setState({ ...state, moduleId: e.target.value })}
                  >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                  </select>
                </div>
                : null }
              </div>
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
                <div className="form-group">
                  <label>Icon (HTML Tag)</label>
                  <input
                    type="text"
                    className="form-control input-sm"
                    placeholder="Icon (HTML Tag)"
                    defaultValue={fetchPartnerData.fetchPartner.icon} 
                    onChange={e => setState({ ...state, icon: e.target.value })}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label>Narration <span className="text-danger">*</span></label>
                <CKEditor
                  editor={ClassicEditor}
                  data={fetchPartnerData.fetchPartner.narration}
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
    fetchPartnerData: state.fetchPartnerData,
    updatePartnerData: state.updatePartnerData,
    deletePartnersData: state.deletePartnersData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPartner: parameter => dispatch(fetchPartner(parameter)),
    updatePartner: partner => dispatch(updatePartner(partner)),
    deletePartners: partners => dispatch(deletePartners(partners)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Partner);