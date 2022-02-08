
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import ContentHeader from '../../master/contentHeader';
import { fetchPermission, updatePermission, deletePermissions } from '../../../redux';
import { humanize, humanize1, formatDate } from '../../../utils';

function PermissionProfile({
    permissionData, fetchPermission, updatePermission, updatePermissionData, deletePermissions,
    deletePermissionsData
  }) {
  let sleepTime = 1000;

  const { uuid } = useParams();
  const [ deletion, setDeletion ] = useState(false);
  const [ update, setUpdate ] = useState(false);
  const [ newPermissionName, setNewPermissionName ] = useState('');

  const handleDelete = () => setDeletion(true);
  const handleUpdate = () => setUpdate(true);
  
  useEffect(() => fetchPermission(uuid.substring(1)), []);
  useEffect(() => {
    let timer;

    if (update) {
      updatePermission({
        parameter: permissionData.permission.uuid,
        name: newPermissionName
      });
      
      timer = setTimeout(() => {
        fetchPermission(uuid.substring(1));
        setUpdate(false);
      }, sleepTime);

      return () => clearTimeout(timer);
    }
  }, [update]);

  useEffect(() => {
    if (deletion) {
      deletePermissions({
        permissions: [{ parameter: permissionData.permission.uuid }]
      });
      setDeletion(false);
    }
  }, [deletion]);

  return (
  <>
    <ContentHeader headerData={{ title: "Permission", subTitle: "Profile", pageName: "Permission/Profile" }} />
    
    <section className="content container-fluid">
      <div className="box">
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
              <li><a href="/permission-registry"><i className="fa fa-mail-reply"></i> Role Registry</a></li>
            </ul>
          </div>
          <span className="pull-right">
          { deletePermissionsData.loading ?
              <>
                <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
                <span> Deleting permission...</span>
              </>
            : deletePermissionsData.error ?
              <pre>
                {JSON.stringify(deletePermissionsData.error, null, 2)}
              </pre>
            : deletePermissionsData.deletePermissions.length > 0 ?
              <h4 className="text-success text-center">
                <i className="fa fa-check"></i> Success! Deleted permission
                <Redirect to="/permission-registry" />
              </h4>
            : <></>
          }
          </span>
        </div>
        <div className="box-body">
        {
          permissionData.loading ?
          <>
            <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/>
            <span> Loading permission...</span>
          </>
          : permissionData.error ?
            <pre>{JSON.stringify(permissionData.error, null, 2)}</pre>
          : Object.entries(permissionData.permission).length > 0 ?
            <>
            <div className="box-body box-profile">
              <ul className="list-group list-group-unbordered">
                <li className="list-group-item">
                  <b>Name</b> <a className="pull-right">{humanize1(permissionData.permission.name)}</a>
                </li>
                <li className="list-group-item">
                  <b>Created At</b> <a className="pull-right">{formatDate(permissionData.permission.created_at)}</a>
                </li>
                <li className="list-group-item">
                  <b>Last Updated At</b> <a className="pull-right">{formatDate(permissionData.permission.updated_at)}</a>
                </li>
              </ul>

              <h4 className="box-title">Assigned Roles</h4>
              <hr/>
              <ol>
                { permissionData.permission.roles.map(role => {
                  return <li className="text-muted" key={role.uuid}>{humanize(role.name)}</li>
                })}
              </ol>
            </div>
            </>
          :
          <h3 className="text-danger">404 Not Found!</h3>
        }
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
            <h4 className="modal-title">{permissionData.permission.name}</h4>
          </div>
          <div className="modal-body">
            { updatePermissionData.loading ?
                <>
                  <img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt="" />
                  <span> Updating permission...</span>
                </>
              : updatePermissionData.error ?
                <pre>{JSON.stringify(updatePermissionData.error, null, 2)}</pre>
              : Object.entries(updatePermissionData.updatePermission).length > 0 ?
                <h4 className="text-success text-center">
                  <i className="fa fa-check"></i> Success! Updated permission
                </h4>
              : <></>
            }
            <div className="form-group">
              <label>Permission Name</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter new roles' name"
                value={newPermissionName}
                onChange={e => setNewPermissionName(e.target.value)}
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
    permissionData: state.permissionData,
    updatePermissionData: state.updatePermissionData,
    deletePermissionsData: state.deletePermissionsData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPermission: parameter => dispatch(fetchPermission(parameter)),
    updatePermission: permission => dispatch(updatePermission(permission)),
    deletePermissions: permissions => dispatch(deletePermissions(permissions))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PermissionProfile);
