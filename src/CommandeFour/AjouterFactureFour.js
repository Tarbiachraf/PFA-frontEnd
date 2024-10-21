import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FactureFourService from '../backEndService/FactureFourService';


const AjouterFactureFour = () => {
  const dateFacture = useRef();
  const statusPaiement = useRef();
  const moyenneReglement = useRef();
  const valide = useRef();
  const file = useRef();
  const location = useLocation();
  const { state } = location;
  const idCmd = state.idCmd;
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();
  const [factureDto, setFactureDto] = useState({
    "idCommande": idCmd,
    "dateFacture": "",
    "statusPaiement": "",
    "statusPaiement": "",
    "valide": false,
  })
  const [selectedFile, setSelectedFile] = useState(null);

  const closeAlert = () => {
    setShowAlert(false);
  };

  //funciton to reset form 
  const resetForm = () => {
    dateFacture.current.value = '';
    statusPaiement.current.value = '';
    moyenneReglement.current.value = '';
    valide.current.value = false;
    file.current.value=null;
  }


  const handleInputChange = (event) => {
    setAlertMessage('');
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setFactureDto(prevState => ({
        ...prevState,
        [name]: checked
      }))
    }
    else if (type === 'file') {
      setSelectedFile(event.target.files[0]);
    }
    else {
      setFactureDto(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
    console.log(factureDto);
    console.log("file:", selectedFile);

  }


//function de gestion des alerts

const alertOfError = () => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
      <span >error dans l'ajoute de facture </span>
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}
const alertSuccess = () => {
  return (
    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
      <span >la facture à été ajouté avec succés </span>
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}
const alert = (alertMessage) => {
  switch (alertMessage) {
    case "error":
      return alertOfError();
    case "success":
      return alertSuccess();
    case "":
      return null;
  }
}

const navigateToDetails = (idCmd) => {
  navigate("/DetailsCommande", { state: { idCmd } })
}

//functio to navigate to detail commande
const handleSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData()
  formData.append("file", selectedFile);
  formData.append("idCommande", factureDto.idCommande);
  formData.append("dateFacture", factureDto.dateFacture);
  formData.append("statusPaiement", factureDto.statusPaiement);
  formData.append("moyenneReglement", factureDto.moyenneReglement);
  formData.append("valide", factureDto.valide);
  console.log(factureDto);
  FactureFourService.createFacture(formData)
    .then(response => {
      setAlertMessage("success");
      resetForm();
      navigateToDetails(idCmd);
    })
    .catch(error => {
      setAlertMessage("error");
      console.error("error to create facture", error);
    })

};

return (
  <div className='container mt-2 ajouter-facture Myfont'>
    <div className='row'>
      <div className='col-12'>
        <div className='card' style={{ maxHeight: 'calc(100vh - 100px)', width: "800" }}>
          <div className='card-header bg-info '>
            <h3>Ajouter Facture</h3>           
          </div>
          <div className='card-body cardBody'>
          {alert(alertMessage)}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="dateFacture">Date du facture</label>
                  <input type="date" className="form-control" name="dateFacture" id="dateFacture" ref={dateFacture} onChange={handleInputChange} placeholder="date facture" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 position-relative">
                  <label htmlFor="moyenneReglement">Mode de réglement</label>
                  <select className="form-control" name="moyenneReglement" id="moyenneReglement" ref={moyenneReglement} onChange={handleInputChange} required>
                    <option value=''>Select mode de reglement </option>
                    <option value='CACH_ON_DELIVRY'>cach on delivery</option>
                    <option value='CHEQUE'>chéque</option>
                    <option value='VAIREMENTBANCAIRE'>vairement bancaire</option>
                    <option value='TRAITEBANCAIRE'>traite bancaire</option>
                  </select>
                  <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '70%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 position-relative">
                  <label htmlFor="statusPaiement">Status Paiement</label>
                  <select className="form-control" name="statusPaiement" id="statusPaiement" ref={statusPaiement} onChange={handleInputChange} required>
                    <option value=''>Select status de paiement </option>
                    <option value='CONTISTEE'>constistee</option>
                    <option value='PAYEE'>payée</option>
                    <option value='PARIELLEMENT_PAYEE'>partiellement payée</option>
                    <option value='EN_RETARD'>en retard</option>
                  </select>
                  <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '70%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="file">Document :(veuillez entrer un document scanné de cette facture)</label>
                <input type="file" className="form-control" name="file" id="file" ref={file} onChange={handleInputChange} placeholder=" facture document " required />
              </div>
              <div className='form-row'>
                <div className='form-group com-md-6'>
                  &nbsp; &nbsp;<span style={{ fontWeight: 'bolder' }}>Valide :</span> &nbsp; &nbsp; &nbsp;<input className="form-check-input" type="checkbox" name='valide' id="valide" ref={valide} onChange={handleInputChange} />
                </div>
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

export default AjouterFactureFour
