
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useTable, useRowSelect } from 'react-table';

import ContentHeader from '../../master/contentHeader';
import { createRoles } from '../../../redux';
import { roleCreationColumns, Checkbox } from '../../tables';

function RoleCreation({ createRoles, createRolesData }) {
  
  const [ saveRoles, setSaveRoles ] = useState(false);
  const persistRoles = () => { setSaveRoles(true); };
  const [ roles, setRoles ] = useState([]);
  const [ name, setName ] = useState('');

  useEffect(() => {
    if (saveRoles) {
      createRoles({ roles });
      setSaveRoles(false);
      setRoles([]);
    }
  }, [saveRoles]);

  const columns = useMemo(() => roleCreationColumns, []);
  const data = useMemo(() => roles, [roles]);
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
  const addRole = () => {
    if (name && name !== '') {
      setRoles(prevRoles => [...prevRoles, { name }]);
      setName('');
    }
  }
  const removeRoles = () => {
    selectedRows.forEach(selectedRow => {
      roles.splice(roles.findIndex(roles => roles.name === selectedRow.name), 1);
    });
    setRoles(roles);
  }

  return (
  <>
    <ContentHeader headerData={{ title: "Role", subTitle: "Creation", pageName: "Role/Creation" }}/>
    
    <section className="content container-fluid">
      <div className="box box-primary">
        <div className="box-body">
          { createRolesData.loading ?
              <>
                <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                <span>saving roles</span>
                <hr/>
              </>
            : createRolesData.error ?
              <pre>{JSON.stringify(createRolesData.error, null, 2)}</pre>
            : createRolesData.createRoles.length > 0 ?
              <>
                <h4 className="text-center">
                  <i className="fa fa-check text-success"></i> Success! Created {createRolesData.createRoles.length} role(s) 
                </h4>
                <hr/>
              </>
            : <></>
          }
          <div className="mb-10">
            <label htmlFor="exampleInputEmail1">Role Name</label>
            <div className="input-group input-group-sm">
              <input type="text" className="form-control" onChange={e => setName(e.target.value)}/>
              <span className="input-group-btn">
                <button type="button" className="btn btn-primary btn-flat" onClick={addRole}>
                  <i className="fa fa-plus"></i> ADD Role
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
          {/* <button type="button" className="btn btn-primary btn-xs mr-5" onClick={removeRoles}>
            <i className="fa fa-minus"></i> Remove
          </button> */}
          <button type="button" className="btn btn-success btn-xs" onClick={persistRoles}>
            {
              createRolesData.loading ?
                <><i className="fa fa-refresh fa-spin"></i> Save Roles</>
              : createRolesData.error ?
                <><i className="fa fa-warning"></i> Save Roles</>
              : Object.entries(createRolesData.createRoles) > 0 ?
                <><i className="fa fa-check"></i> Save Roles</>
              : <>Save Roles</>
            }
          </button>
        </div>
      </div>

      {/* <pre>
        <code>
          {JSON.stringify(selectedRows, null, 2)}
        </code>
      </pre> */}
      
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    createRolesData: state.createRolesData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createRoles: roles => dispatch(createRoles(roles))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleCreation);
