import React from "react"

const ActionButtonDevis = ({ onEdit, onDelete, onSend, onGenerate, onCommand }) =>{
    return (
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="actionMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Actions
          </button>
          <div className="dropdown-menu" style={{backgroundColor:'#F7ED12', fontWeight:"bolder"}} aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" onClick={onEdit}>
              <i className="fas fa-edit"></i> Modifier
            </button>
            <button className="dropdown-item" onClick={onDelete}>
              <i className="fas fa-trash-alt"></i> Supprimer
            </button>
            <button className="dropdown-item" onClick={onSend}>
              <i className="fas fa-paper-plane"></i> Envoyer le devis au client
            </button>
            <button className="dropdown-item" onClick={onGenerate}>
              <i className="fas fa-eye"></i> Voir le devis
            </button>
            <button className="dropdown-item" onClick={onCommand}>
              <i className="fas fa-play"></i> Lancer la commande
            </button>
          </div>
        </div>
      );
}

export default ActionButtonDevis;