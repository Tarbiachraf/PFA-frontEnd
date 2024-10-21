import jsPDF from "jspdf";
import FournisseurService from '../backEndService/FournisseurService';
import CommandeFourService from '../backEndService/CommandeFourService';


const getCommande = async (idCommande) => {
    try {
        const response = await CommandeFourService.getCommadeFour(idCommande);
        console.log("get cmd four was succed", response.data);
        return response.data; // retourne directement la commande
    } catch (error) {
        console.error("error to get commande four", error);
        return {}; // retourne un objet vide en cas d'erreur
    }
}

const getFournisseur = async (idFournisseur) => {
    try {
        const response = await FournisseurService.getFournisseur(idFournisseur);
        console.log("get fournisseur was succed", response.data);
        return response.data; // retourne directement le fournisseur
    } catch (error) {
        console.error("error to get fournisseur", error);
        return {}; // retourne un objet vide en cas d'erreur
    }
}

const getLignCommande = async (idCommande) => {
    try {
        const response = await CommandeFourService.getLignCommande(idCommande);
        console.log("get lign commandes was succed", response.data);
        return response.data; // retourne directement les lignes de commande
    } catch (error) {
        console.error("error to get all lign commandes ", error);
        return []; // retourne une liste vide en cas d'erreur
    }
}


//function to generate pdf 
const generatePDF = async (idCommande) =>{
    const commande = await getCommande(idCommande);
    if (!commande || !commande.idFournisseur) {
        console.error("Impossible de récupérer les informations de commande.");
        return;
    }
    const fournisseur = await getFournisseur(commande.idFournisseur);
    const lignCommandeAfficher = await getLignCommande(idCommande);
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

    const doc = new jsPDF();
    
    // Ajouter le logo
    const logo = '../dist/img/metaMa.png'; // Remplacez par votre logo en Base64
    doc.addImage(logo, 'JPEG', 0, 0, 50, 50);
    doc.setFont('helvetica', 'bold');
    doc.text("Bon de commande", 80 ,25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text("Agadir le "+commande.dateCommande+" ",150,10)
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
    doc.text("Mode de règlement:"+commande.moyenneReglement, 14, 103);
    doc.text("Conditions de règlement:"+commande.conditionReglement, 14, 110);

    // Tableau des articles
    doc.autoTable({  
      startY: 115,
      head: [['Referece', 'Nom', 'Prix U', 'Quantite','Total HT','TVA',"Total TTC"]],
      body: bodyData,
    });

    const signatureStartY = doc.lastAutoTable.finalY + 10
    // Signature et date
    const signature = '../dist/img/signature2.png'; // Remplacez par votre signature en Base64
    doc.text("signature:", 14, signatureStartY+5);
    doc.addImage(signature, 'JPEG', 10 , signatureStartY+10, 50, 40);

    return doc.output('blob');   
}

//function to send email to the server :
const sendPdfToServer = async (idCommande,to,subject,message) => {
    const pdfBlob =await generatePDF(idCommande);
  
    const formData = new FormData();
    formData.append("file", pdfBlob, "bon-de-commande.pdf");
    formData.append("to", to);
    formData.append("subject", subject);
    formData.append("message", message);
    console.log("formData",formData);
    try {
      const response = await fetch("http://localhost:8088/api/commandesFournisseur/sendEmail", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Le PDF a été envoyé et traité par le serveur.");
        return true;
      } else {
        console.error("Une erreur est survenue lors de l'envoi du PDF.");
        return false;
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du PDF au serveur:", error);
      return false;
    }
  };
  
  export default sendPdfToServer;