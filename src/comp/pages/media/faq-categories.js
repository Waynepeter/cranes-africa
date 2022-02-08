
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import { createFAQCat, fetchFAQCats, deleteFAQCats, fetchModules } from '../../../redux';
import { faqCatColumns, GlobalFilter, Checkbox } from '../../tables';
import ContentHeader from '../../master/contentHeader';

function FAQCategories({
    createFAQCat, createFAQCatData, fetchFAQCats, fetchFAQCatsData, deleteFAQCats, deleteFAQCatsData, 
    fetchModules, fetchModulesData
  }) {
  let sleepTime = 1000;

  useEffect(() => {
    fetchFAQCats();
    fetchModules();
  }, []);

  const columns = useMemo(() => faqCatColumns, []);
  const data = useMemo(() => fetchFAQCatsData.fetchFAQCats, [fetchFAQCatsData.fetchFAQCats]);
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
  const [ moduleId, setModuleId ] = useState(0);
  const [ name, setName ] = useState('');

  useEffect(() => {
    if (fetchModulesData.modules.length > 0) {
      setModuleId(fetchModulesData.modules[0].id);
    }
  }, [fetchModulesData.modules]);

  useEffect(() => {
    let timer;
    
    if (deletion) {
      const faqcats = [];

      selectedRows.forEach(faqcat => faqcats.push({ parameter: faqcat.uuid }));
      deleteFAQCats({ faqcats });

      timer = setTimeout(() => {
        fetchFAQCats();
        setDeletion(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [deletion]);

  useEffect(() => {
    let timer;

    if (save) {
      createFAQCat({ moduleId, name });

      timer = setTimeout(() => {
        fetchFAQCats();
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
      title: "FAQ Categories", subTitle: "New & Registry", pageName: "FAQ Categories / New & Registry"
    }}/>
    
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#faqcats" data-toggle="tab">Categories</a></li>
              <li><a href="#faqcat" data-toggle="tab">New Category</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="faqcats">
              { deleteFAQCatsData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting FAQ Cat's...</>
              : deleteFAQCatsData.error ?
                <pre>{JSON.stringify(deleteFAQCatsData.error, null, 2)}</pre>
              : deleteFAQCatsData.deleteFAQCats && Object.entries(deleteFAQCatsData.deleteFAQCats).length > 0 ?
                <h4 className="text-success">Success! Deleted category</h4>
              : null }

              { fetchFAQCatsData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading FAQ Cat's...</>
              : fetchFAQCatsData.error ?
                <pre>{JSON.stringify(fetchFAQCatsData.error, null, 2)}</pre>
              : fetchFAQCatsData.fetchFAQCats ?
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
            
              <div class="tab-pane" id="faqcat">
                { createFAQCatData.loading ?
                  <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Saving FAQ Category...</>
                : createFAQCatData.error ?
                  <pre>{JSON.stringify(createFAQCatData.error, null, 2)}</pre>
                : createFAQCatData.createFAQCat && Object.entries(createFAQCatData.createFAQCat).length > 0 ?
                  <h4 className="text-success">Success! Category created</h4>
                : null }

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
                        className="form-control input-sm" onChange={e => setModuleId(e.target.value)} 
                        style={{ width: "100%" }}
                      >{fetchModulesData.modules.map(mdl =>
                        <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                      </select>
                    </div>
                  : null }
                  </div>
                </div>
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
    createFAQCatData: state.createFAQCatData,
    fetchFAQCatsData: state.fetchFAQCatsData,
    deleteFAQCatsData: state.deleteFAQCatsData,
    deleteFAQCatsData: state.deleteFAQCatsData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createFAQCat: faqcat => dispatch(createFAQCat(faqcat)),
    fetchFAQCats: () => dispatch(fetchFAQCats()),
    deleteFAQCats: faqcats => dispatch(deleteFAQCats(faqcats)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FAQCategories);