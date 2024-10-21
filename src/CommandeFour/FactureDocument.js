import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const FactureDocument = () => {
    const location = useLocation();
    const { state } = location || {};
    const Facture = state ? state.Fact : null; // Handle case where state or Fact is undefined
    const [documentFacture, setDocumentFacture] = useState(null);

    const base64ToBlob = (base64, contentType) => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new Blob([bytes], { type: contentType });
    };

    useEffect(() => {
        if (Facture && Facture.fileData) {
            const blob = base64ToBlob(Facture.fileData, 'application/pdf');
            const blobUrl = URL.createObjectURL(blob);
            setDocumentFacture(blobUrl);
    
            // Si le fichier PDF a été téléchargé, nous n'avons pas besoin de le télécharger à nouveau
            localStorage.setItem('factureBlobUrl', blobUrl);
        } else {
            // Si le fichier PDF n'est pas disponible, nous vérifions s'il a déjà été téléchargé
            const savedBlobUrl = localStorage.getItem('factureBlobUrl');
            if (savedBlobUrl) {
                setDocumentFacture(savedBlobUrl);
            }
        }
    }, [Facture]); // Dépend de l'objet Facture
    if (!Facture) {
        return <p>No document found.</p>;
    }

    return (
        <div className='factureDocument'>
            {documentFacture ? (
                <iframe 
                    src={documentFacture} 
                    style={{ width: '100%', height: '100vh' }} 
                    frameBorder="0" 
                    onError={(e) => console.error('Error loading PDF:', e)}
                    download="facture.pdf"
                ></iframe> 
            ) : (
                <p>Loading document...</p>
            )}
        </div>
    );
}

export default FactureDocument;
