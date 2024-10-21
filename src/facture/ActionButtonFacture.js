import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionButtonFacture = ({ onEdit, onDelete, onGenerate }) => {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Actions
      </button>
      <div className="dropdown-menu" style={{backgroundColor: '#F7ED12', fontWeight: "bolder"}} aria-labelledby="actionMenuButton">
        <button className="dropdown-item" onClick={onEdit}>
          <i className="fas fa-edit"></i> Modifier
        </button>
        <button className="dropdown-item" onClick={onDelete}>
          <i className="fas fa-trash-alt"></i> Supprimer
        </button>
        <button className="dropdown-item" onClick={onGenerate}>
          <i className="fas fa-eye"></i> Voir la facture
        </button>
      </div>
    </div>
  );
};


export default ActionButtonFacture;