import React, { useState } from "react";
import productImage from './image/product.webp';
import clientImage from './image/client.webp';
import userImage from './image/user.webp';
import supplierImage from './image/fourni.webp';
import './Service.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUsers, faTruckMoving, faUser } from '@fortawesome/free-solid-svg-icons';
import { faCubes } from '@fortawesome/free-solid-svg-icons';

const Service = () => {
  const [activeCategory, setActiveCategory] = useState('produits');

  const categories = {
    produits: {
      title: "Créez et organisez avec facilité les produits dans les catégories",
      content: "Dotez-vous d'un système dynamique pour ajouter et catégoriser vos produits...",
      image: productImage,
      alt: "Gestion de produits",
      icon: faCubes
    },
    clients: {
      title: "Gestion des clients",
      content: "Améliorez votre relation client avec des outils conçus pour maximiser...",
      image: clientImage,
      alt: "Gestion de clients",
      icon: faUsers
    },
    fournisseurs: {
      title: "Gestion des fournisseurs",
      content: "Optimisez vos relations et interactions avec les fournisseurs grâce à...",
      image: supplierImage,
      alt: "Gestion des fournisseurs",
      icon: faTruckMoving
    },
    users: {
      title: "Gestion des utilisateurs",
      content: "Administrez les permissions et accès des utilisateurs pour sécuriser...",
      image: userImage,
      alt: "Gestion des utilisateurs",
      icon: faUser
    }
  };

  return (
    <div className="popular-categories">
      <div className="containere">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-heading">
              <h2>Les services</h2>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="naccs">
              <div className="grid">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="menu">
                      {Object.keys(categories).map((categoryKey) => (
                        <div 
                          key={categoryKey}
                          className={`thumb ${activeCategory === categoryKey ? 'active' : ''}`}
                          onClick={() => setActiveCategory(categoryKey)}
                          style={{fontSize: "18px"}}
                        >
                          <FontAwesomeIcon icon={categories[categoryKey].icon} style={{fontSize: "30px", marginRight: "30px"}} /> Gestion de {categoryKey}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-9 align-self-center">
                    <div className="content">
                      <div className="left-text">
                        <h4>{categories[activeCategory].title}</h4>
                        <p>{categories[activeCategory].content}</p>
                      </div>
                      <div className="right-image">
                        <img src={categories[activeCategory].image} alt={categories[activeCategory].alt} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
