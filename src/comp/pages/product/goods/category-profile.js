
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchProductcat, updateProductcat, deleteProductcats, fetchModules, fetchSalemodes
} from '../../../../redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function ProductCategoryProfile({
    fetchProductcat, productcatFetchData, updateProductcat, productcatUpdateData, deleteProductcats, productcatsDeleteData, 
    fetchModules, fetchModulesData, fetchSalemodes, salemodesFetchData
  }) {
  const { uuid } = useParams();
  const [ state, setState ] = useState({
    moduleId: 0, saleModeId: 0, name: '', description: '', photo: null
  });
  const [ update, setUpdate ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchProductcat(uuid.substring(1));
    fetchModules();
    fetchSalemodes();
  }, []);

  useEffect(() => {
    if (productcatFetchData.productcatFetch 
      && Object.entries(productcatFetchData.productcatFetch).length > 0) {
      setState({
        ...state,
        moduleId: productcatFetchData.productcatFetch.module.id,
        saleModeId: productcatFetchData.productcatFetch.sale_mode.id,
        name: productcatFetchData.productcatFetch.name,
        description: productcatFetchData.productcatFetch.description,
      });
    }
  }, [productcatFetchData.productcatFetch]);

  useEffect(() => {
    if (update) {
      let formData = new FormData();
      
      formData.append('parameter', productcatFetchData.productcatFetch.uuid);
      formData.append('oldPhoto', productcatFetchData.productcatFetch.photo);
      formData.append('moduleId', state.moduleId);
      formData.append('saleModeId', state.saleModeId);
      formData.append('name', state.name);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      updateProductcat(formData);
      setUpdate(false);
      setReload(true);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deleteProductcats({ categories: [{ parameter: productcatFetchData.productcatFetch.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchProductcat(uuid.substring(1));
      fetchModules();
      fetchSalemodes();
      setReload(false);
    }
  }, [productcatUpdateData.productcatUpdate]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = e => {
    e.preventDefault();
    setUpdate(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Product Category", subTitle: "Profile", pageName: "Product Category / Profile" }} />
    
    <section className="content">
      <div className="nav-tabs-custom">
      { productcatsDeleteData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting product category...</>
      : productcatsDeleteData.error ?
        <pre>{JSON.stringify(productcatsDeleteData.error, null, 2)}</pre>
      : productcatsDeleteData.productcatsDelete.length > 0 ?
        <Redirect to="/product-category-registry" />
      : null }

      { productcatUpdateData.loading ?
        <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating product category...</>
      : productcatUpdateData.error ?
        <pre>{JSON.stringify(productcatUpdateData.error, null, 2)}</pre>
      : productcatUpdateData.productcatUpdate && Object.entries(productcatUpdateData.productcatUpdate).length > 0 ?
        <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated product category</h4>
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
                  <i className="fa fa-trash"></i> Delete Product Category
                </a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/product-category-registry">
                  <i className="fa fa-external-link"></i> Product Category Registry
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { productcatFetchData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading product category...</>
        : productcatFetchData.error ?
          <pre>{JSON.stringify(productcatFetchData.error, null, 2)}</pre>
        : productcatFetchData.productcatFetch && Object.entries(productcatFetchData.productcatFetch).length > 0 ?
          <>
          <div className="tab-pane active" id="profile">
            <pre>{JSON.stringify(productcatFetchData.productcatFetch, null, 2)}</pre>
          </div>
          <div className="tab-pane" id="manage">
            <form className="row" onSubmit={handleUpdate}>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="form-group">
                  <label>Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className="form-control input-sm" 
                    defaultValue={productcatFetchData.productcatFetch.name} 
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
                      defaultValue={productcatFetchData.productcatFetch.moduleId}
                      onChange={e => setState({ ...state, moduleId: e.target.value })}
                    >{fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                    </select>
                  </div>
                : null }
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                { salemodesFetchData.loading ?
                  <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading sale modes...<br/></>
                : salemodesFetchData.error ?
                  <pre className="text-center text-danger">Problem loading sale modes</pre>
                :  salemodesFetchData.salemodesFetch ?
                  <div className="form-group">
                    <label>Sale Mode <span className="text-danger">*</span></label>
                    <select
                      className="form-control input-sm"
                      defaultValue={productcatFetchData.productcatFetch.sale_mode.id}
                      onChange={e => setState({ ...state, saleModeId: e.target.value })}
                    >{salemodesFetchData.salemodesFetch.map(slmd => <option value={slmd.id} key={slmd.uuid}>{slmd.name}</option>)}
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
                  data={productcatFetchData.productcatFetch.description}
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
    productcatFetchData: state.productcatFetchData,
    productcatUpdateData: state.productcatUpdateData,
    productcatsDeleteData: state.productcatsDeleteData,
    fetchModulesData: state.fetchModulesData,
    salemodesFetchData: state.salemodesFetchData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProductcat: parameter => dispatch(fetchProductcat(parameter)),
    updateProductcat: salemode => dispatch(updateProductcat(salemode)),
    deleteProductcats: salemodes => dispatch(deleteProductcats(salemodes)),
    fetchModules: () => dispatch(fetchModules()),
    fetchSalemodes: () => dispatch(fetchSalemodes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryProfile);