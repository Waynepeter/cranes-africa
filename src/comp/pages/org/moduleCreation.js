
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import ContentHeader from '../../master/contentHeader';
import { createModule } from '../../../redux';

function ModuleCreation({ createModule, createModuleData }) {
  const [save, setSave] = useState(false);
  const [state, setState] = useState({
    name: '', slogan: '', vision: '', mission: '', weblink: '', facebook: '', twitter: '', linkedin: '', 
    instagram: '', youtube: '', introVideo: '', description: '', privacy: '', terms: '', confidentiality: ''
  });
  const [address, setAddress] = useState({
    city: '', street: '', suite: '', zipcode: '', latitude: '', longitude: '', phone1: '', phone2: '', email1: '', 
    email2: '',  isMain: false,
  });
  const [addresses, setAddresses] = useState([]);
  const [ logo, setLogo ] = useState();
  const handleSubmit = () => setSave(true);
  const handleAddAddress = () => setAddresses(prevAddresses => { return [...prevAddresses, address]; });
  const handleRemoveAddress = addrs => {
    const filteredAddrs = addresses.filter(value => { 
      return JSON.stringify(value) !== JSON.stringify(addrs);
    });

    setAddresses(filteredAddrs);
  }
  
  useEffect(() => {
    if (save) {
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
      formData.append('addresses', JSON.stringify(addresses));

      if (state.name !== '' && state.slogan !== '' && state.vision !== '' && state.mission !== '' && state.weblink !== '' && 
          state.facebook !== '' && state.twitter !== '' && state.linkedin !== '' && state.description !== '' && 
          state.privacy !== '' && state.terms !== '' && state.confidentiality !== '') {
        createModule(formData);
      } else {
        alert("All fields marked * are required");
      }
      setSave(false);
    }
  }, [save]);

  return (
  <>
    <ContentHeader headerData={{ title: "Create", subTitle: "Module / Company", pageName: "Module/Create" }} />
    
    <section className="content container-fluid">
      <div className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Register Module</h3>
          { createModuleData.loading ?
              <>
                <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                <span> Creating module...</span>
              </>
            : createModuleData.error ?
              <pre>{JSON.stringify(createModuleData.error, null, 2)}</pre>
            : Object.entries(createModuleData.createModule).length > 0 ?
              <h5 className="text-success text-center">
                <i className="fa fa-check"></i> Success! Redirecting...
                <Redirect to="/module-registry" />
              </h5>
            : <></>
          }
        </div>
        <div className="box-body">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label>Module / Company Name <span className="text-danger">*</span></label>
                <input
                  type="text" className="form-control input-sm" placeholder="Company name" 
                  onChange={e => setState({...state, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Slogan / Catch Phrase <span className="text-danger">*</span></label>
                <input
                  type="text" className="form-control input-sm" placeholder="Slogan"
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
                  onChange={e => setState({...state, vision: e.target.value})} />
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label>Mission Statement <span className="text-danger">*</span></label>
                <input
                  type="text" className="form-control input-sm" placeholder="Mission"
                  onChange={e => setState({...state, mission: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Website Link (Home page url) <span className="text-danger">*</span></label>
                <input 
                  type="text" className="form-control input-sm" placeholder="Website Link"
                  onChange={e => setState({...state, weblink: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Facebook (home page url) <span className="text-danger">*</span></label>
                <input
                  type="text" className="form-control input-sm" placeholder="Facebook"
                  onChange={e => setState({...state, facebook: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Twitter (home page url) <span className="text-danger">*</span></label>
                <input
                  type="text" className="form-control input-sm" placeholder="Twitter"
                  onChange={e => setState({...state, twitter: e.target.value})} />
              </div>
            </div>

            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="form-group">
                <label>Linkedin (home page url) <span className="text-danger">*</span></label>
                <input
                  type="text" className="form-control input-sm" placeholder="Linkedin"
                  onChange={e => setState({...state, linkedin: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Instagram (home page url)</label>
                <input
                  type="text" className="form-control input-sm" placeholder="Instagram"
                  onChange={e => setState({...state, instagram: e.target.value})} />
              </div>
              <div className="form-group">
                <label>YouTube (home page url)</label>
                <input
                  type="text" className="form-control input-sm" placeholder="YouTube"
                  onChange={e => setState({...state, youtube: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Introduction Video (youTube Video Share Link)</label>
                <input
                  type="text" className="form-control input-sm" placeholder="Intro Video"
                  onChange={e => setState({...state, introVideo: e.target.value})} />
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="box box-primary">
                    <div className="box-header with-border">
                      <h3 className="box-title">Addresses</h3>
                      <button type="button" className="btn btn-primary btn-xs pull-right" data-toggle="modal" data-target="#address">
                        <i className="fa fa-plus"></i> Add New Address
                      </button>
                    </div>
                    <div className="box-body">
                      { addresses.map((addrs, index) => {
                          return (
                            <dl className="dl-horizontal" key={index}>
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
                              <dt></dt>
                              <dd>
                                <button
                                  type="button" className="btn btn-danger btn-xs"
                                  value={index} onClick={e => handleRemoveAddress(addrs)}
                                  >
                                  <i className="fa fa-times"></i> Remove
                                </button>
                                <hr />
                              </dd>
                            </dl>
                          );
                        })
                      }
                    </div>
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
                                <label className="col-sm-2 control-label">Phone 2 </label>
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

                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div className="box-group" id="accordion">
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
                            data=""
                            onChange={( e, editor ) => setState({...state, description: editor.getData()})}
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              editor.editing.view.change(writer => {
                                writer.setStyle(
                                    "height",
                                    "205px",
                                    editor.editing.view.document.getRoot()
                                );
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
                            data=""
                            onChange={( e, editor ) => setState({...state, privacy: editor.getData()})}
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              editor.editing.view.change(writer => {
                                writer.setStyle(
                                    "height",
                                    "205px",
                                    editor.editing.view.document.getRoot()
                                );
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
                            data=""
                            onChange={( e, editor ) => setState({...state, terms: editor.getData()})}
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              editor.editing.view.change(writer => {
                                writer.setStyle(
                                    "height",
                                    "205px",
                                    editor.editing.view.document.getRoot()
                                );
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
                            data=""
                            onChange={( e, editor ) => setState({...state, confidentiality: editor.getData()})}
                            onReady={(editor) => {
                              // You can store the "editor" and use when it is needed.
                              editor.editing.view.change(writer => {
                                writer.setStyle(
                                    "height",
                                    "205px",
                                    editor.editing.view.document.getRoot()
                                );
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="box-footer">
          <button type="button" className="btn btn-success btn-sm" onClick={handleSubmit}>
            <i className="fa fa-save"></i> Submit
          </button>
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    createModuleData: state.createModuleData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createModule: moduleData => dispatch(createModule(moduleData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleCreation);