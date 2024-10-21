import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import LivraisonService from "../backEndService/LivraisonService";
import LigneListLivraison from "./LigneListLivraison";
import { useRef } from "react";
import MyModal from '../components/MyModal';
import { useNavigate } from "react-router-dom";

const ListLivraison = () => {

  const [listLivraison, setListLivraison] = useState([]);
  const searchKeyword = useRef();
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Nombre de produits par page
  const navigate = useNavigate();
  const indexOfLastLivraison = currentPage * rowsPerPage;
  const indexOfFirstLivraison = indexOfLastLivraison - rowsPerPage;
  const currentLivraison = listLivraison.slice(indexOfFirstLivraison, indexOfLastLivraison);
  const totalPages = Math.ceil(listLivraison.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    getAllLivraison();
  }, []);

  //console.log("list factures",listFactures)  ;
  const handleChange = (e) => {
    const searchValue = searchKeyword.current.value;
    const searchDto = { "nomClient": searchValue };
    if (searchValue == '') {
      getAllLivraison();
    }
    else {
      searchedLivraison(searchDto);
    }
  }
  //function to get all commandes searched by name of client
  const searchedLivraison = (livraisonDto) => {
    LivraisonService.searchLivraison(livraisonDto)
      .then(responce => {
        setListLivraison(responce.data);
        console.log("get searched commandes was done");
      })
      .catch(error => {
        console.error("error to get searched commande", error)
      })
  }
  const updateLivraisonStatus = (idLivraison, newStatus) => {
    const statusLivraisonDto = {
      statusLivraison: newStatus
    }
    // Appeler le backend pour mettre à jour le statut
    LivraisonService.updateLivraisonStatus(idLivraison, statusLivraisonDto)
      .then((response) => {
        // Mise à jour de l'état local si nécessaire
        // Peut-être une nouvelle récupération de toutes les livraisons

        getAllLivraison();
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du statut de la livraison', error);
      });
  };

  //functin to get all commandes 
  const getAllLivraison = (id) => {
    setListLivraison(prevListLivraison => prevListLivraison.filter(item => item.idLivraison !== id));
    LivraisonService.getAllLivraisons()
      .then(response => {
        setListLivraison(response.data);
        console.log("get all livraisons has bees succed", response.data);
      })
      .catch(error => {
        console.error("error to get all livraisons", error);
      })
  }

  const handleDeleteLivraison = (id) => {
    setShowModal(true);
    setCurrentId(id);
  }

  const confirmDelete = () => {
    LivraisonService.deleteLivraison(currentId)
      .then(response => {
        setShowModal(false);
        setAlertMessage("success");
        getAllLivraison();
        console.log("this livraison has been deleted successfully", response.data);
      })
      .catch(error => {
        setShowModal(false);
        setAlertMessage("error");
        console.error("error to delete this livraison", currentId, " ", error);
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
            <span >error ce produit lors cette operation  </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      case "success":
        return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >le bon livraison a été supprimé avec succés </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
    }
  }


  const datashow = currentLivraison.map((item, key) => <LigneListLivraison idLivraison={item.idLivraison} idClient={item.idClient} nomClient={item.nomClient} dateLaivrison={item.dateLaivrison} datePrevue={item.datePrevue} dateReception={item.dateReception} adresseLivraison={item.adresseLivraison} statusLivraison={item.statusLivraison} onDelete={handleDeleteLivraison} onUpdateStatus={updateLivraisonStatus} />)


  return (
    <div className='container mt-2 Myfont list-client'>
      <div className='card ' style={{ maxHeight: 'calc(100vh - 90px)', overflow: 'auto' }}>
        <div className="card-header cardHeader">
          <h3 className="text-light">Liste des livraisons</h3>
        </div>
        <div className='card-body cardBody'>
          {alertMsg(alertMessage)}
          <form method="get">
            <div className='form-row'>
              <div className='col-8'></div>
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
            <thead >
              <tr>
                <th style={{ textAlign: "center" }}>#ID</th>
                <th style={{ textAlign: "center" }}>Nom client</th>
                <th style={{ textAlign: "center" }}>Date de livraison</th>
                <th style={{ textAlign: "center" }}>Date prévue de reception</th>
                <th style={{ textAlign: "center" }}>Date réel de réception</th>
                <th style={{ textAlign: "center" }}>Adresse de livraison</th>
                <th style={{ textAlign: "center" }}>Status de livraison</th>
                <th style={{ textAlign: "center" }} colSpan={2}>Action</th>
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


  )
}

export default ListLivraison;