import React, { useEffect, useRef, useState } from 'react'
import LignProduit from './LignProduit'
import ProductService from '../backEndService/ProductService';
import CategorieService from '../backEndService/CategorieService';
import FournisseurService from '../backEndService/FournisseurService';
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';


const ListProduit = () => {
    const [listProduit, setListProduit] = useState([]);
    const searchKeyProduct = useRef('');
    const categorieProduct = useRef('');
    const idFournisseur = useRef('');
    const [ListCategorie, setListCategorie] = useState([]);
    const [showAlert, setShowAlert] = useState(true);
    const [alertMessage, setAlertMessage] = useState('')
    const [fournisseurs,setFournisseurs]=useState([]);
    const [showModal ,setShowModal]=useState(false);
    const [currentId,setCurrentID]=useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5); // Nombre de produits par page
    const navigate =useNavigate();
    const indexOfLastProduct = currentPage * rowsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
    const currentProducts = listProduit.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(listProduit.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    //function to get all fournisseur
    const getAllFournisseur =() =>{
        FournisseurService.getAllFournisseurs()
          .then(response =>{
            setFournisseurs(response.data);
            console.log("success to get all fournisseur");
          })
          .catch(error=>{
            console.error("error to getall fournisseur");
          })
      }

    //function to close the alert   
    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };

    useEffect(() => {
        getAllProductLists();
        getAllCategorie();
        getAllFournisseur();
    }, []);
    //fonction pour chercher tout les categories
    const getAllCategorie = () => {
        CategorieService.getAllCategorie()
            .then(responce => {
                setListCategorie(responce.data);
                console.log("Liste des catégories récupérée avec succès")
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des catégories de produits");
            })

    }

    //function to intiate th current id of product to be deleted ans show modal of confirmation
    const handleDeleteProduct = (id) =>{
        setShowModal(true);
        setCurrentID(id);
    }

    //function to confirm delete product 
    const confirmDelete = () => {
        ProductService.deleteProduct(currentId)
            .then(response => {
                setShowModal(false);
                getAllProductLists(); // Refresh the list after deletion
                console.log("Le produit a été supprimé avec succès");
            })
            .catch(error => {
                console.error("Error during product deletion", error);
                setShowModal(false);
                setAlertMessage("error");
            });
    };

    //fonction pour chercher tout les produit 
    const getAllProductLists = () => {
        ProductService.getAllProducts()
            .then(responce => {
                setListProduit(responce.data);
                console.log("Liste des produits:", responce.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la liste des produits");
            })
    }
    //function pour chrcher produits par nom 
    const searchProductList = (rechDto) => {
        ProductService.searchProducts(rechDto)
            .then(response => {
                setListProduit(response.data);
                console.log("Recherche de produits réussie", response.data)
            })
            .catch(error => {
                console.error("Erreur lors de la recherche de produits ");
            })
    };

    const handleChange = (e) => {
        const searchNameValue = searchKeyProduct.current.value;
        const selectCatValue = categorieProduct.current.value;
        const idFournisseurValue=idFournisseur.current.value;
        const rechDto = { "idCategorie": selectCatValue, "produitNom": searchNameValue,"idFournisseur":idFournisseurValue }
        console.log(rechDto);
        if (searchNameValue == '' && selectCatValue == ''&& idFournisseurValue == '') {
            getAllProductLists();
        }
        else {
            searchProductList(rechDto);
        }

    }

    const alertError = (msg) => {
        switch (msg) {
            case '':
                return <div></div>;
            case "error":
                return (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ width: '100%', fontFamily: ' Arial, sans-serif', textAlign: 'center' }}>
                        <span >ce produit est lié à plusieurs commande vous pouvez pas le supprimer  </span>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAlert}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                )
        }
    }

    const ajouterProd = () =>{
        navigate("/AjouterProduit");
    }


    const datashow = currentProducts.map((item, key) => <LignProduit key={item.idProduit} id={item.idProduit} refProduit={item.refProd} nom={item.nomProd} prix={item.prixUnitaireHT} categorie={item.categoryName} details={item.details} tvaN={item.tva} idFournisseur={item.idFournisseur} prixAchat={item.prixAchatHT} onDelete={handleDeleteProduct} />)

    return (
        <div className='container mt-2 list-produit Myfont'>
            <div className='card ' style={{ width: "800" }}>
                <div className="card-header text-white cardHeader">
                    <h3>Liste des produits</h3>
                    {alertError(alertMessage)}
                </div>
                <div className='card-body cardBody' >
                    <form method="get" >
                        <div className="input-group mb-2">
                            <div className='col-4'>
                                <button className='btn btn-primary' onClick={() =>ajouterProd()}><i class="fas fa-plus-circle"/><i class="fas fa-box-open"/>Ajoute</button>
                            </div>
                            <div className="input-group-prepend">
                                <div className="input-group-text " style={{ backgroundColor: '#CDCDC7' }} ><i className='fas fa-search'></i></div>
                            </div>
                            <input type="text" id="searchKeyProduct" ref={searchKeyProduct} className="form-control col-2" style={{ width: "200px" }} placeholder=" nom produit" onChange={handleChange} />
                            <div className="input-group-append position-relative ">
                                <select className="form-control product-listCategore-serach" id="categorieProduct" ref={categorieProduct} onChange={handleChange}>
                                    <option value="">Toutes les catégories</option>
                                    {ListCategorie.map((item, key) => (<option key={item.idCategorie} value={item.idCategorie}>{item.nomCategorie}</option>))}
                                </select>
                                <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                            </div>
                            <div className="input-group-append position-relative ">
                                <select className="form-control product-listCategore-serach" id="idFournisseur" ref={idFournisseur} onChange={handleChange}>
                                    <option value="">Toutes les fournisseur</option>
                                    {fournisseurs.map(fournisseur => (
                                        <option key={fournisseur.idFournisseur} value={fournisseur.idFournisseur}>{fournisseur.raisonSocial}</option>
                                    ))}
                                </select>
                                <i className="fas fa-chevron-down position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#495057' }}></i>
                            </div>
                        </div>
                    </form>
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Référence</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Nom</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Prix</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>TVA</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Catégorie</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Détails</th>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Action</th>
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
            <MyModal show={showModal} onHide={()=>setShowModal(false)}  onConfirm={confirmDelete}/>
        </div>
    )
}

export default ListProduit;
