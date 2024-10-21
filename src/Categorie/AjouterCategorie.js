import React from 'react'
import { useState, useRef } from 'react'
import CategorieService from '../backEndService/CategorieService';
const AjouterCategorie = () => {
    const nomCategorieField = useRef();
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState("");
    let isfvalid = true;
    const [categorie, setCategorie] = useState('');
    //start form validation function
    const validatForm = () => {
        setErrors({});
        const nomValue = nomCategorieField.current.value;
        if (nomValue.trim() == '') {
            setErrors(prevState => { return { ...prevState, ...{ nomCategorieField: "nom required" } } });
            isfvalid = false;
        }
        return isfvalid;
    }

    //start handleReset 
    const handleReset = (e) => {
        e.preventDefault();
        nomCategorieField.current.value = '';
    }

    //stat getError function 
    const getError = (field) => {
        return errors[field];
    }

    //start hasErr function 
    const hasErr = (field) => {
        return (getError(field) !== undefined);
    }

    //start displayErr function
    const displayErr = (field) => {
        const element = document.querySelector(`#${field}`);
        if (hasErr(field)) {
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
    const handleChange = (e) => {
        validatForm();
        const nomCategorieValue = e.target.value;
        setCategorie(nomCategorieValue);
        setAlertMessage("");
    }
    //start handlesubmit function 
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatForm()) {
            CategorieService.createCategorie({ nomCategorie: categorie })
                .then(responce => {
                    console.log("categorie ajouté avec succes ", responce.data);
                    setCategorie('');
                    nomCategorieField.current.value = '';
                    setAlertMessage("success");
                })
                .catch(error => {
                    console.error("error pour l'ajout de categorie", error);
                    setAlertMessage("error");
                })

        }
    }
    const alertOfSucces = () => {
        return (<div className='alert alert-success ' role="alert">
            la categorie a été ajouté avec succés
        </div>)
    }
    //function to return alert of error
    //function to return error
    const alertOfError = () => {
        return (
            <div className='alert alert-danger' role="alert">
                error dans l'ajout de categorie
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
        <div className="container ajouter-categorie Myfont">
            <div className="row">
                <div className="col-md-8 card-categorie">
                    <div className="card ">
                        <div className="card-header cardHeader text-white">
                            <h4>Nouvelle Catégorie</h4>                           
                        </div>
                        <div className="card-body cardBody">
                        {alert(alertMessage)}
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="nomCategorieField">Nom catégorie :</label>
                                    <input type="text" name="nomCategorie" id="nomCategorieField" className="form-control" placeholder="nom catégorie" ref={nomCategorieField} onChange={handleChange} />
                                    {displayErr("nomCategorieField")}
                                </div>
                                <div>
                                    <button type="submit" value="Ajouter" className="btn btn-primary" ><i className='fas fa-plus-circle'/>Ajouter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AjouterCategorie