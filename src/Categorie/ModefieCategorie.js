import React from 'react'
import { useRef,useState } from 'react';
import { useParams } from 'react-router-dom';
import CategorieService from '../backEndService/CategorieService';
const ModefieCategorie = () => {
    const nomCategorieField1=useRef();
    const [errors,setErrors]=useState({});
    let isfvalid=true;
    const [categorie,setCategorie]=useState();
    const [alertMessage,setAlertMessage]=useState("");
    const params = useParams();
    const idCategorie=params.idCat;
    console.log("voici l id recupere"+idCategorie)
    //start form validation function
    const validatForm = () =>{
        setErrors({});
        const nomValue=nomCategorieField1.current.value;
        if(nomValue.trim()==''){
            setErrors(prevState =>{return {...prevState,...{nomCategorieField1:"nom required"}}});
            isfvalid=false;
        }
        return isfvalid;
    }

    //start handleReset 
    const handleReset =(e)=>{
        e.preventDefault();
        nomCategorieField1.current.value='';
    }

    //stat getError function 
    const getError =(field) =>{
        return errors[field];
    }

    //start hasErr function 
    const hasErr = (field) =>{
      return (getError(field)!==undefined);
    }

    //start displayErr function
    const displayErr = (field)=>{
        const element=document.querySelector(`#${field}`);
        if(hasErr(field)){
            element.style.border="1px solid red";
            return(
                <div>
                    <div className='text text-danger'>{getError(field)}</div>
                </div>
            );
        }
        if(element!==null){
            element.removeAttribute('style');
        }
        return null;
    }
    const handleChange = (e) =>{
        validatForm();
        setCategorie(nomCategorieField1.current.value);
        setAlertMessage("");
    }
    //start handlesubmit function 
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validatForm()){
                CategorieService.updateCategorie({nomCategorie:categorie,idCategorie:idCategorie})
                    .then(responce =>{
                        console.log("categorie a été modifie avec succes",responce.data)
                        setCategorie('');
                        nomCategorieField1.current.value='';
                        setAlertMessage("success");
                    })
                    .catch(error =>{
                        console.error("error dans la modefication de categorir");
                        setAlertMessage("error");
                    })
        }
    }
    const alertOfSucces = () =>{
        return (<div className='alert alert-success ' role="alert">
            la categorie a été modefié avec succés
         </div>)
     }
     //function to return alert of error
     //function to return error
     const alertOfError = () =>{
         return(
             <div className='alert alert-danger' role="alert">
                 error dans la modefication de categorie 
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
    <div className='container modefie-categorie Myfont'>
    <div className='row'>
        <div className='col-8'>
            <form onSubmit={handleSubmit}>
                <h2>Modefier Categorie</h2>
                {alert(alertMessage)}
                <hr />
                <input type="text" id="idCategorie"  hidden/>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="nomCategorieField1">Nom categorie :</label>
                    <input type="text" id="nomCategorieField1" className="form-control" placeholder='nom categorie' ref={nomCategorieField1} onChange={handleChange}/>
                     {displayErr("nomCategorieField1")}
                </div>
                <div>
                    <input type="submit" value="Modefier" className='btn btn-primary'></input>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="reset" value="Reset" className='btn btn-danger' onClick={handleReset}></input>
                </div>
            </form>
        </div>
    </div>
</div>
  )
}

export default ModefieCategorie