import React, { useRef, useState } from 'react';
import ClientService from '../backEndService/ServiceClient';

const AjouterClient = () => {
    const nomClientRef = useRef();
    const prenomClientRef = useRef();
    const societeRef = useRef();
    const paysRef = useRef();
    const villeRef = useRef();
    const telRef = useRef();
    const emailRef = useRef();
    const codePostalRef = useRef();
    const codeComptableRef = useRef();
    const addressRef = useRef();
    const rcRef = useRef();
    const cnssRef = useRef();

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
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleReset = () => {
        const resetFields = [nomClientRef, prenomClientRef, societeRef, paysRef, villeRef, telRef, emailRef, codePostalRef, codeComptableRef, addressRef, rcRef, cnssRef];
        resetFields.forEach(ref => {
            if (ref.current) {
                ref.current.value = '';
            }
        });
        setClient({
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
        setAlertMessage("");
    };

    const handleChange = (event) => {
        setAlertMessage("");
        const { name, value } = event.target;
        setClient(prevClient => ({
            ...prevClient,
            [name]: value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        ClientService.ajouterClient(client)
            .then(response => {
                console.log("Client added successfully", response.data);
                handleReset();
                setAlertMessage("success");
            })
            .catch(error => {
                console.error("Error adding client", error);
                setAlertMessage("error");
            });

    };

    const closeAlert = () => {
        setShowAlert(false);
    };
    const alertOfSucces = () => {
        return (
            <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                <span >le client à été ajouté avec succés </span>
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
                <span >error dans l'jout de client </span>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }

    //function to return a correspondant alert
    const Myalert = (message) => {
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
        <div className="container ajouter-four">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-info text-white">
                            <h3>Ajouter un nouveau client</h3>
                        </div>
                        <div className="card-body">
                            {Myalert(alertMessage)}
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="nomClient">Nom</label>
                                        <input type="text" className="form-control" name="nomClient" id="nomClient" ref={nomClientRef} placeholder="Nom" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="prenomClient">Prénom</label>
                                        <input type="text" className="form-control" name="prenomClient" id="prenomClient" ref={prenomClientRef} placeholder="Prénom" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="societe">Société</label>
                                        <input type="text" className="form-control" name="societe" id="societe" ref={societeRef} placeholder="Société" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="pays">Pays</label>
                                        <input type="text" className="form-control" name="pays" id="pays" ref={paysRef} placeholder="Pays" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="ville">Ville</label>
                                        <input type="text" className="form-control" name="ville" id="ville" ref={villeRef} placeholder="Ville" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="tel">Téléphone</label>
                                        <input type="tel" className="form-control" name="tel" id="tel" ref={telRef} placeholder="Téléphone" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" className="form-control" name="email" id="email" ref={emailRef} placeholder="Email" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="codePostal">Code Postal</label>
                                        <input type="text" className="form-control" name="codePostal" id="codePostal" ref={codePostalRef} placeholder="Code Postal" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="codeComptable">Code Comptable</label>
                                        <input type="text" className="form-control" name="codeComptable" id="codeComptable" ref={codeComptableRef} placeholder="Code Comptable" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="address">Adresse</label>
                                        <input type="text" className="form-control" name="address" id="address" ref={addressRef} placeholder="Adresse" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="rc">Registre de Commerce</label>
                                        <input type="text" className="form-control" name="rc" id="rc" ref={rcRef} placeholder="Registre de Commerce" onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="cnss">CNSS</label>
                                        <input type="text" className="form-control" name="cnss" id="cnss" ref={cnssRef} placeholder="CNSS" onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Ajouter client</button>&nbsp;&nbsp;
                                        <button type="reset" className="btn btn-danger">Effacer</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AjouterClient;
