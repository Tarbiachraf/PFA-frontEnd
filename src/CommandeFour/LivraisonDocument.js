import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const LivraisonDocument = () => {
    const location = useLocation();
    const { state } = location || {};
    const bon = state.bonLivraison;
    const [documentBonLivraison, setDocumentBonLivraison] = useState(null);


    const base64ToBlob = (base64, contentType) => {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return new Blob([bytes], {type: contentType});
    };

    useEffect(() => {
        if (bon && bon.fileData) {
            const blob = base64ToBlob(bon.fileData, 'application/pdf');
            const blobUrl = URL.createObjectURL(blob);
            setDocumentBonLivraison(blobUrl);
        }
    }, [bon]); // Depend on Facture object

    return (
        <div className='factureDocument'>
            {documentBonLivraison ? (
                <iframe src={documentBonLivraison} style={{ width: '100%', height: '100vh' }} frameBorder="0"
                    onError={(e) => console.error('Error loading PDF:', e)}>
                </iframe>
            ) : (
                <p>Loading document...</p>
            )}
        </div>
    );
}

export default LivraisonDocument;