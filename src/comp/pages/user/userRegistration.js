
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useTable, useRowSelect } from 'react-table';

import ContentHeader from '../../master/contentHeader';
import { createUsers } from '../../../redux';
import { userCreationColumns, Checkbox } from '../../tables';

function UserRegistration({ createUsersData, createUsers }) {

  const [ saveUsers, setSaveUsers ] = useState(false);
  const [ users, setUsers ] = useState([]);
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  
  const handleUsers = () => { setSaveUsers(true); };
  
  useEffect(() => {
    if (saveUsers) {
      createUsers({ users });
      setSaveUsers(false);
      setUsers([]);
    }
  }, [saveUsers]);

  const columns = useMemo(() => userCreationColumns, []);
  const data = useMemo(() => users, [users]);
  const {
    getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, selectedFlatRows
  } = useTable({ columns, data }, useRowSelect,
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
  const addUser = () => {
    if (name !== "" && email !== '') {
      setUsers(prevUsers => [...prevUsers, { name, email }]);
      setName('');
      setEmail('');
    }
  }
  // const removeUsers = () => {
  //   selectedRows.forEach(selectedRow => {
  //     users.splice(users.findIndex(users => users.email === selectedRow.email), 1);
  //   });
  //   setUsers(users);
  // }

  return (
  <>
    <ContentHeader headerData={{ title: "Registration", subTitle: "user", pageName: "User/Registration" }}/>
    
    <section className="content container-fluid">
      <div className="box box-primary">
        <div className="box-body">
          { createUsersData.loading ?
              <>
                <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                <span>saving users</span>
                <hr/>
              </>
            : createUsersData.error ?
              <pre>{JSON.stringify(createUsersData.error, null, 2)}</pre>
            : createUsersData.createUsers.length > 0 ?
              <>
                <h5 className="text-center">
                  <i className="fa fa-check text-success"></i> Success! Created {createUsersData.createUsers.length} user(s)<br />
                  We have sent passwords of all successfully created accounts to the email addresses specified. <br />
                  If you didnt receive yours, contact our support center.
                </h5>
                <hr/>
              </>
            : <></>
          }
          <div className="row mb-10">
            <div className="col-lg-6 col-md-6 col-sm-sm-12">
              <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control input-sm" placeholder="Enter users name" onChange={e => setName(e.target.value)} />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-sm-12">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control input-sm" placeholder="Enter email address" onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-sm-12">
              <div className="form-group">
                <button className="btn btn-primary btn-xs mt-5" onClick={addUser}><i className="fa fa-plus"></i> ADD</button>
              </div>
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
          {/* <button type="button" className="btn btn-primary btn-xs mr-5" onClick={removeUsers}>
            <i className="fa fa-minus"></i> Remove
          </button> */}
          <button type="button" className="btn btn-success btn-xs" onClick={handleUsers}>
            {
              createUsersData.loading ?
                <><i className="fa fa-refresh fa-spin"></i> Save Users</>
              : createUsersData.error ?
                <><i className="fa fa-warning"></i> Save Users</>
              : Object.entries(createUsersData.createUsers) > 0 ?
                <><i className="fa fa-check"></i> Save Users</>
              : <>Save Users</>
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
    createUsersData: state.createUsersData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUsers: users => dispatch(createUsers(users))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegistration);
