import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import ProductService from '../backEndService/ProductService';
import CategorieService from '../backEndService/CategorieService';
import FournisseurService from '../backEndService/FournisseurService';
const AjouterProduit = () => {
  const refProduit = useRef();
  const nomProduit = useRef();
  const prixProduit = useRef();
  const prixProduitAchat = useRef();
  const details = useRef();
  const categorieProduit = useRef();
  const tva = useRef();
  const fournisseur = useRef();
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [produit, setProduit] = useState({ refProd: '', nomProd: '', prixUnitaireHT: 0,prixAchatHT:0, details: '', category: 0, tva: 0, idFournisseur: 0 })
  let isValide = true;
  const [showAlert, setShowAlert] = useState(true);
  const [categories, setCategories] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  //get all getegories in did mount component 
  useEffect(() => {
    CategorieService.getAllCategorie()
      .then(responce => {
        setCategories(responce.data);
        console.log("les categorie a été chargé avec succes");
      })
      .catch(error => {
        console.error("error dans le chargement des categorie");
      });
    getAllFournisseur();
  }, [])

  const getAllFournisseur = () => {
    FournisseurService.getAllFournisseurs()
      .then(response => {
        setFournisseurs(response.data);
        console.log("success to get all fournisseur");
      })
      .catch(error => {
        console.error("error to getall fournisseur");
      })
  }
  /* start handle reset button action*/
  const handleReset = (e) => {
    e.preventDefault();
    refProduit.current.value = '';
    nomProduit.current.value = '';
    prixProduit.current.value = '';
    details.current.value = '';
    categorieProduit.current.value = '';
    tva.current.value = '';
    fournisseur.current.value = '';
    prixProduitAchat.current.value ='';
  }
  const handleReset2 = () => {
    refProduit.current.value = '';
    nomProduit.current.value = '';
    prixProduit.current.value = '';
    details.current.value = '';
    categorieProduit.current.value = '';
    tva.current.value = '';
    fournisseur.current.value = '';
    prixProduitAchat.current.value ='';
  }
  /*end handle reset button action*/

  /*start handle form validation*/
  const formValidate = () => {
    setErrors({});
    const refValue = refProduit.current.value;
    const nameValue = nomProduit.current.value;
    const prixValue = prixProduit.current.value;
    const detailValue = details.current.value;
    const categorieValue = categorieProduit.current.value;
    const tvaValue = tva.current.value;
    const fournisseurValue = fournisseur.current.value;
    const prixAchatValue=prixProduitAchat.current.value ;

    if (fournisseurValue.trim() == '') {
      setErrors(prevState => { return { ...prevState, ...{ fournisseur: "ce champ est obligatoire" } } });
      isValide = false;
    }
    if (refValue.trim() == '') {
      setErrors(prevState => { return { ...prevState, ...{ refProduit: "ce champ est obligatoire" } } });
      isValide = false;
    }
    if (nameValue.trim() == '') {
      setErrors(prevState => { return { ...prevState, ...{ nomProduit: "ce champ est obligatoire" } } });
      isValide = false;
    }
    if (prixValue.trim() == '') {
      setErrors(prevState => { return { ...prevState, ...{ prixProduit: "ce champ est obligatoire" } } });
      isValide = false;
    }
    if (prixAchatValue.trim() == '') {
      setErrors(prevState => { return { ...prevState, ...{prixProduitAchat: "ce champ est obligatoire" } } });
      isValide = false;
    }
    if (detailValue.trim() == '') {
      setErrors(prevState => { return { ...prevState, ...{ details: "ce champ est obligatoire" } } });
      isValide = false;
    }
    if (categorieValue.trim() == '') {
      setErrors(prevState => { return { ...prevState, ...{ categorieProduit: "ce champ est obligatoire" } } });
      isValide = false;
    }
    if (tvaValue < 0 || tvaValue > 100) {
      setErrors(prevState => { return { ...prevState, ...{ tva: "la tva doit etre compris entre 0 et 100" } } });
      isValide = false;
    }
    return isValide;
  }
  /*end form validation*/

  // function get error of given field 
  const getError = (field) => {
    return errors[field];
  }

  //function to verify if a field has error or not

  const hasError = (field) => {
    return (getError(field) !== undefined);
  }

  //functio to display error after every invalid input

  const displayErr = (field) => {
    const element = document.querySelector(`#${field}`);
    if (hasError(field)) {
      element.style.border = "1px solid red";
      return (
        <div>
          <div className='text text-danger'>{getError(field)}</div>
        </div>
      )
    }
    if (element !== null) {
      element.removeAttribute('style');
    }
    return null;
  }

  /*end form handle change */
  const handleChange = (event) => {
    formValidate();
    const { name, value } = event.target;
    setProduit(prevProduit => ({
      ...prevProduit,
      [name]: value
    }));
    console.log(produit);
    setAlertMessage("");
  }


  /*end form handle change*/

  /*function handle submit*/
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValidate()) {
      ProductService.createProduct(produit)
        .then(responce => {
          console.log("produit ajouté avec succes", responce.data);
          setProduit({
            refProd: '',
            nomProd: '',
            prixUnitaireHT: 0,
            prixAchatHT:0,
            details: '',
            category: 0.0,
            tva: 0,
            fournisseur: 0
          });
          handleReset2();
          setAlertMessage("success");
        })
        .catch(error => {
          console.error("error de l'ajout de produit ", error);
          setAlertMessage("error");
        })

    }
  }

  const closeAlert = () => {
    setShowAlert(false);
  };
  const alertOfSucces = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >le produit à été ajouté avec succés </span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>)
  }
  //function to return alert of error
  //function to return error
  const alertOfError = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >error dans l'jout de produit </span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }

  //function to return a correspondant alert
  const alert = (message) => {
    switch (message) {
      case "error":
        return alertOfError();
      case "success":
        return alertOfSucces();
      default:
        return null;

    }

  }
  /*end function handle submit*/

  return (
    <div className="container ajouter-produit  Myfont">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header  text-white cardHeader" >
              <h3>Nouveau Produit</h3>
              
            </div>
            <div className="card-body cardBody"  >
              {alert(alertMessage)}
              <form onSubmit={handleSubmit}>
                <div className='form-row'>
                  <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="refProduit">Référence produit :</label>
                    <input type="text" name="refProd" id="refProduit" className="form-control" placeholder="ref produit" ref={refProduit} onChange={handleChange} />
                    {displayErr("refProduit")}
                  </div>
                  <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="nomProduit">Nom produit :</label>
                    <input type="text" name="nomProd" id="nomProduit" className="form-control" placeholder="nom produit" ref={nomProduit} onChange={handleChange} />
                    {displayErr("nomProduit")}
                  </div>
                </div>
                <div className='form-row'>
                  <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="prixProduit">Prix hors taxes achat:</label>
                    <input type="number" name="prixUnitaireHT" id="prixProduit" className="form-control" placeholder="prix unitaire d'achat" ref={prixProduit} onChange={handleChange} />
                    {displayErr("prixProduit")}
                  </div>
                  <div className="form-group col-md-6 position-relative">
                    <label htmlFor="categorieProduit">Fournisseur :</label>
                    <select className="form-control" name="idFournisseur" id="fournisseur" ref={fournisseur} onChange={handleChange}>
                      <option value="">Sélectionner fournisseur</option>
                      {fournisseurs.map(fournisseur => (
                        <option key={fournisseur.idFournisseur} value={fournisseur.idFournisseur}>{fournisseur.raisonSocial}</option>
                      ))}
                    </select>
                    <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '74%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                    {displayErr("fournisseur")}
                  </div>
                </div>
                <div className='form-row'>
                  <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="prixProduitAchat">Prix prix hors taxes vente :</label>
                    <input type="number" name="prixAchatHT" id="prixProduitAchat" className="form-control" placeholder="prix unitaire de venter" ref={prixProduitAchat} onChange={handleChange} />
                    {displayErr("prixProduitAchat")}
                  </div>
                  <div className="form-group col-md-6 position-relative">
                    <label htmlFor="categorieProduit">Catégorie :</label>
                    <select className="form-control" name="category" id="categorieProduit" ref={categorieProduit} onChange={handleChange}>
                      <option value="">Sélectionner catégorie</option>
                      {categories.map(categorie => (
                        <option key={categorie.idCategorie} value={categorie.idCategorie}>{categorie.nomCategorie}</option>
                      ))}
                    </select>
                    <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '74%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                    {displayErr("categorieProduit")}
                  </div>
                </div>
                <div className='form-row'>
                  <div className="form-group col-md-6">
                    <label htmlFor="tva">TVA :</label>
                    <input typee="number" id="tva" name="tva" className="form-control" placeholder="saisir la TVA du produit" ref={tva} onChange={handleChange} />
                    {displayErr("tva")}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="details">Détails produit :</label>
                    <textarea id="details" name="details" className="form-control" rows={1} placeholder="saisir les détails du produit" ref={details} onChange={handleChange} />
                    {displayErr("details")}
                  </div>
                </div>
                <div>
                  <input type="submit" value="Ajouter" className="btn btn-primary" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="reset" value="Reset" className="btn btn-danger" onClick={handleReset} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >
    </div >


  );
}

export default AjouterProduit;