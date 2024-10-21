import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ProductService from '../backEndService/ProductService';
import { Nav } from 'react-bootstrap';
import axiosInstance from '../backEndService/axisConfig';
const Menu = () => {

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
});
const [profilePicture, setProfilePicture] = useState(null);
const profilePictureRef = useRef(null);
  useEffect(() => {
    getNbrProduit();
  })
  const [nbrProduit, setNbrProduit] = useState(0);
  const getNbrProduit = () => {
    ProductService.getAllProducts()
      .then(response => {
        setNbrProduit(response.data.length);
      })
      .catch(error => {
        console.log("error to get produits")
      })
  }
  useEffect(() => {
    const fetchUserData = async () => {
        const result = await axiosInstance.get('http://localhost:8088/api/appUser/me');
        if (result.data) {
            const formattedData = {
                ...result.data,
                profilePicture: result.data.profilePicture ? `data:image/png;base64,${result.data.profilePicture}` : ''
                };
            setUser(formattedData);
        }
    };
    fetchUserData();
}, []);
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 my-aside Myfont">
      {/* Brand Logo */}
      <NavLink to='/' className='brand-link'>
        <img src="../dist/img/metaMa.png" alt="logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span className="brand-text font-weight-light">MetaCommerce</span>
      </NavLink>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={user.profilePicture} className="img-circle elevation-2" alt="UserImage" />
          </div>
          <div className="info">
            <NavLink to="/EditProfil" className="d-block text-md">{user.firstname} {user.lastname}</NavLink>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li class="nav-item has-treeview menu-open">
              <NavLink to='/' className='nav-link active'>
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                  <i class=""></i>
                </p>
              </NavLink>
            </li>
            {/*<li className="nav-item">
              <NavLink to='/' className='nav-link'>
                <i className="nav-icon fas fa-th" />
                <p>
                  Widgets
                  <span className="right badge badge-danger">New</span>
                </p>
              </NavLink>
        </li>*/}

            {/*Produit*/}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-copy" />
                <p>
                  Produits
                  <i className="fas fa-angle-left right" />
                  <span className="badge badge-info right">{nbrProduit}</span>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/AjouterProduit" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter produit</p>
                  </NavLink>
                </li>
                <li className="nav-item" >
                  <NavLink to="/ListProduit" className="nav-link"  >
                    <i className="far fa-circle nav-icon" />
                    <p>Listes produits</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/AjouterCategorie" className="nav-link" >
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter categorie</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ListCategorie" className="nav-link" >
                    <i className="far fa-circle nav-icon" />
                    <p>Listes Categorie</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/*Clients*/}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-user" />
                <p>
                  Clients
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to='/AjouterClient' className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter un client</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/ListClients' className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Liste des clients</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/*Client commande */}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Vente
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/AddDevis" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter un devis</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ListDevis" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Liste des devis</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ListFacture" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Liste des factures</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ListLivraison" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Liste des livraisons</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/AddCommand" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Ajouter une commande</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ListCommand" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Liste des commandes</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/*fournisseur*/}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-warehouse" />
                <p>
                  Fournisseur
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/AjouterFournisseur" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Nouveau Fournisseur</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ListFournisseur" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Consulter fournisseurs</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/*Achat*/}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp;&nbsp;
                <p>
                  Achat
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/CommandeFournisseur" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Nouveau commande</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/ListCmdFour" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>liste des commandes</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            {/*utilisateur*/}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>
                  Utilisateurs
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/AddUser" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Nouveau utilisateur</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Link to="/UserTable" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>list des utilisateurs</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/AddRole" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Nouveau role</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/ListRoles" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>liste des roles</p>
                  </Link>
                </li>

              </ul>
            </li>

            {/*Reglage*/}
            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-edit" />
                <p>
                  Reglage
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/entreprise" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>modifier les informations de l'entreprises</p>
                  </NavLink>

                </li>
                <li className="nav-item">
                  <NavLink to="/remarqueAndCondition" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>remarques et conditions pour les documents</p>
                  </NavLink>
                </li>
              </ul>
              
            </li>

          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>

  )
}

export default Menu