
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchTestimonial, updateTestimonial, deleteTestimonials, fetchModules } from '../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../master/contentHeader';

function Testimonial({
    fetchTestimonial, fetchTestimonialData, updateTestimonial, updateTestimonialData, deleteTestimonials, deleteTestimonialsData, 
    fetchModules, fetchModulesData
  }) {
  const { uuid } = useParams();
  const [ deletion, setDeletion ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ reload, setReload ] = useState(false);
  const [ state, setState ] = useState({
    moduleId: null, name: '', rating: 1, testimony: '', company: '', icon: '', photo: null
  });

  useEffect(() => {
    fetchModules();
    fetchTestimonial(uuid.substring(1));
  }, []);

  useEffect(() => {
    if (fetchTestimonialData.fetchTestimonial.uuid) {
      setState({
        ...state,
        moduleId: fetchTestimonialData.fetchTestimonial.module.id,
        name: fetchTestimonialData.fetchTestimonial.name,
        rating: fetchTestimonialData.fetchTestimonial.rating,
        company: fetchTestimonialData.fetchTestimonial.company,
        testimony: fetchTestimonialData.fetchTestimonial.testimony,
        icon: fetchTestimonialData.fetchTestimonial.icon,
      });
    }
  }, [fetchTestimonialData.fetchTestimonial]);

  useEffect(() => {
    if (deletion) {
      deleteTestimonials({ testimonials: [{ parameter: fetchTestimonialData.fetchTestimonial.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', fetchTestimonialData.fetchTestimonial.uuid);
      formData.append('oldPhoto', fetchTestimonialData.fetchTestimonial.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('rating', state.rating);
      formData.append('company', state.company);
      formData.append('testimony', state.testimony);
      formData.append('icon', state.icon);
      formData.append('photo', state.photo);
      updateTestimonial(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (reload) {
      fetchModules();
      fetchTestimonial(uuid.substring(1));
      setReload(false);
    }
  }, [updateTestimonialData.updateTestimonial]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Testimonial", subTitle: "Profile", pageName: "Testimonial / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
        { deleteTestimonialsData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting Testimonial...</>
        : deleteTestimonialsData.error ?
          <pre>{JSON.stringify(deleteTestimonialsData.error, null, 2)}</pre>
        : deleteTestimonialsData.deleteTestimonials.length > 0 ?
          <Redirect to="/testimonials" />
        : null }

        { updateTestimonialData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating Testimonial...</>
        : updateTestimonialData.error ?
          <pre>{JSON.stringify(updateTestimonialData.error, null, 2)}</pre>
        : updateTestimonialData.updateTestimonial && Object.entries(updateTestimonialData.updateTestimonial).length > 0 ?
          <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated Testimonial</h4>
        : null }

        <ul className="nav nav-tabs">
          <li className="active"><a href="#manage" data-toggle="tab">Manage</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              More Actions <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li role="presentation">
                <a role="menuitem" tabindex="-1" onClick={handleDelete}><i className="fa fa-trash"></i> Delete Testimonial</a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/testimonials"><i className="fa fa-external-link"></i> Testimonials</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { fetchTestimonialData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading Testimonial...</>
        : fetchTestimonialData.error ?
          <pre>{JSON.stringify(fetchTestimonialData.error, null, 2)}</pre>
        : fetchTestimonialData.fetchTestimonial && Object.entries(fetchTestimonialData.fetchTestimonial).length > 0 ?
          <div className="tab-pane active" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    placeholder="Name"
                    defaultValue={fetchTestimonialData.fetchTestimonial.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                  />
                </div>
                { fetchModulesData.modules ?
                <div className="form-group">
                  <label>Module <span className="text-danger">*</span></label>
                  <select 
                    className="form-control input-sm"
                    defaultValue={fetchTestimonialData.fetchTestimonial.module.id}
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
                        defaultValue={fetchTestimonialData.fetchTestimonial.rating}
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
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Icon (HTML Tag)</label>
                      <input
                        type="text"
                        className="form-control input-sm" 
                        placeholder="Icon (HTML Tag)"
                        defaultValue={fetchTestimonialData.fetchTestimonial.icon} 
                        onChange={e => setState({ ...state, icon: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>company</label>
                      <input
                        type="text"
                        className="form-control input-sm"
                        placeholder="Company"
                        defaultValue={fetchTestimonialData.fetchTestimonial.company} 
                        onChange={e => setState({ ...state, company: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <label>Narration <span className="text-danger">*</span></label>
                <CKEditor
                  editor={ClassicEditor}
                  data={fetchTestimonialData.fetchTestimonial.testimony}
                  onChange={( e, editor ) => setState({...state, testimony: editor.getData()})}
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
    fetchTestimonialData: state.fetchTestimonialData,
    updateTestimonialData: state.updateTestimonialData,
    deleteTestimonialsData: state.deleteTestimonialsData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTestimonial: parameter => dispatch(fetchTestimonial(parameter)),
    updateTestimonial: value => dispatch(updateTestimonial(value)),
    deleteTestimonials: testimonials => dispatch(deleteTestimonials(testimonials)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Testimonial);