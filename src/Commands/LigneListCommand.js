import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ServiceCommand from '../backEndService/ServiceCommand';
import ActionButton from '../components/test/ActionButton';
import { useState } from 'react';
import CreateFacture from '../facture/CreateFacture';


const LigneListCommand = (props) => {
    const navigate=useNavigate();

    const [selectedStatus, setSelectedStatus] = useState(props.status);

    useEffect(() => {
      setSelectedStatus(props.statusCommand);
  }, [props.statusCommand]);
    const statusLabels = {
        EN_ATTENTE: "En attente",
        EN_PREPARATION: "En préparation",
        PREPAREE: "Préparée",
        ANNULEE: "Annulée"
    };
    const [formData, setFormData] = useState({
      idCommand: '',
      modPayement: '',
      dateFacture: '',
      dateReelPayement: '',
      datePrevuePayement: null,
      statusFacture: null,
    });



    const handleStatusChange = (event) => {
      const newStatus = event.target.value;
      const statusCommand = {
          statusCommande: newStatus
      };
      ServiceCommand.updateCommandeStatus(props.idCommande, statusCommand).then(response => {
          setSelectedStatus(newStatus);
          // Optionally, trigger a re-fetch or update the parent component state here if needed
      }).catch(error => console.log(error));
      
  };


    /*const handleCreateFacture = (idCommand) => {
      setFormData({ ...formData, idCommand }); // Ajouter l'id de la commande dans l'état du formulaire
      setShowInvoiceForm(true);
  };*/


  
    const hadleClickEdit = (idCommande,idClient,dateCommand,status) =>{
      navigate("/ModefieCommand", {
        state: {
          idCommande: idCommande,
          idClient: idClient,
          dateCommand: dateCommand,
          status: status
        }
      });
    }

    const handleDelete = (id) => {
      //console.log("l'id de devis : ", id);
      props.onDelete(id);
    };


  const handleCreateLivraison = (idCommand) => {
    navigate("/createLivraison", {
        state: {
            idCommand: idCommand,  // Assurez-vous que cette valeur est correctement définie
        }
    });
};
const handleCreateFacture = (idCommand) => {
  navigate("/createFacture", {
    state: {
      idCommand: idCommand,
    }
  });
};
const handleDetail = (idCommande) => {
  console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh ',idCommande)
  navigate("/CommandeVenteDetails", { state: { idCommande: idCommande } });
};



    return (
      <>
      <tr>
          <td style={{textAlign: "center" }}>{props.idCommande}</td>
          <td style={{textAlign: "center" }}>{props.nomClient}</td>
          <td style={{textAlign: "center" }}>{props.dateCommand}</td>
          <td style={{ textAlign: "center" }}>
                <select
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="form-control"
                    style={{ backgroundColor: '#78e7a2', color: '#333', borderColor: '#f0f0f0', textAlign: 'center' }}>
                    {Object.keys(statusLabels).map((key) => (
                        <option key={key} value={key}>{statusLabels[key]}</option>
                    ))}
                </select>
            </td>          
            <td>
              <button className="btn" style={{backgroundColor:'#59E817'}} onClick={()=>{handleDetail(props.idCommande)}}>
                  <i className="fas fa-info"></i> plus
              </button>
            </td>
            <td style={{ textAlign: "center" }}>
            <ActionButton
              onEdit={() => hadleClickEdit(props.idCommande, props.idClient, props.dateCommand, props.status)}
              onDelete={() => handleDelete(props.idCommande)}
              onCreateFacture={()=> handleCreateFacture(props.idCommande)}
              onCreateLivraison={()=>handleCreateLivraison(props.idCommande)}
             />
          </td>
  
          </tr>
          
      </>     
    )
}

export default LigneListCommand;