import React, { useRef } from "react"
import { useState } from "react";
import ServiceCommand from "../backEndService/ServiceCommand";
import { useLocation } from "react-router-dom";
const CreateLivraison = () => {
    const adresseLivraisonField = useRef();
    const dateLivraisonField = useRef();
    const datePrevueField = useRef();
    const dateReceptionField = useRef();
    const statusLivraisonField = useRef();
    const location = useLocation();
    const idCommand = location.state ? location.state.idCommand : null;
    console.log("ID Command:", idCommand);  // Ceci vous aidera à déboguer si l'ID est passé correctement
    const [deliveryData, setDeliveryData] = useState({
        adresseLivraison: '',
        dateLaivrison: '',
        datePrevue: '',
        dateReception: '',
        statusLivraison: ''
    });

    const [alert, setAlert] = useState({ type: '', message: '' });


    const handleChange = (event) => {
        setDeliveryData({
            ...deliveryData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        ServiceCommand.createLivraison(deliveryData, idCommand).then(response => {
            console.log(response.data)
            setAlert({ type: 'success', message: 'La livraison a été créée avec succès.' });

    }).catch(error => {
        console.log(error)
        setAlert({ type: 'danger', message: 'Échec de la création de la livraison.' })
    } )
        
    };
    const handleReset = (event) => {
        event.preventDefault();
        adresseLivraisonField.current.value="";
        dateLivraisonField.current.value="";
        datePrevueField.current.value="";
        dateReceptionField.current.value="";
        statusLivraisonField.current.value="";
        
    };
    const renderAlert = () => {
        if (!alert.message) return null;
        return (
            <div className={`alert ${alert.type === 'danger' ? 'alert-danger' : 'alert-success'}`} role="alert">
                {alert.message}
            </div>
        );
    }

    return (
        <div className="container ajouter-cmd-four Myfont">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between bg-info text-white">
              <h3 className="mb-0">Créer la livraison</h3>
            </div>
            <div className="card-body cardBody" style={{  padding: '20px', borderRadius: '5px' }}>
              {renderAlert()}
              <form onSubmit={handleSubmit}>
                {/* ... Tous les champs de formulaire comme ci-dessus ... */}
                <div className="form-group">
                            <label className="form-label" htmlFor="adresseLivraison">Adresse de Livraison:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="adresseLivraison"
                                name="adresseLivraison"
                                placeholder="saisir l'address de la livraison"
                                value={deliveryData.adresseLivraison}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="dateLaivrison">Date de Livraison:</label>
                            <input
                                type="date"
                                className="form-control"
                                
                                id="dateLaivrison"
                                name="dateLaivrison"
                                value={deliveryData.dateLaivrison}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="datePrevue">Date Prévue:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="datePrevue"
                                name="datePrevue"
                                value={deliveryData.datePrevue}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="dateReception">Date de Réception:</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dateReception"
                                name="dateReception"
                                value={deliveryData.dateReception}
                                required
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="statusLivraison">Statut de Livraison:</label>
                            <select
                                className="form-select"
                                id="statusLivraison"
                                name="statusLivraison"
                                value={deliveryData.statusLivraison}
                                required
                                onChange={handleChange}
                            >
                                <option value="">Sélectionnez un statut</option>
                                <option value="EXPEDIEE">Expédiée</option>
                                <option value="LIVREE">Livrée</option>
                                <option value="EN_RETARD">Retardée</option>
                                <option value="EN_LIVRAISON">En livraison</option>
                            </select>
                        </div>
                      
                <div className="text-center">
                  <button type="submit" className="btn btn-primary me-2">Enregistrer</button>
                  &nbsp;&nbsp;<button type="reset" className="btn btn-danger" onClick={handleReset}>Effacer</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    
}
export default CreateLivraison;