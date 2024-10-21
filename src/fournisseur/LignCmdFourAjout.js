import React from 'react';

const LignCmdFourAjout = (props) => {
  
  const handleDelete = (id) =>{
    // Affiche une boîte de dialogue de confirmation
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    // Si l'utilisateur confirme, appeler la méthode onDelete
    if (isConfirmed) {
      props.onDelete(id);
    }
  }

  return (
    <tr>
        <td>{props.refProduit}</td>
        <td>{props.nomProduit}</td>
        <td>{props.prix}</td>
        <td>{props.quantite}</td>
        <td>{props.totalHT}</td>
        <td>{props.tva}</td>
        <td>{props.totalTTC}</td>
        <td style={{ textAlign: "center" }}>
            <button className='btn btn-danger' onClick={() => handleDelete(props.idProduit)}>
                <i className='fa fa-trash'></i>
            </button>
        </td>
    </tr>
  )
}

export default LignCmdFourAjout;
