
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table';

import ContentHeader from '../master/contentHeader';
import { fetchResource, resourcePermissionAlloc, resourcePermissionDeAlloc, fetchPermissions } from '../../redux';
import { permissionMiniColumns, GlobalFilter, Checkbox } from '../tables';
import { humanize, humanize1, formatDate } from '../../utils';

function ResourceProfile({
  fetchResource, resourceData, fetchPermissions, permissionsData, resourcePermissionAlloc, resourcePermissionAllocData,
  resourcePermissionDeAlloc, resourcePermissionDeAllocData
}) {
  const { uuid } = useParams();
  const [ saveAlloc, setSaveAlloc ] = useState(false);
  const [ saveDeAlloc, setSaveDeAlloc ] = useState(false);
  
  useEffect(() => {
    fetchPermissions();
    fetchResource(uuid.substring(1));
  }, []);

  useEffect(() => {
    let timer, sleepTime = 1000;

    if (saveAlloc) {
      saveAllocation();

      timer = setTimeout(() => {
        fetchResource(uuid.substring(1))
        setSaveAlloc(false);
      }, sleepTime);
    }

    if (saveDeAlloc) {
      saveDeAllocation();

      timer = setTimeout(() => {
        fetchResource(uuid.substring(1))
        setSaveDeAlloc(false);
      }, sleepTime);
    }

    return () => clearTimeout(timer);
  }, [saveAlloc, saveDeAlloc]);

  const columns = useMemo(() => permissionMiniColumns, []);
  const data = useMemo(() => permissionsData.permissions, [permissionsData.permissions]);
  const {
    // General
    getTableProps, getTableBodyProps, headerGroups, footerGroups, prepareRow, 
    // Pagination
    page, previousPage, nextPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, 
    setPageSize,
    // Row selection
    selectedFlatRows,
    // Filters
    setGlobalFilter,
    state: {
      // Filters
      globalFilter, 
      // Pagination
      pageIndex, pageSize
    }
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

  const saveAllocation = () => {
    const permissions = [];

    selectedRows.forEach(permission => permissions.push(permission.uuid));

    if (permissions.length > 0) resourcePermissionAlloc({
      resource: resourceData.resource.uuid, permissions: permissions
    });
  }
  
  const saveDeAllocation = () => {
    const permissions = [];

    selectedRows.forEach(permission => permissions.push(permission.uuid));

    if (permissions.length > 0) resourcePermissionDeAlloc({
      resource: resourceData.resource.uuid, permissions: permissions
    });
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Resource", subTitle: "Profile", pageName: "Resource/Profile" }}/>
    
    <section className="content container-fluid">
      <div className="row">

        <div className="col-lg-5 col-md-5 col-sm-12">
          <div className="box box-success">
            <div className="box-body">
              { resourceData.loading ?
                <>
                  <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                  <span>Loading resource</span>
                </>
                : resourceData.error ?
                  <pre>{JSON.stringify(resourceData.error, null, 2)}</pre>
                : Object.entries(resourceData.resource).length > 0 ?
                  <>
                  <div className="box-body box-profile">
                    <ul className="list-group list-group-unbordered">
                      <li className="list-group-item">
                        <b>Name</b> <a className="pull-right">{humanize1(resourceData.resource.name)}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Category</b> <a className="pull-right">{resourceData.resource.category}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Sub-category</b> <a className="pull-right">{resourceData.resource.subCategory}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Allowed Methods</b> 
                        <a className="pull-right">
                          { resourceData.resource.methods.map(method => (<span className="label label-success" key={method}>{method.toUpperCase()}</span>))}
                        </a>
                      </li>
                      <li className="list-group-item">
                        <b>Created At</b> <a className="pull-right">{formatDate(resourceData.resource.created_at)}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Last Updated At</b> <a className="pull-right">{formatDate(resourceData.resource.updated_at)}</a>
                      </li>
                    </ul>

                    <h4 className="box-title">Assigned Permissions</h4>
                    <hr/>
                    <ol>
                      { resourceData.resource.permissions.map(permission => {
                        return <li className="text-muted" key={permission.uuid}>{humanize(permission.name)}</li>
                      })}
                    </ol>
                  </div>
                  </>
                : <>
                    <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                    <span>Loading resource</span>
                  </>
              }
            </div>
          </div>
        </div>

        <div className="col-lg-7 col-md-7 col-sm-12">
          <div className="box box-primary">
            <div className="box-body">
              {
                permissionsData.loading ?
                <>
                  <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                  <span>Loading permissions</span>
                </>
                : permissionsData.error ?
                  <pre>
                    {JSON.stringify(permissionsData.error, null, 2)}
                  </pre>
                : permissionsData.permissions ?
                  <>
                  { resourcePermissionAllocData.error ?
                    <>
                      <pre>
                        {JSON.stringify(resourcePermissionAllocData.error, null, 2)}
                      </pre>
                    </>
                    :
                    <></>
                  }
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
                                    {column.isSorted ? (
                                      column.isSortedDesc ? <i className="fa fa-sort-amount-desc pull-right"></i> 
                                                          : <i className="fa fa-sort-amount-asc pull-right"></i>
                                    ) : <i className="fa fa-unsorted pull-right"></i>}
                                  </span> 
                                  {column.render('Header')}
                                </th>
                              ))
                            }
                          </tr>
                        ))
                      }
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      { page.map(row => {
                          prepareRow(row)
                          return (
                            <tr {...row.getRowProps()}>
                              { row.cells.map(cell => {
                                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                              }
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                  
                  <div className="mt-5">
                    <button className="btn btn-success btn-xs" onClick={() => setSaveAlloc(true)}>
                      { resourcePermissionAllocData.loading ?
                          <><i className="fa fa-refresh fa-spin"></i> Save Allocation</>
                        : resourcePermissionAllocData.error ?
                          <><i className="fa fa-warning"></i> Save Allocation</>
                        : Object.entries(resourcePermissionAllocData.resourcePermissionAlloc).length > 0 ?
                          <>Save Allocation</>
                        : <>Save Allocation</>
                      }
                    </button>
                    <button className="btn btn-danger btn-xs mr-5" onClick={() => setSaveDeAlloc(true)}>
                      { resourcePermissionDeAllocData.loading ?
                          <><i className="fa fa-refresh fa-spin"></i> Save De-allocation</>
                        : resourcePermissionDeAllocData.error ?
                          <><i className="fa fa-warning"></i> Save De-allocation</>
                        : Object.entries(resourcePermissionDeAllocData.resourcePermissionDeAlloc).length > 0 ?
                          <>Save De-allocation</>
                        : <>Save De-allocation</>
                      }
                    </button>
                    <div className="btn-group pull-right table-foot-right">
                      <button type="button" className="btn btn-default btn-xs" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        <i className="fa fa-angle-double-left pagination-ends"></i>
                      </button>
                      <button type="button" className="btn btn-default btn-xs" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <i className="fa fa-chevron-left"></i> Prev
                      </button>
                      <button type="button" className="btn btn-default btn-xs" onClick={() => nextPage()} disabled={!canNextPage}>
                        Next <i className="fa fa-chevron-right"></i>
                      </button>
                      <button type="button" className="btn btn-default btn-xs" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        <i className="fa fa-angle-double-right pagination-ends"></i>
                      </button>
                    </div>
                  </div>
                  </>
                :
                <h3 className="text-danger">Unknown error while loading permissions!</h3>
              }
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
    resourceData: state.resourceData,
    permissionsData: state.permissionsData,
    resourcePermissionAllocData: state.resourcePermissionAllocData,
    resourcePermissionDeAllocData: state.resourcePermissionDeAllocData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchResource: parameter => dispatch(fetchResource(parameter)),
    fetchPermissions: () => dispatch(fetchPermissions()),
    resourcePermissionAlloc: resourcePermissions => dispatch(resourcePermissionAlloc(resourcePermissions)),
    resourcePermissionDeAlloc: resourcePermissions => dispatch(resourcePermissionDeAlloc(resourcePermissions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceProfile);
