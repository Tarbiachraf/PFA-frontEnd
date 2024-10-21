import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import CategorieService from '../backEndService/CategorieService';
import ProductService from '../backEndService/ProductService';
import FournisseurService from '../backEndService/FournisseurService';

const ModefieProduit = () => {
  const refProduit = useRef();
  const nomProduit = useRef();
  const prixProduit = useRef();
  const details = useRef();
  const categorieProduit = useRef();
  const tva = useRef();
  const fournisseur = useRef();
  const prixProduitAchat = useRef();
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  let isValide = true;
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const { state } = location;
  const { idP, refP, nomP, prixP, prixAchat, categorieP, detailsP, tvaN, idFour } = state || {};
  const [produit, setProduit] = useState({ refProd: refP, nomProd: nomP, prixUnitaireHT: prixP, prixAchatHT: prixAchat, details: detailsP, category: categorieP, tva: tvaN, idFournisseur: idFour })
  const [fournisseurs, setFournisseurs] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    CategorieService.getAllCategorie()
      .then(responce => {
        setCategories(responce.data);
        console.log("les categorie  a été chargé avec succes");
      })
      .catch(error => {
        console.error("error dans le chargement des categorie");
      })
    initFieldValue();
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

  //initialise les champ de formulaire
  const initFieldValue = () => {
    refProduit.current.value = refP;
    nomProduit.current.value = nomP;
    prixProduit.current.value = prixP;
    details.current.value = detailsP;
    categorieProduit.current.value = categorieP;
    tva.current.value = tvaN;
    prixProduitAchat.current.value = prixAchat;
  }

  /*start handle reset produit*/
  const handleReset = (e) => {
    e.preventDefault();
    refProduit.current.value = '';
    nomProduit.current.value = '';
    prixProduit.current.value = '';
    details.current.value = '';
    categorieProduit.current.value = '';
    tva.current.value = '';
    fournisseur.current.value = '';
    prixProduitAchat.current.value = '';
  }
  const handleReset2 = () => {
    refProduit.current.value='';
    nomProduit.current.value = '';
    prixProduit.current.value = '';
    details.current.value = '';
    categorieProduit.current.value = '';
    tva.current.value = '';
    prixProduitAchat.current.value = '';
    fournisseur.current.value='';
  }
  /*end handle reset produit*/

  /*start handle form validation */
  const validateForm = () => {
    setErrors({});

    const refValue = refProduit.current.value;
    const nomValue = nomProduit.current.value;
    const prixValue = prixProduit.current.value;
    const detailsValue = details.current.value;
    const categorieValue = categorieProduit.current.value;
    const tvaValue = tva.current.value;
    const fournisseurValue = fournisseur.current.value;
    const prixAchatValue = prixProduitAchat.current.value;
   /* if (fournisseurValue.trim() == '') {
      setErrors(prevState => {
        return { ...prevState, ... { fournisseur: "ref required" } };
      });
      isValide = false;
    }*/
    if (refValue.trim() == '') {
      setErrors(prevState => {
        return { ...prevState, ... { refProduit: "ce champ est obligatoire" } };
      });
      isValide = false;
    }
    if (nomValue.trim() == '') {
      setErrors(prevState => {
        return { ...prevState, ... { nomProduit: "ce champ est obligatoire" } };
      });
      isValide = false;
    }
    if (prixValue.trim() == '') {
      setErrors(prevState => {
        return { ...prevState, ... { prixProduit: "ce champ est obligatoire" } };
      });
      isValide = false;
    }
    if (prixAchatValue.trim() == '') {
      setErrors(prevState => { return { ...prevState, ...{ prixProduitAchat: "ce champ est obligatoire" } } });
      isValide = false;
    }
    if (detailsValue.trim() == '') {
      setErrors(prevState => {
        return { ...prevState, ... { details: "ce champ est obligatoire" } };
      });
      isValide = false;
    }
    /*if (categorieValue.trim() == '') {
      setErrors(prevState => {
        return { ...prevState, ... { categorieProduit: "ce champ est obligatoire" } };
      });
      isValide = false;
    }*/
    if (tvaValue < 0 || tvaValue > 100) {
      setErrors(prevState => {
        return { ...prevState, ... { tva: "la tva doit étre compris entre 0 et 100 poucent" } };
      });
      isValide = false;
    }
    return isValide;
  }
  /*end handle form validation*/

  //function to get error of given field
  const getError = (field) => {
    return errors[field];
  }

  //function to verify if a field has en error
  const hasError = (field) => {
    return (getError(field) !== undefined);
  }

  /*start display error function of a given element*/
  const displayErr = (field) => {
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
    return null;
  }
  /*end display error function of a given element */

  // handlechange function 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduit(prevProduit => ({
      ...prevProduit,
      [name]: value
    }));
    console.log(produit);
    validateForm();
    setAlertMessage("");
  }

  /*start handleSubmit function*/
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(produit)
      ProductService.updateProduct(produit, idP)
        .then(responce => {
          console.log("produit modefié avec succes", responce.data);
          setProduit({
            refProd: '',
            nomProd: '',
            prixUnitaireHT: 0,
            prixAchatHT: 0,
            details: '',
            category: 0,
            tva: 0
          });
          handleReset2();
          setAlertMessage("success");
        })
        .catch(error => {
          console.error("error de modefier le produit ", error);
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
        <span >le produit à été Modefié avec succés </span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>)
  }
  //function to return alert of error
  //function to return error
  const alertOfError = () => {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >error dans la Modefication  de produit </span>
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
  return (
   <>
        <div className="container ajouter-produit Myfont">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header cardHeader text-white">
              <h3>Modefier Produit</h3>           
            </div>
            <div className="card-body cardBody">
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
                    <label className="form-label" htmlFor="prixProduitAchat">Prix prix hors taxes d'achat :</label>
                    <input type="number" name="prixAchatHT" id="prixProduitAchat" className="form-control" placeholder="prix unitaire d'achat" ref={prixProduitAchat} onChange={handleChange} />
                    {displayErr("prixProduitAchat")}
                  </div>
                  <div className="form-group col-md-6 position-relative">
                    <label htmlFor="categorieProduit">Fournisseur :</label>
                    <select className="form-control" name="idFournisseur" id="fournisseur" ref={fournisseur} onChange={handleChange}>
                      <option value="">Sélectionner fournisseur</option>
                      {fournisseurs.map(fournisseur => (
                        <option key={fournisseur.idFournisseur} value={fournisseur.idFournisseur}>{fournisseur.raisonSocial}</option>
                      ))}
                    </select>
                    <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '70%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                    {displayErr("fournisseur")}
                  </div>
                </div>
                <div className='form-row'>
                  <div className="form-group col-md-6">
                    <label className="form-label" htmlFor="prixProduit">Prix hors taxes de vente :</label>
                    <input type="number" name="prixUnitaireHT" id="prixProduit" className="form-control" placeholder="prix unitaire de vente" ref={prixProduit} onChange={handleChange} />
                    {displayErr("prixProduit")}
                  </div>
                  <div className="form-group col-md-6 position-relative">
                    <label htmlFor="categorieProduit">Catégorie :</label>
                    <select className="form-control" name="category" id="categorieProduit" ref={categorieProduit} onChange={handleChange}>
                      <option value="">Sélectionner catégorie</option>
                      {categories.map(categorie => (
                        <option key={categorie.idCategorie} value={categorie.idCategorie}>{categorie.nomCategorie}</option>
                      ))}
                    </select>
                    <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '54%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
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
                    <textarea id="details" rows={1} name="details" className="form-control" placeholder="saisir les détails du produit" ref={details} onChange={handleChange} />
                    {displayErr("details")}
                  </div>
                </div>
                <div>
                  <input type="submit" value="Modefier" className="btn btn-primary" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="reset" value="Reset" className="btn btn-danger" onClick={handleReset} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default ModefieProduit