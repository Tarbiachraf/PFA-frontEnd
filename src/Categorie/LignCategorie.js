import React from 'react'
import { useNavigate } from 'react-router-dom'
import CategorieService from '../backEndService/CategorieService';

  const LignCategorie = (props) => {
  const navigate=useNavigate();

  /*start handle edit button of a categorie*/ 
   const handleClickEdit = (idCategorie) =>{
    navigate(`/ModefieCategorie/${idCategorie}`)                           
  }
  /*end handle edit button of a categorie*/ 

  /*start handle delete button of a categorie*/ 
  const  handleDelete = (idCategorie) =>{
      props.onOpen();
     /* CategorieService.deleteCategorie(idCategorie)
        .then(responce =>{
          console.log("categorie a éte supprime avec succés",responce.data);
          props.onDelete();
        })
        .catch(error =>{
          console.error("error dans supression de categorie")
        })*/
  }
  /*end handle delete button of a categorie*/ 

  return (
    <tr>
        <td style={{width:"70px",textAlign:"center" ,fontWeight:'bold'}}>{props.nomCategorie}</td>
        <td style={{textAlign:"center" ,width:"100px"}}>
            <button className='btn btn-primary' onClick={() => handleClickEdit(props.idCategorie)}><i className='fas fa-pencil-alt'/>&nbsp;&nbsp;Editer</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className='btn btn-danger' onClick={() => handleDelete(props.idCategorie)}><i className='fa fa-trash'/>&nbsp;&nbsp;Supprimer</button>
        </td>
    </tr>
  )
}

export default LignCategorie