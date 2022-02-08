
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchFAQCat, updateFAQCat, deleteFAQCats, fetchModules } from '../../../redux';
import ContentHeader from '../../master/contentHeader';

function FaqCategory({
    fetchFAQCat, fetchFAQCatData, updateFAQCat, updateFAQCatData, deleteFAQCats, deleteFAQCatsData, 
    fetchModules, fetchModulesData
  }) {
  let sleepTime = 1000;

  const { uuid } = useParams();
  const [ deletion, setDeletion ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ moduleId, setModuleId ] = useState(0);
  const [ name, setName ] = useState('');

  useEffect(() => {
    fetchFAQCat(uuid.substring(1));
    fetchModules();
  }, []);

  useEffect(() => {
    if (fetchFAQCatData.fetchFAQCat) setName(fetchFAQCatData.fetchFAQCat.name);
  }, [fetchFAQCatData.fetchFAQCat]);

  useEffect(() => {
    if (fetchFAQCatData.fetchFAQCat.moduleId) setModuleId(fetchFAQCatData.fetchFAQCat.moduleId);
  }, [fetchFAQCatData.fetchFAQCat]);

  useEffect(() => {
    if (deletion) {
      deleteFAQCats({ faqcats: [{ parameter: fetchFAQCatData.fetchFAQCat.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    let timer;

    if (update) {
      updateFAQCat({ parameter: fetchFAQCatData.fetchFAQCat.uuid, fields: { moduleId, name }});
      
      timer = setTimeout(() => {
        fetchFAQCat(uuid.substring(1));
        setUpdate(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [update]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = () => setUpdate(true);

  return (
  <>
    <ContentHeader headerData={{ title: "FAQ Category", subTitle: "Profile", pageName: "FAQ Category / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
        { deleteFAQCatsData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting FAQ Category...</>
        : deleteFAQCatsData.error ?
          <pre>{JSON.stringify(deleteFAQCatsData.error, null, 2)}</pre>
        : deleteFAQCatsData.deleteFAQCats.length > 0 ?
          <h4 className="text-success text-center">
            <i className="fa fa-check"></i> Success! Deleted FAQ Category
            <Redirect to="/faq-categories" />
          </h4>
        : null }

        { updateFAQCatData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating FAQ Category...</>
        : updateFAQCatData.error ?
          <pre>{JSON.stringify(updateFAQCatData.error, null, 2)}</pre>
        : updateFAQCatData.updateFAQCat && Object.entries(updateFAQCatData.updateFAQCat).length > 0 ?
          <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated FAQ Category</h4>
        : null }

        <ul className="nav nav-tabs">
          <li className="active"><a href="#manage" data-toggle="tab">Manage</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              More Actions <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li role="presentation">
                <a role="menuitem" tabindex="-1" onClick={handleDelete}>Delete Category</a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/faq-categories">FAQ Categories</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { fetchFAQCatData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading FAQ Category...</>
        : fetchFAQCatData.error ?
          <pre>{JSON.stringify(fetchFAQCatData.error, null, 2)}</pre>
        : Object.entries(fetchFAQCatData.fetchFAQCat).length > 0 ?
          <div className="tab-pane active" id="manage">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="form-group">
                  <label>Category Name</label>
                  <input
                    type="text" class="form-control input-sm" placeholder="FAQ Category Name"
                    value={name} onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
              { fetchModulesData.modules ?
                <div className="form-group">
                  <label>Module</label>
                  <select 
                    className="form-control input-sm" 
                    onChange={e => setModuleId(e.target.value)} style={{ width: "100%" }}
                    >
                    {fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                  </select>
                </div>
              : null }
              </div>
            </div>

            <button type="button" className="btn btn-success btn-xs mt-5" onClick={handleUpdate}>Save</button>
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
    fetchFAQCatData: state.fetchFAQCatData,
    updateFAQCatData: state.updateFAQCatData,
    deleteFAQCatsData: state.deleteFAQCatsData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFAQCat: parameter => dispatch(fetchFAQCat(parameter)),
    updateFAQCat: faqcat => dispatch(updateFAQCat(faqcat)),
    deleteFAQCats: faqcats => dispatch(deleteFAQCats(faqcats)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FaqCategory);