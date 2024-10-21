import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../backEndService/ProductService';

//function to handle edit click
const LignProduit = (props) => {
  const navigate = useNavigate();
  const hadleClickEdit = (idP, refP, nomP, prixP,prixAchat, categorieP, detailsP, tvaN, idFour) => {
    navigate(`/ModefieProduit`, { state: { idP, refP, nomP, prixP,prixAchat, categorieP, detailsP, tvaN, idFour } });
  }

  const handleDelete =(id) =>{
    props.onDelete(id);
  }
  return (
    <tr>
      <td style={{ width: "90px", textAlign: "center", fontWeight: "bold" }}>{props.refProduit}</td>
      <td style={{ width: "90px", textAlign: "center" }}>{props.nom}</td>
      <td style={{ width: "90px", textAlign: "center" }}>
        <span class="badge badge-info" style={{ fontSize: "0.8em", padding: "0.5em 0.75em" }}>{props.prix} MAD</span>
      </td>
      <td style={{ width: "100px", textAlign: "center" }}>{props.tvaN} %</td>
      <td style={{ width: "90px", textAlign: "center", fontWeight: "bolder" }}>{props.categorie}</td>
      <td style={{ width: "300px", textAlign: "center" }}>{props.details}</td>
      <td style={{ width: "200px", textAlign: "center" }}>
        <div className="dropdown">
          <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Actions
          </button>
          <div className="dropdown-menu" style ={{backgroundColor:'#F7ED12  ',fontWeight:"bolder"}}  aria-labelledby="dropdownMenuButton">
            <button className="dropdown-item" onClick={() => { hadleClickEdit(props.id, props.refProduit, props.nom, props.prix,props.prixAchat, props.category, props.details, props.tvaN, props.idFournisseur) }}>
              <i className='fas fa-pencil-alt'></i> Éditer
            </button>
            <button className="dropdown-item" onClick={() => { handleDelete(props.id) }}>
              <i className='fa fa-trash'></i> Supprimer
            </button>
          </div>
        </div>
      </td>

    </tr>
  );
};

export default LignProduit;
