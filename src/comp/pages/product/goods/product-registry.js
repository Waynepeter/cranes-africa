
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import {
  useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect
} from 'react-table';
import ContentHeader from '../../../master/contentHeader';
import { fetchProducts, deleteProducts } from '../../../../redux';
import { productsColumns, GlobalFilter, Checkbox } from '../../../tables';

function ProductRegistry({
    fetchProducts, productsFetchData, deleteProducts, productsDeleteData
  }) {
  const [ deletion, setDeletion ] = useState(false);
  const [ reload, setReload ] = useState(false);

  useEffect(() => fetchProducts(), []);

  useEffect(() => {
    if (deletion) {
      const products = [];

      selectedItems.forEach(product => products.push({ parameter: product.uuid }));
      deleteProducts({ products });
      setReload(true);
      setDeletion(false);
    }
  }, [deletion]);

  useEffect(() => {
    if (reload) {
      fetchProducts();
      setReload(false);
    }
  }, [productsDeleteData.productsDelete]);

  const columns = useMemo(() => productsColumns, []);
  const data = useMemo(() => productsFetchData.productsFetch, [productsFetchData.productsFetch]);
  const {
    getTableProps, getTableBodyProps, headerGroups, footerGroups, prepareRow, 
    page, previousPage, nextPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, 
    setPageSize, selectedFlatRows, setGlobalFilter, state: { globalFilter, pageIndex, pageSize }
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
  const selectedItems = selectedFlatRows.map(row => row.original);
  const deleteSelection = () => setDeletion(true);

  return (
  <>
    <ContentHeader headerData={{ title: "Registry", subTitle: "Products", pageName: "Products/Registry" }}/>
    
    <section className="content container-fluid">
      <div className="box">
        <div className="box-body">
        { productsDeleteData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting products...</>
        : productsDeleteData.error ?
          <pre>{JSON.stringify(productsDeleteData.error, null, 2)}</pre>
        : productsDeleteData.productsDelete && Object.entries(productsDeleteData.productsDelete).length > 0 ?
          <h4 className="text-success text-center">Success! Deleted products</h4>
        : null }

        { productsFetchData.loading ?
          <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading products...</>
        : productsFetchData.error ?
          <pre>{JSON.stringify(productsFetchData.error, null, 2)}</pre>
        : productsFetchData.productsFetch ?
          <>
          <div className="btn-group">
            <button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-bars"></i><span className="sr-only">Toggle Dropdown</span>
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
        : <h3 className="text-danger">Something has gone wrong!</h3>}
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    productsFetchData: state.productsFetchData,
    productsDeleteData: state.productsDeleteData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProducts: items => dispatch(deleteProducts(items)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductRegistry);