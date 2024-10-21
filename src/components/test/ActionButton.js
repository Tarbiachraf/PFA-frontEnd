import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButton = ({ onEdit, onDelete, onCreateFacture, onCreateLivraison}) => {
  return (
    <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Actions
  </button>
  <div className="dropdown-menu" aria-labelledby="actionMenuButton" style={{backgroundColor:'#F7ED12', fontWeight:"bolder"}} aria-labelledby="dropdownMenuButton">
    <button className="dropdown-item" onClick={onEdit}>
      <i className="fas fa-edit"></i> Modifier
    </button>
    <button className="dropdown-item" onClick={onDelete}>
      <i className="fas fa-trash-alt"></i> Supprimer
    </button>
    <button className="dropdown-item" onClick={onCreateFacture}>
      <i className="fas fa-file-invoice-dollar"></i> créer une facture
    </button>
    <button className="dropdown-item" onClick={onCreateLivraison}>
      <i className="fas fa-file-invoice-dollar"></i> créer une Livraison
    </button>
  </div>
</div>

  );
};

export default ActionButton;
