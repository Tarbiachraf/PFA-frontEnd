import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';

const ContacterFournisseur = () => {
    const location = useLocation();
    const { state } = location || {};
    const dist = state?state.email:null;
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert,setShowAlert]=useState(false);
    const destinataire = useRef();
    const sujet = useRef();
    const message = useRef();
    const [email, setEmail] = useState({ to: dist, subject: '', message: '' });
    

    const closeAlert =()=>{
        setShowAlert(false);     
    }
    useEffect(() => {
        initForm();
    }, []);
    
    const initForm =() =>{
        destinataire.current.value=dist;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmail(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(email);
    }


    const resetForm = () => {
        destinataire.current.value = '';
        sujet.current.value = '';
        message.current.value = '';
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email)
        const formData = new FormData();
        formData.append("to", email.to);
        formData.append("subject", email.subject);
        formData.append("message", email.message);
        console.log("formData", formData);
        try {
            const response = fetch("http://localhost:8088/api/commandesFournisseur/sendEmail", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Le PDF a été envoyé et traité par le serveur.");
                setAlertMessage("success")
                resetForm();
            } else {
                console.error("Une erreur est survenue lors de l'envoi du PDF.");
                setAlertMessage("error")
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi du PDF au serveur:", error);
            setAlertMessage("error");
        }
    }

    const alertMsg = (msg) => {
        switch (msg) {
            case '':
                return <div></div>;
            case "error":
                return (
                    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                        <span >Email a été envoyé avec succés </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            case "success":
                return (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                    <span >error dans l'envoie d'email </span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                )
        }
    }


    return (
        <div className="container ajouter-four">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-info text-white" style={{textAlign:'center'}}>
                            <h3>Contacter le  Fournisseur</h3>        
                        </div>
                        <div className="card-body  card-mail">
                            {alertMsg(alertMessage)}
                            <form className="container mt-4 email-form" style={{ backgroundBlendMode: 'darken' }} onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="destinataire">Email de Destination :</label>
                                    <input type="email" id="destinataire" name="to" ref={destinataire} className="form-control" onChange={handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sujet">Sujet :</label>
                                    <input type="text" id="sujet" name="subject" ref={sujet} className="form-control" placeholder="Saisir l'objet (if any)" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message :</label>
                                    <textarea id="message" name="message" ref={message} className="form-control" rows="10" placeholder="ajouter un message (if any)" onChange={handleChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Envoyer</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContacterFournisseur