
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';
import {
  createProduct, fetchModules, fetchCatalogues, fetchDistributions, fetchSalemodes, 
  fetchProductcats, fetchProductsubcats, fetchProductgroups
} from '../../../../redux';

function ProductCreation({
    createProduct, productCreateData, fetchModules, fetchModulesData, fetchCatalogues, 
    cataloguesFetchData, fetchDistributions, distributionsFetchData, fetchSalemodes, 
    salemodesFetchData, fetchProductcats, productcatsFetchData, fetchProductsubcats, 
    productsubcatsFetchData, fetchProductgroups, productgroupsFetchData
  }) {
  const [state, setState] = useState({
    moduleId: 0, catalogueId: 0, distributionId: 0, saleModeId: 0, productCatId: 0, 
    productSubCatId: 0, productGroupId: 0, name: '', quantity: 0, weight: 0, currentPrice: 0, 
    previousPrice: 0, description: '', summary: '', photo: null, photo1: null, photo2: null
  });
  const [ specification, setSpecification ] = useState({ name: '', metric: '' });
  const [ specifications, setSpecifications ] = useState([]);
  const [ save, setSave ] = useState(false);
  
  useEffect(() => {
    fetchModules();
    fetchCatalogues();
    fetchDistributions();
    fetchSalemodes();
    fetchProductcats();
    fetchProductsubcats();
    fetchProductgroups();
  }, []);

  useEffect(() => {
    if (fetchModulesData.modules.length > 0) 
      setState({...state, moduleId: fetchModulesData.modules[0].id});
  }, [fetchModulesData.modules]);

  useEffect(() => {
    if (cataloguesFetchData.cataloguesFetch.length > 0) 
      setState({...state, catalogueId: cataloguesFetchData.cataloguesFetch[0].id});
  }, [cataloguesFetchData.cataloguesFetch]);

  useEffect(() => {
    if (distributionsFetchData.distributionsFetch.length > 0) 
      setState({...state, distributionId: distributionsFetchData.distributionsFetch[0].id});
  }, [distributionsFetchData.distributionsFetch]);

  useEffect(() => {
    if (salemodesFetchData.salemodesFetch.length > 0) 
      setState({...state, saleModeId: salemodesFetchData.salemodesFetch[0].id});
  }, [salemodesFetchData.salemodesFetch]);

  useEffect(() => {
    if (productcatsFetchData.productcatsFetch.length > 0) 
      setState({...state, productCatId: productcatsFetchData.productcatsFetch[0].id});
  }, [productcatsFetchData.productcatsFetch]);

  useEffect(() => {
    if (productsubcatsFetchData.productsubcatsFetch.length > 0) 
      setState({...state, productSubCatId: productsubcatsFetchData.productsubcatsFetch[0].id});
  }, [productsubcatsFetchData.productsubcatsFetch]);

  useEffect(() => {
    if (productgroupsFetchData.productgroupsFetch.length > 0) 
      setState({...state, productGroupId: productgroupsFetchData.productgroupsFetch[0].id});
  }, [productgroupsFetchData.productgroupsFetch]);

  useEffect(() => {
    if (save) {
      let formData = new FormData();

      formData.append('moduleId', state.moduleId);
      formData.append('catalogueId', state.catalogueId);
      formData.append('distributionId', state.distributionId);
      formData.append('saleModeId', state.saleModeId);
      formData.append('productCatId', state.productCatId);
      formData.append('productSubCatId', state.productSubCatId);
      formData.append('productGroupId', state.productGroupId);
      formData.append('name', state.name);
      formData.append('quantity', state.quantity);
      formData.append('weight', state.weight);
      formData.append('currentPrice', state.currentPrice);
      formData.append('previousPrice', state.previousPrice);
      formData.append('description', state.description);
      formData.append('summary', state.summary);
      formData.append('photo', state.photo);
      formData.append('photo1', state.photo1);
      formData.append('photo2', state.photo2);
      formData.append('specifications', JSON.stringify(specifications));

      createProduct(formData);
      setSave(false);
    }
  }, [save]);

  const onSubmit = e => {
    e.preventDefault();
    setSave(true);
  }
  const handleAddSpecification = () => setSpecifications(prevSpecifications => {
    return [...prevSpecifications, specification];
  });
  const handleRemoveSpecification = spec => {
    const filteredSpecs = specifications.filter(value => JSON.stringify(value) !== JSON.stringify(spec));
    setSpecifications(filteredSpecs);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Create", subTitle: "Product", pageName: "Product/Create" }} />
    
    <section className="content container-fluid">
      <div className="box box-primary">
        <div className="box-header with-border">
          <h3 className="box-title">Add Product</h3>
          { productCreateData.loading ?
            <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Adding product...</>
          : productCreateData.error ?
            <pre>{JSON.stringify(productCreateData.error, null, 2)}</pre>
          : Object.entries(productCreateData.productCreate).length > 0 ?
            <h5 className="text-success text-center">
              <i className="fa fa-check"></i> Success! Redirecting...
              <Redirect to="/product-registry" />
            </h5>
          : null }
        </div>

        <form onSubmit={onSubmit}>
          <div className="box-body">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control input-sm"
                    placeholder="Item name" 
                    onChange={e => setState({...state, name: e.target.value})}
                  />
                </div>
                { fetchModulesData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading modules...<br/></>
                : fetchModulesData.error ?
                  <pre className="text-center text-danger">Problem loading modules</pre>
                : fetchModulesData.fetchModules ?
                  <div className="form-group">
                    <label>Module <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      onChange={e => setState({ ...state, moduleId: e.target.value })}
                    >{fetchModulesData.fetchModules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                    </select>
                  </div>
                : null }

                { cataloguesFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading catalogues...<br/></>
                : cataloguesFetchData.error ?
                  <pre className="text-center text-danger">Problem loading catalogues</pre>
                : cataloguesFetchData.cataloguesFetch ?
                  <div className="form-group">
                    <label>Catalogue <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      onChange={e => setState({ ...state, catalogueId: e.target.value })}
                    >{cataloguesFetchData.cataloguesFetch.map(ctlg => <option value={ctlg.id} key={ctlg.uuid}>{ctlg.name}</option>)}
                    </select>
                  </div>
                : null }

                { distributionsFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading distributions...<br/></>
                : distributionsFetchData.error ?
                  <pre className="text-center text-danger">Problem loading distributions</pre>
                : distributionsFetchData.distributionsFetch ?
                  <div className="form-group">
                    <label>Distribution <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      onChange={e => setState({ ...state, distributionId: e.target.value })}
                    >{distributionsFetchData.distributionsFetch.map(dstr => <option value={dstr.id} key={dstr.uuid}>{dstr.name}</option>)}
                    </select>
                  </div>
                : null }

                { salemodesFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading sale modes...<br/></>
                : salemodesFetchData.error ?
                  <pre className="text-center text-danger">Problem loading sale modes</pre>
                : salemodesFetchData.salemodesFetch ?
                  <div className="form-group">
                    <label>Sale Mode <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      onChange={e => setState({ ...state, saleModeId: e.target.value })}
                    >{salemodesFetchData.salemodesFetch.map(slmd => <option value={slmd.id} key={slmd.uuid}>{slmd.name}</option>)}
                    </select>
                  </div>
                : null }
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                { productcatsFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading categories...<br/></>
                : productcatsFetchData.error ?
                  <pre className="text-center text-danger">Problem loading categories</pre>
                : productcatsFetchData.productcatsFetch ?
                  <div className="form-group">
                    <label>Category <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      onChange={e => setState({ ...state, productCatId: e.target.value })}
                    >{productcatsFetchData.productcatsFetch.map(cts => <option value={cts.id} key={cts.uuid}>{cts.name}</option>)}
                    </select>
                  </div>
                : null }

                { productsubcatsFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading sub-categories...<br/></>
                : productsubcatsFetchData.error ?
                  <pre className="text-center text-danger">Problem loading sub-categories</pre>
                : productsubcatsFetchData.productsubcatsFetch ?
                  <div className="form-group">
                    <label>Sub Category</label>
                    <select
                      className="form-control select2 input-sm"
                      onChange={e => setState({...state, productSubCatId: e.target.value})}
                    > {productsubcatsFetchData.productsubcatsFetch.map(scts => <option value={scts.id} key={scts.name}>{scts.name}</option>)}
                    </select>
                  </div>
                : null }

                { productgroupsFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading groups...<br/></>
                : productgroupsFetchData.error ?
                  <pre className="text-center text-danger">Problem loading groups</pre>
                : productgroupsFetchData.productgroupsFetch ?
                  <div className="form-group">
                    <label>Group <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      onChange={e => setState({ ...state, productGroupId: e.target.value })}
                    >{productgroupsFetchData.productgroupsFetch.map(grp => <option value={grp.id} key={grp.uuid}>{grp.name}</option>)}
                    </select>
                  </div>
                : null }

                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input 
                    type="text"
                    className="form-control input-sm"
                    placeholder="Stock Quantity"
                    onChange={e => setState({...state, quantity: e.target.value})}
                  />
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Current Price</label>
                      <input 
                        type="text"
                        className="form-control input-sm"
                        placeholder="Current Price"
                        onChange={e => setState({...state, currentPrice: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Previous Price</label>
                      <input 
                        type="text"
                        className="form-control input-sm"
                        placeholder="Previous Price"
                        onChange={e => setState({...state, previousPrice: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Unit weight (grams)</label>
                      <input 
                        type="number" 
                        className="form-control input-sm" 
                        placeholder="Weight (g)"
                        onChange={e => setState({...state, weight: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Product Main photo</label>
                      <input 
                        type="file"
                        className="form-control input-sm"
                        onChange={e => setState({ ...state, photo: e.target.files[0]})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Product Alt photo 1</label>
                      <input 
                        type="file"
                        className="form-control input-sm"
                        onChange={e => setState({ ...state, photo1: e.target.files[0]})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Product Alt photo 2</label>
                      <input 
                        type="file"
                        className="form-control input-sm"
                        onChange={e => setState({ ...state, photo2: e.target.files[0]})}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="box box-primary">
                      <div className="box-header with-border">
                        <h3 className="box-title">Specifications</h3>
                        <button type="button" className="btn btn-primary btn-xs pull-right" data-toggle="modal" data-target="#specification">
                          <i className="fa fa-plus"></i> New Specification
                        </button>
                      </div>
                      <div className="box-body">
                        { specifications.map((spec, index) =>
                          <dl className="dl-horizontal" key={index}>
                            <dt>{spec.name}</dt>
                            <dd>{spec.metric} 
                              <span className="pull-right">
                                <button
                                  type="button" 
                                  className="btn btn-danger btn-xs"
                                  value={index} 
                                  onClick={e => handleRemoveSpecification(spec)}
                                ><i className="fa fa-times"></i> Remove
                                </button>
                              </span>
                            </dd>
                          </dl>
                        )}
                      </div>
                    </div>

                    <div className="modal fade" id="specification">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Create New Specification</h4>
                          </div>
                          <div className="modal-body">
                            <div className="form-horizontal">
                              <div className="box-body">
                                <div className="form-group">
                                  <label className="col-sm-2 control-label">Specification</label>
                                  <div className="col-sm-10">
                                    <input
                                      type="text"
                                      className="form-control input-sm"
                                      onChange={e => setSpecification({ ...specification, name: e.target.value })}
                                      placeholder="Spec Name" 
                                    />
                                  </div>
                                </div>
                                <div className="form-group">
                                  <label className="col-sm-2 control-label">Metric/Value</label>
                                  <div className="col-sm-10">
                                    <input
                                      type="text" 
                                      className="form-control input-sm" 
                                      onChange={e => setSpecification({ ...specification, metric: e.target.value })}
                                      placeholder="Spec Metric/Value"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-default btn-sm pull-left"
                              data-dismiss="modal"
                            ><i className="fa fa-times"></i> Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={handleAddSpecification}
                            ><i className="fa fa-plus"></i> Add
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
                            <a data-toggle="collapse" data-parent="#accordion" href="#description">Product Description</a>
                          </h5>
                        </div>
                        <div id="description" className="panel-collapse collapse in">
                          <div className="box-body">
                            <CKEditor
                              editor={ClassicEditor}
                              data=""
                              onChange={(e, editor) => setState({...state, description: editor.getData()})}
                              onReady={(editor) => editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()))}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="panel box box-primary">
                        <div className="box-header with-border">
                          <h5 className="box-title">
                            <a data-toggle="collapse" data-parent="#accordion" href="#summary">Product Summary</a>
                          </h5>
                        </div>
                        <div id="summary" className="panel-collapse collapse">
                          <div className="box-body">
                            <CKEditor
                              editor={ClassicEditor}
                              data=""
                              onChange={(e, editor) => setState({...state, summary: editor.getData()})}
                              onReady={(editor) => editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()))}
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
          <button type="submit" className="btn btn-success btn-sm">
            <i className="fa fa-save"></i> Save Item
          </button>
        </div>
        </form>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    productCreateData: state.productCreateData,
    fetchModulesData: state.fetchModulesData,
    cataloguesFetchData: state.cataloguesFetchData,
    distributionsFetchData: state.distributionsFetchData,
    salemodesFetchData: state.salemodesFetchData,
    productcatsFetchData: state.productcatsFetchData,
    productsubcatsFetchData: state.productsubcatsFetchData,
    productgroupsFetchData: state.productgroupsFetchData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createProduct: product => dispatch(createProduct(product)),
    fetchModules: () => dispatch(fetchModules()),
    fetchCatalogues: () => dispatch(fetchCatalogues()),
    fetchDistributions: () => dispatch(fetchDistributions()),
    fetchSalemodes: () => dispatch(fetchSalemodes()),
    fetchProductcats: () => dispatch(fetchProductcats()),
    fetchProductsubcats: () => dispatch(fetchProductsubcats()),
    fetchProductgroups: () => dispatch(fetchProductgroups()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCreation);