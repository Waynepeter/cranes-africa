
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useTable, useRowSelect } from 'react-table';

import ContentHeader from '../../master/contentHeader';
import { createPermissions } from '../../../redux';
import { permissionCreationColumns, Checkbox } from '../../tables';

function PermissionCreation({ createPermissions, createPermissionsData }) {
  const [ savePermissions, setSavePermissions ] = useState(false);
  const persistPermissions = () => { setSavePermissions(true); };
  const [ permissions, setPermissions ] = useState([]);
  const [ name, setName ] = useState('');

  useEffect(() => {
    if (savePermissions) {
      createPermissions({ permissions });
      setSavePermissions(false);
      setPermissions([]);
    }
  }, [savePermissions]);

  const columns = useMemo(() => permissionCreationColumns, []);
  const data = useMemo(() => permissions, [permissions]);
  const {
    getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, selectedFlatRows
  } = useTable(
    { columns, data }, useRowSelect,
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
  const addPermission = () => {
    if (name && name !== '') {
      setPermissions(prevPermissions => [...prevPermissions, { name }]);
      setName('');
    }
  }
  const removePermissions = () => {
    selectedRows.forEach(selectedRow => {
      permissions.splice(permissions.findIndex(permissions => permissions.name === selectedRow.name), 1);
    });
    setPermissions(permissions);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Permissions", subTitle: "Creation", pageName: "Permissions/Creation" }} />
    
    <section className="content container-fluid">
      <div className="box box-primary">
        <div className="box-body">
          { createPermissionsData.loading ?
              <>
                <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                <span> Saving permissions...</span>
                <hr/>
              </>
            : createPermissionsData.error ?
              <pre>{JSON.stringify(createPermissionsData.error, null, 2)}</pre>
            : createPermissionsData.createPermissions.length > 0 ?
              <>
                <h4 className="text-center">
                  <i className="fa fa-check text-success"></i> Success! Created {createPermissionsData.createPermissions.length} permission(s) 
                </h4>
                <hr/>
              </>
            : <></>
          }
          <div className="mb-10">
            <label htmlFor="exampleInputEmail1">Permission Name</label>
            <div className="input-group input-group-sm">
              <input type="text" className="form-control" onChange={e => setName(e.target.value)}/>
              <span className="input-group-btn">
                <button type="button" className="btn btn-primary btn-flat" onClick={addPermission}>
                  <i className="fa fa-plus"></i> ADD Permission
                </button>
              </span>
            </div>
          </div>

          <table className="ace-table" {...getTableProps()}>
            <thead>
              { headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (<th {...column.getHeaderProps()}>{column.render('Header')}</th>))}
                  </tr>
                ))
              }
            </thead>
            <tbody {...getTableBodyProps()}>
              { rows.map(row => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => { return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>})}
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
        <div className="box-footer">
          {/* <button type="button" className="btn btn-primary btn-xs mr-5" onClick={removePermissions}>
            <i className="fa fa-minus"></i> Remove
          </button> */}
          <button type="button" className="btn btn-success btn-xs" onClick={persistPermissions}>
            {
              createPermissionsData.loading ?
                <><i className="fa fa-refresh fa-spin"></i> Save Permissions</>
              : createPermissionsData.error ?
                <><i className="fa fa-warning"></i> Save Permissions</>
              : Object.entries(createPermissionsData.createPermissions) > 0 ?
                <><i className="fa fa-check"></i> Save Permissions</>
              : <>Save Permissions</>
            }
          </button>
        </div>
      </div>
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    createPermissionsData: state.createPermissionsData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPermissions: permissions => dispatch(createPermissions(permissions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionCreation);
