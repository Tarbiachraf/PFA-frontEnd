import React from "react"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import FactureService from "../backEndService/FactureService";
import LigneListFacture from "./LigneListFacture";
import MyModal from '../components/MyModal';
import { useNavigate } from "react-router-dom";

const ListFactures = () => {
  const [listFactures, setListFactures] = useState([]);
  const searchKeyword = useRef();
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Nombre de produits par page
  const navigate = useNavigate();
  const indexOfLastFacture = currentPage * rowsPerPage;
  const indexOfFirstFacture = indexOfLastFacture - rowsPerPage;
  const currentFactures = listFactures.slice(indexOfFirstFacture, indexOfLastFacture);
  const totalPages = Math.ceil(listFactures.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    getAllFacture();
  }, []);

  console.log("list factures", listFactures);
  const handleChange = (e) => {
    const searchValue = searchKeyword.current.value;
    const searchDto = { "nomClient": searchValue };
    if (searchValue == '') {
      getAllFacture();
    }
    else {
      searchedFacture(searchDto);
    }
  }
  //function to get all commandes searched by name of client
  const searchedFacture = (factureDTO) => {
    FactureService.searchFacture(factureDTO)
      .then(responce => {
        setListFactures(responce.data);
        console.log("get searched commandes was done");
      })
      .catch(error => {
        console.error("error to get searched commande", error)
      })
  }
  const updateFactureStatus = (idFacture, newStatus) => {
    const statusFactureDto = {
      statusFacture: newStatus
    }
    // Appeler le backend pour mettre à jour le statut
    FactureService.updateStatusFacture(idFacture, statusFactureDto)
      .then((response) => {
        // Mise à jour de l'état local si nécessaire
        // Peut-être une nouvelle récupération de toutes les livraisons
        getAllFacture();
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du statut de la livraison', error);
      });
  };

  //functin to get all commandes 
  const getAllFacture = (id) => {
    setListFactures(prevListCommande => prevListCommande.filter(item => item.idFacture !== id));
    FactureService.getAllFactures()
      .then(response => {
        setListFactures(response.data);
        console.log("get all factures has bees succed", response.data);
      })
      .catch(error => {
        console.error("error to get all factures", error);
      })
  }

  const handleDeleteFacture = (id) => {
    setShowModal(true);
    setCurrentId(id);
  }

  const confirmDelete = () => {
    FactureService.deleteFacture(currentId)
      .then(response => {
        setShowModal(false);
        setAlertMessage("success");
        getAllFacture();
        console.log("this facture has been deleted successfully", response.data);
      })
      .catch(error => {
        setShowModal(false);
        setAlertMessage("error");
        console.error("error to delete this facture", error);
      });
  }

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const alertMsg = (msg) => {
    switch (msg) {
      case '':
        return <div></div>;
      case "error":
        return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >error se produit lors de suppression de facture </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      case "success":
        return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >La facture a été supprimé avec succés </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
    }
  }
  const datashow = currentFactures.map((item, key) => <LigneListFacture idFacture={item.idFacture} idClient={item.idClient} nomClient={item.nomClient} dateFacture={item.dateFacture} dateReelPayement={item.dateReelPayement} datePrevuePayement={item.datePrevuePayement} modPayement={item.modPayement} statusFacture={item.statusFacture} onDelete={handleDeleteFacture} onUpdateStatus={updateFactureStatus} />)


  return (
    <div className='container mt-2 Myfont list-client'>
      <div className='card ' style={{ maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
        <div className="card-header cardHeader">
          <h3 className="text-light">Liste des factures</h3>
        </div>
        <div className='card-body cardBody'>
          {alertMsg(alertMessage)}
          <form method="get">
            <div className='form-row'>
              <div className='col-8'>
              </div>
              <div className='col-4'>
                <div className='input-group mb-2'>
                  <div className="input-group-prepend">
                    <div className="input-group-text " style={{ backgroundColor: '#CDCDC7' }}><i className='fas fa-search'></i></div>
                  </div>
                  <input type="text" id="searchKeyword" ref={searchKeyword} className="form-control" style={{ width: "250px" }} placeholder="Nom client" onChange={handleChange} />
                </div>
              </div>
              <div className='col-md-6'></div>
            </div>
          </form>
          <table className="custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>#ID</th>
                <th scope="col" style={{ textAlign: "center" }}>Nom client</th>
                <th scope="col" style={{ textAlign: "center" }}>Date de facture</th>
                <th scope="col" style={{ textAlign: "center" }}>Date prévue de paiement</th>
                <th scope="col" style={{ textAlign: "center" }}>Date réelle de paiement</th>
                <th scope="col" style={{ textAlign: "center" }}>Mode de paiement</th>
                <th scope="col" style={{ textAlign: "center" }}>Statut de la facture</th>
                <th scope="col" style={{ textAlign: "center" }} colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {datashow}
            </tbody>
          </table>
          <br />
          <nav>
            <ul className='pagination'>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className='page-link' onClick={() => paginate(currentPage - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                  <button className='page-link' onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className='page-link' onClick={() => paginate(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <MyModal show={showModal} onHide={() => setShowModal(false)} onConfirm={confirmDelete} />
    </div>
  );

}

export default ListFactures;