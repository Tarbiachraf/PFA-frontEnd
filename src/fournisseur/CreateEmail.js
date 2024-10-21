import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FournisseurService from '../backEndService/FournisseurService';
import sendPdfToServer from './SendPdfToServer';
const CreateEmail = () => {
    const [showForm, setShowForm] = useState(false);
    const [showAlert, setShowAlert] = useState(true);
    const  [alertMessage,setAlertMessage]=useState('successCmd');
    const [email,setEmail]=useState("");
    const destinataire=useRef();
    const sujet=useRef();
    const message=useRef();
    const location =useLocation();
    const {state}=location;
    const obj=state || {};
    const idCommande=obj.idCommande;
    const idFournisseur=obj.idFournisseur;
    const msg=obj.addCmd;
    const navigate=useNavigate();

    useEffect(()=>{
        getFournisseur();
        if (email){
            destinataire.current.value=email;
        }
       
    },[])
    //function to get fournisseur
    const getFournisseur = () =>{
        FournisseurService.getFournisseur(idFournisseur)
            .then(response =>{
                console.log("get fournisseur was succed");
                setEmail(response.data.emailResponsable);               
            })
    }

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };


    const alertOfSuccesCmd = () => {
        return (
            <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '80%' ,textAlign:'center' ,fontFamily:' Arial, sans-serif',textAlign:'center' }}>
                <span  > la commande à bien traité avec succés</span> 
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
    const alertOfSuccesEmail = () => {
        return (
            <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '80%',fontFamily:' Arial, sans-serif',textAlign:'center' }}>
                <span >Email a été envoyé avec succés</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
    const alertOfError = () => {
        return (
            <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '80%' ,fontFamily:' Arial, sans-serif'}}>
                <span>error d'envoie d'email</span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
    const alert = (alertMessage) => {
        switch (alertMessage) {
            case "successCmd":
                return alertOfSuccesCmd();
            case "successEmail":
                return alertOfSuccesEmail();
            case "error":
                return alertOfError();
            case "":
                return null;
        }
    }


    //function to handle download click 
    const handleDownload = (idCmd) => {
       navigate("/BonCmdDocument",{state:{idCmd}})
    }

    //function to handle send email
    const handleSendEmail = (e) => {
        e.preventDefault();
         const toValue=destinataire.current.value;
         const sujetValue=sujet.current.value;
         const messageValue=message.current.value;
        if(sendPdfToServer(idCommande,toValue,sujetValue,messageValue)){
            setAlertMessage("successEmail");
        } 
        else{
            setAlertMessage("error");
        }
    }

    return (
        <div className="interface-container Myfont">
            {alert(alertMessage)}
            <div className="top-section">
                <button className="action-button" style={{ width: '80%', height: '40px' }} onClick={()=>{handleDownload(idCommande)}}>Voir et Télécharger la Commande</button>
                <button className="action-button" onClick={toggleForm} style={{ width: '60%', height: '40px' }} >Envoyer bon commade via email</button>
            </div>
            {showForm && (
                <form className="container mt-4 border rounded p-4 emaile-form" style={{ width: '80%' }}>
                    <div className="form-group">
                        <label htmlFor="destinataire">Email de Destination :</label>
                        <input type="email" id="destinataire" ref={destinataire} name="destinataire" style={{fontWeight:'bold'}}  className="form-control "  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sujet">Sujet :</label>
                        <input type="text" id="sujet" name="sujet" ref={sujet} className="form-control" placeholder="Saisir l'objet (if any)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message :</label>
                        <textarea id="message" name="message" ref={message} className="form-control" rows="5" placeholder="ajouter un message (if any)"></textarea>
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={handleSendEmail}>Envoyer</button>
                </form>
            )}

        </div>
    );
};

export default CreateEmail