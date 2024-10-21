import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faTimes } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../backEndService/axisConfig';
import LivraisonService from '../backEndService/LivraisonService';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure le chemin vers le worker PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFLivraisonViewer = ({ livraisonId, setShowPDF }) => {
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Construire l'URL pour obtenir le bon de livraison
    
    // Obtenir le bon de livraison sous forme de blob
    LivraisonService.generateLivraison(livraisonId)
      .then(response => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        setFile(URL.createObjectURL(pdfBlob)); // Créer une URL pour le blob
      })
      .catch(error => {
        console.error("Erreur lors du chargement du bon de livraison :", error);
      });

    // Libérer l'URL du blob lors du démontage
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [livraisonId]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePrint = () => {
    // Ouvrir le PDF dans un nouvel onglet et l'imprimer
    const printWindow = window.open(file, '_blank');
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
    };
  };

  return (
    <div style={{
        position: 'fixed', // Position fixe par rapport à la fenêtre d'affichage
        top: 0, // Commence au haut de la page
        left: 0, // Commence à gauche de la page
        width: '100vw', // Utilise toute la largeur de la fenêtre d'affichage
        height: '100vh', // Utilise toute la hauteur de la fenêtre d'affichage
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent pour le fond
        zIndex: 9999, // S'assurer qu'il est par-dessus tout le contenu
        display: 'flex', // Utilise flex pour centrer le contenu
        justifyContent: 'center', // Centre horizontalement
        alignItems: 'center', // Centre verticalement
     }}>
      <div style={{        
        backgroundColor: 'white', // Fond blanc pour le contenu PDF
       // padding: '20px', // Un peu d'espace autour du contenu PDF
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Ajoute une ombre pour du relief
        maxHeight: '100vh', // Max hauteur pour la visibilité sur petits écrans
        overflow: 'scroll', // Ajoute une barre de défilement si nécessaire
     }}>
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
        <button onClick={handlePrint} style={{ position: 'absolute', top: '10px', right: '90px', padding: '6px'}}>
          Imprimer
        </button>        
      </div>
    </div>
  );
};

export default PDFLivraisonViewer;
