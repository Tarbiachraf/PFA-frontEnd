import React, { useEffect, useState } from 'react';
import ConditionsEtRemarquesService from '../backEndService/ConditionsEtRemarquesService';

const TermesEtConditionsForm = () => {
    const [formData, setFormData] = useState({
        conditionsGenerales: '',
        remarques: '',
        type: ''
    });
    const [termes, setTermes] = useState({});
    const [alert, setAlert] = useState({ type: '', message: '' });

    /*useEffect(()=>{
        console.log(termes)
        setFormData({
            conditionsGenerales: termes.conditionsGenerales,
            remarques: termes.remarques,
            type: termes.type
        });

    },[termes])*/
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleChangeForSelect = (e) => {
        //setFormData({...formData, [e.target.name]: e.target.value});
        ConditionsEtRemarquesService.getConditionsEtCategories(e.target.value).then(response => {
            setFormData({
                conditionsGenerales: response.data.conditionsGenerales,
                remarques: response.data.remarques,
                type: response.data.type
            });
        })

        /*setFormData({
            conditionsGenerales: termes.conditionsGenerales,
            remarques: termes.remarques,
            type: termes.type
        })*/
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        ConditionsEtRemarquesService.createConditionsEtCategories(formData)
            .then(response => {
                console.log("les remarques et les conditions sont ajoutés avec succés ", response.data)
                setFormData({
                    conditionsGenerales: '',
                    remarques: '',
                    type: ''
                })
                setAlert({ type: 'success', message: 'Les termes et les remarques ont été modifiée avec succès.' });
            }).catch(error =>{ 
                console.log(error)
                setAlert({ type: 'danger', message: 'Échec de l\'ajout des termes et des remarques.' });        
            })
        console.log(formData);
    }

    return (
        <div className="container Myfont ajouter-terms">
            <div className="row">
                    <div className="card " >
                        <div className='card-header cardHeader text-white'>
                            <h2 className="text-center " >Termes et Conditions</h2>
                        </div>
                        <div className="card-body cardBody">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="conditionsGenerales" className="form-label" style={{ fontWeight: 'bold' }} >Conditions Générales : </label>
                                    <textarea  className="form-control" id="conditionsGenerales" name="conditionsGenerales" rows="3" value={formData.conditionsGenerales} onChange={handleChange} placeholder='veuillez saisir dans cette zone de text les condition général qui vous sauhaitez à sauvegarer'></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="remarques" className="form-label" style={{ fontWeight: 'bold' }}>Remarques :</label>
                                    <textarea placeholder='saisir une remarque ici si nécessaire' className="form-control" id="remarques" name="remarques" rows="2" value={formData.remarques} onChange={handleChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label" style={{ fontWeight: 'bold' }}>Type :</label>
                                    <select className="form-select" id="type" name="type" value={formData.type} onChange={handleChangeForSelect}>
                                        <option value="">Sélectionnez un type</option>
                                        <option value="FACTURE">Facture</option>
                                        <option value="DEVIS">Devis</option>
                                        <option value="COMMAND">Commande</option>
                                        <option value="LIVRAISON">Livraison</option>
                                    </select>
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success">Soumettre</button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>


    );
}

export default TermesEtConditionsForm;
