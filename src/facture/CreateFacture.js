// CreateInvoiceForm.js
import React from 'react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import FactureService from '../backEndService/FactureService';
import ServiceCommand from '../backEndService/ServiceCommand';

const CreateFacture = () => {
    const dateFactureField = useRef();
    const datePrevuePayementField = useRef();
    const dateReelPayementField = useRef();
    const statusFactureField = useRef();
    const modPayementField = useRef();

    const location = useLocation();
    const idCommand = location.state ? location.state.idCommand : null;
    

    console.log("l id command : ",idCommand )


    const [formData, setFormData] = useState({
        //idFacture: idFacture,
        modPayement: '',
        dateFacture: '',
        dateReelPayement: '',
        datePrevuePayement: '',
        statusFacture: '',
    
    });

    const [alert, setAlert] = useState({ type: '', message: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleFacture = (event) => {
        event.preventDefault();
        ServiceCommand.createFacture(formData, idCommand)
            .then(response => {
                setAlert({ type: 'success', message: 'Facture created successfully!' });
                // Optionally reset form here if needed
            })
            .catch(error => {
                console.error('Error creating facture:', error);
                setAlert({ type: 'error', message: 'Failed to create facture.' });
            });
    }

    const handleReset = () => {
        setFormData({
            modPayement: '',
            dateFacture: '',
            dateReelPayement: '',
            datePrevuePayement: '',
            statusFacture: '',
        });
        setAlert({}); // Clear any alerts when form is reset
    }

    const renderAlert = () => {
        if (!alert.message) return null;
        return (
            <div className={`alert ${alert.type === 'error' ? 'alert-danger' : 'alert-success'}`} role="alert">
                {alert.message}
            </div>
        );
    }
  

    return (
        <div className="container ajouter-cmd-four Myfont">
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header bg-info text-white">
                        <h3>Créer la Facture</h3>
                    </div>
                    <div className="card-body cardBody">
                    {renderAlert()}
                        {/* Reste du formulaire */}
                        <form onSubmit={handleFacture} onReset={handleReset}>
                            {/* Champs du formulaire */}
                            {/* ... */}
                            <div className="mb-3">
                        <label htmlFor="modPayement" className="form-label">Mode de Paiement:</label>
                        <select 
                        name="modPayement"
                        className="form-select"
                        id="modPayement"
                        value={formData.modPayement}
                        onChange={handleInputChange}
                        required
                        >
                            <option value=''>séléctionnez le mode de paiement : </option>
                            <option value="CHEQUE">Chèque</option>
                            <option value="ESPECE">Espèce</option>
                            <option value="CARTE_BANCAIRE">Carte bancaire</option>
                            <option value="VIREMENT_BANCAIRE">Virement Bancaire</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateFacture" className="form-label">Date de Facture:</label>
                        <input 
                        name="dateFacture"
                        type="date"
                        className="form-control"
                        id="dateFacture"
                        ref={dateFactureField}
                        value={formData.dateFacture}
                        onChange={handleInputChange}
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="datePrevuePayement" className="form-label">Date prévue de paiement:</label>
                        <input 
                        name="datePrevuePayement"
                        type="date"
                        className="form-control"
                        id="datePrevuePayement"
                        ref={datePrevuePayementField}
                        value={formData.datePrevuePayement}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateReelPayement" className="form-label">Date réelle de paiement:</label>
                        <input 
                        name="dateReelPayement"
                        type="date"
                        className="form-control"
                        id="dateReelPayement"
                        ref={dateReelPayementField}
                        value={formData.dateReelPayement}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="statusFacture" className="form-label">Statut de la facture:</label>
                        <select 
                        name="statusFacture"
                        id="statusFacture"
                        ref={statusFactureField}
                        className="form-select"
                        onChange={handleInputChange}
                        value={formData.statusFacture}
                        required
                        >
                        <option value=''>Sélectionnez un statut</option>
                        <option value="NON_PAYEE">Non payée</option>
                        <option value="PAYEE">Payée</option>
                        <option value="EN_RETARD">En retard</option>
                        </select>
                    </div>
                    
                            {/* Boutons */}
                            <div className="form-row">
                                <div className="col-md-12 text-center">
                                    <button type="submit" className="btn btn-primary Myfont me-2">
                                        Enregistrer
                                    </button>
                                    <button type="reset" className="btn btn-danger Myfont">
                                        Effacer
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CreateFacture;
