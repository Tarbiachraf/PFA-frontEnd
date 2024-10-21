import React from 'react'
import '../AddRole.css'
import AppUserService from '../../backEndService/AppUserService';
import RoleService from '../../backEndService/RoleService';
import { useState } from 'react';
import { useEffect } from 'react';
const AddUser = ()=>{
    const [roles, setRoles] = useState([])
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        roleId: '', // assuming you want to store role ID
    });
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
        setAlertMessage("");

    };

    useEffect(() => {
        RoleService.getAllRoles() 
                    .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error("Error fetching roles:", error);
            });
    }, []);

    

        // Handle form submit
        const handleSubmit = (e) => {
            e.preventDefault();
            AppUserService.addUser(user)
                .then(response => {
                    console.log('User created successfully:', response.data);
                    // Optionally clear the form or handle further actions here
                    // e.g., reset the form state if needed:
                     setUser({
                         firstname: '',
                         lastname: '',
                         email: '',
                         phoneNumber: '',
                         address: '',
                         password: '',
                     });
                     setAlertMessage("success");
                     setTimeout(() => setShowAlert(false), 5000); // Hide the alert after 5 seconds

                })
                .catch(error => {
                    console.error('Failed to create user:', error);
                    setAlertMessage("error");
                    setTimeout(() => setShowAlert(false), 5000); // Hide the alert after 5 seconds

                    // Optionally handle additional error logic here
                });
        };
        const closeAlert = () => {
            setShowAlert(false);
          };
          const alertOfSucces = () => {
            return (
              <div className="alert alert-success  alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                <span >l'utilisateur est ajouté avec succés </span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              )
          }
          //function to return alert of error
          //function to return error
          const alertOfError = () => {
            return (
              <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                <span >error dans l'ajout d'utilisateur </span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )
          }
        
          //function to return a correspondant alert
          const alert = (message) => {
            switch (message) {
              case "error":
                return alertOfError();
              case "success":
                return alertOfSucces();
              default:
                return null;
        
            }
        
          }
    const handleReset = () => {
        setUser({
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            address: '',
            password: '',
        });
    };
    return (
        <div className="container ajouter-four">
        <div className="row">
            <div className="col-12">
            <div className="card">
                <div className="card-header bg-dark text-white">
                <h3>Créer Utilisateur</h3>
                </div>

                <div className="card-body">
                {alert(alertMessage)}

                <form onSubmit={handleSubmit}>
                    {/* Row for Prénom and Nom */}
                    <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="firstName">Prénom</label>
                        <input type="text" className="form-control" onChange={handleChange} value={user.firstname} name="firstname" id="firstName" placeholder="Prénom" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="lastName">Nom</label>
                        <input type="text" className="form-control" onChange={handleChange} value={user.lastname} name="lastname" id="lastName" placeholder="Nom" />
                    </div>
                    </div>

                    {/* Row for Role and Email */}
                    <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="role">Role</label>
                        <select className="form-control" name="roleId" id="role" value={user.roleId} onChange={handleChange}>
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                            <option key={role.idRole} value={role.idRole}>{role.roleName}</option>
                        ))}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" onChange={handleChange} value={user.email} name="email" id="email" placeholder="Email" />
                    </div>
                    </div>

                    {/* Row for Téléphone and Adresse */}
                    <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="phoneNumber">Téléphone</label>
                        <input type="tel" className="form-control" onChange={handleChange} value={user.phoneNumber} name="phoneNumber" id="phoneNumber" placeholder="Téléphone" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="address">Adresse</label>
                        <input type="text" className="form-control" onChange={handleChange} value={user.address} name="address" id="address" placeholder="Adresse" />
                    </div>
                    </div>

                    {/* Row for Mot de Passe */}
                    <div className="row">
                    <div className="form-group col-md-6">
                        <label htmlFor="password">Mot de Passe</label>
                        <input type="password" className="form-control" onChange={handleChange} value={user.password} name="password" id="password" placeholder="Mot de Passe" />
                    </div>
                    </div>

                    {/* Submit Button */}
                    <div className="row">
                    <div className="col-md-12 text-center">
                        <button type="submit" className="btn btn-primary mt-3">
                        <i className='fas fa-plus-circle' /> Soumettre
                        </button>
                    </div>
                    </div>

                </form>
                </div>
            </div>
            </div>
        </div>
        </div>

    );
    
}

export default AddUser;