
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import {
  createProductsubcat, fetchProductsubcats, deleteProductsubcats, fetchModules, fetchProductcats
} from '../../../../redux';
import { productsubcatColumns, GlobalFilter, Checkbox } from '../../../tables';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../../master/contentHeader';

function ProductSubcategoryRegistry({
    createProductsubcat, productsubcatCreateData, fetchProductsubcats, productsubcatsFetchData, deleteProductsubcats, 
    productsubcatsDeleteData, fetchModules, fetchModulesData, fetchProductcats, productcatsFetchData
  }) {
  const [ state, setState ] = useState({
    moduleId: 0, productCatId: 0, name: '', description: '', photo: null
  });
  const [ save, setSave ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    fetchProductsubcats();
    fetchModules();
    fetchProductcats();
  }, []);

  useEffect(() => {
    if (fetchModulesData.modules.length > 0)
      setState({ ...state, moduleId: fetchModulesData.modules[0].id });
  }, [fetchModulesData.modules]);

  useEffect(() => {
    if (productcatsFetchData.productcatsFetch.length > 0)
      setState({ ...state, productCatId: productcatsFetchData.productcatsFetch[0].id });
  }, [productcatsFetchData.productcatsFetch]);

  useEffect(() => {
    if (save) {
      let formData = new FormData();
      
      formData.append('moduleId', state.moduleId);
      formData.append('productCatId', state.productCatId);
      formData.append('name', state.name);
      formData.append('description', state.description);
      formData.append('photo', state.photo);

      createProductsubcat(formData);
      setSave(false);
      setReload(true);
    }
  }, [save]);

  useEffect(() => {
    if (deletion) {
      const subcategories = [];

      selectedRows.forEach(subcategory => subcategories.push({ parameter: subcategory.uuid }));
      deleteProductsubcats({ subcategories });
      setDeletion(false);
      setReload(true);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchProductsubcats();
      fetchModules();
      fetchProductcats();
      setReload(false);
    }
  }, [productsubcatCreateData.productsubcatCreate, productsubcatsDeleteData.productsubcatsDelete]);

  const columns = useMemo(() => productsubcatColumns, []);
  const data = useMemo(() => productsubcatsFetchData.productsubcatsFetch, [ productsubcatsFetchData.productsubcatsFetch ]);
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
    <ContentHeader headerData={{ title: "Product Sub Categeory", subTitle: "New & Registry", pageName: "Product Sub Categeory / New & Registry" }}/>
    
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
              { productsubcatsDeleteData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting product sub-categories...</>
              : productsubcatsDeleteData.error ?
                <pre>{JSON.stringify(productsubcatsDeleteData.error, null, 2)}</pre>
              : productsubcatsDeleteData.productsubcatsDelete && Object.entries(productsubcatsDeleteData.productsubcatsDelete).length > 0 ?
                <h4 className="text-success text-center">Success! Deleted product sub-categories</h4>
              : null }

              { productsubcatsFetchData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading product sub-categories...</>
              : productsubcatsFetchData.error ?
                <pre>{JSON.stringify(productsubcatsFetchData.error, null, 2)}</pre>
              : productsubcatsFetchData.productsubcatsFetch ?
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
              { productsubcatCreateData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Saving product sub-category...</>
              : productsubcatCreateData.error ?
                <pre>{JSON.stringify(productsubcatCreateData.error, null, 2)}</pre>
              : productsubcatCreateData.productsubcatCreate && Object.entries(productsubcatCreateData.productsubcatCreate).length > 0 ?
                <h4 className="text-success text-center">Success! Product sub-category created</h4>
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
                    { productcatsFetchData.loading ?
                      <><br/><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading product categories...<br/></>
                    : productcatsFetchData.error ?
                      <pre className="text-center text-danger">Problem loading product categories</pre>
                    :  productcatsFetchData.productcatsFetch ?
                      <div className="form-group">
                        <label>Category <span className="text-danger">*</span></label>
                        <select
                          className="form-control input-sm"
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
    productsubcatCreateData: state.productsubcatCreateData,
    productsubcatsFetchData: state.productsubcatsFetchData,
    productsubcatsDeleteData: state.productsubcatsDeleteData,
    fetchModulesData: state.fetchModulesData,
    productcatsFetchData: state.productcatsFetchData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createProductsubcat: productcat => dispatch(createProductsubcat(productcat)),
    fetchProductsubcats: () => dispatch(fetchProductsubcats()),
    deleteProductsubcats: productcats => dispatch(deleteProductsubcats(productcats)),
    fetchModules: () => dispatch(fetchModules()),
    fetchProductcats: () => dispatch(fetchProductcats()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductSubcategoryRegistry);