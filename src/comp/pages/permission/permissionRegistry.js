
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect } from 'react-table';

import ContentHeader from '../../master/contentHeader';
import { fetchPermissions, deletePermissions } from '../../../redux';
import { permissionColumns, GlobalFilter, Checkbox } from '../../tables';

function PermissionRegistry({
    fetchPermissions, permissionsData, deletePermissions, deletePermissionsData
  }) {
    
  let sleepTime = 1000;

  const [ deletion, setDeletion ] = useState(false);

  const deleteSelection = () => setDeletion(true);
  
  useEffect(() => fetchPermissions(), []);
  useEffect(() => {
    let timer;
    
    if (deletion) {
      const permissions = [];

      selectedRows.forEach(permission => permissions.push({ parameter: permission.uuid }));
      deletePermissions({ permissions });

      timer = setTimeout(() => {
        fetchPermissions();
        setDeletion(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [deletion]);

  const columns = useMemo(() => permissionColumns, []);
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
    { columns, data }, useFilters,
    useGlobalFilter, useSortBy, usePagination, useRowSelect,
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
  
  return (<>
    <ContentHeader headerData={{ title: "Permission", subTitle: "Registry", pageName: "Permission/Registry" }}/>
    
    <section className="content container-fluid">
      <div className="box">
        <div className="box-body">
          { deletePermissionsData.loading ?
              <>
                <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                <span> Deleting permissions...</span>
              </>
            : deletePermissionsData.error ?
              <pre>{JSON.stringify(deletePermissionsData.error, null, 2)}</pre>
            : deletePermissionsData.deletePermissions.length > 0 ?
              <h4 className="text-success text-center">
                <i className="fa fa-check"></i>Success! Deleted {deletePermissionsData.deletePermissions.length} permission(s)
              </h4>
            : <></>
          }
          {
            permissionsData.loading ?
            <>
              <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
              <span>Loading permissions</span>
            </>
            : permissionsData.error ?
              <pre>{JSON.stringify(permissionsData.error, null, 2)}</pre>
            : permissionsData.permissions ?
              <>
              <div className="btn-group">
                <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-bars"></i>
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu" role="menu">
                  <li><a onClick={deleteSelection}><i className="fa fa-trash"></i> Delete Selected</a></li>
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
                <tfoot>
                  { footerGroups.map(footerGroup => (
                      <tr {...footerGroup.getFooterGroupProps()}>
                        { footerGroup.headers.map(column => (
                            <th {...column.getFooterProps()}>{column.render('Footer')}</th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </tfoot>
              </table>
              
              <div>
                <span className="paginationGuide">Page <strong>{pageIndex + 1}</strong> of {pageOptions.length} </span>
                <span className="text-divider"></span>
                <span> Go to page 
                  <input
                    className="searchPage"
                    type='number'
                    defaultValue={pageIndex + 1}
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
            :
            <h3 className="text-danger">Something has gone wrong!</h3>
          }
        </div>
      </div>
    </section>
  </>);
}

const mapStateToProps = state => {
  return {
    permissionsData: state.permissionsData,
    deletePermissionsData: state.deletePermissionsData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPermissions: () => dispatch(fetchPermissions()),
    deletePermissions: permissions => dispatch(deletePermissions(permissions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionRegistry);
