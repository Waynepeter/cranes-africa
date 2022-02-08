
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchProductsubcat, updateProductsubcat, deleteProductsubcats, fetchModules, fetchProductcats
} from '../../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function ProductSubcategoryProfile({
    fetchProductsubcat, productsubcatFetchData, updateProductsubcat, productsubcatUpdateData, 
    deleteProductsubcats, productsubcatsDeleteData, fetchModules, fetchModulesData, fetchProductcats, 
    productcatsFetchData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, productCatId: 0, name: '', description: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchProductsubcat(uuid.substring(1));
    fetchModules();
    fetchProductcats();
  }, []);

  useEffect(() => {
    if (productsubcatFetchData.productsubcatFetch 
      && Object.entries(productsubcatFetchData.productsubcatFetch).length > 0) {
      setState({
        ...state,
        moduleId: productsubcatFetchData.productsubcatFetch.module.id,
        productCatId: productsubcatFetchData.productsubcatFetch.product_cat.id,
        name: productsubcatFetchData.productsubcatFetch.name,
        description: productsubcatFetchData.productsubcatFetch.description,
      });
    }
  }, [productsubcatFetchData.productsubcatFetch]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', productsubcatFetchData.productsubcatFetch.uuid);
      formData.append('oldPhoto', productsubcatFetchData.productsubcatFetch.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('productCatId', state.productCatId);
      formData.append('name', state.name);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      updateProductsubcat(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteProductsubcats({ subcategories: [{ parameter: productsubcatFetchData.productsubcatFetch.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchProductsubcat(uuid.substring(1));
      fetchModules();
      fetchProductcats();
      setReload(false);
    }
  }, [productsubcatUpdateData.productsubcatUpdate]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Product Sub Category", subTitle: "Profile", pageName: "Product Sub Category / Profile" }} />
    
    <section className="content">
      <div className="nav-tabs-custom">
      { productsubcatsDeleteData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting product sub-category...</>
      : productsubcatsDeleteData.error ?
        <pre>{JSON.stringify(productsubcatsDeleteData.error, null, 2)}</pre>
      : productsubcatsDeleteData.productsubcatsDelete.length > 0 ?
        <Redirect to="/product-subcategory-registry" />
      : null }

      { productsubcatUpdateData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating product sub-category...</>
      : productsubcatUpdateData.error ?
        <pre>{JSON.stringify(productsubcatUpdateData.error, null, 2)}</pre>
      : productsubcatUpdateData.productsubcatUpdate && Object.entries(productsubcatUpdateData.productsubcatUpdate).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated product sub-category</h4>
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
                  <i className="fa fa-trash"></i> Delete Product Sub-category
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/product-subcategory-registry">
                  <i className="fa fa-external-link"></i> Product Sub-category Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { productsubcatFetchData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading product sub-category...</>
        : productsubcatFetchData.error ?
          <pre>{JSON.stringify(productsubcatFetchData.error, null, 2)}</pre>
        : productsubcatFetchData.productsubcatFetch && Object.entries(productsubcatFetchData.productsubcatFetch).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(productsubcatFetchData.productsubcatFetch, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={productsubcatFetchData.productsubcatFetch.name} 
                    onChange={e => setState({ ...state, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                { fetchModulesData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading modules...<br/></>
                : fetchModulesData.error ?
                  <pre className="text-center text-danger">Problem loading modules</pre>
                :  fetchModulesData.modules ?
                  <div className="form-group">
                    <label>Module <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={productsubcatFetchData.productsubcatFetch.moduleId}
                      onChange={e => setState({ ...state, moduleId: e.target.value })}
                    >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                    </select>
                  </div>
                : null }
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                { productcatsFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading sale modes...<br/></>
                : productcatsFetchData.error ?
                  <pre className="text-center text-danger">Problem loading sale modes</pre>
                :  productcatsFetchData.productcatsFetch ?
                  <div className="form-group">
                    <label>Category <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={productsubcatFetchData.productsubcatFetch.product_cat.id}
                      onChange={e => setState({ ...state, productCatId: e.target.value })}
                    >{productcatsFetchData.productcatsFetch.map(cts => <option value={cts.id} key={cts.uuid}>{cts.name}</option>)}
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
                  data={productsubcatFetchData.productsubcatFetch.description}
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
    productsubcatFetchData: state.productsubcatFetchData,
    productsubcatUpdateData: state.productsubcatUpdateData,
    productsubcatsDeleteData: state.productsubcatsDeleteData,
    fetchModulesData: state.fetchModulesData,
    productcatsFetchData: state.productcatsFetchData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProductsubcat: parameter => dispatch(fetchProductsubcat(parameter)),
    updateProductsubcat: subcat => dispatch(updateProductsubcat(subcat)),
    deleteProductsubcats: subcats => dispatch(deleteProductsubcats(subcats)),
    fetchModules: () => dispatch(fetchModules()),
    fetchProductcats: () => dispatch(fetchProductcats()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSubcategoryProfile);