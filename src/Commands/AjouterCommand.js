import React from 'react'
import { useRef, useState, useEffect } from 'react';
import LigneProduitAjout from '../devis/LigneProduitAjout';
import { useLocation } from 'react-router-dom';
import ProductService from '../backEndService/ProductService';
import ServiceCommand from '../backEndService/ServiceCommand';


const AjouterCommand = () => {
    const dateCmdField = useRef();
    const statusCmd = useRef();
    const produitField = useRef();
    const quantiteField = useRef();
    const remiseField = useRef();
    const [errors, setErrors] = useState({});
    let isValid = true;
    const location = useLocation();
    const { state } = location;
    const { idC } = state || {};
    const [commmande, setCommande] = 
    useState({ "idClient": idC, "montantTotalHT": 0, "montantTotalTTC": 0, "statusCommande": '', "dateCommande":'', "ligneCommande": [] });

    const [lignCommandeAfficher, setLignCommandeAfficher] = useState([]);
    const [lignCommandeEnvoyer, setLignCommandeEnvoyer] = useState([])
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(0);
    const [quantite, setQuantite] = useState(0);
    const [remise, setRemise] = useState(0);
    const [montantTotalHT, setMontantTotalHT] = useState(0);
    const [montantTotalTTC, setMontantTotalTTC]=useState(0);
    const [tvaTotal, setTvaTotal] = useState(0);
    const [alertMessage,setAlertMessage]=useState("");

    // Remplir automatiquement le champ de date de commande avec la date actuelle
    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);
        dateCmdField.current.value = today;
        setCommande(prevcmd => (
            {
                ...prevcmd,
                "dateCommande": today,
            }
        ))
        getAllProduct();
    }, []);
    useEffect(() => {
        calculMToatal();
    }, [lignCommandeAfficher])
    /*start form validation function*/
    const validatForm = () => {
        setErrors({});
        const produitValue = produitField.current.value;
        const quatiteValue = quantiteField.current.value;
        const statusValue=statusCmd.current.value;
        const remiseValue = remiseField.current.value;
        /*if (!dateExpValue) { // Vérifier si la chaîne de date est vide
            setErrors(prevState => ({
                ...prevState,
                dateExpField: "La date d'expiration est obligatoire"
            }));
            isValid = false;
        } 
        if(dateExpValue) {
            const dateReg = new Date(dateExpValue); // Convertir la chaîne de date en objet Date
            const isValidDate = !isNaN(dateReg.getTime()); // Vérifier si la date est valide
            if (!isValidDate) {
                setErrors(prevState => ({
                    ...prevState,
                    dateExpField: "La date d'expiration n'est pas valide"
                }));
                isValid = false;
            }
        }*/
        if (statusValue.trim() == '') {
            setErrors(prevState => {
                return { ...prevState, ...{ statusCmd: "le champe status est obligatoire" } }
            });
            isValid = false;
        }
        if(lignCommandeEnvoyer.length ==0){
            if (produitValue.trim() == '') {
                setErrors(prevState => {
                    return { ...prevState, ...{ produitField: "le champe ref-produit est obligatoire" } }
                });
                isValid = false;
            }
            if (quatiteValue < 1 || isNaN(quatiteValue)) {
                setErrors(prevState => ({ ...prevState, quantiteField: "quantite doit etre superieue a 1" }));
                isValid = false;
            }
        }
        return isValid;
    }
    //function to delete item of lign commande given id 
    const handleDelete = (id) => {
        setLignCommandeAfficher(prevState => prevState.filter(item => item.idProduit !== id));
        setLignCommandeEnvoyer(prevState =>prevState.filter(item => item.idProduit !==id));
    }
    
    /*end form validation function*/

    //handle reset function 
    const handleReset = (e) => {
        e.preventDefault();
        produitField.current.value = '';
        quantiteField.current.value = '';
        remiseField.current.value = '';
    }
    const handleReset2 = () =>{
        produitField.current.value='';
        quantiteField.current.value='';
        statusCmd.current.value='';
        produitField.current.value='';
        quantiteField.current.value='';
        remiseField.current.value='';
    }

    //start get error of a given field
    const getError = (field) => {
        return errors[field];
    }

    //start has error of a given field 
    const hasError = (field) => {
        return (getError(field) !== undefined);
    }

    //start displayErr function 
    // start displayErr function 
    const dispalyErr = (field) => {
        const element = document.querySelector(`#${field}`);
        if (hasError(field)) {
            element.style.border = "1px solid red";
            return (
                <div>
                    <div className='text text-danger'>{getError(field)}</div>
                </div>
            );
        }
        if (element !== null) {
            element.removeAttribute('style');
        }
        return null; // Ne renvoie rien si aucune erreur n'est présente
    }

    /*handle change function*/
    const handleChange = (event) => {
        validatForm();
        setAlertMessage("");
        const { name, value } = event.target   
            setCommande(prevCommande => ({
                ...prevCommande,
                [name]: value
            }));
        console.log(commmande);

        setProductId(produitField.current.value);
        setQuantite(quantiteField.current.value);
        setRemise(remiseField.current.value);
    }

    //function handle click add product to order
    const handleClickAddProduct = () => {
        ProductService.getProduct(productId)
            .then(response => {
                console.log("success to get command of given id", response.data);
                const lignCmdAfficher = {
                    "idProduit":response.data.idProduit,
                    "tva":response.data.tva,
                    "refProduit": response.data.refProd,
                    "nomProduit": response.data.nomProd,
                    "prix": response.data.prixUnitaireHT,
                    "quantite": quantite, 
                    "remise": remise
                };
                const lignCmdEnvoyer = {
                    "idProduit": response.data.idProduit,
                    "quantite": quantite,
                    "remise": remise
                }
                console.log(lignCmdAfficher);
                console.log(lignCmdEnvoyer)

                setLignCommandeAfficher(prevState => ([...prevState, lignCmdAfficher]));
                setLignCommandeEnvoyer(prevState =>( [...prevState, lignCmdEnvoyer]))
            })
            .catch(error => {
                console.error("error to get product", error);
            });

    }


    //function to get all product 
    const getAllProduct = () => {
        ProductService.getAllProducts()
            .then(responce => {
                setProducts(responce.data);
                console.log("success to get all product in add cmd componant");
            })
            .catch(error => {
                console.log("error to get all product ", error);
            })
    }

    //function to calculate montant total of order line
    const calculMToatal = () => {
        let MontantTotl = 0
        let TvaTotal = 0
        for (const lign of lignCommandeAfficher) {
            const montantLign = lign.prix * lign.quantite;
            const montantLignApreRemise = montantLign - montantLign*(lign.remise/100);
            MontantTotl += montantLignApreRemise;
            TvaTotal += montantLignApreRemise*(lign.tva/100)
        }
        setMontantTotalHT(MontantTotl);
        setTvaTotal(TvaTotal);
        setMontantTotalTTC(MontantTotl+TvaTotal);
    }

    //function to return alert of success
    const alertOfSucces = () =>{
       return (<div className='alert alert-success ' role="alert">
           la commande a été ajouté avec succés
        </div>)
    }
    //function to return alert of error
    const alertOfErrorProduct = () =>{
        return(
            <div className='alert alert-danger' role="alert">
                veuillez ajouter un ligne de commande
            </div>
        )
    }
    //function to return erro 
    const alertOfError = () =>{
        return(
            <div className='alert alert-danger' role="alert">
                erreur dans l'ajout de commande
            </div>
        )
    }

    //function to return a correspondant alert
    const alert = (message) =>{
        switch(message){
            case "error":
                return  alertOfError();
            case "success":
                return  alertOfSucces();
            case "errorProduit" :
                return  alertOfErrorProduct();
            default :
                return null;
            
        }
          
    }

    /*handle submit function */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatForm() ) {
            if(lignCommandeEnvoyer.length >0){
                const commandeDto = {
                    "idClient": commmande.idClient,
                    "montantTotalHT": montantTotalHT,
                    "montantTotalTTC": montantTotalTTC,
                    "statusCommande": commmande.statusCommande,
                    //"dateExpiration": commmande.dateExpiration,
                    "dateCommande": commmande.dateCommande,
                    "ligneCommandes": lignCommandeEnvoyer // Utilisez lignCommandeEnvoyer pour les données d'envoi
                };
                setLignCommandeAfficher([]); 
                setLignCommandeEnvoyer([]); 
                console.log(commandeDto);
                ServiceCommand.ajouterCommande(commandeDto)
                    .then(response => {
                        handleReset2();
                        setAlertMessage("success");
                        console.log("la commande a été ajoutée avec succès", response.data);
                        console.log(lignCommandeAfficher);
                        console.log(montantTotalHT); 
                        
                    })
                    .catch(error => {
                        console.error("erreur dans l'ajout de commande", error);
                        setAlertMessage("error");
                    })
            }
            else{
                setAlertMessage("errorProduit");
            }
        }
    }

    const datashow = lignCommandeAfficher.map((item, key) => (
        <LigneProduitAjout key={`${item.idProduit}-${key}`} idProduit={item.idProduit} refProduit={item.refProduit} nomProduit={item.nomProduit} prix={item.prix} tva={item.tva} remise={item.remise} quantite={item.quantite} onDelete={handleDelete}/>
    ));
    return (
        <div className="container ajouter-cmd-four Myfont">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header cardHeader text-white">
                            <h3>Nouveau commande</h3>
                            {alert(alertMessage)}
                        </div>
                        <div className="card-body cardBody">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="dateCmdField">Date de commande</label>
                                        <input type="date" className="form-control" name="dateCommande" id="dateCmdField" ref={dateCmdField} onChange={handleChange} required readOnly />
                                    </div>
                                    <div className="form-group col-md-6 position-relative">
                                        <label className="form-label" htmlFor="statusCmd">Status commande</label>
                                        <select className="form-select" name="statusCommande" id="statusCmd" ref={statusCmd} onChange={handleChange}>
                                            <option value=''>Select status</option>
                                            <option value="EN_ATTENTE">en attente</option>
                                            <option value="EN_PREPARATION">en préparation</option>
                                            <option value="ANNULEE">annulée</option>
                                            <option value="PREPAREE">préparé</option>
                                        </select>
                                        {dispalyErr("statusCmd")}
                                    </div>
                                </div>
                                <br />
                                <h4>Liste des produits à commander</h4>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label className="form-label" htmlFor="produitField">Produit</label>
                                        <select className="form-select" id="produitField" ref={produitField} onChange={handleChange}>
                                            <option value=''>Select produit-reference</option>
                                            {products.map((item, key) => <option key={key} value={item.idProduit}>{item.nomProd}-{item.refProd}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label className="form-label" htmlFor="quantiteField">Quantité</label>
                                        <input type="number" className="form-control" id="quantiteField" ref={quantiteField} placeholder=" Quantité" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label className="form-label" htmlFor="remiseField">Remise</label>
                                        <input type="number" className="form-control" id="remiseField" ref={remiseField} placeholder=" Quantité" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-4 align-self-end">
                                        <button type="button" className="btn btn-dark" onClick={handleClickAddProduct}><i className='fas fa-plus'></i> Ajouter</button>
                                    </div>
                                </div>
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Reference</th>
                                            <th scope="col">Nom</th>
                                            <th scope="col">Prix</th>
                                            <th scope="col">Quantite</th>
                                            <th scope="col">tva</th>
                                            <th scope="col">Remise</th>
                                            <th scope="col">Supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datashow}
                                        <tr>
                                            <td colSpan={5}></td>
                                            <td>total HT</td>
                                            <td>{montantTotalHT}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}></td>
                                            <td>total TTC</td>
                                            <td>{montantTotalTTC}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button type="submit" className="btn btn-primary Myfont me-2"><i className='fas fa-plus'></i> Ajouter commande</button>
                                <button type="reset" className="btn btn-danger Myfont">effacer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default AjouterCommand;
