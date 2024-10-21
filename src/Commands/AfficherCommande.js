import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Modal } from 'react-bootstrap';

const AfficherCommande = ({ commande }) => {
    const [showModal, setShowModal] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error) => {
        console.error("Failed to load PDF document:", error);
    };

    const handleViewSalesOrder = () => {
        if (commande && commande.salesOrderData) {
            try {
                const binaryString = atob(commande.salesOrderData);
                const len = binaryString.length;
                const bytes = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }
                const blob = new Blob([bytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
                setShowModal(true);
            } catch (error) {
                console.error("Error creating PDF Blob:", error);
            }
        } else {
            console.error("No valid salesOrderData found");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
            setPdfUrl(null);
        }
    };

    return (
        <div style={{marginTop: "20px", marginLeft: "390px"}}>
            <button className="btn btn-primary" onClick={handleViewSalesOrder}>
                Afficher le Bon de Commande
            </button>

            <Modal show={showModal} onHide={closeModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Bon de Commande</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                    >
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                    </Document>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={closeModal} className="btn btn-secondary">
                        Fermer
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AfficherCommande;
