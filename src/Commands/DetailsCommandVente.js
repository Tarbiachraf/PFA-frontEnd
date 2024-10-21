import React from "react"; 
import ServiceCommand from "../backEndService/ServiceCommand";
import PDFFactureViewer from "../facture/PDFFactureViewer";
import ActionButtonFacture from "../facture/ActionButtonFacture";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FactureService from "../backEndService/FactureService";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PDFLivraisonViewer from "../livraison/PDFLivraisonViewer";
import ActionButtonLivraison from "../livraison/ActionButtonLivraison";
import MyModal from "../components/MyModal";
import AfficherCommande from "./AfficherCommande";
import LivraisonService from "../backEndService/LivraisonService";
const DetailsCommandVente = ()=>{
  const location = useLocation();
  const { state } = location.state; 
  const { idCommande } = location.state || {};
  
  const [lignesCommande, setLignesCommande] = useState([]);

  const [commande, setCommande] = useState(null);
  const [showPDFFacture, setShowPDFFacture] = useState(false);
  const [showPDFLivraison, setShowPDFLivraison] = useState(false);

  const [showModalFacture, setShowModalFacture] = useState(false);
  const [showModalLivraison, setShowModalLivraison] = useState(false)

  const [currentIdFacture, setCurrentIdFacture] = useState(null);
  const [currentIdLivraison, setCurrentIdLivraison] = useState(null);

  const navigate=useNavigate();

  const fetchLignesCommande = () => {
    ServiceCommand.getLignesCommande(idCommande)
        .then(response => {
            setLignesCommande(response.data);
        })
        .catch(error => {
            console.error('Error fetching lines of order:', error);
        });
};

  useEffect(() => {
    if (idCommande) {
      console.log('Fetching command details for ID:', idCommande);
      
      ServiceCommand.getCommande(idCommande)
        .then(response => {
          console.log('Command details:', response.data);
          setCommande(response.data);
        })
        .catch(error => {
          console.error('Error fetching command details:', error);
        });
    } else {
      console.log('No idCommande provided');
    }
    fetchLignesCommande();
  }, [idCommande]);

  if (!commande) {
    return <div className='loading'>Chargement des détails de la commande...</div>;
  }

  if (!commande.vente) {
    return <div className='loading'>Aucune vente associée à cette commande.</div>;
  }
  

    const handleGenerateFacture = (idC) => {
      setShowPDFFacture(true)
    }

    const handleGenerateLivraison = (idC) => {
      setShowPDFFacture(true)
    }


    /*const handleDelete = (factureId) => {
      if (window.confirm("Êtes-vous sûr de vouloir supprimer cette facture ?")) {
        FactureService.deleteFacture(factureId)
          .then(response => {

            setCommande(prevState => ({
              ...prevState,
              factureDeVente: prevState.factureDeVente.filter(facture => facture.idFacture !== factureId)
            }));
    
    
            alert("Facture supprimée avec succès");
    

          })
          .catch(error => {
            // Handle the error properly
            console.error("Erreur lors de la suppression de la facture:", error);
            alert("Une erreur est survenue lors de la suppression de la facture.");
          });
      }
    };*/
    const handleDeleteFacture = async (idFacture) => {
      setShowModalFacture(true);
      setCurrentIdFacture(idFacture);
    };

    const handleDeleteLivraison = async (idLivraisonVente) => {
      setShowModalLivraison(true);
      setCurrentIdLivraison(idLivraisonVente);
    };
  
    const confirmDeleteFacture = async () => {
      try {
        await FactureService.deleteFacture(currentIdFacture);
        setCommande(prev => ({
          ...prev,
          factureDeVente: prev.factureDeVente.filter(facture => facture.idFacture !== currentIdFacture)
        }));
        setShowModalFacture(false);
        alert("Facture deleted successfully");
      } catch (error) {
        console.error("Error deleting the facture:", error);
        alert("Failed to delete the facture");
        setShowModalFacture(false);
      }
    };
    const confirmDeleteLivraison = async () => {
      try {
        await LivraisonService.deleteLivraison(currentIdLivraison);
        setCommande(prev => ({
          ...prev,
          livraison: prev.livraison.filter(livraison => livraison.idLivraisonVente !== currentIdLivraison)
        }));
        setShowModalLivraison(false);
        alert("Livraison deleted successfully");
      } catch (error) {
        console.error("Error deleting the facture:", error);
        alert("Failed to delete the facture");
        setShowModalLivraison(false);
      }
    };
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    const handleEditFacture = (idFacture, idClient, modPayement, dateFacture, datePrevuePayement, dateReelPayement, statusFacture) =>{
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
    const handleEditLivraison = (idLivraison, idClient, dateLivraison, datePrevue, dateReception, statusLivraison, adresseLivraison) =>{
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
    const ShowOrderButton = ({ onClick }) => {
      return (
        <button 
          className="btn btn-info m-3" 
          onClick={onClick}
          style={{ display: 'block', width: 'auto', margin: '10px auto' }} // Adjust styling as needed
        >
          Afficher le Bon de Commande
        </button>
      );
    };
  
  const getStatusLabel = (status) => {
    switch(status) {
        case "NON_PAYEE":
        case "EN_ATTENTE":
        case "EN_RETARD":
        case "ANNULEE":
            return <span style={{ color: 'red' }}>{status.replaceAll('_', ' ')}</span>;
        case "SEMI_PAYEE":
        case "EN_PREPARATION":
        case "EN_LIVRAISON":
            return <span style={{ color: 'orange' }}>{status.replaceAll('_', ' ')}</span>;
        case "PAYEE":
        case "PREPAREE":
        case "LIVREE":
            return <span style={{ color: 'green' }}>{status.replaceAll('_', ' ')}</span>;
        case "EXPEDIEE":
            return <span style={{ color: 'blue' }}>{status.replaceAll('_', ' ')}</span>;
        case "RETOURNEE":
            return <span style={{ color: 'purple' }}>{status.replaceAll('_', ' ')}</span>;
        default:
            return <span>{status}</span>;
    }
};
    
    return (
<>
<div className='container mt-2 details-cmd Myfont bg-light'>

                
                    <div className='card'>
                      <div className='card-header' style={{textAlign: 'center', backgroundColor: '#17a2b8', color: 'white' }}>
                          <h4>Détails de la Commande</h4>
                      </div>
                      <div className='card-body cardBody'>
                      
                      <div className="row">
                              <div className="col-md-6">
                                <div className="p-2">
                                  <strong>Prénom:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.prenomClient}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Adresse:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.address}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Immatriculation CNSS:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.cnss}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Ville:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.ville}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Pays:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.pays}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Email:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.email}</span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="p-2">
                                  <strong>Nom:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.nomClient}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Société:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.societe}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Code Comptable:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.codeComptable}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Code Postal:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.codePostal}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Téléphone:</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.tel}</span>
                                </div>
                                <div className="p-2">
                                  <strong>Registre du Commerce (RC):</strong>
                                  <span style={{ marginLeft: '8px' }}>{commande.vente.client.rc}</span>
                                </div>
                              </div>
                            </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="p-2">
                                <strong>Date de commande:</strong>
                                <p>{formatDate(commande.dateCommande)}</p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="p-2">
                                <strong>Status de la commande : </strong>
                                <p>{getStatusLabel(commande.statusCommande)}</p>
                              </div>
                            </div>
                          
                    </div>
                          <table className='table'>
                              <thead>
                                  <tr>
                                      <th>Produit</th>
                                      <th>Quantité</th>
                                      <th>Remise</th>
                                      <th>Prix unitaire HT</th>
                                      <th>Total</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {lignesCommande.map(ligne => (
                                      <tr key={ligne.id}>
                                          <td>{ligne.produit.nomProd}</td>
                                          <td>{ligne.quantite}</td>
                                          <td>{ligne.remise}%</td>
                                          <td>{ligne.produit.prixUnitaireHT.toFixed(2)} DH</td>
                                          <td>{(ligne.quantite * ligne.produit.prixUnitaireHT).toFixed(2)}</td>
                                      </tr>
                                  ))}
                                  <tr>
                                      <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Montant Total HT:</td>
                                      <td colSpan="2">{commande.vente.montantTotalHT.toFixed(2)} DH </td>
                                  </tr>
                                  <tr>
                                      <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>TVA Total:</td>
                                      <td colSpan="2">{commande.vente.tvaTotal.toFixed(2)} DH </td>
                                  </tr>
                                  <tr>
                                      <td colSpan="3" style={{ textAlign: 'right', fontWeight: 'bold' }}>Montant Total TTC:</td>
                                      <td colSpan="2">{commande.vente.montantTotalTTC.toFixed(2)} DH </td>
                                  </tr>
                              </tbody>
                          </table>
                          <AfficherCommande commande={commande}  />

                      </div>
                      
                        <div className='card-header' style={{ textAlign: 'center', backgroundColor: '#17a2b8', color: 'white' }}>
                            <h4>Détail de la Facture</h4>
                        </div>
                        <div className='card-body cardBody'>
                            {commande.factureDeVente ? (
                                <table className='table'>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#ID</th>
                                            <th>Date de facture</th>
                                            <th>Date prévue de paiement</th>
                                            <th>Date réel de paiement</th>
                                            <th>Mode de paiement</th>
                                            <th>Statut de la facture</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{commande.factureDeVente.idFacture}</td>
                                            <td>{formatDate(commande.factureDeVente.dateFacture)}</td>
                                            <td>{formatDate(commande.factureDeVente.datePrevuePayement)}</td>
                                            <td>{formatDate(commande.factureDeVente.dateReelPayement)}</td>
                                            <td>{getStatusLabel(commande.factureDeVente.modePayement)}</td>
                                            <td>{getStatusLabel(commande.factureDeVente.statusFacture)}</td>
                                            <td>
                                                <ActionButtonFacture
                                                    onEdit={() => handleEditFacture(commande.factureDeVente)}
                                                    onDelete={() => handleDeleteFacture(commande.factureDeVente.idFacture)}
                                                    onGenerate={() => handleGenerateFacture(commande.factureDeVente.idFacture)}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={() => handleCreateFacture(idCommande)}>Créer la Facture</button>
                                </div>
                            )}
                            </div>
                        <div className='card-header' style={{ textAlign: 'center', backgroundColor: '#17a2b8', color: 'white' }}>
                            <h4>Détail de la Livraison</h4>
                        </div>
                        <div className='card-body cardBody'>
                            {commande.livraison ? (
                                <table className='table'>
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>#ID</th>
                                            <th>Date de livraison</th>
                                            <th>Date prévue de réception</th>
                                            <th>Date réel de réception</th>
                                            <th>Adresse de livraison</th>
                                            <th>Status de livraison</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{commande.livraison.idLivraisonVente}</td>
                                            <td>{formatDate(commande.livraison.dateLivraison)}</td>
                                            <td>{formatDate(commande.livraison.datePrevueReception)}</td>
                                            <td>{formatDate(commande.livraison.dateReelReception)}</td>
                                            <td>{commande.livraison.adresseLivraison}</td>
                                            <td>{getStatusLabel(commande.livraison.statusLivraison)}</td>
                                            <td>
                                                <ActionButtonLivraison
                                                    onEdit={() => handleEditLivraison(commande.livraison)}
                                                    onDelete={() => handleDeleteLivraison(commande.livraison.idLivraisonVente)}
                                                    onGenerate={() => handleGenerateLivraison(commande.livraison.idLivraisonVente)}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center">
                                    <button className="btn btn-primary" onClick={() => handleCreateLivraison(idCommande)}>Créer le bon de livraison</button>
                                </div>
                            )}
                        </div>
                    </div>
                    
                   
                </div>
            <MyModal show={showModalFacture} onHide={() => setShowModalFacture(false)} onConfirm={confirmDeleteFacture} />
            <MyModal show={showModalLivraison} onHide={() => setCurrentIdLivraison(false)} onConfirm={confirmDeleteLivraison} />
     

                  <br/>
                    <br/>
                    
                   


