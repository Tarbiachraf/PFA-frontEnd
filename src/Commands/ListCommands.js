import React, { useEffect, useRef, useState } from 'react'
import ServiceCommand from '../backEndService/ServiceCommand';
import LigneListCommand from './LigneListCommand';
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';


const ListCommands = () => {
  const [listCommande, setListCommande] = useState([]);
  const searchKeyword = useRef();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Nombre de produits par page
  const indexOfLastCommande = currentPage * rowsPerPage;
  const indexOfFirstCommande = indexOfLastCommande - rowsPerPage;
  const currentCommandes = listCommande.slice(indexOfFirstCommande, indexOfLastCommande);
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
    ServiceCommand.searchCommande(cmdDto)
      .then(responce => {
        setListCommande(responce.data);
        console.log("get searched commandes was done");
      })
      .catch(error => {
        console.error("error to get searched commande", error)
      })
  }

  //functin to get all commandes 
  const getAllCommande = (id) => {
    setListCommande(prevListCommande => prevListCommande.filter(item => item.idCommande !== id));
    ServiceCommand.getAllCommande()
      .then(response => {
        setListCommande(response.data);
        console.log("get all commandes has bees succed", response.data);
      })
      .catch(error => {
        console.error("error to get all commandes", error);
      })
  }
  //function to formate the date 
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
    const day = String(formattedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handelDeleteCommande = (id) => {
    setShowModal(true);
    setCurrentId(id);
  }

  const confirmDelete = () => {
    ServiceCommand.deleteCommande(currentId)
      .then(response => {
        setShowModal(true);
        setAlertMessage("success");
        getAllCommande();
        console.log("this commande has been deleted successfully", response.data);
      })
      .catch(error => {
        setShowModal(true);
        setAlertMessage("error");
        console.error("error to delete this commande", error);
      });
  }


  const addCommande = () => {
    navigate("/AddCommand");
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
            <span >error se produit dans la suppression de commande  </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      case "success":
        return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >la commande à été supprimé avec succés </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
    }
  }

  const datashow = currentCommandes.map((item, key) => <LigneListCommand idCommande={item.idCommande} idClient={item.idClient} nomClient={item.nomClient} dateCommand={item.dateCommand} montantTotalHT={item.montantTotalHT} montantTotalTTC={item.montantTotalTTC} status={item.status} onDelete={handelDeleteCommande} />)
  return (
    <div className='container mt-2 Myfont list-client'>
      <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
        <div className="card-header cardHeader">
          <h3 className="text-light">Liste des commandes</h3>
        </div>
        <div className='card-body cardBody'>
          {alertMsg(alertMessage)}
          <form method="get">
            <div className='form-row'>
              <div className='col-8'>
                <button className='btn btn-primary' onClick={() => { addCommande() }}><i className='fas fa-plus-circle' /> Ajouter</button>
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
                <th scope="col" style={{ textAlign: "center" }}>#Réference</th>
                <th scope="col" style={{ textAlign: "center" }}>Nom client</th>
                <th scope="col" style={{ textAlign: "center" }}>Date de commande</th>
                <th scope="col" style={{ textAlign: "center" }}>Statut de la commande</th>
                <th scope="col" style={{ textAlign: "center" }}>Savoir plus</th>
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

export default ListCommands;