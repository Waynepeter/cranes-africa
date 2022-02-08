
import React, { useEffect, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect
} from 'react-table';

import ContentHeader from '../../master/contentHeader';
import {
  fetchRole, updateRole, rolePermissionAlloc, rolePermissionDeAlloc, fetchPermissions, deleteRoles
} from '../../../redux';
import { permissionMiniColumns, GlobalFilter, Checkbox } from '../../tables';
import { humanize, humanize1, formatDate } from '../../../utils';

function RoleProfile({
    fetchRole, roleData, updateRole, updateRoleData, fetchPermissions, permissionsData, rolePermissionAlloc, 
    rolePermissionDeAlloc, rolePermissionAllocData, rolePermissionDeAllocData, deleteRoles, deleteRolesData
  }) {
    
  let sleepTime = 1000;

  const { uuid } = useParams();
  const [ saveAlloc, setSaveAlloc ] = useState(false);
  const [ saveDeAlloc, setSaveDeAlloc ] = useState(false);
  const [ deletion, setDeletion ] = useState(false);
  const [ newRoleName, setNewRoleName ] = useState('');
  const [ update, setUpdate ] = useState(false);

  const handleDelete = () => setDeletion(true);
  const handleUpdate = () => setUpdate(true);
  
  useEffect(() => {
    fetchPermissions();
    fetchRole(uuid.substring(1));
  }, []);

  useEffect(() => {
    let timer;

    if (update) {
      updateRole({
        parameter: roleData.role.uuid,
        name: newRoleName
      });
      
      timer = setTimeout(() => {
        fetchRole(uuid.substring(1));
        setUpdate(false);
      }, sleepTime);
      
      return () => clearTimeout(timer);
    }
  }, [update]);

  useEffect(() => {
    let timer;

    if (saveAlloc) {
      saveAllocation();

      timer = setTimeout(() => {
        fetchRole(uuid.substring(1))
        setSaveAlloc(false);
      }, sleepTime);
    }

    if (saveDeAlloc) {
      saveDeAllocation();

      timer = setTimeout(() => {
        fetchRole(uuid.substring(1))
        setSaveDeAlloc(false);
      }, sleepTime);
    }

    return () => clearTimeout(timer);
  }, [saveAlloc, saveDeAlloc]);

  useEffect(() => {
    if (deletion) {
      deleteRoles({
        roles: [{ parameter: roleData.role.uuid }]
      });
      setDeletion(false);
    }
  }, [deletion]);

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

    if (permissions.length > 0) rolePermissionAlloc({ role: roleData.role.uuid, permissions });
  }
  const saveDeAllocation = () => {
    const permissions = [];

    selectedRows.forEach(permission => permissions.push(permission.uuid));

    if (permissions.length > 0) rolePermissionDeAlloc({ role: roleData.role.uuid, permissions });
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Role", subTitle: "Profile", pageName: "Role/Profile" }}/>

    <section className="content container-fluid">
      <div className="row">

        <div className="col-lg-5 col-md-5 col-sm-12">
          <div className="box box-success">
            <div className="box-header">
              <div className="btn-group">
                <button type="button" className="btn btn-primary dropdown-toggle btn-xs" data-toggle="dropdown">
                  <i className="fa fa-bars"></i>
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu" role="menu">
                  <li><a data-toggle="modal" data-target="#modal-update"><i className="fa fa-edit"></i> Edit</a></li>
                  <li><a onClick={handleDelete}><i className="fa fa-trash"></i> Delete</a></li>
                  <li className="divider"></li>
                  <li><a href="/role-registry"><i className="fa fa-mail-reply"></i> Role Registry</a></li>
                </ul>
              </div>
              <span className="pull-right">
              { deleteRolesData.loading ?
                  <>
                    <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                    <span> Deleting role...</span>
                  </>
                : deleteRolesData.error ?
                  <pre>
                    {JSON.stringify(deleteRolesData.error, null, 2)}
                  </pre>
                : deleteRolesData.deleteRoles.length > 0 ?
                  <h4 className="text-success text-center">
                    <i className="fa fa-check"></i> Success! Deleted role
                    <Redirect to="/role-registry" />
                  </h4>
                : <></>
              }
              </span>
            </div>
            <div className="box-body">
              { roleData.loading ?
                <>
                  <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                  <span> Loading role...</span>
                </>
                : roleData.error ?
                  <pre>{JSON.stringify(roleData.error, null, 2)}</pre>
                : Object.entries(roleData.role).length > 0 ?
                  <>
                  <div className="box-body box-profile">
                    <ul className="list-group list-group-unbordered">
                      <li className="list-group-item">
                        <b>Name</b> <a className="pull-right">{humanize1(roleData.role.name)}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Created At</b> <a className="pull-right">{formatDate(roleData.role.created_at)}</a>
                      </li>
                      <li className="list-group-item">
                        <b>Last Updated At</b> <a className="pull-right">{formatDate(roleData.role.updated_at)}</a>
                      </li>
                    </ul>

                    <h4 className="box-title">Assigned Permissions</h4>
                    <hr/>
                    <ol>
                      { roleData.role.permissions.map(permission => {
                        return <li className="text-muted" key={permission.uuid}>{humanize(permission.name)}</li>
                      })}
                    </ol>
                  </div>
                  </>
                : <>
                    <span>404 Not Found</span>
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
                  { rolePermissionAllocData.error ?
                    <>
                      <pre>
                        {JSON.stringify(rolePermissionAllocData.error, null, 2)}
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
                      { rolePermissionAllocData.loading ?
                          <><i className="fa fa-refresh fa-spin"></i> Save Allocation</>
                        : rolePermissionAllocData.error ?
                          <><i className="fa fa-warning"></i> Save Allocation</>
                        : Object.entries(rolePermissionAllocData.rolePermissionAlloc).length > 0 ?
                          <>Save Allocation</>
                        : <>Save Allocation</>
                      }
                    </button>
                    <button className="btn btn-danger btn-xs mr-5" onClick={() => setSaveDeAlloc(true)}>
                      { rolePermissionDeAllocData.loading ?
                          <><i className="fa fa-refresh fa-spin"></i> Save De-allocation</>
                        : rolePermissionDeAllocData.error ?
                          <><i className="fa fa-warning"></i> Save De-allocation</>
                        : Object.entries(rolePermissionDeAllocData.rolePermissionDeAlloc).length > 0 ?
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

    <div className="modal fade" id="modal-update">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 className="modal-title">{roleData.role.name}</h4>
          </div>
          <div className="modal-body">
            { updateRoleData.loading ?
                <>
                  <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                  <span> Updating role...</span>
                </>
              : updateRoleData.error ?
                <pre>{JSON.stringify(updateRoleData.error, null, 2)}</pre>
              : Object.entries(updateRoleData.updateRole).length > 0 ?
                <h4 className="text-success text-center">
                  <i className="fa fa-check"></i>Success! Updated role
                </h4>
              : <></>
            }
            <div className="form-group">
              <label>Role Name</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter new roles' name"
                value={newRoleName}
                onChange={e => setNewRoleName(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default btn-sm pull-left" data-dismiss="modal">
              <i className="fa fa-times"></i> Close
            </button>
            <button type="button" className="btn btn-success btn-sm" onClick={handleUpdate}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}

const mapStateToProps = state => {
  return {
    roleData: state.roleData,
    updateRoleData: state.updateRoleData,
    permissionsData: state.permissionsData,
    rolePermissionAllocData: state.rolePermissionAllocData,
    rolePermissionDeAllocData: state.rolePermissionDeAllocData,
    deleteRolesData: state.deleteRolesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRole: parameter => dispatch(fetchRole(parameter)),
    updateRole: role => dispatch(updateRole(role)),
    fetchPermissions: () => dispatch(fetchPermissions()),
    rolePermissionAlloc: rolePermissions => dispatch(rolePermissionAlloc(rolePermissions)),
    rolePermissionDeAlloc: rolePermissions => dispatch(rolePermissionDeAlloc(rolePermissions)),
    deleteRoles: roles => dispatch(deleteRoles(roles)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleProfile);
