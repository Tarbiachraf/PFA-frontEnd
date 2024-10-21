import React, { useTransition } from 'react'
import { useNavigate } from 'react-router-dom';
import FournisseurService from '../backEndService/FournisseurService';

const LignFournisseur = (props) => {

const objFournisseur=props.fournisseur;
const navigateToEdit =useNavigate();
const navigiteToDetails =useNavigate();
const navigate=useNavigate();
const handleEdit = (objFour) =>{
   navigateToEdit("/ModefierFournisseur",{state:objFour})
}

const handleDelete =(id) =>{
    props.onDelete(id);
}

const contacter =(email)=>{
    navigate("/ContacterFournisseur",{state:{email}});
}

const handlePlus = (objFour) =>{
   navigiteToDetails("/MoreDetails",{state:objFour})
}
  return (
<tr>
    <td style={{ width: "30px", textAlign: "center" ,fontWeight:'bold'}}>#{objFournisseur.idFournisseur}</td>
    <td style={{ width: "100px", textAlign: "center" }}>{objFournisseur.codeComptable}</td>
    <td style={{ width: "100px", textAlign: "center",fontWeight:'bold' }}>{objFournisseur.raisonSocial}</td>
    <td style={{ width: "100px", textAlign: "center" }}>{objFournisseur.resposable}</td>
    <td style={{ width: "100px", textAlign: "center" }}>
        <button className="btn" style={{backgroundColor:'#59E817'}} onClick={() =>{handlePlus(objFournisseur)}}>
        <i className="fas fa-info"></i> plus
        </button>
    </td>
    <td style={{ width: "100px", textAlign: "center" }}>
        <div className="dropdown " >
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" >
                Actions
            </button>
            <div className="dropdown-menu" style ={{backgroundColor:'#F7ED12  ',fontWeight:"bolder"}} aria-labelledby="dropdownMenuButton">
                <button className="dropdown-item" onClick={() =>handleEdit(objFournisseur)} >
                    <i className="fas fa-edit"></i> Modifier
                </button>
                <button className="dropdown-item"  onClick={() =>{handleDelete(objFournisseur.idFournisseur)}}>
                    <i className="fas fa-trash"></i> Supprimer
                </button>
                <button className="dropdown-item" onClick={()=>{contacter(objFournisseur.emailResponsable)}} >
                    <i className="fas fa-envelope"></i> Contacter
                </button>
            </div>
        </div>
    </td>
</tr>

  )
}

export default LignFournisseur