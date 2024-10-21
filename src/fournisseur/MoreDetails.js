import { PieChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FournisseurService from '../backEndService/FournisseurService';

const MoreDetails = () => {
  const location = useLocation();
  const { state } = location;
  const fournisseur = state || {};
  const [chartTableBon, setChartTableBon] = useState([]);
  const [chartTableFact, setChartTableFact] = useState([]);

  useEffect(() => {
    evaluateFour();
    evaluateFourFact();
  }, []);
  const evaluateFour = () => {
    FournisseurService.evluate(fournisseur.idFournisseur)
      .then(response => {
        setChartTableBon(response.data);
        console.log("success to get data");
      })
      .catch(error => {
        console.error("error to get data");
      })
  }

  const evaluateFourFact = () => {
    FournisseurService.evaluatValidte(fournisseur.idFournisseur)
      .then(res => {
        setChartTableFact(res.data);
        console.log("success to get data");
      })
      .catch(error => {
        console.error("error to get data");
      })
  }



  return (
    <div className="container mt-2 details-cmd Myfont">
      <div className="card" >
        <div className="card-header bg-info" style={{ textAlign: 'center' }}>
          <h3>Détails du Fournisseur</h3>
        </div>
        <div className='card-body cardBody'>
          <table className='table' style={{ width: '100%' }}>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Référece de fournisseur:</td>
              <td  style={{ fontWeight: 'bolder' }}>#{fournisseur.idFournisseur}</td>
              <td style={{ fontWeight: 'bold' }}>Code Comptable : </td>
              <td>{fournisseur.raisonSocial}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Raison Sociale:</td>
              <td>{fournisseur.raisonSocial}</td>
              <td style={{ fontWeight: 'bold' }}>Adresse:</td>
              <td>{fournisseur.address}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Téléphone:</td>
              <td>{fournisseur.tel}</td>
              <td style={{ fontWeight: 'bold' }}>Nom complet de Responsable:</td>
              <td>{fournisseur.resposable}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}>Email de  Responsable:</td>
              <td>{fournisseur.emailResponsable}</td>
              <td style={{ fontWeight: 'bold' }}>Registre du Commerce (RC):</td>
              <td>{fournisseur.rc}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 'bold' }}> Immatriculation CNSS:</td>
              <td>{fournisseur.cnss}</td>
              <td style={{ fontWeight: 'bold' }}>Nombre de Commandes traité:</td>
              <td style={{ fontWeight: 'bold' }}>{fournisseur.nbrCommande}</td>
            </tr>
            <tr>
              <td colspan={4} style={{textAlign:'center',backgroundColor:'#A2A211 '}}><h3 style={{backgroundColor:'#E7E7E4 '}}><i className='fas fa-star-half-alt'/>  Evaluation de fournisseur</h3></td>
            </tr>
            <tr>
              <td colSpan={2} style={{textAlign:'center'}}>
                <div className='' >
                  <h5 style={{ fontWeight: 'bold' }}>Qualité de livraison des commandes</h5>
                  <PieChart
                    series={[{ data: chartTableBon }]}
                    width={400}
                    height={200}
                  />
                </div>
              </td>
              <td colSpan={2} style={{textAlign:'center'}}>
                <div className='' >
                  <h5 style={{ fontWeight: 'bold' }}>Validité des factures relatives aux commandes</h5>
                  <PieChart
                    colors={['green', 'red']}
                    series={[{ data: chartTableFact }]}
                    width={400}
                    height={200}
                  />
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>


  )
}

export default MoreDetails;
