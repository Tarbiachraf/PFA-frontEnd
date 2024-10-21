import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LignCmdFourAjout from '../fournisseur/LignCmdFourAjout';
import CommandeFourService from '../backEndService/CommandeFourService';
import LignCmdFourDetails from './LignCmdFourDetails';
import BonLivFourService from '../backEndService/BonLivFourService';
import FactureFourService from '../backEndService/FactureFourService';
import MyModal from '../components/MyModal';
const DetailsCommande = () => {
    const [lignCommandeAfficher, setLignCommandeAfficher] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location || {};
    const idCmd = state.idCmd || {};
    const [commande, setCommande] = useState({});
    const [bonLivDeleted, setBonLivDeleted] = useState(false);
    const [factureDeleted, setFactureDeleted] = useState(false);
    const [stateUpdated,setStatUpdated] =useState(false);
    const [visible, setVisible] = useState(false);
    const [alertMessage,setAlertMessage]=useState('')
    const [currentIdFacture,setCurrentIdFacture]=useState(null);
    const [currentIdBon,setCurrentIdBon]=useState(null);
    const [showModalFact,setShowModalFact]=useState(false);
    const [showModalBon,setShowModalBon]=useState(false);
    const [showAlert,setShowAlert]=useState(false);
    const etat = useRef();
    const dateSortie = useRef();
    const [stateDto, setStateDto] = useState(
        {
            "etat": '',
            "dateSortie": ''
        }
    )


    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };
    //function to get commande
    useEffect(() => {
        if (idCmd) {
            getCommande();
        }
    }, [idCmd]);

    useEffect(() => {
        if (bonLivDeleted) {
            getCommande();
            setBonLivDeleted(false);  // Réinitialiser l'état après la mise à jour
        }
    }, [bonLivDeleted]);

    useEffect(() => {
        if (factureDeleted) {
            getCommande();
            setFactureDeleted(false);
        }
    }, [factureDeleted])
    
    useEffect(()=>{
        if(stateUpdated){
            getCommande();
            setStatUpdated(false);
        }
    },[stateUpdated])
    const getCommande = async () => {
        try {
            const response = await CommandeFourService.getCompletCommande(idCmd);
            setCommande(response.data);
            if (response.data && response.data.idCommande) {
                getLignCommande(response.data.idCommande);
            }
        } catch (error) {
            console.error("error to get commande", error);
        }
    };

    const getLignCommande = async (idCommande) => {
        try {
            const response = await CommandeFourService.getLignCommande(idCommande);
            setLignCommandeAfficher(response.data);
        } catch (error) {
            console.error("error to get all lign commandes", error);
        }
    };

    const formatDate = (date) => {
        if(!date){
            return '----'
        }
        else{
            const formattedDate = new Date(date);
            const year = formattedDate.getFullYear();
            const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
            const day = String(formattedDate.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    };

    //function to add bon livraison

    const handleAddBonLiv = (idCmd) => {
        navigate("/AjouterBonLivraison", { state: { idCmd } });
    }
    const handleEditBonLiv = (bon, idCmd) => {
        navigate("/ModefierBonLivraisonFour", { state: { bon, idCmd } })
    }

    //function to deleteBonlivraison
    const handleDeleteBonLiv = (idBon) => {
        setShowModalBon(true);
        setCurrentIdBon(idBon);
    }
    

    //functio to confirm delte bon
    const confirmDeleteBon =() =>{
        BonLivFourService.deleteBonLivFour(currentIdBon)
        .then(response => {
            setBonLivDeleted(true);  
            setShowModalBon(false);
            setAlertMessage("successBon");
        })
        .catch(error => {
            setShowModalBon(false);
            setAlertMessage("errorBon");
            console.error("error to delete bon livraison", error);
        });
    }
    //function to show Document livraison
    const handleDocBonLivraison=(bonLivraison) =>{
        navigate("/LivraisonDocument", { state: {bonLivraison} });
    }


    //la table de la bon livraison
    const tableLivraison = (bon) => {
        if (bon != null) {
            return (
                <td colSpan={4}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center', width:'450px' }}>Date livraison</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' , width:'150px'}}>Qualite livraison</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}>Caché</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' , width:'450px'}}>{formatDate(bon.dateLivraison)}</td>
                            <td style={{ textAlign: 'center' , width:'150px'}}>{bon.qualiteLivraison}</td>
                            <td style={{ textAlign: 'center' }}>{bon.cache ? "OUI" : "NON"}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }} >
                                <button className='btn btn-success' onClick={() => { handleEditBonLiv(commande.bonLivraisonFour, commande.idCommande) }}>Modefier</button>&nbsp;&nbsp;
                                <button className='btn btn-danger' onClick={() => { handleDeleteBonLiv(commande.bonLivraisonFour.idbonLivraison) }}>Supprimer</button>&nbsp;&nbsp;
                                <button className='btn btn-dark' onClick={() => { handleDocBonLivraison(commande.bonLivraisonFour) }}>Document</button>
                            </td>
                        </tr>
                    </table>
                </td>
            )
        }
        else {
            return (
                <td colSpan={4}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} >La commande n'a pas encore été livrée.</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }} ><button className='btn btn-success' onClick={() => { handleAddBonLiv(commande.idCommande) }}>Ajouter</button></td>
                        </tr>
                    </table>
                </td>
            )
        }
    }

    //function to add facture  
    const handleAddFacture = (idCmd) => {
        navigate("/AjouterFactureFour", { state: { idCmd } });
    }

    //function to edit Facture
    const handleEditFact = (facture, idCmd) => {
        navigate("/ModefierFactureFour", { state: { facture, idCmd } })
    }

    //function to confirm delete facture 
    const confirmDeleteFact = () =>{
        FactureFourService.deleteFacture(currentIdFacture)
        .then(response => {
            setFactureDeleted(true);
            setShowModalFact(false);
            setAlertMessage("successFact");
        })
        .catch(error => {
            setShowModalFact(false);
            setAlertMessage("errorFact");
            console.error("error to delete facture");

        })
    }
    

    //function to delete facture
    const handleDeleteFact = (idFact) => {
        setShowModalFact(true);
        setCurrentIdFacture(idFact);
    }
    //fonction to download and print document of facture
    const handleShowDocument = (Fact) => {
        navigate("/FactureDocument", { state: { Fact } })
    }

    //la fonction de generation des details de la facture

    const tableFacture = (facture) => {
        if (facture != null) {
            return (
                <td colSpan={4}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}> Date facture</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}> Status paiement</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}> Moyenne reglement</td>
                            <td style={{ fontWeight: 'bolder', textAlign: 'center' }}>Validité</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'center' }}>{formatDate(facture.dateFacture)}</td>
                            <td style={{ textAlign: 'center' }}>{facture.statusPaiement}</td>
                            <td style={{ textAlign: 'center' }}>{facture.moyenneReglement}</td>
                            <td style={{ textAlign: 'center' }}>{facture.valide ? "OUI" : "NON"}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }} >
                                <button className='btn btn-success' onClick={() => { handleEditFact(commande.factureCmdFour, commande.idCommande) }}>Modefier</button>&nbsp;&nbsp;
                                <button className='btn btn-danger' onClick={() => { handleDeleteFact(commande.factureCmdFour.idFacture) }}>Supprimer</button>&nbsp;&nbsp;
                                <button className='btn btn-dark' onClick={() => { handleShowDocument(commande.factureCmdFour) }}>Document</button>
                            </td>
                        </tr>
                    </table>
                </td>
            )
        }
        else {
            return (
                <td colSpan={4}>
                    <table style={{ width: "100%" }}>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} >La commande n'a pas encore été facturé.</td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }} ><button className='btn btn-success' onClick={() => { handleAddFacture(commande.idCommande) }}>Ajouter</button></td>
                        </tr>
                    </table>
                </td>
            )
        }

    }

    //function to reset form 
    const resetForm = () => {
        etat.current.value = '';
        dateSortie.current.value = '';
    }
    //funciton to hande change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStateDto(prevState => (
            {
                ...prevState,
                [name]: value
            }
        ));
        console.log(stateDto);
    }


    //function to manage commande 
    const manageCommande = (visible) => {
        if (!visible) return null;
        else {
            return (
                <div className="container Myfont cardBody">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row align-items-center  cardBody">
                            {/* État field with label */}
                            <div className="col-auto d-flex align-items-center cardBody">
                                <label htmlFor="etat" className="mr-2" style={{ minWidth: '40px', fontWeight: 'bolder' }}>État:</label>
                                <select className="form-control" id="etat" name="etat" ref={etat} style={{ width: '200px', height: '40px' }}  onChange={handleChange}>
                                    <option disabled selected>Changer l'état ici</option>
                                    <option value="EN_TRANSPORT">En Transport</option>
                                    <option value="LIVREE">Livree</option>
                                    <option value="ANNULE">Annule</option>
                                    <option value="EN_ATTENT">En attent</option>
                                </select>
                                <i class="fas fa-chevron-down" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                            </div>
                            {/* Date Sortie field with label */}
                            <div className="col-auto d-flex align-items-center">
                                <label htmlFor="dateSortie" className="mr-2" style={{ minWidth: '80px', fontWeight: 'bolder' }}>Date Sortie:</label>
                                <input type="date" className="form-control" id="dateSortie" name="dateSortie" ref={dateSortie} style={{ width: '200px', height: '40px' }} onChange={handleChange} />
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary" type="submit">Changer</button>
                            </div>
                        </div>
                    </form>

                </div>
            )
        }
    }
    const handleClickManageCommande = () => { setVisible(!visible) }

    //function to handle submit
    const handleSubmit = (event) => {
        event.preventDefault();
        CommandeFourService.editState(commande.idCommande,stateDto)
            .then(res =>{
                console.log("la commande a été modefié ");
                resetForm();
                setStatUpdated(true);
            })
            .catch(error =>{console.error("error to update commande")})
    }

    //function to handle document of commande
    const handleDocCommande = (idCmd) =>{
        navigate("/BonCmdDocument",{state:{idCmd}});
    }

    //function to handle alet Message 
    const alertMsg = (msg) => {
        switch (msg) {
            case '':
                return <div></div>;
            case "errorBon":
                return (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                        <span >Error dans la suppression de bon livraison  </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            case "successBon":
                return (
                    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                    <span >le Bon livraison à été supprimé avec succés </span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                )
                case "errorFact":
                    return (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                            <span >Error dans la suppression de la facture  </span>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    )
                case "successFact":
                    return (
                        <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                        <span >la facture à été supprimé avec succés </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div> 
                    )
        }
    }

    //function to display moyenner reglement 
    const diplayMoyenneReg = (key) =>{
        switch(key){
            case 'CACH_ON_DELIVRY':
                return 'paiement à la livraison';
            case 'CHEQUE' :
                return 'paiement par cheque';
            case 'VAIREMENTBANCAIRE':
                return 'vairement bancaire';
            case 'TRAITEBANCAIRE':
                return 'traite bancaire';
        }
    }
    if (!commande && !commande.fournisseur.raisonSocial) {
        return <div>Loading... Please wait.</div>; // Loading page or indicator
    }

    const fournisseurRaisonSocial = commande.fournisseur ? commande.fournisseur.raisonSocial : "Unavailable";

    const datashow = lignCommandeAfficher.map((item, key) => (
        <LignCmdFourDetails key={`${item.idProduit}-${key}`} idProduit={item.idProduit} refProduit={item.refProduit} nomProduit={item.nomProduit} prix={item.prix} quantite={item.quantite} totalHT={item.montantTotalHt} tva={item.tva} totalTTC={item.montantTotalTTC} />
    ));
    return (
        <div className='container mt-2 details-cmd Myfont'>
            <div className='card'>
                <div className='card-header text-white cardHeader' style={{ textAlign: 'center' }}>
                    <h3>Details de la commande</h3>
                    {alertMsg(alertMessage)}
                </div>
                <div className='card-body cardBody'>
                    <table className='table '>
                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Reference :</td>
                            <td style={{ fontWeight: 'bolder' }}>#{commande.idCommande}</td>
                            <td style={{ fontWeight: 'bolder' }}>Date commande :</td>
                            <td>{formatDate(commande.dateCommande)}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Date prevue :</td>
                            <td>{formatDate(commande.datePrevue)}</td>
                            <td style={{ fontWeight: 'bolder' }}>Date devis :</td>
                            <td>{formatDate(commande.datePrevue)}</td>
                        </tr>

                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Date sortie :</td>
                            <td>{formatDate(commande.dateSortie)}</td>
                            <td style={{ fontWeight: 'bolder' }}>Etat :</td>
                            <td className='badge badge-success'>{commande.etat}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Moyenne réglement :</td>
                            <td>{diplayMoyenneReg(commande.moyenneReglement)}</td>
                            <td style={{ fontWeight: 'bolder' }}>Condition réglement :</td>
                            <td>{commande.conditionReglement}</td>
                        </tr>

                        <tr>
                            <td style={{ fontWeight: 'bolder' }}>Montant total HT :</td>
                            <td>{commande.montantTotalHT} DH</td>
                            <td style={{ fontWeight: 'bolder' }}>Montant total TTC :</td>
                            <td>{commande.montantTotalTTC} DH</td>
                        </tr>
                        <tr style={{ height: '6px' }}>
                            <td style={{ fontWeight: 'bolder' }}>Fournisseur :</td>
                            <td >{fournisseurRaisonSocial}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} className='bg-info'>List produits commandé</td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <table style={{ width: '100%' }} className='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ textAlign: "center" }}>#Reference </th>
                                            <th scope="col" style={{ textAlign: "center" }}>Nom</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Prix</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Quantité</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Total HT</th>
                                            <th scope="col" style={{ textAlign: "center" }}>TVA</th>
                                            <th scope="col" style={{ textAlign: "center" }}>Total TTC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datashow}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                <div className="d-flex align-items-center " style={{backgroundColor:"#ECF0F1"}}>
                                    <button className="action-button bg-dark" style={{ width: '40%', height: '40px', marginRight: '10px' }} onClick={()=>{handleDocCommande(commande.idCommande)}} >Document</button>
                                    <button className="action-button bg-success" style={{ width: '60%', height: '40px', marginRight: '10px' }} onClick={() => { handleClickManageCommande() }}>Gérer l'état </button>
                                </div>
                            </td>
                            <td colSpan={3}>
                                {manageCommande(visible)}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} className='bg-info'>Detaile de la bon livaraison</td>
                        </tr>
                        <tr>
                            {
                                tableLivraison(commande.bonLivraisonFour)
                            }
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", fontWeight: 'bold' }} className='bg-info'>Detaile de la facture</td>
                        </tr>
                        <tr>
                            {
                                tableFacture(commande.factureCmdFour)
                            }
                        </tr>
                    </table>
                </div>
            </div>
             <MyModal show={showModalFact} onHide={()=>setShowModalFact(false)}  onConfirm={confirmDeleteFact}   /> 
             <MyModal show ={showModalBon} onHide={() =>setShowModalBon(false)} onConfirm={confirmDeleteBon}  />     
        </div>
    )

}

export default DetailsCommande