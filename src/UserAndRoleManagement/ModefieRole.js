import React, { useState } from 'react';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import RoleService from '../backEndService/RoleService';

const ModefieRole = () => {

    const location = useLocation()
    const { state } = location;
    const {roleId, roleName, privilege }= state || {};
    const [formData, setFormData] = useState({
        roleName: roleName,
        previlegeSet: privilege
    });

    const [errors,setErrors]=useState({});
    const [showAlert, setShowAlert] = useState(true);

    const options = [
        { value: 'CREATE_USER', label: 'Créer utilisateur' },
        { value: 'READ_USER', label: 'Lire utilisateur' },
        { value: 'UPDATE_USER', label: 'Mettre à jour utilisateur' },
        { value: 'DELETE_USER', label: 'Supprimer utilisateur' },
        { value: 'CREATE_ROLE', label: 'Créer rôle' },
        { value: 'UPDATE_ROLE', label: 'Mettre à jour rôle' },
        { value: 'READ_ROLE', label: 'Lire rôle' },
        { value: 'DELETE_ROLE', label: 'Supprimer rôle' },
        { value: 'ADD_PRODUIT', label: 'Ajouter produit' },
        { value: 'UPDATE_PRODUIT', label: 'Mettre à jour produit' },
        { value: 'DELETE_PRODUIT', label: 'Supprimer produit' },
        { value: 'GET_PRODUIT', label: 'Obtenir produit' },
        { value: 'ADD_CATEGORY', label: 'Ajouter catégorie' },
        { value: 'UPDATE_CATEGORY', label: 'Mettre à jour catégorie' },
        { value: 'DELETE_CATEGORY', label: 'Supprimer catégorie' },
        { value: 'GET_CATEGORY', label: 'Obtenir catégorie' },
        { value: 'ADD_CLIENT', label: 'Ajouter client' },
        { value: 'UPDATE_CLIENT', label: 'Mettre à jour client' },
        { value: 'GET_CLIENT', label: 'Obtenir client' },
        { value: 'DELETE_CLIENT', label: 'Supprimer client' },
        { value: 'ADD_DEVIS', label: 'Ajouter devis' },
        { value: 'UPDATE_DEVIS', label: 'Mettre à jour devis' },
        { value: 'GET_DEVIS', label: 'Obtenir devis' },
        { value: 'GENERATE_DEVIS', label: 'Générer devis' },
        { value: 'SEND_DEVIS', label: 'Envoyer devis' },
        { value: 'DELETE_DEVIS', label: 'Supprimer devis'},
        { value: 'ADD_FACTURE', label: 'Ajouter facture' },
        { value: 'UPDATE_FACTURE', label: 'Mettre à jour facture' },
        { value: 'DELETE_FACTURE', label: 'Supprimer facture' },
        { value: 'GET_FACTURE', label: 'Obtenir facture' },
        { value: 'GENERATE_FACTURE', label: 'Générer facture' },
        { value: 'SEND_FACTURE', label: 'Envoyer facture' },
        { value: 'ADD_COMMANDVENTE', label: 'Ajouter commande de vente' },
        { value: 'UPDATE_COMMANDVENTE', label: 'Mettre à jour commande de vente' },
        { value: 'DELETE_COMMANDVENTE', label: 'Supprimer commande de vente' },
        { value: 'GET_COMMANDVENTE', label: 'Obtenir commande de vente' },
        { value: 'UPLOAD_IMAGE', label: 'Téléverser image' },
        { value: 'GET_IMAGE', label: 'Obtenir image' },
        { value: 'UPDATE_ENTREPRISE', label: 'Mettre à jour entreprise' },
        { value: 'ADD_LIVRAISON', label: 'Ajouter livraison' },
        { value: 'GET_LIVRAISON', label: 'Obtenir livraison' },
        { value: 'UPDATE_LIVRAISON', label: 'Mettre à jour livraison' }
    ];

    const customSelectStyles = {
        control: (styles) => ({
          ...styles,
          backgroundColor: 'white',
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          return {
            ...styles,
            backgroundColor: isSelected ? '#0d6efd' : isFocused ? 'rgba(13, 110, 253, 0.1)' : null,
            color: isSelected ? 'white' : 'black',
            cursor: isDisabled ? 'not-allowed' : 'default',
          };
        },
        multiValue: (styles) => ({
          ...styles,
          backgroundColor: '#0d6efd',
        }),
        multiValueLabel: (styles) => ({
          ...styles,
          color: 'white',
        }),
        multiValueRemove: (styles) => ({
          ...styles,
          color: 'white',
          ':hover': {
            backgroundColor: '#dc3545',
            color: 'white',
          },
        }),
      };
      

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (selectedOptions) => {
        setFormData({
            ...formData,
            previlegeSet: selectedOptions.map(option => option.value)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        RoleService.updateRole(roleId,formData).then(response => response.data).then(data => console.log(data)).catch(error => console.log(error));
    };
    const closeAlert = () => {
        setShowAlert(false);
      };
      const alertOfSucces = () => {
        return (
          <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >le rôle à été ajouté avec succés </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>)
      }
      //function to return alert of error
      //function to return error
      const alertOfError = () => {
        return (
          <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >error dans l'jout de rôle </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      }
 
     //function to return a correspondant alert
     const alert = (message) =>{
         switch(message){
             case "error":
                 return  alertOfError();
             case "success":
                 return  alertOfSucces();
             default :
                 return null;
             
         }
           
     }

    return (
        <div className="container ajouter-four">
  <div className="row">
    <div className="col-md-8 offset-md-2"> {/* Adjust the column size as needed */}
      <div className="card" style={{backgroundColor: "#f8f9fa"}}>
        <div className="card-header bg-dark text-white">
          <h3>Modifier Role</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-md-12">
                <label className="form-label" htmlFor="roleName">Nom : </label>
                <input type="text" name="roleName" value={formData.roleName} onChange={handleChange} id="roleName" className="form-control" placeholder='nom de role' />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <label htmlFor="permissions">Permissions :</label>
                {/* Assume you have Select component from a library like react-select */}
                <Select
                    options={options}
                    isMulti
                    value={options.filter(option => formData.previlegeSet.includes(option.value))}
                    onChange={handleSelectChange}
                    styles={customSelectStyles}
                  />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-primary mt-3">
                  <i className='fas fa-plus-circle' /> Modifier
                </button>
                &nbsp;
                <button type="reset" className="btn btn-danger mt-3">
                  <i className='fas fa-ban' /> Reset
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

export default ModefieRole;
