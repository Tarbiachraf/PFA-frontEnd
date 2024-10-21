import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ServiceCommande from '../backEndService/ServiceDevis';
import ActionButton from '../components/test/ActionButton';
import DevisViewer from './DevisViewer';
import PDFViewer from '../components/test/PDFViewer';
import { useState } from 'react';
import ActionButtonDevis from './ActionButtonDevis';
import ServiceDevis from '../backEndService/ServiceDevis';
import AlertComponent from '../components/AlertComponent';
import AddCommandFromDevis from '../Commands/AddCommandFromDevis';

const LigneListDevis = (props) => {

  const STATUS_OPTIONS = {
    DEVIS_EN_ATTENTE: "en attente",
    DEVIS_CONFIRMÉ: "confirmé",
    DEVIS_ANNULÉ: "annulé",
  };

  const navigate=useNavigate();


  const [showPDF, setShowPDF] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' }); // Gestion des alertes
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
const formatCurrency = (value) => {
  return Number(value).toFixed(2);
};


  const hadleClickEdit = (idDevis,idClient,dateDevis,dateExpiration,status) =>{
    navigate("/ModefieDevis", {
      state: {
        idDevis: idDevis,
        idClient: idClient,
        dateDevis: dateDevis,
        dateExpiration: dateExpiration,
        status: status
      }
    });
  }
/*  const handleDelete = (id) =>{
    console.log("l'id de devis : ",id);
    ServiceCommande.deleteCommande(id)
      .then(responce =>{
        console.log("this commande has bees deleted successfuly",responce.data);
      })
      .catch(error =>{
        console.error("error to delte this commande");
      })
    props.onDelete();
  }*/
  const handleDelete = (id) => {
     props.onDelete(id);
  };
  const handleSend = (id) => {
    ServiceCommande.sendDevis(id).then(response => {
      if (response.status === 200) {
        setAlert({ message: 'This is a success Alert.', type: 'success' });
      } else {
        setAlert({ message: 'This is an error Alert.', type: 'error' });
      }
    }).catch(error => {
      setAlert({ message: `Une erreur est survenue lors de l'envoi du devis: ${error.message}`, type: 'error' });
    });
  };

  useEffect(() => {
    if (alert.message) {
      setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 5000); // Efface l'alerte après 5 secondes
    }
  }, [alert.message]);
  
  const handleGenerate = (id) => {
    setShowPDF(true);
  }
  const handleCommand = (id) => {
    ServiceCommande.lanceCommand(id).then(response => console.log(response.status))
  }

  const handleStatusChange = (newStatus) => {
    // Trouver la clé de l'énumération basée sur la valeur sélectionnée
    const statusDevise = Object.keys(STATUS_OPTIONS).find(key => STATUS_OPTIONS[key] === newStatus);
    const status = {
      statusDevise: statusDevise
    }
    if (!status) {
      alert("La valeur sélectionnée n'est pas valide.");
      return; // Stopper la fonction si la valeur n'est pas valide
    }

    // Appeler changeStatus de ServiceDevis avec l'ID du devis et la nouvelle clé de statut
    ServiceDevis.changeStatus(props.idDevis, status)
      .then(response => {
        console.log('Status updated successfully:', response);
        props.onStatusChange(props.idDevis, statusDevise);
        // Ici, vous pouvez mettre à jour l'état du composant pour refléter le nouveau statut
        // ou déclencher un rechargement/rafraîchissement des données si nécessaire.
      })
      .catch(error => {
        console.error('Failed to update status:', error);
      });
  };

  const openAddCommand = () => {
    setShowAddCommand(true); // Déclenche l'ouverture de AjouterCommande
  };

  const closeAddCommand = () => {
    setShowAddCommand(false); // Ferme AjouterCommande
  };

  const [showAddCommand, setShowAddCommand] = useState(false); // État pour afficher ou masquer AjouterCommande


  return (
    <>
    <tr>
        <td style={{textAlign: "center" }}>{props.idDevis}</td>
        <td style={{textAlign: "center" }}>{props.nomClient}</td>
        <td style={{textAlign: "center" }}>{formatDate(props.dateDevis)}</td>
        
        <td style={{textAlign: "center" }}>{formatDate(props.dateExpiration)}</td>
        <td style={{ textAlign: "right" }}>
          <span style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px', display: 'inline-block' }}>
            {formatCurrency(props.montantTotalHT)} Dh
          </span>
        </td>
        <td style={{ textAlign: "right" }}>
          <span style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px', display: 'inline-block' }}>
            {formatCurrency(props.montantTotalTTC)} Dh
          </span>
        </td>
        <td style={{ textAlign: "right" }}>
          <span style={{ backgroundColor: '#007bff', color: 'white', padding: '5px 10px', borderRadius: '5px', display: 'inline-block' }}>
            {formatCurrency(props.montantTotalTTC - props.montantTotalHT)} Dh
          </span>
        </td>
        <td style={{ textAlign: "center" }}>
        <select 
          value={STATUS_OPTIONS[props.status]}
          style={{ backgroundColor: '#78e7a2', color: '#333', borderColor: '#f0f0f0', textAlign: 'center' }}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="form-control">
          {Object.values(STATUS_OPTIONS).map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </td>
        <td>
        <td style={{ border:'none', textAlign: "center" }}>
          <ActionButtonDevis
            onEdit={() => hadleClickEdit(props.idDevis, props.idClient, props.dateDevis, props.dateExpiration, props.status)}
            onDelete={() => handleDelete(props.idDevis)}
            onSend={()=> props.handleSendGlobal(props.idDevis)}
            onGenerate={()=> handleGenerate(props.idDevis)}
            onCommand={()=> openAddCommand()}
          />
        </td>

        </td>
        </tr>
        {showPDF && (
        <div style={{
          position: 'fixed', // Position fixe par rapport à la fenêtre d'affichage
          top: 0, // Commence au haut de la page
          left: 0, // Commence à gauche de la page
          width: '100vw', // Utilise toute la largeur de la fenêtre d'affichage
          height: '100vh', // Utilise toute la hauteur de la fenêtre d'affichage
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent pour le fond
          zIndex: 9999, // S'assurer qu'il est par-dessus tout le contenu
        }}>
            <DevisViewer devisId={props.idDevis} setShowPDF={setShowPDF} />
            <button onClick={() => setShowPDF(false)} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10000, // Encore plus haut pour être sûr qu'il est au-dessus du PDF
          }}>
            Fermer
          </button>
        </div>
      )}
      {showAddCommand && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}>
          <AddCommandFromDevis idDevis={props.idDevis} closeForm={closeAddCommand} 
          style={{
            
          }} />
          <button onClick={closeAddCommand} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10000,
          }}>
            Fermer
          </button>
        </div>
      )}
    </>     
  )
}

export default LigneListDevis;