import React, { useEffect, useRef, useState } from 'react'
import LignCategorie from './LignCategorie'
import CategorieService from '../backEndService/CategorieService';
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';

const ListCategorie = () => {
    const [categories, setCategories] = useState([]);
    const searchKey = useRef('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5); // Nombre de produits par page
    const [show ,setShow]=useState(false);
    const indexOfLastCategorie = currentPage * rowsPerPage;
    const indexOfFirstCategorie = indexOfLastCategorie - rowsPerPage;
    const currentCategories = categories.slice(indexOfFirstCategorie, indexOfLastCategorie);
    const totalPages = Math.ceil(categories.length / rowsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        getAllCategories();
    }, [])

    const getAllCategories = () => {
        CategorieService.getAllCategorie()
            .then(responce => {
                setCategories(responce.data);
                console.log("voici les categories :", responce.data);
            })
            .catch(error => {
                console.error("error lors de la recupertion des categories");
            })
    }

    const searchCategories = (searchValue) => {
        console.log("value: " + searchValue)
        CategorieService.searchCategories(searchValue)
            .then(response => {
                setCategories(response.data);
                console.log("voici les categories :", response.data);
            })
            .catch(error => {
                console.error("error lors de la recupertion des categories lors de recherche");
            })
    }

    const handleChange = (e) => {
        const searchValue = searchKey.current.value;
        if (searchValue == '') {
            getAllCategories();
        }
        else {
            searchCategories(searchValue);
        }
    }

    const datashow = currentCategories.map((item, key) => <LignCategorie key={item.idCategorie} idCategorie={item.idCategorie} nomCategorie={item.nomCategorie} onDelete={getAllCategories} onOpen={()=>setShow(true)} onHide={()=>setShow(false)} />)



    return (
        <div className='container mt-2 list-categorie Myfont'>
            <div className='card ' style={{ maxHeight: 'calc(100vh - 100px)' }}>
                <div class="card-header text-white cardHeader"> <h2>Listes des Categories</h2></div>
                <div className='card-body cardBody ' style={{ overflowY: 'auto' }}>
                    <form method="get" >
                        <div className="form-row">
                            <div className='form-group col-2'>
                                <button className='btn btn-primary'><i className='fas fa-plus-circle'/>Ajouter</button>
                            </div>
                            <div className='form-group col-2'>

                            </div>
                            <div className='form-group col-4'>
                                <label class="sr-only" for="inlineFormInputGroup">Username</label>
                                <div class="input-group mb-2 ">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text " style={{ backgroundColor: '#CDCDC7' }}><i className='fas fa-search'></i></div>
                                    </div>
                                    <input type="text" id="searchKey" ref={searchKey} className="form-control" style={{ width: "250px" }} placeholder="Chercher par Nom catégorie" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </form>
                    <table className="table custom-table" style={{ width: "67%" }}>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "100px", textAlign: "center" }}>Nom</th>
                                <th scope="col" style={{ textAlign: "center", width: "100px" }}>Action</th>
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
            <MyModal show={show} onHide={()=>setShow(false)}/>
        </div>

    )
}

export default ListCategorie;