import React, { useEffect, useRef, useState } from 'react'
import LignCmdFour from './LignCmdFour';
import FournisseurService from '../backEndService/FournisseurService';
import CommandeFourService from '../backEndService/CommandeFourService';
import MyModal from '../components/MyModal';
import { useNavigate } from 'react-router-dom';

const ListCmdFour = () => {
    const [listFournisseur, setListFournisseur] = useState([]);
    const [listCommandes, setListCommandes] = useState([]);
    const searchKeyCommande = useRef();
    const idFournisseur = useRef();
    const [alertMessage,setAlertMessage]=useState('');
    const [showModal,setShowModal]=useState(false);
    const [currentId,setCurrentId]=useState(null);
    const [showAlert,setShowAlert]=useState(false);
    const navigate =useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const indexOfLastCmdFournisseur = currentPage * rowsPerPage;
    const indexOfFirstCmdFournisseur = indexOfLastCmdFournisseur - rowsPerPage;
    const currentCmdFournisseur = listCommandes.slice(indexOfFirstCmdFournisseur, indexOfLastCmdFournisseur);
    const totalPages = Math.ceil(listCommandes.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getAllFournisseur();
        getAllCommande();
    }, [])

    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };

    //function to handle delete commande
    const handleDeleteCommande = (id) =>{
        setShowModal(true);
        setCurrentId(id);
    }

    //function to confirm deletion 
    const confirmDelete = () =>{
        CommandeFourService.deleteCmdFour(currentId)
        .then(response => {
            setShowModal(false);
            getAllCommande();
            setAlertMessage("success");
            console.log("La commande a été supprimée avec succès");

        })
        .catch(error => {
            setShowModal(false);
            setAlertMessage("error");
            console.error("Erreur lors de la suppression de cette commande", error);
        });
    }

    const getAllFournisseur = () => {
        FournisseurService.getAllFournisseurs()
            .then(response => {
                setListFournisseur(response.data);
                console.log("get all fournisseur was succed")
            })
            .catch(error => {
                console.error("error to get all fournisseur", error);
            })
    }

    const rechercheCmd = (searchdto) => {
        CommandeFourService.recherche(searchdto)
            .then(response => {
                setListCommandes(response.data);
                console.log("get search commmandes was succed");
            })
            .catch(error => {
                console.error("error to get search commandes", error);
            })
    }

    //function to handle alert message
    const alertMsg = (msg) => {
        switch (msg) {
            case '':
                return <div></div>;
            case "error":
                return (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                        <span >Error dans la suppression de commande  </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
            case "success":
                return (
                    <div className="alert alert-success alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                    <span >La commande a été supprimé avec succés </span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> 
                )
        }
    }

    const getAllCommande = () => {
        CommandeFourService.getAllCommande()
            .then(response => {
                setListCommandes(response.data);
                setLoader(true)
                console.log("get all commande was succed");
            })
            .catch(error => {
                console.error("error to get allfournisseur ", error);
            })
    }

    //function handle chage 
    const handleChange = () => {
        const idCmdValue = searchKeyCommande.current.value;
        const idFour = idFournisseur.current.value;
        const searchDto = { 'idCommande': idCmdValue, 'idFournisseur': idFour };
        console.log(searchDto);
        if (idCmdValue == '' && idFour == '') {
            getAllCommande();
        }
        else {
            rechercheCmd(searchDto);
        }


    }

    const ajouterCommande =() =>{
        navigate("/CommandeFournisseur");
    }


    const datashow = currentCmdFournisseur.map((item, key) => <LignCmdFour key={item.idCommande} commande={item} onDelete={handleDeleteCommande} />)
    return (
        <div>
            {!loader ? <div>...loading</div> :
                <div className='container mt-2 list-produit Myfont'>
                    <div className='card ' style={{ maxHeight: 'calc(100vh - 100px)', width: "800" }}>
                        <div className="card-header text-white cardHeader">
                            <h3>List commandes fournisseur </h3>
                            {alertMsg(alertMessage)}
                         </div>
                        <div className='card-body cardBody' >
                            <form method="get"  >
                                <div className='input-group mb-2'>
                                    <div className='col-6'>
                                        <button className='btn btn-primary' onClick={() => ajouterCommande()}><i class="fas fa-plus-circle" /><i class="fas fa-shopping-cart" />Ajoute</button>
                                    </div>
                                    <div style={{width: '64px'}}>

                                    </div>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text " style={{ backgroundColor: '#CDCDC7' }} ><i className='fas fa-search'></i></div>
                                    </div>
                                    <input type="text" id="searchKeyCommande" ref={searchKeyCommande} className="form-control col-2" style={{ width: "200px" }} placeholder=" Chercher par réference" onChange={handleChange} />
                                    <div className="input-group-append position-relative ">
                                        <select className="form-control product-listCategore-serach" id="idFournisseur" ref={idFournisseur} onChange={handleChange}>
                                            <option value="">Toutes les fournisseur</option>
                                            {listFournisseur.map((item, key) => (<option key={item.idFournisseur} value={item.idFournisseur}>{item.raisonSocial}</option>))}
                                        </select>
                                        <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                                    </div>
                                </div>

                            </form>
                            <table className="table custom-table">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ textAlign: "center" }}>#Reference </th>
                                        <th scope="col" style={{ textAlign: "center" }}>Date Commande</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Fournisseur</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Details</th>
                                        <th scope="col" style={{ textAlign: "center" }}>Actions</th>
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
                    <MyModal  show={showModal} onHide={()=>setShowModal(false)} onConfirm={confirmDelete}/>
                </div>
                }
        </div>
    )
}

export default ListCmdFour