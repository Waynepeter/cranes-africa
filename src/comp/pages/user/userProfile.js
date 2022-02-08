
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  useTable, useSortBy, useFilters, useGlobalFilter, usePagination, useRowSelect
} from 'react-table';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ContentHeader from '../../master/contentHeader';
import {
  fetchOtherProfile, updateLogins, updateProfile, deleteUser, fetchRoles, enrollStaff, fetchDesignations,
  fetchModules
} from '../../../redux';
import { emailMiniColumns, GlobalFilter } from '../../tables';
import { humanize, formatDate, formatGender, parseHTML } from '../../../utils';

function UserProfile({
    fetchOtherProfile, otherProfileData, updateLogins, updateLoginsData, updateProfile, updateProfileData,
    deleteUser, deleteUserData, fetchRoles, rolesData, enrollStaff, enrollStaffData, fetchDesignations, 
    fetchDesignationsData, fetchModules, fetchModulesData
  }) {
  let sleepTime = 2000;

  const { uuid } = useParams();
  const [ password, setPassword ] = useState('');
  const [ changePassword, setChangePassword ] = useState(false);
  const [ profile, setProfile ] = useState({
    name: '', email: '', 
    country: '', region: '', idNumber: '', postalAddress: '', permanentResidence: '',
    currentResidence: '', dateOfBirth: '', primaryPhoneNumber: '', secondaryPhoneNumber: '', 
    gender: '', biography: '', webProfile: '', publishProfile: false, linkedin: '', twitter: '', 
    facebook: '', instagram: '', 
  });
  const [ photo, setPhoto ] = useState();
  const [ profileUpdate, setProfileUpdate ] = useState(false);
  const [ staffEnrollment, setStaffEnrollment ] = useState(false);
  const [ enrollmentInfo, setEnrollmentInfo ] = useState({
    designationId: 0, moduleId: 0
  });
  const [ deleteuser, setDeleteuser ] = useState(false);

  useEffect(() => {
    fetchOtherProfile(uuid.substring(1));
    fetchDesignations();
    fetchModules();
  }, []);
  useEffect(() => {
    if (otherProfileData.otherProfile.profile && Object.entries(otherProfileData.otherProfile.profile).length > 0) {
      setProfile({
        name: otherProfileData.otherProfile.name, 
        email: otherProfileData.otherProfile.email, 
        country: otherProfileData.otherProfile.profile.country, 
        region: otherProfileData.otherProfile.profile.region, 
        idNumber: otherProfileData.otherProfile.profile.idNumber, 
        postalAddress: otherProfileData.otherProfile.profile.postalAddress, 
        permanentResidence: otherProfileData.otherProfile.profile.permanentResidence, 
        currentResidence: otherProfileData.otherProfile.profile.currentResidence, 
        dateOfBirth: otherProfileData.otherProfile.profile.dateOfBirth, 
        primaryPhoneNumber: otherProfileData.otherProfile.profile.primaryPhoneNumber, 
        secondaryPhoneNumber: otherProfileData.otherProfile.profile.secondaryPhoneNumber, 
        gender: otherProfileData.otherProfile.profile.gender,
        biography: otherProfileData.otherProfile.profile.biography,
        webProfile: otherProfileData.otherProfile.profile.webProfile,
        publishProfile: otherProfileData.otherProfile.profile.publishProfile,
        linkedin: otherProfileData.otherProfile.profile.linkedin,
        twitter: otherProfileData.otherProfile.profile.twitter,
        facebook: otherProfileData.otherProfile.profile.facebook,
        instagram: otherProfileData.otherProfile.profile.instagram,
      });
    }
  }, [otherProfileData.otherProfile]);

  useEffect(() => {
    if (fetchDesignationsData.fetchDesignations && fetchDesignationsData.fetchDesignations.length > 0) {
      setEnrollmentInfo({ ...enrollmentInfo,
        designationId: fetchDesignationsData.fetchDesignations[0].id
      });
    }
  }, [fetchDesignationsData.fetchDesignations]);

  useEffect(() => {
    if (fetchModulesData.modules && fetchModulesData.modules.length > 0) {
      setEnrollmentInfo({ ...enrollmentInfo,
        moduleId: fetchModulesData.modules[0].id
      });
    }
  }, [fetchModulesData.modules]);

  useEffect(() => {
    let timer;

    if (changePassword) {
      updateLogins({ parameter: otherProfileData.otherProfile.uuid, password });
      
      timer = setTimeout(() => {
        fetchOtherProfile(uuid.substring(1));
        setChangePassword(false);
      }, sleepTime);
      return () => clearTimeout(timer);
    }
  }, [changePassword]);

  useEffect(() => {
    let timer;

    if (profileUpdate) {
      let formData = new FormData();

      formData.append('parameter', otherProfileData.otherProfile.uuid);
      formData.append('oldPhoto', otherProfileData.otherProfile.profile.photo);
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('country', profile.country);
      formData.append('region', profile.region);
      formData.append('idNumber', profile.idNumber);
      formData.append('postalAddress', profile.postalAddress);
      formData.append('permanentResidence', profile.permanentResidence);
      formData.append('currentResidence', profile.currentResidence);
      formData.append('dateOfBirth', profile.dateOfBirth);
      formData.append('primaryPhoneNumber', profile.primaryPhoneNumber);
      formData.append('secondaryPhoneNumber', profile.secondaryPhoneNumber);
      formData.append('gender', profile.gender);
      formData.append('biography', profile.biography);
      formData.append('photo', photo);
      formData.append('webProfile', profile.webProfile);
      formData.append('publishProfile', profile.publishProfile);
      formData.append('linkedin', profile.linkedin);
      formData.append('twitter', profile.twitter);
      formData.append('facebook', profile.facebook);
      formData.append('instagram', profile.instagram);

      updateProfile(formData);
      setProfileUpdate(false);

      timer = setTimeout(() => fetchOtherProfile(uuid.substring(1)), sleepTime);
      return () => clearTimeout(timer);
    }
  }, [profileUpdate]);

  useEffect(() => {
    let timer;

    if (staffEnrollment) {
      let formData = new FormData();

      formData.append('userId', otherProfileData.otherProfile.id);
      formData.append('profileId', otherProfileData.otherProfile.profile.id);
      formData.append('moduleId', enrollmentInfo.moduleId);
      formData.append('designationId', enrollmentInfo.designationId);
      enrollStaff(formData);

      timer = setTimeout(() => {
        fetchOtherProfile(uuid.substring(1));
        setStaffEnrollment(false);
      }, sleepTime);
      return () => clearTimeout(timer);
    }
  }, [staffEnrollment]);

  useEffect(() => {
    let timer;

    if (deleteuser) {
      deleteUser({ parameter: otherProfileData.otherProfile.uuid });

      timer = setTimeout(() => {
        fetchOtherProfile(uuid.substring(1));
        setDeleteuser(false);
      }, sleepTime);
      return () => clearTimeout(timer);
    }
  }, [deleteuser]);

  const handlePasswordChange = () => setChangePassword(true);
  const handleProfileUpdate = e => {
    e.preventDefault();
    setProfileUpdate(true);
  }
  const handleStaffEnrollment = e => {
    e.preventDefault();
    setStaffEnrollment(true);
  }
  const handleDelete = () => setDeleteuser(true);
  const emails = otherProfileData.otherProfile.emails;
  const columns = useMemo(() => emailMiniColumns, []);
  const data = useMemo(() => {
    if (emails) { return emails; } else { return []; }
  }, [emails]);
  const {
    getTableProps, getTableBodyProps, headerGroups, footerGroups, prepareRow,
    page, previousPage, nextPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount, 
    setPageSize, setGlobalFilter, state: { globalFilter, pageIndex, pageSize }
  } = useTable(
    { columns, data }, useFilters, useGlobalFilter, useSortBy, usePagination
  );

  return (
  <>
    <ContentHeader headerData={{ title: "User", subTitle: "Profile", pageName: "User/Profile" }}/>
    
    <section className="content container-fluid">
    { otherProfileData.loading ?
      <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Loading profile...</>
    : otherProfileData.error ?
      <pre>{JSON.stringify(otherProfileData.error, null, 2)}</pre>
    : Object.entries(otherProfileData.otherProfile).length > 3 ?
      <>
        <div className="row">
          <div className="col-md-12">
          { updateLoginsData.loading ?
            <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Processing changes...</>
          : updateLoginsData.error ?
            <pre>{JSON.stringify(updateLoginsData.error, null, 2)}</pre>
          : Object.entries(updateLoginsData.updateLogins).length > 0 ?
            <h4 className="text-success text-center"><i className="fa fa-check"></i>Password changed!</h4>
          : <></>}

          { updateProfileData.loading ?
            <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Processing changes...</>
          : updateProfileData.error ?
            <pre>{JSON.stringify(updateProfileData.error, null, 2)}</pre>
          : Object.entries(updateProfileData.updateProfile).length > 0 ?
            <h4 className="text-success text-center"><i className="fa fa-check"></i>Profile updated!</h4>
          : <></>}

          { deleteUserData.loading ?
            <><img className="spinner-20" src="dist/img/spinner/spinner-2.gif" alt=""/> Deleting user...</>
          : deleteUserData.error ?
            <pre>{JSON.stringify(deleteUserData.error, null, 2)}</pre>
          : Object.entries(deleteUserData.deleteUser).length > 0 ?
            <h4 className="text-success text-center"><i className="fa fa-check"></i>User deleted!</h4>
          : <></>}

          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs nav-tabs">
              <li className="active"><a href="#general" data-toggle="tab">General</a></li>
              <li><a href="#bio" data-toggle="tab">Bio</a></li>
              <li><a href="#roles" data-toggle="tab">Roles</a></li>
              <li><a href="#emails" data-toggle="tab">Emails</a></li>
              <li><a href="#settings" data-toggle="tab">Settings</a></li>
              <li><a href="#manage" data-toggle="tab">Manage</a></li>
              <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                  <i className="fa fa-bars"></i> Actions <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li role="presentation">
                    <a onClick={handleDelete} role="menuitem" tabindex="-1" href="#"><i className="fa fa-trash"></i> Delete User</a>
                  </li>
                  <li role="presentation" class="divider"></li>
                  <li role="presentation">
                    <a role="menuitem" tabindex="-1" href="/user-registry"><i className="fa fa-link"></i> View Other Users</a>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="general">
                <div className="row">
                  <div className="col-md-4">
                    <div className="box-body box-profile">
                      <img
                        className="profile-user-img img-responsive img-circle" 
                        src={`${window.imgBaseURL}/${otherProfileData.otherProfile.profile.photo}`}
                        alt=""
                      />
                      <h3 className="profile-username text-center">{humanize(otherProfileData.otherProfile.name)}</h3>
                      <p className="text-muted text-center">---</p>
                      <ul className="list-group list-group-unbordered">
                        <li className="list-group-item">
                          <b>Email Address</b> <a className="pull-right">{otherProfileData.otherProfile.email}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Roles Count</b> <a className="pull-right">{otherProfileData.otherProfile.roles.length} Roles</a>
                        </li>
                        <li className="list-group-item">
                          <b>Email Count</b> <a className="pull-right">{otherProfileData.otherProfile.emails.length} Emails</a>
                        </li>
                        <li className="list-group-item">
                          <b>Joined</b> <a className="pull-right">{formatDate(otherProfileData.otherProfile.created_at)}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Last Updated</b> <a className="pull-right">{formatDate(otherProfileData.otherProfile.updated_at)}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane" id="bio">
                <div className="table-responsive">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>National ID: </th>
                            <td>{otherProfileData.otherProfile.profile.idNumber}</td>
                          </tr>
                          <tr>
                            <th>Date Of Birth: </th>
                            <td>{otherProfileData.otherProfile.profile.dateOfBirth}</td>
                          </tr>
                          <tr>
                            <th>Gender: </th>
                            <td>{formatGender(otherProfileData.otherProfile.profile.gender)}</td>
                          </tr>
                          <tr>
                            <th>Country:</th>
                            <td>{otherProfileData.otherProfile.profile.country}</td>
                          </tr>
                          <tr>
                            <th>Region: </th>
                            <td>{otherProfileData.otherProfile.profile.region}</td>
                          </tr>
                          <tr>
                            <th>Permanent Residence: </th>
                            <td>{otherProfileData.otherProfile.profile.permanentResidence}</td>
                          </tr>
                          <tr>
                            <th>Current Residence: </th>
                            <td>{otherProfileData.otherProfile.profile.currentResidence}</td>
                          </tr>
                          <tr>
                            <th>Postal Address: </th>
                            <td>{otherProfileData.otherProfile.profile.postalAddress}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th>Primary Tel: </th>
                            <td>{otherProfileData.otherProfile.profile.primaryPhoneNumber}</td>
                          </tr>
                          <tr>
                            <th>Secondary Tel: </th>
                            <td>{otherProfileData.otherProfile.profile.secondaryPhoneNumber}</td>
                          </tr>
                          <tr>
                            <th>LinkedIn: </th>
                            <td>{otherProfileData.otherProfile.profile.linkedin}</td>
                          </tr>
                          <tr>
                            <th>Twitter: </th>
                            <td>{otherProfileData.otherProfile.profile.twitter}</td>
                          </tr>
                          <tr>
                            <th>Facebook: </th>
                            <td>{otherProfileData.otherProfile.profile.facebook}</td>
                          </tr>
                          <tr>
                            <th>Instagram: </th>
                            <td>{otherProfileData.otherProfile.profile.instagram}</td>
                          </tr>
                          <tr>
                            <th>Created At: </th>
                            <td>{formatDate(otherProfileData.otherProfile.profile.created_at)}</td>
                          </tr>
                          <tr>
                            <th>Last Updated: </th>
                            <td>{formatDate(otherProfileData.otherProfile.profile.updated_at)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <p className="lead">Biography</p>
                      <p className="text-muted well well-sm no-shadow" style={{ margin_top: "10px" }}>
                        {parseHTML(otherProfileData.otherProfile.profile.biography)}
                      </p>
                      <p className="lead">Website Profile</p>
                      <p className="text-muted well well-sm no-shadow" style={{ margin_top: "10px" }}>
                        {parseHTML(otherProfileData.otherProfile.profile.webProfile)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tab-pane" id="roles">
                <div className="box-group" id="accordion">
                  { otherProfileData.otherProfile.roles.map(role => {
                      return (
                        <div className="panel box box-info" key={role.name}>
                          <div className="box-header with-border">
                            <h4 className="box-title">
                              <a data-toggle="collapse" data-parent="#accordion" href={`#${role.name}`}>
                                {role.name}
                              </a>
                            </h4>
                          </div>
                          <div id={role.name} className="panel-collapse collapse">
                            <div className="box-body">
                              --- role description coming in version 2 ---
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div className="tab-pane" id="emails">
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
              </div>

              <div className="tab-pane" id="settings">
                <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-10">
                      <input
                        type="password"
                        className="form-control input-sm"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={handlePasswordChange}
                      >
                        { updateLoginsData.loading ?
                            <><i className="fa fa-refresh fa-spin"></i> Save Changes</>
                          : updateLoginsData.error ?
                            <><i className="fa fa-warning"></i> Save Changes</>
                          : Object.entries(updateLoginsData.updateLogins).length > 0 ?
                            <>Save Changes</>
                          : <>Save Changes</>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="tab-pane" id="manage">
                <div class="nav-tabs-custom tab-success">
                  <ul class="nav nav-tabs">
                    <li class="active">
                      <a href="#manage-profile" data-toggle="tab">Manage Profile</a>
                    </li>
                    <li><a href="#manage-roles" data-toggle="tab">Manage Roles</a></li>
                    <li><a href="#enroll-staff" data-toggle="tab">Enroll Staff</a></li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active" id="manage-profile">
                      <form className="row" onSubmit={handleProfileUpdate}>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control input-sm" placeholder="User Name" 
                              defaultValue={otherProfileData.otherProfile.name} 
                              onChange={e => setProfile({ ...profile, name: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control input-sm" placeholder="Email Address" 
                              defaultValue={otherProfileData.otherProfile.email} 
                              onChange={e => setProfile({ ...profile, email: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>National ID</label>
                            <input type="text" className="form-control input-sm" placeholder="National ID" 
                              defaultValue={profile.idNumber} 
                              onChange={e => setProfile({ ...profile, idNumber: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Date Of Birth</label>
                            <input
                              type="date"
                              className="form-control input-sm"
                              placeholder="Date Of Birth" 
                              defaultValue={profile.dateOfBirth} 
                              onChange={e => setProfile({ ...profile, dateOfBirth: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Gender</label>
                            <select
                                className="form-control select2"
                                value={profile.gender}
                                onChange={e => setProfile({ ...profile, gender: e.target.value })}
                                style={{ width: "100%" }} 
                              >
                              <option value="0">Female</option>
                              <option value="1">Male</option>
                              <option value="2">Cross Gender</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Passport Photo</label>
                            <input 
                              type="file" className="form-control input-sm" placeholder="Item Main Photo"
                              onChange={e => setPhoto(e.target.files[0])}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form-group">
                            <label>Country</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Country" 
                              defaultValue={profile.country} 
                              onChange={e => setProfile({ ...profile, country: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Region</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Region" 
                              defaultValue={profile.region} 
                              onChange={e => setProfile({ ...profile, region: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Permanent Residence</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Permanent Residence" 
                              defaultValue={profile.permanentResidence} 
                              onChange={e => setProfile({ ...profile, permanentResidence: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Current Residence</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Current Residence" 
                              defaultValue={profile.currentResidence} 
                              onChange={e => setProfile({ ...profile, currentResidence: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Postal Address</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Postal Address" 
                              defaultValue={profile.postalAddress} 
                              onChange={e => setProfile({ ...profile, postalAddress: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Primary Tel</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Primary Tel" 
                              defaultValue={profile.primaryPhoneNumber} 
                              onChange={e => setProfile({ ...profile, primaryPhoneNumber: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          <div className="form-group">
                            <label>Secondary Tel</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Secondary Tel" 
                              defaultValue={profile.secondaryPhoneNumber} 
                              onChange={e => setProfile({ ...profile, secondaryPhoneNumber: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Linkedin</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Linkedin" 
                              defaultValue={profile.linkedin} 
                              onChange={e => setProfile({ ...profile, linkedin: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Twitter</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Twitter" 
                              defaultValue={profile.twitter} 
                              onChange={e => setProfile({ ...profile, twitter: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Facebook</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Facebook" 
                              defaultValue={profile.facebook} 
                              onChange={e => setProfile({ ...profile, facebook: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Instagram</label>
                            <input
                              type="text"
                              className="form-control input-sm"
                              placeholder="Instagram" 
                              defaultValue={profile.instagram} 
                              onChange={e => setProfile({ ...profile, instagram: e.target.value })}
                            />
                          </div>
                          <div class="checkbox">
                            <label>
                              <input
                                type="checkbox"
                                class="minimal"
                                checked={profile.publishProfile} 
                                onChange={e => setProfile({ ...profile, publishProfile: !profile.publishProfile })}
                              /> Publish profile on website
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <label>User Web-profile</label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={otherProfileData.otherProfile.profile.webProfile ? otherProfileData.otherProfile.profile.webProfile : ""}
                            onChange={(e, editor) => setProfile({ ...profile, webProfile: editor.getData() })}
                            onReady={editor => {
                              editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()));
                            }}
                          />
                          <label>User Biography</label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={otherProfileData.otherProfile.profile.biography ? otherProfileData.otherProfile.profile.biography : ""}
                            onChange={(e, editor) => setProfile({ ...profile, biography: editor.getData() })}
                            onReady={(editor) => {
                              editor.editing.view.change(writer => writer.setStyle("height", "205px", editor.editing.view.document.getRoot()));
                            }}
                          />
                          <button type="submit" className="btn btn-success btn-md mt-5">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>

                    <div class="tab-pane" id="manage-roles">
                      
                    </div>

                    <div class="tab-pane" id="enroll-staff">
                      <form className="row" onSubmit={handleStaffEnrollment}>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          { fetchDesignationsData.fetchDesignations ?
                            <div className="form-group">
                              <label>Designation</label>
                              <select
                                className="form-control select2 input-sm"
                                onChange={e => setEnrollmentInfo({ ...enrollmentInfo, designationId: e.target.value })}
                                style={{ width: "100%" }}>
                                {fetchDesignationsData.fetchDesignations.map(designation => 
                                  <option value={designation.id} key={designation.uuid}>{designation.name}</option>)}
                              </select>
                            </div>
                          : null }
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          { fetchModulesData.modules ?
                            <div className="form-group">
                              <label>Module</label>
                              <select
                                className="form-control select2 input-sm"
                                onChange={e => setEnrollmentInfo({ ...enrollmentInfo, moduleId: e.target.value })}
                                style={{ width: "100%" }}>
                                {fetchModulesData.modules.map(mdl => <option value={mdl.id} key={mdl.uuid}>{mdl.name}</option>)}
                              </select>
                            </div>
                          : null }
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <button type="submit" className="btn btn-success btn-md">
                            Save Enrollment
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          </div>
        </div>
      </>
    : <h3 className="text-danger">404 Not Found!</h3>}
    </section>
  </>
  );
}

const mapStateToProps = state => {
  return {
    otherProfileData: state.otherProfileData,
    updateLoginsData: state.updateLoginsData,
    updateProfileData: state.updateProfileData,
    deleteUserData: state.deleteUserData,
    rolesData: state.rolesData,
    enrollStaffData: state.enrollStaffData,
    fetchDesignationsData: state.fetchDesignationsData,
    fetchModulesData: state.fetchModulesData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOtherProfile: parameter => dispatch(fetchOtherProfile(parameter)),
    updateLogins: logins => dispatch(updateLogins(logins)),
    updateProfile: profile => dispatch(updateProfile(profile)),
    deleteUser: user => dispatch(deleteUser(user)),
    fetchRoles: () => dispatch(fetchRoles()),
    enrollStaff: enrollmentData => dispatch(enrollStaff(enrollmentData)),
    fetchDesignations: () => dispatch(fetchDesignations()),
    fetchModules: () => dispatch(fetchModules()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
