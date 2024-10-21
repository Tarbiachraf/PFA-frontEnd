import React, { useEffect, useRef, useState } from 'react';
import FournisseurService from '../backEndService/FournisseurService';
import { useLocation } from 'react-router-dom';

const ModefierFournisseur = () => {
    const codeComptable1=useRef();
    const raisonSocial1=useRef();
    const address1=useRef();
    const tel1=useRef();
    const responsable1=useRef();
    const emailResponsable1=useRef();
    const rc1 =useRef();
    const cnss1=useRef();

    const location=useLocation();
    const {state}=location;
    const oldFournisseur=state || {};

    const [fournisseur, setFournisseur] = useState({
        codeComptable: oldFournisseur.codeComptable,
        raisonSocial: oldFournisseur.raisonSocial,
        address: oldFournisseur.address,
        tel:oldFournisseur.tel,
        responsable: oldFournisseur.resposable,
        emailResponsable:oldFournisseur.emailResponsable,
        rc: oldFournisseur.rc,
        cnss: oldFournisseur.cnss
    });
    const [alertMessage,setAlertMessage]=useState("");
    const [errors,setErrors]=useState({});
    let isValide=true;
    
    useEffect(()=>{
       initializeFrom();
    },[])
    
    //function to initialise form 
    const initializeFrom = () =>{
        console.log(oldFournisseur);
        codeComptable1.current.value=oldFournisseur.codeComptable;
        raisonSocial1.current.value=oldFournisseur.raisonSocial;
        address1.current.value= oldFournisseur.address;
        tel1.current.value= oldFournisseur.tel;
        responsable1.current.value= oldFournisseur.resposable;
        emailResponsable1.current.value=  oldFournisseur.emailResponsable;
        rc1.current.value= oldFournisseur.rc;
        cnss1.current.value= oldFournisseur.cnss;
    }
    const handleReset = (e)=>{
        e.preventDefault();
        codeComptable1.current.value='';
        raisonSocial1.current.value='';
        address1.current.value='';
        tel1.current.value='';
        responsable1.current.value='';
        emailResponsable1.current.value='';
        rc1.current.value='';
        cnss1.current.value='';
    };

    const handleReset2 =() =>{
        codeComptable1.current.value='';
        raisonSocial1.current.value='';
        address1.current.value='';
        tel1.current.value='';
        responsable1.current.value='';
        emailResponsable1.current.value='';
        rc1.current.value='';
        cnss1.current.value='';
    }

    const formValidate =()=>{
        setErrors({});
        const codeValue=codeComptable1.current.value;
        const raisonValue=raisonSocial1.current.value;
        const addressValue=address1.current.value;
        const respoValue=responsable1.current.value;
        const telValue=tel1.current.value;
        const emailValue=emailResponsable1.current.value;
        const RcValue=rc1.current.value;
        const cnssValue=cnss1.current.value;

        if(codeValue.trim()==''){
            setErrors(prevState =>{ return {...prevState,codeComptable1:"ce champe est oblegatoire"}});
            isValide=false;
        }
        if(raisonValue.trim()==''){
            setErrors(prevState => {return {...prevState,raisonSocial1:"ce champe est obligatoire"}});
            isValide=false;
        }
        if(addressValue.trim()==''){
            setErrors(prevState => {return {...prevState,address1:"ce champe est obligatoire"}})
            isValide=false;
        }
        if(respoValue.trim()==''){
            setErrors(prevState => {return {...prevState,responsable1:"ce champe est obligatoire"}});
            isValide=false;
        }
        if(telValue.trim()==''){
            setErrors(prevState => {return {...prevState,tel1:"ce champe est obligatoire"}});
            isValide=false;
        }
        if(!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            setErrors(prevState => {return {...prevState,emailResponsable1:"emain n'est pas valide"}});
            isValide=false;
        }
        if(RcValue.trim()==''){
            setErrors(prevState => {return {...prevState,rc1:"ce champe est obligatoire"}});
            isValide=false;
        }
        if(cnssValue.trim()==''){
            setErrors(prevState => {return {...prevState,cnss1:"ce champe est obligatoire"}});
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
            FournisseurService.updateFournisseur(oldFournisseur.idFournisseur,fournisseur)
                .then(reponse =>{
                    console.log(reponse.data);
                    handleReset2();
                    setAlertMessage("success");
                })
                .catch(error=>{
                   console.error("error dns l'ajout fournisseur")
                   setAlertMessage("error")
                })
        }
    }

    //handle success alert function
    const alertOfSucces = () =>{
        return (<div className='alert alert-success ' role="alert">
            le fournisseur a été modefié avec succés
         </div>)
     }

     //function to return error
     const alertOfError = () =>{
         return(
             <div className='alert alert-danger' role="alert">
                 error dans la modefication de fournisseur 
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
                            <h3>Modefication Fournisseur</h3>                       
                        </div>
                        <div className="card-body cardBody">
                            {alert(alertMessage)}
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="codeComptable1">Code Comptable</label>
                                        <input type="text" className="form-control" name="codeComptable" id="codeComptable1" ref={codeComptable1} placeholder="Code Comptable" onChange={handleChange} required />
                                        {displayErr("codeComptable1")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="raisonSocial1">Raison Sociale</label>
                                        <input type="text" className="form-control" name='raisonSocial' id="raisonSocial1" ref={raisonSocial1} placeholder="Raison Sociale" onChange={handleChange} required />
                                        {displayErr("raisonSocial1")}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="responsable1">Responsable</label>
                                        <input type="text" className="form-control" name='responsable' id="responsable1" ref={responsable1} placeholder="responsable"onChange={handleChange} required />
                                        {displayErr("responsable1")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="tel">Téléphone</label>
                                        <input type="text" className="form-control" name='tel' id="tel1" ref={tel1} placeholder="Téléphone" onChange={handleChange} required />
                                        {displayErr("tel1")}
                                    </div>
                                </div>
                                {/* Répétez les lignes ci-dessus pour les autres champs de votre classe Fournisseur */}
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="emailResponsable">Email Responsable</label>
                                        <input type="email" className="form-control" name='emailResponsable' id="emailResponsable1" ref={emailResponsable1} placeholder="Email Responsable" onChange={handleChange} required />
                                        {displayErr("emailResponsable1")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="RC">Registre du Commerce</label>
                                        <input type="text" className="form-control" name='rc' id="rc1" ref={rc1} placeholder="Registre du Commerce" onChange={handleChange} required />
                                        {displayErr("rc1")}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" className="form-control" name='address' id="address1" ref={address1} placeholder="address" onChange={handleChange} required />
                                        {displayErr("address1")}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="CNSS">Immatriculation CNSS</label>
                                        <input type="text" className="form-control" name="cnss" id="cnss1" ref={cnss1} placeholder="Immatriculation CNSS" onChange={handleChange} required />
                                        {displayErr("cnss1")}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Modefier</button>
                                &nbsp;&nbsp;&nbsp;
                                <button type="reset" className="btn btn-danger" onClick={handleReset}>Reset</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModefierFournisseur;
