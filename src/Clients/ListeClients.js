import React, { useEffect, useRef, useState } from 'react'
import LignClient from './LignClient'
import ServiceClient from '../backEndService/ServiceClient';
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';


const ListeClients = () => {

  const [listClient, setListClient] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentId, setCurrentId] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [showAlert,setShowAlert]=useState(false);
  const searchKeyClient = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getAllClients();
  }, [])

  //function to get all clients
  const getAllClients = () => {
    ServiceClient.getAllClients()
      .then(responce => {
        setListClient(responce.data);
        console.log("get the list of client with success", responce.data);
      })
      .catch(error => {
        console.error("error to get the list of clients")
      })
  }

  //function to get all client searched by nom client
  const searchedClients = (key) => {
    ServiceClient.rechercheClients(key)
      .then(response => {
        console.log("success to get all client with name contain :" + key, response.data);
        setListClient(response.data);
      })
      .catch(error => {
        console.error("error to get clients searched", error);
      })
  }

  const handleChange = (e) => {
    const searchValue = searchKeyClient.current.value;
    const searchDto = { "nomClient": searchValue };
    if (searchValue == '') {
      getAllClients();
    }
    else {
      searchedClients(searchDto);
    }
  }

  const addClient = () => {
    navigate("/AjouterClient");
  }

  const handleDeleteClient = (id) => {
    setShowModal(true);
    setCurrentId(id);
  }

  const confirmDelete = () => {
    ServiceClient.deleteClient(currentId)
      .then(responce => {
        setShowModal(false);
        getAllClients();
        setAlertMessage("success")
        console.log("le client a été supprimé avec succes");

      })
      .catch(error => {
        setShowModal(false)
        setAlertMessage("error")
        console.error("error to delete the client")
      })
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
            <span >ce client est lié à plusieurs commande vous pouvez pas le supprimer  </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
      case "success":
        return (
          <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
            <span >Le client a été supprimé avec succés </span>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
    }
  }

  const datashow = listClient.map((item, key) => <LignClient key={item.idClient} id={item.idClient} nom={item.nomClient} prenom={item.prenomClient} societe={item.societe} pays={item.pays} ville={item.ville} tel={item.tel} email={item.email} codePostal={item.codePostal} onDelete={handleDeleteClient} />)

  return (
    <div className='container mt-2 Myfont list-client'>
      <div className='card' style={{ width: '100%', maxHeight: 'calc(100vh - 100px)', overflow: 'auto' }}>
        <div className="card-header cardHeader">
          <h3 className="text-light">Liste des clients</h3>
        </div>
        <div className='card-body cardBody'>
          {alertMsg(alertMessage)}
          <form method="get">
            <div className='form-row'>
              <div className='col-8'>
                <button className='btn btn-dark' onClick={() => { addClient() }}><i className='fas fa-plus-circle' /> Ajouter</button>
              </div>
              <div className='col-4'>
                <div className='input-group mb-2'>
                  <div className="input-group-prepend">
                    <div className="input-group-text " style={{ backgroundColor: '#CDCDC7' }}><i className='fas fa-search'></i></div>
                  </div>
                  <input type="text" id="searchKeyClient" ref={searchKeyClient} className="form-control" style={{ width: "250px" }} placeholder="Nom client" onChange={handleChange} />
                </div>
              </div>
              <div className='col-md-6'></div>
            </div>
          </form>
          <table className=" custom-table">
            <thead className="thead-dark">
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>#ID</th>
                <th scope="col" style={{ textAlign: "center" }}>Nom</th>
                <th scope="col" style={{ textAlign: "center" }}>Prénom</th>
                <th scope="col" style={{ textAlign: "center" }}>Société</th>
                <th scope="col" style={{ textAlign: "center" }}>Pays</th>
                <th scope="col" style={{ textAlign: "center" }}>savoir plus</th>
                <th scope="col" style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {datashow}
            </tbody>
          </table>
        </div>
      </div>
      <MyModal show={showModal} onHide={() => setShowModal(false)} onConfirm={confirmDelete} />
    </div>
  );

}

export default ListeClients