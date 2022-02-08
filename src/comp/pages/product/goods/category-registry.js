
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import {
  createProductcat, fetchProductcats, deleteProductcats, fetchModules, fetchSalemodes
} from '../../../../redux';
import { productcatColumns, GlobalFilter, Checkbox } from '../../../tables';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function ProductCategoryRegistry({
    createProductcat, productcatCreateData, fetchProductcats, productcatsFetchData, deleteProductcats, 
    productcatsDeleteData, fetchModules, fetchModulesData, fetchSalemodes, salemodesFetchData
  }) {
  const [ state, setState ] = useState({
    moduleId: 0, saleModeId: 0, name: '', description: '', photo: null
  });
  const [ save, setSave ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchProductcats();
    fetchModules();
    fetchSalemodes();
  }, []);

  useEffect(() => {
    if (fetchModulesData.modules.length > 0)
      setState({ ...state, moduleId: fetchModulesData.modules[0].id });
  }, [fetchModulesData.modules]);

  useEffect(() => {
    if (salemodesFetchData.salemodesFetch.length > 0)
      setState({ ...state, saleModeId: salemodesFetchData.salemodesFetch[0].id });
  }, [salemodesFetchData.salemodesFetch]);

  useEffect(() => {
    if (save) {
      let formData = new FormData();
      
      formData.append('moduleId', state.moduleId);
      formData.append('saleModeId', state.saleModeId);
      formData.append('name', state.name);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      createProductcat(formData);
      setSave(false);
      setReload(true);
    }
  }, [save]);

  useEffect(() => {
    if (deletion) {
      const categories = [];

      selectedRows.forEach(category => categories.push({ parameter: category.uuid }));
      deleteProductcats({ categories });
      setDeletion(false);
      setReload(true);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchProductcats();
      fetchModules();
      fetchSalemodes();
      setReload(false);
    }
  }, [productcatCreateData.productcatCreate, productcatsDeleteData.productcatsDelete]);

  const columns = useMemo(() => productcatColumns, []);
  const data = useMemo(() => productcatsFetchData.productcatsFetch, [ productcatsFetchData.productcatsFetch ]);
  const {
    getTableProps, getTableBodyProps, headerGroups, footerGroups, prepareRow, 
    page, previousPage, nextPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, 
    setPageSize, setGlobalFilter, selectedFlatRows, state: { globalFilter, pageIndex, pageSize }
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (<Checkbox {...getToggleAllRowsSelectedProps()} />),
            Cell: ({ row }) => (<Checkbox {...row.getToggleRowSelectedProps()} />)
          }, ...columns
        ];
      });
    }
  );
  const selectedRows = selectedFlatRows.map(row => row.original);
  const handleDelete = () => setDeletion(true);
  const handleSave = e => {
    e.preventDefault();
    setSave(true);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Product Categeory", subTitle: "New & Registry", pageName: "Product Categeory / New & Registry" }}/>
    
    <section className="content">
      <div className="row">
        <div className="col-xs-12">
          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li className="active"><a href="#registry" data-toggle="tab">Registry</a></li>
              <li><a href="#addNew" data-toggle="tab">Add New</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="registry">
              { productcatsDeleteData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting product categories...</>
              : productcatsDeleteData.error ?
                <pre>{JSON.stringify(productcatsDeleteData.error, null, 2)}</pre>
              : productcatsDeleteData.productcatsDelete && Object.entries(productcatsDeleteData.productcatsDelete).length > 0 ?
                <h4 className="text-success text-center">Success! Deleted product categories</h4>
              : null }

              { productcatsFetchData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading product categories...</>
              : productcatsFetchData.error ?
                <pre>{JSON.stringify(productcatsFetchData.error, null, 2)}</pre>
              : productcatsFetchData.productcatsFetch ?
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
              : <h3 className="text-danger text-center">Something went wrong!</h3> }
              </div>
            
              <div className="tab-pane" id="addNew">
              { productcatCreateData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Saving product category...</>
              : productcatCreateData.error ?
                <pre>{JSON.stringify(productcatCreateData.error, null, 2)}</pre>
              : productcatCreateData.productcatCreate && Object.entries(productcatCreateData.productcatCreate).length > 0 ?
                <h4 className="text-success text-center">Success! Product category created</h4>
              : null }

                <form onSubmit={handleSave} className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control input-sm" 
                        defaultValue={state.name} 
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
                      onChange={(e, editor) => setState({...state, description: editor.getData()})}
                      onReady={editor => editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()))}
                    />
                    <button type="submit" className="btn btn-success btn-sm mt-5">Save Catalogue</button>
                  </div>
                </form>
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
    productcatCreateData: state.productcatCreateData,
    productcatsFetchData: state.productcatsFetchData,
    productcatsDeleteData: state.productcatsDeleteData,
    fetchModulesData: state.fetchModulesData,
    salemodesFetchData: state.salemodesFetchData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createProductcat: distribution => dispatch(createProductcat(distribution)),
    fetchProductcats: () => dispatch(fetchProductcats()),
    deleteProductcats: distributions => dispatch(deleteProductcats(distributions)),
    fetchModules: () => dispatch(fetchModules()),
    fetchSalemodes: () => dispatch(fetchSalemodes()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryRegistry);