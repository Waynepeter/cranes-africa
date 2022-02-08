
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchProductgroup, updateProductgroup, deleteProductgroups, fetchModules, fetchProductsubcats
} from '../../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function ProductGroupProfile({
    fetchProductgroup, productgroupFetchData, updateProductgroup, productgroupUpdateData, 
    deleteProductgroups, productgroupsDeleteData, fetchModules, fetchModulesData, fetchProductsubcats, 
    productsubcatsFetchData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, productSubCatId: 0, name: '', description: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchProductgroup(uuid.substring(1));
    fetchModules();
    fetchProductsubcats();
  }, []);

  useEffect(() => {
    if (productgroupFetchData.productgroupFetch 
      && Object.entries(productgroupFetchData.productgroupFetch).length > 0) {
      setState({
        ...state,
        moduleId: productgroupFetchData.productgroupFetch.module.id,
        productSubCatId: productgroupFetchData.productgroupFetch.product_subcat.id,
        name: productgroupFetchData.productgroupFetch.name,
        description: productgroupFetchData.productgroupFetch.description,
      });
    }
  }, [productgroupFetchData.productgroupFetch]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', productgroupFetchData.productgroupFetch.uuid);
      formData.append('oldPhoto', productgroupFetchData.productgroupFetch.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('productSubCatId', state.productSubCatId);
      formData.append('name', state.name);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      updateProductgroup(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteProductgroups({ groups: [{ parameter: productgroupFetchData.productgroupFetch.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchProductgroup(uuid.substring(1));
      fetchModules();
      fetchProductsubcats();
      setReload(false);
    }
  }, [productgroupUpdateData.productgroupUpdate]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Product Group", subTitle: "Profile", pageName: "Product Group / Profile" }} />
    
    <section className="content">
      <div className="nav-tabs-custom">
      { productgroupsDeleteData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting product group...</>
      : productgroupsDeleteData.error ?
        <pre>{JSON.stringify(productgroupsDeleteData.error, null, 2)}</pre>
      : productgroupsDeleteData.productgroupsDelete.length > 0 ?
        <Redirect to="/product-group-registry" />
      : null }

      { productgroupUpdateData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating product group...</>
      : productgroupUpdateData.error ?
        <pre>{JSON.stringify(productgroupUpdateData.error, null, 2)}</pre>
      : productgroupUpdateData.productgroupUpdate && Object.entries(productgroupUpdateData.productgroupUpdate).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated product group</h4>
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
                  <i className="fa fa-trash"></i> Delete Product Group
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/product-group-registry">
                  <i className="fa fa-external-link"></i> Product Group Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { productgroupFetchData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading product group...</>
        : productgroupFetchData.error ?
          <pre>{JSON.stringify(productgroupFetchData.error, null, 2)}</pre>
        : productgroupFetchData.productgroupFetch && Object.entries(productgroupFetchData.productgroupFetch).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(productgroupFetchData.productgroupFetch, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={productgroupFetchData.productgroupFetch.name} 
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
                      defaultValue={productgroupFetchData.productgroupFetch.moduleId}
                      onChange={e => setState({ ...state, moduleId: e.target.value })}
                    >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                    </select>
                  </div>
                : null }
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                { productsubcatsFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading sub-categories...<br/></>
                : productsubcatsFetchData.error ?
                  <pre className="text-center text-danger">Problem loading sub-categories</pre>
                :  productsubcatsFetchData.productsubcatsFetch ?
                  <div className="form-group">
                    <label>Category <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={productgroupFetchData.productgroupFetch.product_subcat.id}
                      onChange={e => setState({ ...state, productSubCatId: e.target.value })}
                    >{productsubcatsFetchData.productsubcatsFetch.map(scts => <option value={scts.id} key={scts.uuid}>{scts.name}</option>)}
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
                  data={productgroupFetchData.productgroupFetch.description}
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
    productgroupFetchData: state.productgroupFetchData,
    productgroupUpdateData: state.productgroupUpdateData,
    productgroupsDeleteData: state.productgroupsDeleteData,
    fetchModulesData: state.fetchModulesData,
    productsubcatsFetchData: state.productsubcatsFetchData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProductgroup: parameter => dispatch(fetchProductgroup(parameter)),
    updateProductgroup: group => dispatch(updateProductgroup(group)),
    deleteProductgroups: groups => dispatch(deleteProductgroups(groups)),
    fetchModules: () => dispatch(fetchModules()),
    fetchProductsubcats: () => dispatch(fetchProductsubcats()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGroupProfile);