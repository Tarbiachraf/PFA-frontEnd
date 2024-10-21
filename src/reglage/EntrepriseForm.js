import React, { useState, useRef, useEffect } from 'react';
import InformationEntrepriseService from '../backEndService/InformationEntrepriseService';

const EntrepriseForm = () => {

    // Ajoutez des références pour les inputs de fichier
    const logoInputRef = useRef(null);
    const signatureInputRef = useRef(null);
    const [alertMessage, setAlertMessage] = useState("");

    const [formData, setFormData] = useState({
        nom: '',
        adresse: '',
        telephone: '',
        email: '',
        logo: null,
        signature: null,
    });

    useEffect(() => {
      /* InformationEntrepriseService.getInformationEntreprise().then(response => {
            setFormData({
                nom: response.data.nom,
                adresse: response.data.adresse,
                telephone: response.data.telephone,
                email: response.data.email
            })

        })*/
    }, [])


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(formData)

    };

    const handleFileChange = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        setFormData({
            ...formData,
            [name]: file,
        });
        console.log(formData)
    };

    //function to return a correspondant alert
    const alert = (message) => {
        switch (message) {
            case "error":
                return alertOfError();
            case "success":
                return alertOfSucces();
            default:
                return null;

        }

    }
    const alertOfSucces = () => {
        return (<div className='alert alert-success ' role="alert">
            les informations de l'entrprise est modifié avec succes
        </div>)
    }
    //function to return alert of error
    //function to return error
    const alertOfError = () => {
        return (
            <div className='alert alert-danger' role="alert">
                error dans la modification des informations
            </div>
        )
    }



    const handleSubmit = (event) => {
        event.preventDefault();
        InformationEntrepriseService
            .updateInformationEntreprise(formData.nom, formData.adresse, formData.telephone, formData.email, formData.logo, formData.signature)
            .then(response => {
                console.log("les informations de l'entrprise est ajouté avec succes", response.data);
                handleReset(event)
                setAlertMessage("success");
            }).catch(error => {
                setAlertMessage("error")
                console.log(error)
            })
        console.log(formData);
    };
    const handleReset = (event) => {
        event.preventDefault();

        setFormData({
            nom: '',
            adresse: '',
            telephone: '',
            email: '',
            signature: null,
            logo: null
        });

        // Réinitialisez les inputs de fichier ici
        if (logoInputRef.current) logoInputRef.current.value = "";
        if (signatureInputRef.current) signatureInputRef.current.value = "";
    }



    return (
        <div className="container ajouter-entreprise Myfont">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header cardHeader">
                            <h3 className="text-light">Mise à jour des informations de l'entreprise</h3>
                        </div>
                        <div className="card-body cardBody">
                            {/* alert(alertMessage) is assumed to be a function call here */}
                            {alert && alert(alertMessage)}

                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="col-form-label" style={{ fontWeight: 'bold' }}>Nom de l'entreprise:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="veullez saisir le nom de l'entreprise"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label" style={{ fontWeight: 'bold' }}>Adresse:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="adresse"
                                            value={formData.adresse}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="veullez saisir l'address de l'entreprise"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="col-form-label" style={{ fontWeight: 'bold' }}>Téléphone:</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            name="telephone"
                                            value={formData.telephone}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="veullez saisir le fax ou tel de l'entreprise"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label" style={{ fontWeight: 'bold' }}>Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="veullez saisir l'email de l'entreprise"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="col-form-label" style={{ fontWeight: 'bold' }}>Logo:</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="logo"
                                            onChange={handleFileChange}
                                            ref={logoInputRef}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="col-form-label" style={{ fontWeight: 'bold' }}>Signature numérique:</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="signature"
                                            onChange={handleFileChange}
                                            ref={signatureInputRef}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 ">
                                    <button type="submit" className="btn btn-primary">Mise à jour</button>
                                    &nbsp;&nbsp;<button type="reset" className="btn btn-danger" onClick={handleReset}>Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default EntrepriseForm;