</>
    )
}
/* 


<div className='container mt-2 details-cmd Myfont'>
<div className='card'>
    <div className='card-header text-white cardHeader'>
      <h3>Details du client</h3>
    </div>
    <div className='card-body cardBody'>
    <table className='table' >
    <tbody>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Prénom:</td>
            <td>{commande.vente.client.prenomClient}</td>
            <td style={{ fontWeight: 'bold' }}>Nom:</td>
            <td>{commande.vente.client.nomClient}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Adresse:</td>
            <td>{commande.vente.client.address}</td>
            <td style={{ fontWeight: 'bold' }}>Société:</td>
            <td>{commande.vente.client.societe}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Immatriculation CNSS:</td>
            <td>{commande.vente.client.cnss}</td>
            <td style={{ fontWeight: 'bold' }}>Code Comptable:</td>
            <td>{commande.vente.client.codeComptable}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Ville:</td>
            <td>{commande.vente.client.ville}</td>
            <td style={{ fontWeight: 'bold' }}>Code Postal:</td>
            <td>{commande.vente.client.codePostal}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Pays:</td>
            <td>{commande.vente.client.pays}</td>
            <td style={{ fontWeight: 'bold' }}>Téléphone:</td>
            <td>{commande.vente.client.tel}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 'bold' }}>Email:</td>
            <td>{commande.vente.client.email}</td>
            <td style={{ fontWeight: 'bold' }}>Registre du Commerce (RC):</td>
            <td>{commande.vente.client.rc}</td>
          </tr>
       
        </tbody>
      </table>
    </div>
            <div className='card'>
                <div className='card-header text-white cardHeader'>
                    <h3>Détails de la Commande</h3>
                </div>
                <div className='card-body cardBody'>
                    <h4>Informations de la commande</h4>
                    <p>Date de commande: {commande.dateCommande}</p>
                    <p>Status de la commande: {commande.statusCommande}</p>
                    <h4>Liste des produits commandés</h4>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Quantité</th>
                                <th>Prix Unitaire</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lignesCommande.map(ligne => (
                                <tr key={ligne.id}>
                                    <td>{ligne.produit.nomProd}</td>
                                    <td>{ligne.quantite}</td>
                                    <td>{ligne.produit.prixUnitaireHT}</td>
                                    <td>{ligne.quantite * ligne.produit.prixUnitaireHT}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    <div className='card mt-3'>
      <h4 className="text-center">Détail de la Facture</h4>
      {commande.factureDeVente ? (
        <table className='table table-bordered table-striped'>
            <thead className="thead-dark">
                <tr>
                  <th scope="col" style={{ textAlign: "center" }}>#ID</th>  
                  <th scope="col" style={{ textAlign: "center" }}>Date de facture</th>
                  <th scope="col" style={{ textAlign: "center" }}>Date prévue de paiement</th>
                  <th scope="col" style={{ textAlign: "center" }}>Date réel de paiement</th>
                  <th scope="col" style={{ textAlign: "center" }}>Mode de paiement</th>
                  <th scope="col" style={{ textAlign: "center" }}>Statut de la facture</th>
                  <th scope="col" style={{ textAlign: "center" }} colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                  <td style={{textAlign: "center" }}>{commande.factureDeVente.idFacture}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.factureDeVente.dateFacture)}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.factureDeVente.datePrevuePayement)}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.factureDeVente.dateReelPayement)}</td>
            <td style={{textAlign: "center" }}>{commande.factureDeVente.modePayement}</td>
            <td style={{textAlign: "center" }}> {commande.factureDeVente.statusFacture}</td>
            <td style={{ textAlign: "center" }}>
              <ActionButtonFacture
                onEdit={() => hadleClickEdit(commande.factureDeVente.idFacture, commande.factureDeVente.idClient, commande.factureDeVente.modPayement, commande.factureDeVente.dateFacture, commande.factureDeVente.datePrevuePayement,commande.factureDeVente.dateReelPayement, commande.factureDeVente.statusFacture)}
                onDelete={() => handleDelete(commande.factureDeVente.idFacture)}
                onGenerate={() => handleGenerate(commande.factureDeVente.idFacture)}

        
               />
            </td>
    
        </tr>
        {showPDFFacture && (
          <div style={{
            position: 'fixed', // Position fixe par rapport à la fenêtre d'affichage
            top: 0, // Commence au haut de la page
            left: 0, // Commence à gauche de la page
            width: '100vw', // Utilise toute la largeur de la fenêtre d'affichage
            height: '100vh', // Utilise toute la hauteur de la fenêtre d'affichage
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent pour le fond
            zIndex: 9999, // S'assurer qu'il est par-dessus tout le contenu
          }}>
        <PDFFactureViewer factureId={commande.factureDeVente.idFacture} setShowPDF={setShowPDF} />
        <button onClick={() => setShowPDF(false)} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10000, // Encore plus haut pour être sûr qu'il est au-dessus du PDF
          }}></button>
          </div>
      )}
              </tbody>
        </table>
      ) : (
        <div className="text-center">
          <button className="btn btn-primary" >Créer la Facture</button>
        </div>
      )}
    </div>

    <div className='card-footer'>
      <h4 className="text-center">Détail de la Livraison</h4>
      {commande.livraison ? (
        <table className='table table-bordered table-striped'>
            <thead className="thead-dark">
              <tr>
                <th style={{ textAlign: "center" }}>#ID</th>
                <th style={{ textAlign: "center" }}>Date de livraison</th>
                <th style={{ textAlign: "center" }}>Date prévue de reception</th>
                <th style={{ textAlign: "center" }}>Date réel de réception</th>
                <th style={{ textAlign: "center" }}>Adresse de livraison</th>
                <th style={{ textAlign: "center" }}>Status de livraison</th>
                <th style={{ textAlign: "center" }} colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td style={{textAlign: "center" }}>{commande.livraison.idLivraisonVente}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.livraison.dateLaivrison)}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.livraison.datePrevue)}</td>
            <td style={{textAlign: "center" }}>{formatDate(commande.livraison.dateReception)}</td>
            <td style={{textAlign: "center" }}>{commande.livraison.adresseLivraison}</td>
            <td style={{textAlign: "center" }}> {commande.livraison.statusLivraison}</td>
            <td style={{ textAlign: "center" }}>
              <ActionButtonLivraison
                onEdit={() => hadleClickEdit(commande.livraison.idLivraisonVente, commande.vente.client.idClient, commande.livraison.dateLaivrison, commande.livraison.datePrevue, commande.livraison.dateReception,commande.factureDeVente.dateReelPayement, commande.livraison.statusLivraison, commande.livraison.adresseLivraison)}
                onDelete={() => handleDelete(commande.livraison.idLivraisonVente)}
                onGenerate={() => handleGenerate(commande.livraison.idLivraisonVente)}

        
               />
            </td>
    
        </tr>
        {showPDFLivraison && (
          <div style={{
            position: 'fixed', // Position fixe par rapport à la fenêtre d'affichage
            top: 0, // Commence au haut de la page
            left: 0, // Commence à gauche de la page
            width: '100vw', // Utilise toute la largeur de la fenêtre d'affichage
            height: '100vh', // Utilise toute la hauteur de la fenêtre d'affichage
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent pour le fond
            zIndex: 9999, // S'assurer qu'il est par-dessus tout le contenu
          }}>
        <PDFLivraisonViewer livraisonId={commande.livraison.idLivraisonVente} setShowPDF={setShowPDF} />
        <button onClick={() => setShowPDF(false)} style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 10000, // Encore plus haut pour être sûr qu'il est au-dessus du PDF
          }}></button>
          </div>
      )}
              </tbody>
        </table>
      ) : (
        <div className="text-center">
          <button className="btn btn-primary" >Créer le bon de livraison</button>
        </div>
      )}
      
    </div>
    
    
    
    
  </div>
  <div className='card mb-3'>
                    
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Prénom:</td>
                                        <td>{commande.vente.client.prenomClient}</td>
                                        <td style={{ fontWeight: 'bold' }}>Nom:</td>
                                        <td>{commande.vente.client.nomClient}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Adresse:</td>
                                        <td>{commande.vente.client.address}</td>
                                        <td style={{ fontWeight: 'bold' }}>Société:</td>
                                        <td>{commande.vente.client.societe}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Immatriculation CNSS:</td>
                                        <td>{commande.vente.client.cnss}</td>
                                        <td style={{ fontWeight: 'bold' }}>Code Comptable:</td>
                                        <td>{commande.vente.client.codeComptable}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Ville:</td>
                                        <td>{commande.vente.client.ville}</td>
                                        <td style={{ fontWeight: 'bold' }}>Code Postal:</td>
                                        <td>{commande.vente.client.codePostal}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Pays:</td>
                                        <td>{commande.vente.client.pays}</td>
                                        <td style={{ fontWeight: 'bold' }}>Téléphone:</td>
                                        <td>{commande.vente.client.tel}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: 'bold' }}>Email:</td>
                                        <td>{commande.vente.client.email}</td>
                                        <td style={{ fontWeight: 'bold' }}>Registre du Commerce (RC):</td>
                                        <td>{commande.vente.client.rc}</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
</div>*/
export default DetailsCommandVente;