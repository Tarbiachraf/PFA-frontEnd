

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import BonLivFourService from '../backEndService/BonLivFourService';
import CommandeFourService from '../backEndService/CommandeFourService';

const ModefierBonLivraisonFour = () => {
  const dateLivraison = useRef();
  const qualiteLivraison = useRef();
  const cache = useRef();
  const file=useRef();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location || {};
  const oldBon = state.bon;
  const idCmd = state.idCmd
  const [bonLivFourDto, setBonLivFourDto] = useState({
    "idCommandeFour": idCmd,
    "dateLivraison": oldBon.dateLivraison,
    "cache": oldBon.cache,
    "qualiteLivraison": oldBon.qualiteLivraison
  });
  const [selectedFile,setSelectedFile] =useState(null);

  useEffect(() => {
    if (oldBon) {
      initForm();
    }
  }, [])


  const closeAlert = () => {
    setShowAlert(false);
  };

  const initForm = () => {
    dateLivraison.current.value = formatDate(oldBon.dateLivraison);
    qualiteLivraison.current.value = oldBon.qualiteLivraison;
    cache.current.checked = oldBon.cache;

    const bonlivraisonDto = {
      "idCommandeFour": idCmd,
      "dateLivraison": formatDate(oldBon.dateLivraison),
      "cache": oldBon.cache,
      "qualiteLivraison": oldBon.qualiteLivraison
    };
    setBonLivFourDto(bonlivraisonDto);
    console.log("bonLivFourDto", bonLivFourDto);
  }

  //format date:
  const formatDate = (date) => {
    if (!date) {
      return '';
    }
    else {
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  };

  //function to reset form
  const resetForm = () => {
    dateLivraison.current.value = '';
    qualiteLivraison.current.value = '';
    cache.current.value = '';
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setBonLivFourDto(prevState => (
        {
          ...prevState,
          [name]: checked
        }
      ));
    }
    else if(type ==='file'){
      setSelectedFile(event.target.files[0]);
    }
    else {
      setBonLivFourDto(prevState => (
        {
          ...prevState,
          [name]: value
        }
      ));
    }
    console.log(bonLivFourDto);
  };

  //function de gestion des alerts

  const alertOfError = () => {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >error dans la modefication de bon livraison </span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
  const alertSuccess = () => {
    return (
      <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
        <span >bon livraison à été modefié avec succés </span>
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

  const navigatToDetails = (idCmd) => {
    navigate("/DetailsCommande", { state: { idCmd } })
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(bonLivFourDto)
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("idCommande",idCmd );
    formData.append("dateLivraison", bonLivFourDto.dateLivraison);
    formData.append("cache",bonLivFourDto.cache );
    formData.append("qualiteLivraison",bonLivFourDto.qualiteLivraison );
    BonLivFourService.updateBonLivFour(oldBon.idbonLivraison,formData)
      .then(response => {
        console.log("bon livraison was updated", response.data);
        resetForm();
        navigatToDetails(idCmd);
      })
      .catch(error => {
        console.error("error to update bon livraison ", error);
        setAlertMessage('error');
      })

  };

  return (
    <div className='container mt-2 ajouter-bonLivraison Myfont'>
      <div className='row'>
        <div className='col-12'>
          <div className='card' style={{ maxHeight: 'calc(100vh - 100px)', width: "800" }}>
            <div className='card-header bg-info '>
              <h3>Modefier Bon livraison</h3>
              {alert(alertMessage)}
            </div>
            <div className='card-body cardBody'>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="dateBonLivraison">Date de livraison</label>
                    <input type="date" className="form-control" name="dateLivraison" id="dateLivraison" ref={dateLivraison} onChange={handleInputChange} placeholder="date bon livraison" required />
                  </div>
                  <div className="form-group col-md-6">
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6 position-relative" >
                    <label htmlFor="qualiteLivraison">Qualite de livraison</label>
                    <select className="form-control" name="qualiteLivraison" id="qualiteLivraison" ref={qualiteLivraison} onChange={handleInputChange} required>
                      <option value=''>Select qualite de livraison </option>
                      <option value='BON'>bon</option>
                      <option value='MOYENNE'>moyenne</option>
                      <option value='MOUVAIS'>mauvais</option>
                    </select>
                    <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '70%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                  </div>
                  <div className="form-group col-md-6">
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="dateBonLivraison">Document:(vuillez entrer un document scanné de bon livraison)</label>
                    <input type="file" className="form-control" name="file" id="file" ref={file} onChange={handleInputChange} placeholder="date bon livraison"  />
                  </div>
                  <div className="form-group col-md-6">
                  </div>
                </div>
                <div className='form-row'>
                  <div className='form-group com-md-6'>
                    &nbsp; &nbsp;<span style={{ fontWeight: 'bolder' }}>Caché :</span> &nbsp; &nbsp; &nbsp;<input className="form-check-input" type="checkbox" name='cache' id="cache" ref={cache} onChange={handleInputChange} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary"> Modefier</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModefierBonLivraisonFour;
