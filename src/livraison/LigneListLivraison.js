import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import ActionButtonLivraison from "./ActionButtonLivraison";
import LivraisonService from "../backEndService/LivraisonService";
import PDFLivraisonViewer from "./PDFLivraisonViewer";

const LigneListLivraison = (props) => {
  const STATUS_OPTIONS = {
    EXPEDIEE: 'Expédiée',
    EN_LIVRAISON: 'En livraison',
    LIVREE: 'Livrée',
    RETOURNEE: 'Retournée',
    EN_RETARD: 'En retard',
    ANNULEE: 'Annulée',
  };
  const [showPDF, setShowPDF] = useState(false);
    const navigate = useNavigate();
    const hadleClickEdit = (idLivraison, idClient, dateLivraison, datePrevue, dateReception, statusLivraison, adresseLivraison) =>{
        navigate("/ModefieLivraison", {
          state: {
            idLivraison: idLivraison,
            idClient: idClient,
            dateLivraison: dateLivraison,
            datePrevue: datePrevue,
            dateReception: dateReception,
            adresseLivraison: adresseLivraison,
            statusLivraison: statusLivraison
          }
        });
    }
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
    const handleDelete = (id) => {
        props.onDelete(id);
    };
    const handleStatusChange = (newStatusKey) => {
      // Appelle la fonction onUpdateStatus passée via props avec l'ID de la livraison et le nouveau statut.
     console.log('lkkkkkkkkkkkk',props.idLivraison)
      props.onUpdateStatus(props.idLivraison, newStatusKey);
    };
  
    const handleGenerate = (id) => {
        setShowPDF(true);
    }
    return (
        <>
        <tr>
            <td style={{textAlign: "center" }}>{props.idLivraison}</td>
            <td style={{textAlign: "center" }}>{props.nomClient}</td>
            <td style={{textAlign: "center" }}>{formatDate(props.dateLaivrison)}</td>
            <td style={{textAlign: "center" }}>{formatDate(props.datePrevue)}</td>
            <td style={{textAlign: "center" }}>{formatDate(props.dateReception)}</td>
            <td style={{textAlign: "center" }}>{props.adresseLivraison}</td>
            <td style={{ textAlign: "center" }}>
        <select 
          value={props.statusLivraison} // l'état actuel de la livraison
          style={{ backgroundColor: '#78e7a2', color: '#333', borderColor: '#f0f0f0', textAlign: 'center' }}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="form-control"
        >
          {Object.entries(STATUS_OPTIONS).map(([key, value]) => (
            <option key={key} value={key}>{value}</option> // Utilisez la clé pour la valeur
          ))}
        </select></td>
            <td style={{ textAlign: "center" }}>
              <ActionButtonLivraison
                onEdit={() => hadleClickEdit(props.idLivraison, props.idClient, props.dateLivraison, props.datePrevue, props.dateReception, props.statusLivraison, props.adresseLivraison)}
                onDelete={() => handleDelete(props.idLivraison)}
                onGenerate = {() => handleGenerate(props.idLivraison)}
               />
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
            <PDFLivraisonViewer livraisonId={props.idLivraison}  />
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
           
        </>    
    )
}

export default LigneListLivraison;