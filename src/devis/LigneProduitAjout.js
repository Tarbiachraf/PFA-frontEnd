import React from 'react'

const LigneProduitAjout = (props) => {
  const idC=props.idProduit;
  const handleDelete = (idC) =>{
     props.onDelete(idC);
  }
  return (
    <tr>
        <td>{props.refProduit}</td>
        <td>{props.nomProduit}</td>
        <td>{props.prix}</td>
        <td>{props.quantite}</td>
        <td>{props.tva}</td>
        <td>{props.remise}</td>
        <td><button className='btn btn-danger' onClick={() =>{handleDelete(props.idProduit)}}><i className='fa fa-trash'></i></button></td>
    </tr>
  )
}

export default LigneProduitAjout