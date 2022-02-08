
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ContentHeader from '../../master/contentHeader';
import { fetchModule, updateModule, deleteModules } from '../../../redux';
import { humanize, humanize1, formatDate } from '../../../utils';

function ModuleProfile({
    fetchModule, fetchModuleData, updateModule, updateModuleData, deleteModules, deleteModulesData
  }) {

  let sleepTime = 1000;

  const { uuid } = useParams();
  const [ deletion, setDeletion ] = useState(false);
  const [ updateCore, setCoreUpdate ] = useState(false);
  const [ updateAddress, setAddressUpdate ] = useState(false);
  const [ state, setState ] = useState({
    name: '', slogan: '', vision: '', mission: '', weblink: '', facebook: '', twitter: '', linkedin: '', 
    instagram: '', youtube: '', introVideo: '', description: '', privacy: '', terms: '', confidentiality: ''
  });
  const [ address, setAddress ] = useState({
    city: '', street: '', suite: '', zipcode: '', latitude: '', longitude: '', phone1: '', phone2: '', email1: '', 
    email2: '',  isMain: false,
  });
  const [ addresses, setAddresses ] = useState([]);
  const [ logo, setLogo ] = useState();
  const handleDelete = () => setDeletion(true);
  const handleCoreUpdate = () => setCoreUpdate(true);
  const handleAddressUpdate = () => setAddressUpdate(true);
  const handleAddAddress = () => setAddresses(prevAddresses => { return [...prevAddresses, address]; });
  const handleRemoveAddress = addrs => {
    const filteredAddrs = addresses.filter(value => { 
      return JSON.stringify(value) !== JSON.stringify(addrs);
    });

    setAddresses(filteredAddrs);
  }
  
  useEffect(() => fetchModule(uuid.substring(1)), []);

  useEffect(() => {
    if (fetchModuleData.module) {
      setState({
        name: fetchModuleData.module.name, slogan: fetchModuleData.module.slogan, logo: fetchModuleData.module.logo, 
        vision: fetchModuleData.module.vision, mission: fetchModuleData.module.mission, weblink: fetchModuleData.module.weblink, 
        facebook: fetchModuleData.module.facebook, twitter: fetchModuleData.module.twitter, linkedin: fetchModuleData.module.linkedin, 
        instagram: fetchModuleData.module.instagram, youtube: fetchModuleData.module.youtube, introVideo: fetchModuleData.module.introVideo, 
        description: fetchModuleData.module.description, privacy: fetchModuleData.module.privacy, terms: fetchModuleData.module.terms, 
        confidentiality: fetchModuleData.module.confidentiality
      });
      setAddress({
        city: fetchModuleData.module.city, street: fetchModuleData.module.street, suite: fetchModuleData.module.suite, 
        zipcode: fetchModuleData.module.zipcode, latitude: fetchModuleData.module.latitude, longitude: fetchModuleData.module.longitude, 
        phone1: fetchModuleData.module.phone1, phone2: fetchModuleData.module.phone2, email1: fetchModuleData.module.email1, 
        email2: fetchModuleData.module.email2,  isMain: fetchModuleData.module.isMain,
      });
    }
  }, [fetchModuleData.module]);

  useEffect(() => {
    if (fetchModuleData.module.addresses && fetchModuleData.module.addresses.length > 0) {
      setAddresses(prevAddresses => {
        return fetchModuleData.module.addresses;
      });
    }
  }, [fetchModuleData.module.addresses]);

  useEffect(() => {
    let timer;

    if (updateCore) {
      let formData = new FormData();
      
      formData.append('name', state.name);
      formData.append('slogan', state.slogan);
      formData.append('logo', logo);
      formData.append('vision', state.vision);
      formData.append('mission', state.mission);
      formData.append('weblink', state.weblink);
      formData.append('facebook', state.facebook);
      formData.append('twitter', state.twitter);
      formData.append('linkedin', state.linkedin);
      formData.append('instagram', state.instagram);
      formData.append('youtube', state.youtube);
      formData.append('introVideo', state.introVideo);
      formData.append('description', state.description);
      formData.append('privacy', state.privacy);
      formData.append('terms', state.terms);
      formData.append('confidentiality', state.confidentiality);
      formData.append('parameter', fetchModuleData.module.uuid);
      formData.append('oldLogo', fetchModuleData.module.logo);

      if (state.name !== '' && state.slogan !== '' && state.vision !== '' && state.mission !== '' && state.weblink !== '' && 
        state.facebook !== '' && state.twitter !== '' && state.linkedin !== '' && state.description !== '' && 
        state.privacy !== '' && state.terms !== '' && state.confidentiality !== '') {
        updateModule(formData);
      }
      
      timer = setTimeout(() => {
        fetchModule(uuid.substring(1));
        setCoreUpdate(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [updateCore]);

  useEffect(() => {
    let timer;

    if (updateAddress) {
      updateModule({
        parameter: fetchModuleData.module.uuid,
        addresses: JSON.stringify(addresses)
      });
      
      timer = setTimeout(() => {
        fetchModule(uuid.substring(1));
        setAddressUpdate(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [updateAddress]);

  useEffect(() => {
    if (deletion) {
      deleteModules({
        modules: [{ parameter: fetchModuleData.module.uuid }]
      });
      setDeletion(false);
    }
  }, [deletion]);

  return (
  <>
    <ContentHeader headerData={{ title: "Profile", subTitle: "Module", pageName: "Module/Profile" }}/>
    
    <section className="content container-fluid">
      { deleteModulesData.loading ?
        <>
          <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
          <span> Deleting module...</span>
        </>
      : deleteModulesData.error ?
        <pre>{JSON.stringify(deleteModulesData.error, null, 2)}</pre>
      : deleteModulesData.modules.length > 0 ?
        <h5 className="text-success text-center">
          <i className="fa fa-check"></i> Success! Deleted module
          <Redirect to="/module-registry" />
        </h5>
      : null }
      { updateModuleData.loading ?
        <>
          <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
          <span> Updating module...</span>
        </>
      : updateModuleData.error ?
        <pre>{JSON.stringify(updateModuleData.error, null, 2)}</pre>
      : Object.entries(updateModuleData.module).length > 0 ?
        <>
          <h5 className="text-success text-center">
            <i className="fa fa-check"></i> Success! Updated module
          </h5>
        </>
      : null }
      <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
          <li className="active"><a href="#profile" data-toggle="tab">Profile</a></li>
          <li><a href="#manage" data-toggle="tab">Manage</a></li>
          <li><a href="#addresses" data-toggle="tab">Addresses</a></li>
          <li><a href="#subscriptions" data-toggle="tab">Subscriptions</a></li>
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
                <a role="menuitem" tabIndex="-1" href="/module-registry">All Modules</a>
              </li>
            </ul>
          </li>
          <li className="pull-right"><a href="#" className="text-muted"><i className="fa fa-gear"></i></a></li>
        </ul>
        <div className="tab-content">

          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(fetchModuleData, null, 2)}</pre>
          </div>
          
          <div className="tab-pane" id="manage">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="form-group">
                  <label>Module / Company Name <span className="text-danger">*</span></label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Company name" 
                    defaultValue={state.name}
                    onChange={e => setState({...state, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Slogan / Catch Phrase <span className="text-danger">*</span></label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Slogan"
                    defaultValue={state.slogan}
                    onChange={e => setState({...state, slogan: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Brand Logo <span className="text-danger">*</span></label>
                  <input 
                    type="file" className="form-control input-sm" placeholder="Logo"
                    onChange={e => setLogo(e.target.files[0])}
                  />
                </div>
                <div className="form-group">
                  <label>Vision Statement <span className="text-danger">*</span></label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Vision"
                    defaultValue={state.vision}
                    onChange={e => setState({...state, vision: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Mission Statement <span className="text-danger">*</span></label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Mission"
                    defaultValue={state.mission}
                    onChange={e => setState({...state, mission: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Website (Home page url)<span className="text-danger">*</span></label>
                  <input 
                    type="text" className="form-control input-sm" placeholder="Website Link"
                    defaultValue={state.weblink}
                    onChange={e => setState({...state, weblink: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Facebook (home page url)<span className="text-danger">*</span></label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Facebook"
                    defaultValue={state.facebook}
                    onChange={e => setState({...state, facebook: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Twitter (home page url)<span className="text-danger">*</span></label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Twitter"
                    defaultValue={state.twitter}
                    onChange={e => setState({...state, twitter: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Linkedin (home page url)<span className="text-danger">*</span></label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Linkedin"
                    defaultValue={state.linkedin}
                    onChange={e => setState({...state, linkedin: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Instagram (home page url)</label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Instagram"
                    defaultValue={state.instagram}
                    onChange={e => setState({...state, instagram: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>YouTube (home page url)</label>
                  <input
                    type="text" className="form-control input-sm" placeholder="YouTube"
                    defaultValue={state.youtube}
                    onChange={e => setState({...state, youtube: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Introduction Video (youTube Video Share Link)</label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Intro Video"
                    defaultValue={state.introVideo}
                    onChange={e => setState({...state, introVideo: e.target.value})} />
                </div>
              </div>

              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="box-group" id="accordion">
                  { fetchModuleData.module && Object.entries(fetchModuleData.module).length > 0 ?
                    <>
                      <div className="panel box box-primary">
                        <div className="box-header with-border">
                          <h5 className="box-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#description">
                              Organizations' Description <span className="text-danger">*</span>
                            </a>
                          </h5>
                        </div>
                        <div id="description" className="panel-collapse collapse in">
                          <div className="box-body">
                            <CKEditor
                              editor={ClassicEditor}
                              data={fetchModuleData.module.description ? fetchModuleData.module.description : ""}
                              onChange={( e, editor ) => setState({...state, description: editor.getData()})}
                              onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                editor.editing.view.change(writer => {
                                  writer.setStyle("height", "205px", editor.editing.view.document.getRoot());
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="panel box box-primary">
                        <div className="box-header with-border">
                          <h5 className="box-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#privacy">
                              Organizations' Privacy policy <span className="text-danger">*</span>
                            </a>
                          </h5>
                        </div>
                        <div id="privacy" className="panel-collapse collapse">
                          <div className="box-body">
                            <CKEditor
                              editor={ClassicEditor}
                              data={fetchModuleData.module.privacy ? fetchModuleData.module.privacy : ""}
                              onChange={( e, editor ) => setState({...state, privacy: editor.getData()})}
                              onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                editor.editing.view.change(writer => {
                                  writer.setStyle("height", "205px", editor.editing.view.document.getRoot());
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="panel box box-primary">
                        <div className="box-header with-border">
                          <h5 className="box-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#terms">
                              Terms &amp; Conditions Of Service <span className="text-danger">*</span>
                            </a>
                          </h5>
                        </div>
                        <div id="terms" className="panel-collapse collapse">
                          <div className="box-body">
                            <CKEditor
                              editor={ClassicEditor}
                              data={fetchModuleData.module.terms ? fetchModuleData.module.terms : ""}
                              onChange={( e, editor ) => setState({...state, terms: editor.getData()})}
                              onReady={(editor) => {
                                // You can store the "editor" and use when it is needed.
                                editor.editing.view.change(writer => {
                                  writer.setStyle("height", "205px", editor.editing.view.document.getRoot());
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="panel box box-primary">
                        <div className="box-header with-border">
                          <h5 className="box-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#confidentiality">
                              Trust &amp; Confidentiality Clause <span className="text-danger">*</span>
                            </a>
                          </h5>
                        </div>
                        <div id="confidentiality" className="panel-collapse collapse">
                          <div className="box-body">
                            <CKEditor
                              editor={ClassicEditor}
                              data={fetchModuleData.module.confidentiality ? fetchModuleData.module.confidentiality : ""}
                              onChange={(e, editor) => setState({...state, confidentiality: editor.getData()})}
                              onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                editor.editing.view.change(writer => {
                                  writer.setStyle("height", "205px", editor.editing.view.document.getRoot());
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  : null }
                </div>
                <button type="button" className="btn btn-success btn-sm" onClick={handleCoreUpdate}>
                  <i className="fa fa-refresh"></i> Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="tab-pane" id="addresses">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Addresses</h3>
                <div className="pull-right">
                  <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#address">
                    <i className="fa fa-plus"></i> New Address
                  </button>{' '}
                  <button type="button" className="btn btn-success btn-sm" onClick={handleAddressUpdate}>
                    <i className="fa fa-refresh"></i> Save Changes
                  </button>
                </div>
              </div>
              <div className="box-body">
                { addresses.map((addrs, index) => {
                    return (
                      <dl className="" key={index}>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <dt>City</dt>
                            <dd>{addrs.city}</dd>
                            <dt>Street</dt>
                            <dd>{addrs.street}</dd>
                            <dt>Suite</dt>
                            <dd>{addrs.suite}</dd>
                            <dt>Zip-code</dt>
                            <dd>{addrs.zipcode}</dd>
                            <dt>Latitude</dt>
                            <dd>{addrs.latitude}</dd>
                            <dt>Longitude</dt>
                            <dd>{addrs.longitude}</dd>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <dt>Phone 1</dt>
                            <dd>{addrs.phone1}</dd>
                            <dt>Phone 2</dt>
                            <dd>{addrs.phone2}</dd>
                            <dt>Email 1</dt>
                            <dd>{addrs.email1}</dd>
                            <dt>Email 2</dt>
                            <dd>{addrs.email2}</dd>
                            <dt>Main</dt>
                            <dd>{addrs.isMain ? "Yes" : "No"}</dd>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <br />
                            <button type="button" className="btn btn-danger btn-xs" onClick={e => handleRemoveAddress(addrs)} >
                              <i className="fa fa-times"></i> Remove
                            </button>
                          </div>
                          <hr />
                        </div>
                      </dl>
                    );
                  })
                }
              </div>
              <button type="button" className="btn btn-success btn-sm" onClick={handleAddressUpdate}>
                <i className="fa fa-refresh"></i> Save Changes
              </button>
            </div>

            <div className="modal fade" id="address">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">Create New Address</h4>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal">
                      <div className="box-body">
                        <div className="form-group">
                          <label className="col-sm-2 control-label">City <span className="text-danger">*</span></label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="City" 
                              onChange={e => setAddress({ ...address, city: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Street <span className="text-danger">*</span></label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Street" 
                              onChange={e => setAddress({ ...address, street: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Suite <span className="text-danger">*</span></label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Suite" 
                              onChange={e => setAddress({ ...address, suite: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Zip-code <span className="text-danger">*</span></label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Zip-code" 
                              onChange={e => setAddress({ ...address, zipcode: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Latitude <span className="text-danger">*</span></label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Latitude" 
                              onChange={e => setAddress({ ...address, latitude: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Longitude <span className="text-danger">*</span></label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Longitude" 
                              onChange={e => setAddress({ ...address, longitude: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Phone 1 <span className="text-danger">*</span></label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Primary Tel" 
                              onChange={e => setAddress({ ...address, phone1: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Phone 2</label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Secondary Tel" 
                              onChange={e => setAddress({ ...address, phone2: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Email 1 <span className="text-danger">*</span></label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Primary Email" 
                              onChange={e => setAddress({ ...address, email1: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Email 2</label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Secondary Email" 
                              onChange={e => setAddress({ ...address, email2: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  onChange={e => setAddress({ ...address, isMain: !address.isMain })}
                                /> Mark as main address
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default btn-sm pull-left" data-dismiss="modal">
                      <i className="fa fa-times"></i> Close
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleAddAddress}>
                      <i className="fa fa-plus"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="tab-pane" id="subscriptions">
            <pre>{JSON.stringify(fetchModuleData.module.subscriptions, null, 2)}</pre>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    fetchModuleData: state.fetchModuleData,
    updateModuleData: state.updateModuleData,
    deleteModulesData: state.deleteModulesData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchModule: parameter => dispatch(fetchModule(parameter)),
    updateModule: mdl => dispatch(updateModule(mdl)),
    deleteModules: mdls => dispatch(deleteModules(mdls))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleProfile);