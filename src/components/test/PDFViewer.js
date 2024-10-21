import axiosInstance from '../../backEndService/axisConfig';
import { useState, useEffect } from 'react';

const PDFViewer = ({ devisId }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    const apiUrl = `http://localhost:8088/api/devis/generate/${devisId}`;

    axiosInstance.get(apiUrl, { responseType: 'blob' })
      .then(response => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        setFile(URL.createObjectURL(pdfBlob));
      })
      .catch(error => {
        console.error("Erreur lors du chargement du PDF :", error);
      });

    // Cleanup function to revoke the created URL to avoid memory leaks
    return () => {
      if (file) {
        URL.revokeObjectURL(file);
      }
    };
  }, [devisId]);

  // Return an iframe to display the PDF
  return file ? (
    <iframe
      src={file}
      width="100%"
      height="100%"
    />
  ) : (
    <div>Chargement du PDF...</div>
  );
};

export default PDFViewer;
