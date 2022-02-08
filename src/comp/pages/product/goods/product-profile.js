
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';
import {
  fetchProduct, updateProduct, deleteProducts, fetchModules, fetchCatalogues, 
  fetchDistributions, fetchSalemodes, fetchProductcats, fetchProductsubcats, fetchProductgroups
} from '../../../../redux';

function GoodsItemProfile({
    fetchProduct, productFetchData, updateProduct, productUpdateData, deleteProducts, productsDeleteData, 
    fetchModules, fetchModulesData, fetchCatalogues, cataloguesFetchData, fetchDistributions, 
    distributionsFetchData, fetchSalemodes, salemodesFetchData, fetchProductcats, productcatsFetchData, 
    fetchProductsubcats, productsubcatsFetchData, fetchProductgroups, productgroupsFetchData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, catalogueId: 0, distributionId: 0, saleModeId: 0, productCatId: 0, 
    productSubCatId: 0, productGroupId: 0, name: '', quantity: 0, weight: 0, currentPrice: 0, 
    previousPrice: 0, description: '', summary: '', photo: null, photo1: null, photo2: null
  });
  const [ specification, setSpecification ] = useState({ name: '', metric: '' });
  const [ specifications, setSpecifications ] = useState([]);
  const [ update_product, setUpdateProduct ] = useState(false);
  const [ update_specs, setUpdateSpecs ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchProduct(uuid.substring(1));
    fetchModules();
    fetchCatalogues();
    fetchDistributions();
    fetchSalemodes();
    fetchProductcats();
    fetchProductsubcats();
    fetchProductgroups();
  }, []);

  useEffect(() => {
    if (productFetchData.productFetch.moduleId) {
      setState({
        moduleId: productFetchData.productFetch.moduleId, 
        catalogueId: productFetchData.productFetch.catalogueId, 
        distributionId: productFetchData.productFetch.distributionId, 
        saleModeId: productFetchData.productFetch.saleModeId, 
        productCatId: productFetchData.productFetch.productCatId, 
        productSubCatId: productFetchData.productFetch.productSubCatId, 
        productGroupId: productFetchData.productFetch.productGroupId, 
        name: productFetchData.productFetch.name, 
        quantity: productFetchData.productFetch.quantity, 
        weight: productFetchData.productFetch.weight, 
        currentPrice: productFetchData.productFetch.currentPrice, 
        previousPrice: productFetchData.productFetch.previousPrice, 
        description: productFetchData.productFetch.description, 
        summary: productFetchData.productFetch.summary,
      });

      if (productFetchData.productFetch.specifications) {
        setSpecifications(productFetchData.productFetch.specifications);
      }
    }
  }, [productFetchData.productFetch.moduleId]);

  useEffect(() => {
    if (update_product) {
      let formData = new FormData();
      
      formData.append('parameter', productFetchData.productFetch.uuid);
      formData.append('oldPhoto',  productFetchData.productFetch.photo);
      formData.append('oldPhoto1', productFetchData.productFetch.photo1);
      formData.append('oldPhoto2', productFetchData.productFetch.photo2);
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

      updateProduct(formData);
      setReload(true);
      setUpdateProduct(false);
    }
  }, [update_product]);

  useEffect(() => {
    if (update_specs) {
      let specFormData = new FormData();
      
      specFormData.append('parameter', productFetchData.productFetch.uuid);
      specFormData.append('specifications', JSON.stringify(specifications));

      updateProduct(specFormData);
      setReload(true);
      setUpdateSpecs(false);
    }
  }, [update_specs]);

  useEffect(() => {
    if (deletion) {
      deleteProducts({ products: [{ parameter: productFetchData.productFetch.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchProduct(uuid.substring(1));
      fetchModules();
      fetchCatalogues();
      fetchDistributions();
      fetchSalemodes();
      fetchProductcats();
      fetchProductsubcats();
      fetchProductgroups();
      setReload(false);
    }
  }, [productUpdateData.productUpdate]);

  const handleProductUpdate = e => {
    e.preventDefault();
    setUpdateProduct(true);
  }
  const handleSpecsUpdate = e => {
    e.preventDefault();
    setUpdateSpecs(true);
  }
  const handleProductDelete = () => setDeletion(true);
  const handleAddSpecification = () => setSpecifications(prevSpecifications => {
    return [...prevSpecifications, specification];
  });
  const handleRemoveSpecification = spec => {
    const filteredSpecs = specifications.filter(value => JSON.stringify(value) !== JSON.stringify(spec));
    setSpecifications(filteredSpecs);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Profile", subTitle: "Product", pageName: "Product/Profile" }}/>
    
    <section className="content container-fluid">
    { productsDeleteData.loading ?
      <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting product...</>
    : productsDeleteData.error ?
      <pre>{JSON.stringify(productsDeleteData.error, null, 2)}</pre>
    : productsDeleteData.productsDelete && Object.entries(productsDeleteData.productsDelete).length > 0 ?
      <Redirect to="/product-registry" />
    : null }

    { productUpdateData.loading ?
      <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating module...</>
    : productUpdateData.error ?
      <pre>{JSON.stringify(productUpdateData.error, null, 2)}</pre>
    : Object.entries(productUpdateData.productUpdate).length > 0 ?
      <h5 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated product</h5>
    : null }

      <div className="nav-tabs-custom">
        <ul className="nav nav-tabs">
          <li className="active"><a href="#profile" data-toggle="tab">Profile</a></li>
          <li><a href="#manage" data-toggle="tab">Manage</a></li>
          <li><a href="#specifications" data-toggle="tab">Specifications</a></li>
          <li><a href="#analytics" data-toggle="tab">Product Analytics</a></li>
          <li><a href="#market" data-toggle="tab">Product Market Overview</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <i className="fa fa-bars"></i> Action <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li role="presentation">
                <a role="menuitem" tabIndex="-1" onClick={handleProductDelete}>
                  <i className="fa fa-trash"></i> Delete Product
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabIndex="-1" href="/product-registry">
                  <i className="fa fa-external-link"></i> Product Registry
                </a>
              </li>
            </ul>
          </li>
          <li className="pull-right"><a href="#" className="text-muted"><i className="fa fa-gear"></i></a></li>
        </ul>
        <div className="tab-content">
        { productFetchData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading sale mode...</>
        : productFetchData.error ?
          <pre>{JSON.stringify(productFetchData.error, null, 2)}</pre>
        : productFetchData.productFetch && Object.entries(productFetchData.productFetch).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <img style={{width: '150px', height: '100px'}} src={`${window.imgBaseURL}/${productFetchData.productFetch.photo}`} alt="" />
            <img style={{width: '150px', height: '100px'}} src={`${window.imgBaseURL}/${productFetchData.productFetch.photo1}`} alt="" />
            <img style={{width: '150px', height: '100px'}} src={`${window.imgBaseURL}/${productFetchData.productFetch.photo2}`} alt="" />
            <pre>{JSON.stringify(productFetchData.productFetch, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control input-sm"
                    placeholder="Product name" 
                    defaultValue={state.name}
                    onChange={e => setState({...state, name: e.target.value})}
                  />
                </div>
                { fetchModulesData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading modules...<br/></>
                : fetchModulesData.error ?
                  <pre className="text-center text-danger">Problem loading modules</pre>
                : fetchModulesData.modules ?
                  <div className="form-group">
                    <label>Module <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={productFetchData.productFetch.moduleId}
                      onChange={e => setState({ ...state, moduleId: e.target.value })}
                    >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
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
                      defaultValue={productFetchData.productFetch.catalogueId}
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
                      defaultValue={productFetchData.productFetch.distributionId}
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
                      defaultValue={productFetchData.productFetch.saleModeId}
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
                      defaultValue={productFetchData.productFetch.productCatId}
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
                    <label>Sub Category <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={productFetchData.productFetch.productSubCatId}
                      onChange={e => setState({ ...state, productSubCatId: e.target.value })}
                    >{productsubcatsFetchData.productsubcatsFetch.map(scts => <option value={scts.id} key={scts.uuid}>{scts.name}</option>)}
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
                      defaultValue={productFetchData.productFetch.productGroupId}
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
                    defaultValue={productFetchData.productFetch.quantity}
                    onChange={e => setState({...state, quantity: e.target.value})}
                    placeholder="Stock Quantity"
                  />
                </div>
                <div className="form-group">
                  <label>Unit weight (grams)</label>
                  <input 
                    type="number"
                    className="form-control input-sm"
                    defaultValue={productFetchData.productFetch.weight}
                    onChange={e => setState({...state, weight: e.target.value})}
                    placeholder="Unit weight"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label>Previous Price</label>
                  <input 
                    type="text"
                    className="form-control input-sm"
                    defaultValue={productFetchData.productFetch.previousPrice}
                    onChange={e => setState({...state, previousPrice: e.target.value})}
                    placeholder="Previous price"
                  />
                </div>
                <div className="form-group">
                  <label>Current Price</label>
                  <input 
                    type="text"
                    className="form-control input-sm"
                    defaultValue={productFetchData.productFetch.currentPrice}
                    onChange={e => setState({...state, currentPrice: e.target.value})}
                    placeholder="Current price"
                  />
                </div>
                <div className="form-group">
                  <label>Product Main Photo</label>
                  <input 
                    type="file"
                    className="form-control input-sm"
                    onChange={e => setState({ ...state, photo: e.target.files[0]})}
                  />
                </div>
                <div className="form-group">
                  <label>Product Alt-photo 1</label>
                  <input 
                    type="file"
                    className="form-control input-sm"
                    onChange={e => setState({ ...state, photo1: e.target.files[0]})}
                  />
                </div>
                <div className="form-group">
                  <label>Product Alt-photo 2</label>
                  <input 
                    type="file"
                    className="form-control input-sm"
                    onChange={e => setState({ ...state, photo2: e.target.files[0]})}
                  />
                </div>
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="box-group" id="accordion">
                { productFetchData.productFetch && Object.entries(productFetchData.productFetch).length > 0 ?
                  <>
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
                            data={productFetchData.productFetch.description ? productFetchData.productFetch.description : ""}
                            onChange={(e, editor) => setState({...state, description: editor.getData()})}
                            onReady={editor => editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()))}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="panel box box-primary">
                      <div className="box-header with-border">
                        <h5 className="box-title">
                          <a data-toggle="collapse" data-parent="#accordion" href="#privacy">Product Summary</a>
                        </h5>
                      </div>
                      <div id="privacy" className="panel-collapse collapse">
                        <div className="box-body">
                          <CKEditor
                            editor={ClassicEditor}
                            data={productFetchData.productFetch.summary ? productFetchData.productFetch.summary : ""}
                            onChange={(e, editor) => setState({...state, summary: editor.getData()})}
                            onReady={editor => editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()))}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                : <p className='text-danger'>Something went wrong! Try refreshing page</p>}
                </div>
                <button type="button" className="btn btn-success btn-sm" onClick={handleProductUpdate}>
                  <i className="fa fa-refresh"></i> Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="specifications">
            <div className="box box-primary">
              <div className="box-header with-border">
                <h3 className="box-title">Specifications</h3>
                <div className="pull-right">
                  <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#specification">
                    <i className="fa fa-plus"></i> New Specification
                  </button>{' '}
                  <button type="button" className="btn btn-success btn-sm" onClick={handleSpecsUpdate}>
                    <i className="fa fa-refresh"></i> Save Changes
                  </button>
                </div>
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
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={handleSpecsUpdate}
              ><i className="fa fa-refresh"></i> Save Changes
              </button>
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
                          <label className="col-sm-2 control-label">Specification name</label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Spec Name" 
                              onChange={e => setSpecification({ ...specification, name: e.target.value })} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-sm-2 control-label">Specification Metric/Value</label>
                          <div className="col-sm-10">
                            <input
                              type="text" className="form-control input-sm" placeholder="Spec Metric/Value" 
                              onChange={e => setSpecification({ ...specification, metric: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default btn-sm pull-left" data-dismiss="modal">
                      <i className="fa fa-times"></i> Close
                    </button>
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleAddSpecification}>
                      <i className="fa fa-plus"></i> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane" id="analytics">
            <h2>Product analytics coming soon...</h2>
          </div>
          <div className="tab-pane" id="market">
            <h2>Product related market overview/developments (news, reports, etc) coming soon...</h2>
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
    productFetchData: state.productFetchData,
    productUpdateData: state.productUpdateData,
    productsDeleteData: state.productsDeleteData,
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
    fetchProduct: parameter => dispatch(fetchProduct(parameter)),
    updateProduct: product => dispatch(updateProduct(product)),
    deleteProducts: products => dispatch(deleteProducts(products)),
    fetchModules: () => dispatch(fetchModules()),
    fetchCatalogues: () => dispatch(fetchCatalogues()),
    fetchDistributions: () => dispatch(fetchDistributions()),
    fetchSalemodes: () => dispatch(fetchSalemodes()),
    fetchProductcats: () => dispatch(fetchProductcats()),
    fetchProductsubcats: () => dispatch(fetchProductsubcats()),
    fetchProductgroups: () => dispatch(fetchProductgroups()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsItemProfile);