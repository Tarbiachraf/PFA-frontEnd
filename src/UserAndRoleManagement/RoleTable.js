import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleService from '../backEndService/RoleService';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RoleTable = () => {

  // Define your colors at the top of the file or in a separate style file
const colors = {
  edit: '#FFC107',
  delete: '#DC3545',
  addButton: '#28A745',
  dropdown: '#343A40',
  tableHeader: '#6c757d',
  cardBackground: '#F8F9FA'
};

// Use these colors in your inline styles or className styles


  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);

  useEffect(()=>{
      RoleService.getAllRoles().then(response => response.data).then(data => setRoles(data)).catch(error => console.log(error));
  },[])

  const handleDelete = (roleId) => {
    RoleService.deleteRole(roleId).then(()=>{
      RoleService.getAllRoles()
      .then(response => response.data)
      .then(data => setRoles(data))
      .catch(error => console.log(error))
    })
  }

  const handleEdit = (roleId, roleName, privilege) => {
    navigate("/ModifierRole",{state:{roleId, roleName, privilege}});
  }
  

  const handleNewRole = () => {
    navigate("/AddRole");
  }

  return (
    <div className="addRole">
    <div className='container mt-2 Myfont'>
      <div className='card ' style={{ maxHeight: 'calc(100vh - 90px)', overflow: 'auto', backgroundColor: "#f8f9fa" }} >
        <div className="card-header bg-dark">
           <h3 className="text-light">Tous Les Rôles</h3>
        </div>
        <div className='card-body ' >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button onClick={handleNewRole} className="btn btn-dark">
            <FontAwesomeIcon icon="fa-solid fa-plus" /> Nouveau Role
            </button>
          </div>
          <div className="table-responsive">
            <table className="table custom-table">
              <thead className="thead-dark">
                <tr>
                  <th>Nom</th>
                  <th>Permissions</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  roles.map(role => (
                    <tr key={role.idRole}>
                      <td>{role.roleName}</td>
                      <td>
                        {role.previlegeSet.map((privilege, index) => (
                          <span key={index} className='badge bg-primary m-1' style={{padding: '5px'}}>{privilege}</span>
                        ))}
                      </td>
                      <td style={{ width: "100px", textAlign: "center" }}>
                          <div className="dropdown " >
                              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" >
                                  Actions
                              </button>
                              <div className="dropdown-menu" style ={{backgroundColor:'#F7ED12  ',fontWeight:"bolder"}} aria-labelledby="dropdownMenuButton">
                                  <button className="dropdown-item" onClick={()=>handleEdit(role.idRole, role.roleName, role.previlegeSet)} >
                                      <i className="fas fa-edit"></i> Modifier
                                  </button>
                                  <button className="dropdown-item"  onClick={() =>{handleDelete(role.idRole)}}>
                                      <i className="fas fa-trash"></i> Supprimer
                                  </button>
                                  
                              </div>
                          </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default RoleTable;
