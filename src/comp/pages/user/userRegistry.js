
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';

import '../../tables/tables.css';
import ContentHeader from '../../master/contentHeader';
import { fetchUsers } from '../../../redux';
import { userColumns, GlobalFilter } from '../../tables';

function UserRegistry({ fetchUsers, usersData }) {
  const [ usersFilter, setUsersFilter ] = useState("all");

  useEffect(() => fetchUsers(usersFilter), []);

  const columns = useMemo(() => userColumns, []);
  const data = useMemo(() => usersData.users, [usersData.users]);
  const {
    getTableProps, getTableBodyProps, headerGroups, footerGroups, prepareRow, 
    page, previousPage, nextPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, 
    setPageSize, setGlobalFilter, state: { globalFilter, pageIndex, pageSize }
  } = useTable(
    { columns, data }, useFilters, useGlobalFilter, useSortBy, usePagination
  );
  

  return (
  <>
    <ContentHeader headerData={
      { title: "Users", subTitle: "Registry", pageName: "User/Registry" }
    }/>
    
    <section className="content container-fluid">
      <div className="box box-success">
        <div className="box-body">
          {
          usersData.loading ?
          <>
            <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
            <span>Loading users</span>
          </>
          : usersData.error ?
            <pre>{JSON.stringify(usersData.error, null, 2)}</pre>
          : usersData.users ?
            <>
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
  </>
  );
}

const mapStateToProps = state => {
  return {
    usersData: state.usersData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: usersFilter => dispatch(fetchUsers(usersFilter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistry);
