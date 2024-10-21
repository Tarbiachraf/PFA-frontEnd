import React from "react";
import './Main.css'
const Main = () => {

    return (
        <div className="main-banner">
          <div className="container">
            <div className="top-text header-text">
              <h2>Simplifiez Votre Gestion d'Entreprise au Quotidien</h2>
              <p>
                Naviguez à travers la complexité de la gestion de vos commandes, clients, fournisseurs et produits avec une facilité inégalée.<br />
                Notre plateforme intégrée vous offre les outils pour créer des devis précis, coordonner des livraisons efficaces, 
                et émettre des factures avec une précision irréprochable.<br />
                Gérez les rôles et les responsabilités au sein de votre équipe pour assurer une fluidité et une performance opérationnelle optimale.<br />
                Tout cela à portée de clic.
              </p>
              <h3>Transformez votre potentiel en succès - Lancez-vous dès maintenant !</h3>
              <div className="main-action">
                <button className="btn primary-button"><i className="fa fa-rocket"></i> Get Started</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default Main;