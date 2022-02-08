
import React, { useEffect, useState, useMemo } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import { createFAQ, deleteFAQs, fetchFAQs, fetchFAQCats, fetchModules } from '../../../redux';
import { faqColumns, GlobalFilter, Checkbox } from '../../tables';
import ContentHeader from '../../master/contentHeader';

function Faqs({
    createFAQ, createFAQData, deleteFAQs, deleteFAQsData, fetchFAQs, fetchFAQsData, fetchFAQCats, 
    fetchFAQCatsData, fetchModules, fetchModulesData
  }) {
  let sleepTime = 1000;

  useEffect(() => {
    fetchFAQs();
    fetchFAQCats();
    fetchModules();
  }, []);

  const columns = useMemo(() => faqColumns, []);
  const data = useMemo(() => fetchFAQsData.fetchFAQs, [fetchFAQsData.fetchFAQs]);
  const {
    getTableProps, getTableBodyProps, headerGroups, footerGroups, prepareRow, 
    page, previousPage, nextPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, 
    setPageSize, setGlobalFilter, selectedFlatRows,
    state: { globalFilter, pageIndex, pageSize }
  } = useTable(
    { columns, data }, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (<Checkbox {...getToggleAllRowsSelectedProps()} />),
            Cell: ({ row }) => (<Checkbox {...row.getToggleRowSelectedProps()} />)
          },
          ...columns
        ];
      });
    }
  );
  const selectedRows = selectedFlatRows.map(row => row.original);
  const [ deletion, setDeletion ] = useState(false);
  const [ save, setSave ] = useState(false);
  const [ FaqCatId, setFaqCatId ] = useState(0);
  const [ moduleId, setModuleId ] = useState(0);
  const [ question, setQuestion ] = useState('');
  const [ answer, setAnswer ] = useState('');

  useEffect(() => {
    if (fetchFAQCatsData.fetchFAQCats.length > 0) setFaqCatId(fetchFAQCatsData.fetchFAQCats[0].id);
  }, [fetchFAQCatsData.fetchFAQCats]);

  useEffect(() => {
    if (fetchModulesData.modules.length > 0) setModuleId(fetchModulesData.modules[0].id);
  }, [fetchModulesData.modules]);

  useEffect(() => {
    let timer;
    
    if (deletion) {
      const faqs = [];

      selectedRows.forEach(faq => faqs.push({ parameter: faq.uuid }));
      deleteFAQs({ faqs });

      timer = setTimeout(() => {
        fetchFAQs();
        setDeletion(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [deletion]);

  useEffect(() => {
    let timer;

    if (save) {
      createFAQ({ moduleId, FaqCatId, question, answer });

      timer = setTimeout(() => {
        fetchFAQs();
        setSave(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [save]);

  const handleDelete = () => setDeletion(true);
  const handleSave = e => setSave(true);

  return (
  <>
    <ContentHeader headerData={{
      title: "FAQ", subTitle: "Frequently Asked Questions", pageName: "FAQ / Frequently Asked Questions"
    }}/>
    
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#faqs" data-toggle="tab">FAQ Registry</a></li>
              <li><a href="#faq" data-toggle="tab">New FAQ</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="faqs">
                { deleteFAQsData.loading ?
                  <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading FAQ's...</>
                : deleteFAQsData.error ?
                  <pre>{JSON.stringify(deleteFAQsData.error, null, 2)}</pre>
                : deleteFAQsData.deleteFAQs && Object.entries(deleteFAQsData.deleteFAQs).length > 0 ?
                  <h4 className="text-success">Success! Deleted</h4>
                : null }

                { fetchFAQsData.loading ?
                  <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading FAQ's...</>
                : fetchFAQsData.error ?
                  <pre>{JSON.stringify(fetchFAQsData.error, null, 2)}</pre>
                : fetchFAQsData.fetchFAQs ?
                  <>
                    <div className="btn-group">
                      <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                        <i className="fa fa-bars"></i>
                        <span className="sr-only">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu" role="menu">
                        <li><a onClick={handleDelete}><i className="fa fa-trash"></i> Delete Selection</a></li>
                      </ul>
                    </div>
                    <span className="entries">
                      <span className="entries-text">Show</span>
                      <select className="entries-select" value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        { [8, 10, 15, 20, 30, 50, 100].map(pageSize => (<option key={pageSize} value={pageSize}>{pageSize}</option>)) }
                      </select>
                      <span className="entries-text">entries</span>
                    </span>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    <table className="ace-table" {...getTableProps()}>
                      <thead>
                      { headerGroups.map(headerGroup => (
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            { headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                  <span>
                                    {column.isSorted ? (column.isSortedDesc ? <i className="fa fa-sort-amount-desc pull-right"></i> 
                                                                            : <i className="fa fa-sort-amount-asc pull-right"></i>
                                    ) : <i className="fa fa-unsorted pull-right"></i>}
                                  </span> 
                                  {column.render('Header')}
                                </th>
                              ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody {...getTableBodyProps()}>
                        { page.map(row => {
                            prepareRow(row)
                            return (
                              <tr {...row.getRowProps()}>
                                { row.cells.map(cell => { return <td {...cell.getCellProps()}>{cell.render('Cell')}</td> })}
                              </tr>
                            );
                          })}
                      </tbody>
                      <tfoot>
                        { footerGroups.map(footerGroup => (
                            <tr {...footerGroup.getFooterGroupProps()}>
                              { footerGroup.headers.map(column => (<th {...column.getFooterProps()}>{column.render('Footer')}</th>))}
                            </tr>
                          ))}
                      </tfoot>
                    </table>
                    <div>
                      <span className="paginationGuide">Page <strong>{pageIndex + 1}</strong> of {pageOptions.length} </span>
                      <span className="text-divider"></span>
                      <span> Go to page 
                        <input
                          className="searchPage" type='number' defaultValue={pageIndex + 1}
                          onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) -1 : 0;
                            gotoPage(pageNumber);
                          }}
                        />
                      </span>
                      <div className="btn-group pull-right table-foot-right">
                        <button type="button" className="btn btn-success btn-sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                          <i className="fa fa-angle-double-left pagination-ends"></i>
                        </button>
                        <button type="button" className="btn btn-success btn-sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
                          <i className="fa fa-chevron-left"></i> Prev
                        </button>
                        <button type="button" className="btn btn-success btn-sm" onClick={() => nextPage()} disabled={!canNextPage}>
                          Next <i className="fa fa-chevron-right"></i>
                        </button>
                        <button type="button" className="btn btn-success btn-sm" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                          <i className="fa fa-angle-double-right pagination-ends"></i>
                        </button>
                      </div>
                    </div>
                  </>
                : <h3 className="text-danger">Something has gone wrong!</h3> }
              </div>

              <div class="tab-pane" id="faq">
                { createFAQData.loading ?
                  <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Saving FAQ...</>
                : createFAQData.error ?
                  <pre>{JSON.stringify(createFAQData.error, null, 2)}</pre>
                : createFAQData.createFAQ && Object.entries(createFAQData.createFAQ).length > 0 ?
                  <h4 className="text-success">Success!</h4>
                : null }

                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div class="form-group">
                      <label>Question</label>
                      <input
                        type="text"
                        class="form-control input-sm"
                        placeholder="Type question here"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
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
                        >
                        {fetchFAQCatsData.fetchFAQCats.map(FAQCat => <option value={FAQCat.id} key={FAQCat.uuid}>{FAQCat.name}</option>)}
                      </select>
                    </div>
                  : null }
                  </div>
                </div>

                <label>Answer</label>
                <CKEditor
                  editor={ClassicEditor}
                  data=""
                  onChange={(e, editor) => setAnswer(editor.getData())}
                  onReady={(editor) => {
                    editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()));
                  }}
                />
                <button
                  type="button"
                  className="btn btn-success btn-xs mt-5"
                  onClick={handleSave}
                >Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    createFAQData: state.createFAQData,
    deleteFAQsData: state.deleteFAQsData,
    fetchFAQsData: state.fetchFAQsData,
    fetchFAQCatsData: state.fetchFAQCatsData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createFAQ: faq => dispatch(createFAQ(faq)),
    deleteFAQs: faqs => dispatch(deleteFAQs(faqs)),
    fetchFAQs: () => dispatch(fetchFAQs()),
    fetchFAQCats: () => dispatch(fetchFAQCats()),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faqs);