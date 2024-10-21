import React, { useEffect, useRef, useState } from 'react'
import LigneListDevis from './LigneListDevis'
import ServiceCommande from '../backEndService/ServiceDevis';
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';
import AlertComponent from '../components/AlertComponent';


const ListDevis = () => {
  const [listCommande, setListCommande] = useState([]);
  const searchKeyword = useRef();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Nombre de produits par page
  const indexOfLastDevid = currentPage * rowsPerPage;
  const indexOfFirstDevis = indexOfLastDevid - rowsPerPage;
  const currentFactures = listCommande.slice(indexOfFirstDevis, indexOfLastDevid);
  const totalPages = Math.ceil(listCommande.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getAllCommande();
  }, []);


  console.log("list commnds", listCommande);
  const handleChange = (e) => {
    const searchValue = searchKeyword.current.value;
    const searchDto = { "nomClient": searchValue };
    if (searchValue == '') {
      getAllCommande();
    }
    else {
      searchedCommande(searchDto);
    }
  }

  
  //function to get all commandes searched by name of client
  const searchedCommande = (cmdDto) => {
    ServiceCommande.searchCommande(cmdDto)
      .then(responce => {
        setListCommande(responce.data);
        console.log("get searched commandes was done");
      })
      .catch(error => {
        console.error("error to get searched commande", error)
      })
  }

  const alertMsg = (msg) => {
    switch (msg) {
      case '':
        return <div></div>;
      case "error":
        return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >error dans la suppression de devis </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      case "success":
        return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >Le devis a été supprimé avec succés </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
    }
  }

  //functin to get all commandes 
  const getAllCommande = (id) => {
    setListCommande(prevListCommande => prevListCommande.filter(item => item.idDevis !== id));
    ServiceCommande.getAllCommande()
      .then(response => {
        setListCommande(response.data);
        console.log("get all commandes has bees succed", response.data);
      })
      .catch(error => {
        console.error("error to get all commandes", error);
      })
  }
  const handleStatusChange = (id, newStatus) => {
    setListCommande(prevList => prevList.map(item =>
      item.idDevis === id ? { ...item, status: newStatus } : item
    ));
  };
  //function to formate the date 
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addDevis = () => {
    navigate("AddDevis");
  }

  const handleDeleteDevis = (id) => {
    setShowModal(true);
    setCurrentId(id);
  }

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const confirmDelete = () => {
    ServiceCommande.deleteCommande(currentId)
      .then(response => {
        setShowModal(false);
        setAlertMessage("success");
        getAllCommande();
        console.log("this commande has been deleted successfully", response.data);
        // Mettez à jour l'état pour refléter la suppression
        //setListCommande(prevListCommande => prevListCommande.filter(item => item.idDevis !== id)); 
        // Cette ligne ci-dessous n'est plus nécessaire puisque nous mettons déjà à jour l'état 
      })
      .catch(error => {
        setShowModal(true);
        setAlertMessage("error");
        console.error("error to delete this commande", error);
      });
  }

  const [alert, setAlert] = useState({ message: '', type: '' }); // Gestion des alertes

  useEffect(() => {
    if (alert.message) {
      setTimeout(() => {
        setAlert({ message: '', type: '' });
      }, 5000); // Efface l'alerte après 5 secondes
    }
  }, [alert.message]);

  const handleSendGlobal = (id) => {
    ServiceCommande.sendDevis(id).then(response => {
      if (response.status === 200) {
        
        setAlert({ message: 'Le devis a été envoyé avec succès au client.', type: 'success' });
        setShowAlert(true);
      } else {
        setAlert({ message: 'Échec de l\'envoi du devis au client.', type: 'error' });
        setShowAlert(true);
      }
    }).catch(error => {
      setAlert({ message: `Une erreur est survenue lors de l'envoi du devis: ${error.message}`, type: 'error' });
      setShowAlert(true);
    });
  };

  const datashow = currentFactures.map((item, key) => <LigneListDevis idDevis={item.idDevis} idClient={item.idClient} nomClient={item.nomClient} dateDevis={item.dateDevis} dateExpiration={item.dateExpiration} montantTotalHT={item.montantTotalHT} montantTotalTTC={item.montantTotalTTC} status={item.status} onDelete={handleDeleteDevis} onStatusChange={handleStatusChange}  handleSendGlobal={handleSendGlobal} />)
  return (
    <div className='container mt-2 Myfont list-client'>
      <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
        <div className="card-header cardHeader">
          <h3 className="text-light">Liste des devis</h3>
        </div>
        <div className='card-body cardBody'>
          
            <AlertComponent type={alert.type} message={alert.message} />
          
          {alertMsg(alertMessage)}
          <form method="get">
            <div className='form-row'>
              <div className='col-8'>
                <button className='btn btn-dark' onClick={() => { addDevis() }}><i className='fas fa-plus-circle' />&nbsp;<i class="fa fa-file-invoice"></i>
                  &nbsp;Ajouter
                </button>
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
            <thead >
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>#ID</th>
                <th scope="col" style={{ textAlign: "center" }}>Nom client</th>
                <th scope="col" style={{ textAlign: "center" }}>Date du devise</th>
                <th scope="col" style={{ textAlign: "center" }}>Date d'expiration</th>
                <th scope="col" style={{ textAlign: "center" }}>Montant total HT</th>
                <th scope="col" style={{ textAlign: "center" }}>Montant total TTC</th>
                <th scope="col" style={{ textAlign: "center" }}>Total TVA</th>
                <th scope="col" style={{ textAlign: "center" }}>Statut du devis</th>
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

export default ListDevis;