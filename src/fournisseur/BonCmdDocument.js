import React, { useEffect } from 'react'
import { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useLocation } from 'react-router-dom';
import FournisseurService from '../backEndService/FournisseurService';
import CommandeFourService from '../backEndService/CommandeFourService';

const BonCmdDocument = () => {
    const [pdfSrc, setPdfSrc] = useState('');
    const [commande,setCommande]=useState({});
    const [lignCommandeAfficher,setLignCommandeAfficher]=useState([]);
    const [fournisseur,setFournisseur]=useState({});
    const location=useLocation();
    const {state}=location
    const receiverObj= state || {};
    const idCommande=receiverObj.idCmd;
    console.log("id cmd",idCommande)
    
    useEffect(()=>{
      getCommande();
      getLignCommande();
      
    },[])

    useEffect(()=>{
      getFournisseur();
    },[commande,lignCommandeAfficher])

    useEffect(() => {
      if (commande && lignCommandeAfficher.length > 0 && fournisseur) {
          generatePDF();
      }
     }, [commande, lignCommandeAfficher, fournisseur]);
  
    //function to get commande by id
    const getCommande = () =>{
      CommandeFourService.getCommadeFour(idCommande)
        .then(response =>{
          console.log("get cmd four was succed",response.data);
          setCommande(response.data);
          console.log("commande state",commande);
        })
        .catch(error =>{
          console.error("error to get commande four")
        })
    }

    //function to get fournisseur 
    const getFournisseur = () =>{
       FournisseurService.getFournisseur(commande.idFournisseur)
         .then(response =>{
            console.log("get fournisseur was succed",response.data);
            setFournisseur(response.data);
            console.log("fournisseur stat",fournisseur);
         })
         .catch(error =>{
            console.error("error to get fournisseur",error)
         })
    }

    //fonction to get lign commande four
    const getLignCommande = () =>{
      CommandeFourService.getLignCommande(idCommande)
        .then(response =>{
          console.log("get lign commandes was succed",response.data);
          setLignCommandeAfficher(response.data);
          console.log("lign cmd state",lignCommandeAfficher);
        })
        .catch(error =>{
          console.error("error to get all lign commandes ",error);
        })
    }

    //function to get mode de reglement 
    const getModeReglement = (mode)=>{
      switch(mode){
        case "CACH_ON_DELIVRY":
          return "Paiement à la livraison";
        case "CHEQUE":
          return "Paiement par cheque";
        case "VAIREMENTBANCAIRE":
          return "Vairment bancaire";
        case "TRAITEBANCAIRE":
          return "Traite bancaire"
      }
    }

    //function to format the date: 
    const formatDate = (date) => {
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
  };

    const bodyData = lignCommandeAfficher.map(ligne => [
        ligne.refProduit,
        ligne.nomProduit,
        ligne.prix,
        ligne.quantite,
        ligne.montantTotalHt,
        ligne.tva,
        ligne.montantTotalTTC
      ]);
    bodyData.push(['','','','','','Montant total HT',commande.montantTotalHT])
    bodyData.push(['','','','','','Montant total TTC',commande.montantTotalTTC])

    const generatePDF = () => {
       
        const doc = new jsPDF();

        //color left side: 
        const pageHeight = doc.internal.pageSize.getHeight();
        const stripeWidth = 5; // width of the stripe in mm
        doc.setFillColor(0, 0, 255); // RGB value for blue
        doc.rect(0, 0, stripeWidth, pageHeight, 'F');
    
        // Ajouter le logo
        const logo = '../dist/img/metaMa.png'; // Remplacez par votre logo en Base64
        doc.addImage(logo, 'JPEG', 5, 0, 50, 50);
        doc.setFont('helvetica', 'bold');
        doc.text("Bon de commande", 80 ,25);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text("Agadir le "+formatDate(commande.dateCommande)+" ",160,10)
        // Informations de l'entreprise
        doc.setFontSize(10);
        doc.text("Nom de l'entreprise:MetaMa", 14, 56);
        doc.text("Adresse: 123 Rue Exemple", 14, 61);
        doc.text("Téléphone: 01 23 45 67 89", 14, 66);
        doc.text("email: metama@gmail.com", 14, 71);
    
        // Informations du fournisseur
        doc.text("Fournisseur: "+fournisseur.raisonSocial, 130, 71);
        doc.text("Adresse Fournisseur:"+fournisseur.address, 130, 76);
        doc.text("Téléphone Fournisseur:"+fournisseur.tel,130, 81);
        doc.text("Email :"+fournisseur.emailResponsable,130, 86);
    
        // Mode et conditions de règlement
        doc.text("Bon commande N°:"+commande.idCommande,14, 95);
        doc.text("Conditions de règlement:"+commande.conditionReglement, 14, 103);
    
        // Tableau des articles
        doc.autoTable({  
          startY: 110,
          head: [['Referece', 'Nom', 'Prix U', 'Quantite','Total HT','TVA',"Total TTC"]],
          body: bodyData,
        });
         
        const signatureStartY = doc.lastAutoTable.finalY + 10
        doc.text("Mode de règlement:"+getModeReglement(commande.moyenneReglement), 14, signatureStartY);
        // Signature et date
        const signature = '../dist/img/signature.png'; // Remplacez par votre signature en Base64
        doc.text("signature:", 14, signatureStartY+7);
        doc.addImage(signature, 'JPEG', 12 , signatureStartY+15, 50, 40);
       // doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, doc.lastAutoTable.finalY + 60);

        // Générer le PDF
        const pdfOutput = doc.output('blob');
        const pdfURL = URL.createObjectURL(pdfOutput);
        setPdfSrc(pdfURL);
      };
    
      return (
        <div className='container bon-cmd-document'>
               {pdfSrc && <iframe title="Bon de Commande" src={pdfSrc} width="100%" height="800px"></iframe>}      
        </div>
      )

}

export default BonCmdDocument