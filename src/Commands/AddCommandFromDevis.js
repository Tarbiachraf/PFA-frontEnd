import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommandService from '../backEndService/ServiceDevis';

const AddCommandFromDevis = ({ idDevis }) => { // Recevoir idDevis comme prop
  const dateCommande = useRef();
  const statusCommande = useRef();
  const file = useRef();
  const navigate = useNavigate();
  
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const [commandeDto, setCommandeDto] = useState({
    "dateCommande": "",
    "statusCommande": "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const closeAlert = () => {
    setShowAlert(false);
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    dateCommande.current.value = '';
    statusCommande.current.value = '';
    file.current.value = null;
  };

  const handleInputChange = (event) => {
    setAlertMessage('');
    const { name, value, type } = event.target;
    if (type === 'file') {
      setSelectedFile(event.target.files[0]);
    } else {
      setCommandeDto(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    console.log(commandeDto);
    console.log(selectedFile);
  };

  // Fonctions pour les alertes
  const alertOfError = () => (
    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <span>Erreur lors de l'ajout de la commande</span>
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  const alertSuccess = () => (
    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <span>La commande a été ajoutée avec succès</span>
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );

  const alert = (alertMessage) => {
    switch (alertMessage) {
      case "error": return alertOfError();
      case "success": return alertSuccess();
      case "": return null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("dateCommande", commandeDto.dateCommande);
    formData.append("statusCommande", commandeDto.statusCommande);
    formData.append("idDevis", idDevis); // Ajouter l'ID du devis aux données

    CommandService.createCommandeFromDevis(formData)
      .then(response => {
        setAlertMessage("success");
        resetForm();
        setTimeout(() => {
          navigate("/ListCommand"); // Naviguez après 5 secondes
        }, 5000);
      })
      .catch(error => {
        console.error("Erreur lors de la création de la commande", error);
        setAlertMessage('error');
      });
  };

  return (
    <div className='container mt-2 ajouter-commande Myfont' style={{
      position: 'absolute',
      top: '220px',
      right: '350px',
      zIndex: 10000,
    }}>
      <div className='row'>
        <div className='col-12'>
          <div className='card' style={{ maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
            <div className='card-header bg-info '>
              <h3>Ajouter une Commande</h3>
              
            </div>
            
            <div className='card-body cardBody'>
            {alert(alertMessage)}
              <form onSubmit={handleSubmit} >
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="dateCommande">Date de la Commande</label>
                    <input type="date" className="form-control" name="dateCommande" id="dateCommande" ref={dateCommande} onChange={handleInputChange} placeholder="Date de la commande" required />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="statusCommande">Statut de la Commande</label>
                    <select className="form-control" name="statusCommande" id="statusCommande" ref={statusCommande} onChange={handleInputChange} required>
                      <option value=''>Sélectionnez le statut de la commande</option>
                      <option value='EN_ATTENTE'>En attente</option>
                      <option value='EN_PREPARATION'>En préparation</option>
                      <option value='PREPAREE'>Préparée</option>
                      <option value='ANNULEE'>Annulée</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="file">Document du Bon de Commande :</label>
                  <input type="file" className="form-control" name="file" id="file" ref={file} onChange={handleInputChange} placeholder="Document du bon de commande" required />
                </div>
                <button type="submit" className="btn btn-primary"><i className='fas fa-plus'></i> Ajouter</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCommandFromDevis;
