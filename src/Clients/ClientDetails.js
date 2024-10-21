import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ClientService from '../backEndService/ServiceClient';
import ServiceCommand from '../backEndService/ServiceCommand';
import ProductService from '../backEndService/ProductService';
const ClientDetails = () => {
    const location = useLocation()
    const { state } = location;
    const { idC } = state || {};

    const [commandes, setCommandes] = useState([]); // State pour les commandes
    const [topProducts, setTopProducts] = useState([]); // State for the top products
  const [client, setClient] = useState({
    nomClient: '',
    prenomClient: '',
    societe: '',
    pays: '',
    ville: '',
    tel: '',
    email: '',
    codePostal: '',
    codeComptable: '',
    address: '',
    rc: '',
    cnss: ''
});
const statusLabels = {
    EN_ATTENTE: "En attente",
    EN_PREPARATION: "En préparation",
    PREPAREE: "Préparée",
    ANNULEE: "Annulée",
    EXPEDIEE: "Expédiée",
    EN_LIVRAISON: "En livraison",
    LIVREE: "Livrée",
    RETOURNEE: "Retournée",
    EN_RETARD: "En retard",
    NON_PAYEE: "Non payée",
    SEMI_PAYEE: "Partiellement payée",
    PAYEE: "Payée",
    EN_RETARD: "En retard de paiement"
  };

  useEffect(() => {
    // You might want to fetch additional client details here if needed
    ClientService.getClient(idC).then(response => {
        const clientData = response.data;
        console.log("le client ",clientData)
        setClient({
          nomClient: clientData.nomClient || '',
          prenomClient: clientData.prenomClient || '',
          societe: clientData.societe || '',
          pays: clientData.pays || '',
          ville: clientData.ville || '',
          tel: clientData.tel || '',
          email: clientData.email || '',
          codePostal: clientData.codePostal || '',
          codeComptable: clientData.codeComptable || '',
          address: clientData.address || '',
          rc: clientData.rc || '',
          cnss: clientData.cnss || ''
        });
        ServiceCommand.getCommandesByClientId(idC).then(response => {
            setCommandes(response.data); // On met à jour le state avec les commandes reçues
        }).catch(error => {
            console.error("Erreur lors de la récupération des commandes:", error);
        });
        ProductService.getTopProductsByClient(idC).then(response => {
            setTopProducts(response.data); // Update state with the fetched top products
        }).catch(error => {
            console.error("Erreur lors de la récupération des produits les plus commandés:", error);
        });
    }).catch(error => {
        console.error("Error fetching client data:", error);
      });
    if (!state) {
      console.log("No client data available");
    }
  }, []);

  return (
<div className="container mt-2 details-cmd Myfont" style={{ textAlign: 'center', backgroundColor: '#f4f4f4' }}>
  <div className="card">
    <div className="card-header text-white cardHeader">
      <h3>Détails du Client</h3>
    </div>

    <div className='card-body cardBody'>
      <table className='table'>
        <tbody>
          <tr>
            <th>Prénom:</th>
            <td>{client.prenomClient}</td>
            <th>Nom:</th>
            <td>{client.nomClient}</td>
          </tr>
          <tr>
            <th>Adresse:</th>
            <td>{client.address}</td>
            <th>Société:</th>
            <td>{client.societe}</td>
          </tr>
          <tr>
            <th>Immatriculation CNSS:</th>
            <td>{client.cnss}</td>
            <th>Code Comptable:</th>
            <td>{client.codeComptable}</td>
          </tr>
          <tr>
            <th>Ville:</th>
            <td>{client.ville}</td>
            <th>Code Postal:</th>
            <td>{client.codePostal}</td>
          </tr>
          <tr>
            <th>Pays:</th>
            <td>{client.pays}</td>
            <th>Téléphone:</th>
            <td>{client.tel}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{client.email}</td>
            <th>Registre du Commerce (RC):</th>
            <td>{client.rc}</td>
          </tr>
        <br/>
        <br/>
        <br/>

          <tr>
            
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} className='bg-info'>Historique des Commandes</td>
            </tr>
            <tr>
               <td colSpan={4}>
                      <table className='table table-striped'>
                <thead className="thead-light">
                  <tr>
                    <th>Date Commande</th>
                    <th>Montant Total</th>
                    <th>Status de commande</th>
                    <th>Status de facture</th>
                  </tr>
                </thead>
                <tbody>
                  {commandes.map((commande, index) => (
                    <tr key={index}>
                      <td>{commande.dateCommande}</td>
                      <td>{commande.vente.montantTotalTTC}</td>
                      <td>{statusLabels[commande.livraison ? commande.livraison.statusLivraison : commande.statusCommande]}</td>
                      <td>{commande.factureDeVente ? statusLabels[commande.factureDeVente.statusFacture] : "Facture non créée"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>       
                </td>
            </tr>
            <br/>
        <br/>

            <tr>
                 <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} className='bg-info'>Produits les Plus Commandés</td>
            </tr>
            <tr>
               <td colSpan={4}>
               <table className='table table-hover'>
                  <thead>
                    <tr>
                      <th>Nom du Produit</th>
                      <th>Quantité Totale Commandée</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product, index) => (
                      <tr key={index}>
                        <td>{product.nomProd}</td>
                        <td>{product.totalQuantity}</td>
                      </tr>
                    ))}
                  </tbody>
              </table>
                </td>
            </tr>
        </tbody>
      </table>
    </div>

    
  </div>
</div>

  );
}

export default ClientDetails;
