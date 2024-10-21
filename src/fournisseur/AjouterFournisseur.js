import React, { useRef, useState } from 'react';
import FournisseurService from '../backEndService/FournisseurService';

const AjouterFournisseur = () => {
    const codeComptable=useRef();
    const raisonSocial=useRef();
    const address=useRef();
    const tel=useRef();
    const responsable=useRef();
    const emailResponsable=useRef();
    const rc =useRef();
    const cnss=useRef();

    const [fournisseur, setFournisseur] = useState({
        codeComptable: '',
        raisonSocial: '',
        address: '',
        tel: '',
        responsable: '',
        emailResponsable: '',
        rc: '',
        cnss: ''
    });
    const [alertMessage,setAlertMessage]=useState("");
    const [errors,setErrors]=useState({});
    let isValide=true;


    const handleReset = (e)=>{
        e.preventDefault();
        codeComptable.current.value='';
        raisonSocial.current.value='';
        address.current.value='';
        tel.current.value='';
        responsable.current.value='';
        emailResponsable.current.value='';
        rc.current.value='';
        cnss.current.value='';
    };

    const handleReset2 =() =>{
        codeComptable.current.value='';
        raisonSocial.current.value='';
        address.current.value='';
        tel.current.value='';
        responsable.current.value='';
        emailResponsable.current.value='';
        rc.current.value='';
        cnss.current.value='';
    }

    const formValidate =()=>{
        setErrors({});
        const codeValue=codeComptable.current.value;
        const raisonValue=raisonSocial.current.value;
        const addressValue=address.current.value;
        const respoValue=responsable.current.value;
        const telValue=tel.current.value;
        const emailValue=emailResponsable.current.value;
        const RcValue=rc.current.value;
        const cnssValue=cnss.current.value;

        if(codeValue.trim()==''){
            setErrors(prevState =>{ return {...prevState,codeComptable:"ce champe est oblegatoire"}});
            isValide=false;
        }
        if(raisonValue.trim()==''){
            setErrors(prevState => {return {...prevState,raisonSocial:"ce champe est obligatoire"}});
            isValide=false;
        }
        if(addressValue.trim()==''){
            setErrors(prevState => {return {...prevState,address:"ce champe est obligatoire"}})
            isValide=false;
        }
        if(respoValue.trim()==''){
            setErrors(prevState => {return {...prevState,responsable:"ce champe est obligatoire"}});
            isValide=false;
        }
        if(telValue.trim()==''){
            setErrors(prevState => {return {...prevState,tel:"ce champe est obligatoire"}});
            isValide=false;
        }
        if(!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            setErrors(prevState => {return {...prevState,emailResponsable:"emain n'est pas valide"}});
            isValide=false;
        }
        if(RcValue.trim()==''){
            setErrors(prevState => {return {...prevState,RC:"ce champe est obligatoire"}});
            isValide=false;
        }
        if(cnssValue.trim()==''){
            setErrors(prevState => {return {...prevState,CNSS:"ce champe est obligatoire"}});
            isValide=false;
        }
        return isValide;

    }

    const getError=(field) =>{
        return errors[field];
    }

    const hasError=(field)=>{
        return (getError(field)!==undefined);
    }

    const displayErr = (field) =>{
        const element=document.querySelector(`#${field}`);
        if(hasError(field)){
           element.style.border="1px solid red";
           return (
             <div>
                 <div className='text text-danger'>{getError(field)}</div>
             </div>
            )
        }
        if(element!==null){
           element.removeAttribute('style');
        }
        return null;
    }
    const handleChange =(event) =>{
        formValidate();
        const {name,value}=event.target;
        setFournisseur(prevState =>({
            ...prevState,
            [name]:value
        }))
        console.log(fournisseur);
        setAlertMessage("");
    }

    //handle submit function
    const handleSubmit= (e)=>{
        e.preventDefault();
        if(formValidate()){
            FournisseurService.createFournisseur(fournisseur)
                .then(reponse =>{
                    console.log(reponse.data);
                    handleReset2();
                    setAlertMessage("success");
                })
                .catch(error=>{
                   console.error("error dns l'ajout fournisseur",error)
                   setAlertMessage("error")
                })
        }
    }

    //handle success alert function
    const alertOfSucces = () =>{
        return (<div className='alert alert-success ' role="alert">
            le fournisseur a été ajouté avec succés
         </div>)
     }

     //function to return error
     const alertOfError = () =>{
         return(
             <div className='alert alert-danger' role="alert">
                 error dans l'ajout de fournisseur 
             </div>
         )
     }
 
     //function to return a correspondant alert
     const alert = (message) =>{
         switch(message){
             case "error":
                 return  alertOfError();
             case "success":
                 return  alertOfSucces();
             default :
                 return null;
             
         }
           
     }



    return (
        <div className="container ajouter-four Myfont">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header cardHeader text-white">
                            <h3>Enregistrement Fournisseur</h3>
                            
                        </div>
                        <div className="card-body  cardBody">
                        {alert(alertMessage)}
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="codeComptable">Code Comptable</label>
                                        <input type="text" className="form-control" name="codeComptable" id="codeComptable" ref={codeComptable} placeholder="Code Comptable" onChange={handleChange} required />
                                        {displayErr("codeComptable")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="raisonSocial">Raison Sociale</label>
                                        <input type="text" className="form-control" name='raisonSocial' id="raisonSocial" ref={raisonSocial} placeholder="Raison Sociale" onChange={handleChange} required />
                                        {displayErr("raisonSocial")}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="responsable">Responsable</label>
                                        <input type="text" className="form-control" name='responsable' id="responsable" ref={responsable} placeholder="responsable"onChange={handleChange} required />
                                        {displayErr("responsable")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="tel">Téléphone</label>
                                        <input type="text" className="form-control" name='tel' id="tel" ref={tel} placeholder="Téléphone" onChange={handleChange} required />
                                        {displayErr("tel")}
                                    </div>
                                </div>
                                {/* Répétez les lignes ci-dessus pour les autres champs de votre classe Fournisseur */}
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="emailResponsable">Email Responsable</label>
                                        <input type="email" className="form-control" name='emailResponsable' id="emailResponsable" ref={emailResponsable} placeholder="Email Responsable" onChange={handleChange} required />
                                        {displayErr("emailResponsable")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="rc">Registre du Commerce</label>
                                        <input type="text" className="form-control" name='rc' id="rc" ref={rc} placeholder="Registre du Commerce" onChange={handleChange} required />
                                        {displayErr("rc")}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" className="form-control" name='address' id="address" ref={address} placeholder="address" onChange={handleChange} required />
                                        {displayErr("address")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="cnss">Immatriculation CNSS</label>
                                        <input type="text" className="form-control" name="cnss" id="cnss" ref={cnss} placeholder="Immatriculation CNSS" onChange={handleChange} required />
                                        {displayErr("cnss")}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary"><i className='fas fa-plus-circle'/>Soumettre</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AjouterFournisseur;
