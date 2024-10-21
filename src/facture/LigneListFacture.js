import React from "react";
import FactureService from "../backEndService/FactureService";
import { useNavigate } from "react-router-dom";
import ActionButtonFacture from "./ActionButtonFacture";
import CreateFacture from "./CreateFacture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PDFFactureViewer from "./PDFFactureViewer";
import { useState } from "react";

const LigneListFacture = (props) => {

    const navigate = useNavigate();
    const [showPDF, setShowPDF] = useState(false);

    const statusIcon = {
      NON_PAYEE: <FontAwesomeIcon icon="fa-thin fa-circle-xmark" />,
      PAYEE: <FontAwesomeIcon icon="fa-thin fa-circle-check" />,
      EN_RETARD: <FontAwesomeIcon icon="fa-thin fa-circle-check" className="text-danger" />
  
    }
    const status = props.statusFacture;


    const STATUS_OPTIONS = {
      NON_PAYEE: "Non Payée",
      SEMI_PAYEE: "Semi Payée",
      PAYEE: "Payée",
      EN_RETARD: "En Retard"
  };
    const handleStatusChange = (newStatus) => {

      props.onUpdateStatus(props.idFacture, newStatus);
    };

    const hadleClickEdit = (idFacture, idClient, modPayement, dateFacture, datePrevuePayement, dateReelPayement, statusFacture) =>{
        navigate("/ModefieFacture", {
          state: {
            idFacture: idFacture,
            idClient: idClient,
            dateFacture: dateFacture,
            modPayement: modPayement,
            datePrevuePayement:datePrevuePayement,
            dateReelPayement: dateReelPayement,
            statusFacture: statusFacture
          }
        });
      }

    const handleDelete = (id) => {
        props.onDelete(id);
    };
    const handleGenerate = (id) => {
      setShowPDF(true); // Lorsque vous cliquez sur le bouton pour générer la facture
    };
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
    const paymentIcons = {
      CHEQUE: { icon: "fa-solid fa-money-check", color: "#f4d03f", bgColor: "#f7dc6f" },
      ESPECE: { icon: "fa-solid fa-cash-register", color: "#27ae60", bgColor: "#2ecc71" },
      CARTE_BANCAIRE: { icon: "fa-solid fa-credit-card", color: "#2980b9", bgColor: "#3498db" },
      VIREMENT_BANCAIRE: { icon: "fa-solid fa-university", color: "#8e44ad", bgColor: "#9b59b6" }
    };
    
    // ... inside the LigneListFacture component
    const paymentMode = props.modPayement;
    const paymentInfo = paymentIcons[paymentMode];
    return (
        <>
        <tr>
            <td style={{textAlign: "center" }}>{props.idFacture}</td>
            <td style={{textAlign: "center" }}>{props.nomClient}</td>
            <td style={{textAlign: "center" }}>{formatDate(props.dateFacture)}</td>
            <td style={{textAlign: "center" }}>{formatDate(props.datePrevuePayement)}</td>
            <td style={{textAlign: "center" }}>{formatDate(props.dateReelPayement)}</td>
            <td style={{textAlign: "center", color: paymentInfo.color }}>
              <FontAwesomeIcon icon={paymentInfo.icon} /> {paymentMode}
            </td>
            <td style={{textAlign: "center" }}>
              <select 
                        value={props.statusFacture}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="form-control"
                        style={{ backgroundColor: '#78e7a2', color: '#333', borderColor: '#f0f0f0', textAlign: 'center' }}>
                        {Object.entries(STATUS_OPTIONS).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
              </select>
            </td>
            <td style={{ textAlign: "center" }}>
              <ActionButtonFacture
                onEdit={() => hadleClickEdit(props.idFacture, props.idClient, props.modPayement, props.dateFacture, props.datePrevuePayement,props.dateReelPayement, props.statusFacture)}
                onDelete={() => handleDelete(props.idFacture)}
                onGenerate={() => handleGenerate(props.idFacture)}
        
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
        <PDFFactureViewer factureId={props.idFacture} setShowPDF={setShowPDF} />
        <button onClick={() => setShowPDF(false)} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10000, // Encore plus haut pour être sûr qu'il est au-dessus du PDF
          }}></button>
          </div>
      )}
            
        </>     
      )
}
export default LigneListFacture; 