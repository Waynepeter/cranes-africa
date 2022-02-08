
import React, { useEffect, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchFAQ, fetchFAQCats, updateFAQ, deleteFAQs, fetchModules } from '../../../redux';
import ContentHeader from '../../master/contentHeader';

function Faq({
    fetchFAQ, fetchFAQData, fetchFAQCats, fetchFAQCatsData, updateFAQ, updateFAQData, deleteFAQs, deleteFAQsData, 
    fetchModules, fetchModulesData
  }) {
  let sleepTime = 1000;

  const { uuid } = useParams();
  const [ deletion, setDeletion ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ FaqCatId, setFaqCatId ] = useState(0);
  const [ moduleId, setModuleId ] = useState(0);
  const [ question, setQuestion ] = useState('');
  const [ answer, setAnswer ] = useState('');

  useEffect(() => {
    fetchFAQ(uuid.substring(1));
    fetchFAQCats();
    fetchModules()
  }, []);

  useEffect(() => {
    if (fetchFAQData.fetchFAQ) setModuleId(fetchFAQData.fetchFAQ.moduleId);
  }, [fetchFAQData.fetchFAQ]);

  useEffect(() => {
    if (fetchFAQData.fetchFAQ) setFaqCatId(fetchFAQData.fetchFAQ.FaqCatId);
  }, [fetchFAQData.fetchFAQ]);

  useEffect(() => {
    if (fetchFAQData.fetchFAQ) setQuestion(fetchFAQData.fetchFAQ.question);
  }, [fetchFAQData.fetchFAQ]);

  useEffect(() => {
    if (fetchFAQData.fetchFAQ) setAnswer(fetchFAQData.fetchFAQ.answer);
  }, [fetchFAQData.fetchFAQ]);

  useEffect(() => {
    if (deletion) {
      deleteFAQs({ faqs: [{ parameter: fetchFAQData.fetchFAQ.uuid }]});
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    let timer;

    if (update) {
      updateFAQ({
        parameter: fetchFAQData.fetchFAQ.uuid,
        fields: { moduleId, FaqCatId, question, answer }
      });
      
      timer = setTimeout(() => {
        fetchFAQ(uuid.substring(1));
        setUpdate(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [update]);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = () => setUpdate(true);

  return (
  <>
    <ContentHeader headerData={{ title: "FAQ", subTitle: "Profile", pageName: "FAQ / Profile" }}/>
    
    <section className="content">
      <div className="nav-tabs-custom">
        { deleteFAQsData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting FAQ...</>
        : deleteFAQsData.error ?
          <pre>{JSON.stringify(deleteFAQsData.error, null, 2)}</pre>
        : deleteFAQsData.deleteFAQs.length > 0 ?
          <h4 className="text-success text-center">
            <i className="fa fa-check"></i> Success! Deleted FAQ
            <Redirect to="/faqs" />
          </h4>
        : null }

        { updateFAQData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Updating FAQ...</>
        : updateFAQData.error ?
          <pre>{JSON.stringify(updateFAQData.error, null, 2)}</pre>
        : updateFAQData.updateFAQ && Object.entries(updateFAQData.updateFAQ).length > 0 ?
          <h4 className="text-success text-center"><i className="fa fa-check"></i> Success! Updated FAQ</h4>
        : null }

        <ul className="nav nav-tabs">
          <li className="active"><a href="#manage" data-toggle="tab">Manage</a></li>
          <li className="dropdown">
            <a className="dropdown-toggle" data-toggle="dropdown" href="#">
              More Actions <span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li role="presentation">
                <a role="menuitem" tabindex="-1" onClick={handleDelete}>Delete FAQ</a>
              </li>
              <li role="presentation" className="divider"></li>
              <li role="presentation">
                <a role="menuitem" tabindex="-1" href="/faqs">FAQ Registry</a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="tab-content">
        { fetchFAQData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading FAQ...</>
        : fetchFAQData.error ?
          <pre>{JSON.stringify(fetchFAQData.error, null, 2)}</pre>
        : Object.entries(fetchFAQData.fetchFAQ).length > 0 ?
          <div className="tab-pane active" id="manage">
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="form-group">
                  <label>Question</label>
                  <input
                    type="text" className="form-control input-sm" placeholder="Type question here"
                    value={question} onChange={e => setQuestion(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
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
              <div className="col-lg-4 col-md-4 col-sm-12">
              { fetchFAQCatsData.fetchFAQCats ?
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    className="form-control input-sm" onChange={e => setFaqCatId(e.target.value)} 
                    style={{ width: "100%" }}
                  >{fetchFAQCatsData.fetchFAQCats.map(FAQCat =>
                    <option value={FAQCat.id} key={FAQCat.uuid}>{FAQCat.name}</option>)}
                  </select>
                </div>
              : null }
              </div>
            </div>
            <label>Answer</label>
            <CKEditor
              data={answer} editor={ClassicEditor} onChange={(e, editor) => setAnswer(editor.getData())}
              onReady={editor => {
                editor.editing.view.change(
                  writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()));
              }}
            />
            <button type="button" className="btn btn-success btn-xs mt-5" onClick={handleUpdate} >Save</button>
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
    fetchFAQData: state.fetchFAQData,
    updateFAQData: state.updateFAQData,
    deleteFAQsData: state.deleteFAQsData,
    fetchFAQCatsData: state.fetchFAQCatsData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFAQ: parameter => dispatch(fetchFAQ(parameter)),
    updateFAQ: faq => dispatch(updateFAQ(faq)),
    deleteFAQs: faqs => dispatch(deleteFAQs(faqs)),
    fetchFAQCats: () => dispatch(fetchFAQCats()),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faq);