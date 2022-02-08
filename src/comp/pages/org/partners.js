
import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import { createPartner, fetchPartners, deletePartners, fetchModules } from '../../../redux';
import { partnerColumns, GlobalFilter, Checkbox } from '../../tables';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../master/contentHeader';

function Partners({
    createPartner, createPartnerData, fetchPartners, fetchPartnersData, deletePartners, deletePartnersData, 
    fetchModules, fetchModulesData
  }) {
  let sleepTime = 1500;
  const [ deletion, setDeletion ] = useState(false);
  const [ save, setSave ] = useState(false);
  const [ state, setState ] = useState({
    moduleId: 0, name: '', narration: '', icon: '', photo: null
  });

  useEffect(() => {
    fetchPartners();
    fetchModules();
  }, []);

  useEffect(() => {
    if (fetchModulesData.modules.length > 0) setState({ ...state, moduleId: fetchModulesData.modules[0].id });
  }, [fetchModulesData.modules]);

  useEffect(() => {
    let timer;

    if (save) {
      let formData = new FormData();
      
      formData.append('moduleId', state.moduleId);
      formData.append('name', state.name);
      formData.append('narration', state.narration);
      formData.append('icon', state.icon);
      formData.append('photo', state.photo);
      createPartner(formData);

      timer = setTimeout(() => {
        fetchPartners();
        setSave(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [save]);

  useEffect(() => {
    let timer;
    
    if (deletion) {
      const partners = [];

      selectedRows.forEach(partner => partners.push({ parameter: partner.uuid }));
      deletePartners({ partners });

      timer = setTimeout(() => {
        fetchPartners();
        setDeletion(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [deletion]);

  // useEffect(() => {
  //   if (reload) {
  //     fetchModules();
  //     fetchPartners();
  //     fetchValue(uuid.substring(1));
  //     setReload(false);
  //   }
  // }, [deletePartnersData.deletePartners, createPartnerData.createPartner]);

  const columns = useMemo(() => partnerColumns, []);
  const data = useMemo(() => fetchPartnersData.fetchPartners, [ fetchPartnersData.fetchPartners ]);
  const {
    getTableProps, getTableBodyProps, headerGroups, footerGroups, prepareRow, 
    page, previousPage, nextPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, 
    setPageSize, setGlobalFilter, selectedFlatRows,
    state: { globalFilter, pageIndex, pageSize }
  } = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy, usePagination, useRowSelect,
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
  const handleDelete = () => setDeletion(true);
  const handleSave = e => {
    e.preventDefault();
    setSave(true);
  }
  
  return (
  <>
    <ContentHeader headerData={{ title: "Partners", subTitle: "New & Registry", pageName: "Partners / New & Registry" }}/>
    
    <section className="content">
      <div className="row">
        <div className="col-xs-12">
          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li className="active"><a href="#faqcats" data-toggle="tab">Partners</a></li>
              <li><a href="#faqcat" data-toggle="tab">New Value</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="faqcats">
              { deletePartnersData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting partners...</>
              : deletePartnersData.error ?
                <pre>{JSON.stringify(deletePartnersData.error, null, 2)}</pre>
              : deletePartnersData.deletePartners && Object.entries(deletePartnersData.deletePartners).length > 0 ?
                <h4 className="text-success">Success! Deleted partner</h4>
              : null }

              { fetchPartnersData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading partners...</>
              : fetchPartnersData.error ?
                <pre>{JSON.stringify(fetchPartnersData.error, null, 2)}</pre>
              : fetchPartnersData.fetchPartners ?
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
              : <h3 className="text-danger">Something went wrong!</h3> }
              </div>
            
              <div className="tab-pane" id="faqcat">
              { createPartnerData.loading ?
                <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Saving partner...</>
              : createPartnerData.error ?
                <pre>{JSON.stringify(createPartnerData.error, null, 2)}</pre>
              : createPartnerData.createPartner && Object.entries(createPartnerData.createPartner).length > 0 ?
                <h4 className="text-success text-center">Success! Partner created</h4>
              : null }
              
                <form onSubmit={handleSave} className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label>Name <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control input-sm" 
                        placeholder="Name"
                        defaultValue={state.name} 
                        onChange={e => setState({ ...state, name: e.target.value })}
                      />
                    </div>
                  { fetchModulesData.modules ?
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
                    <div className="form-group">
                      <label>Associated photo <span className="text-danger">*</span></label>
                      <input
                        type="file"
                        className="form-control input-sm"
                        placeholder="Associated photo"
                        onChange={e => setState({ ...state, photo: e.target.files[0]})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Icon (HTML Tag)</label>
                      <input
                        type="text"
                        className="form-control input-sm" 
                        placeholder="Icon (HTML Tag)"
                        defaultValue={state.icon} 
                        onChange={e => setState({ ...state, icon: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <label>Narration <span className="text-danger">*</span></label>
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={( e, editor ) => setState({...state, narration: editor.getData()})}
                      onReady={editor => editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()))}
                    />
                    <button type="submit" className="btn btn-success btn-sm mt-5" >Save</button>
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
    createPartnerData: state.createPartnerData,
    fetchPartnersData: state.fetchPartnersData,
    deletePartnersData: state.deletePartnersData,
    deletePartnersData: state.deletePartnersData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPartner: faqcat => dispatch(createPartner(faqcat)),
    fetchPartners: () => dispatch(fetchPartners()),
    deletePartners: faqcats => dispatch(deletePartners(faqcats)),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Partners);