import React from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceClient from '../backEndService/ServiceClient';

const LignClient = (props) => {
    const navigate=useNavigate();

    //function handleclickEdit to navigate to medefication componant when we click edit buttom
    const handleClickEdit = (idC,nomC,prenomC,societeC,paysC,villeC,telC,emailC,codePostalC) =>{
        navigate("/ModefieClient",{state:{idC,nomC,prenomC,societeC,paysC,villeC,telC,emailC,codePostalC}});
    }

    //function 3awdrask hayid mn la list
    const handleDelete = (id) =>{
        props.onDelete(id);
    }

    const handleDetail = (id) => {
        navigate("/CleintDetails", { state: { idC: id } });
    }
    return (
        <tr>
            <td style={{ width: "50px", textAlign: "center",fontWeight:"bold" }}>#{props.id}</td>
            <td style={{ width: "90px", textAlign: "center" }}>{props.nom}</td>
            <td style={{ width: "90px", textAlign: "center" }}>{props.prenom}</td>
            <td style={{ width: "100px", textAlign: "center" }}>{props.societe}</td>
            <td style={{ width: "100px", textAlign: "center" }}>{props.pays}</td>
            <td style={{ width: "100px", textAlign: "center" }}>
            <button className="btn" style={{backgroundColor:'#59E817'}} onClick={()=>{handleDetail(props.id)}}>
                <i className="fas fa-info"></i> plus
            </button>
            </td>
            <td style={{ width: "400px", textAlign: "center" }}>
            <div className="dropdown " >
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" >
                    Actions
                </button>
                <div className="dropdown-menu" style ={{backgroundColor:'#F7ED12  ',fontWeight:"bolder"}} aria-labelledby="dropdownMenuButton">
                    <button className="dropdown-item" onClick={()=>{handleClickEdit(props.id)}} >
                        <i className="fas fa-edit"></i> Modifier
                    </button>
                    <button className="dropdown-item"  onClick={() =>{handleDelete(props.id)}}>
                        <i className="fas fa-trash"></i> Supprimer
                    </button>
                    <button className="dropdown-item" /*onClick={()=>{contacter(objFournisseur.emailResponsable)}}*/ >
                        <i className="fas fa-envelope"></i> Contacter
                    </button>
                </div>
            </div>
                
            </td>
            
        </tr>
    )
    /*<button className='btn btn-primary' onClick={() =>{handleClickEdit(props.id)}} ><i className='fas fa-pencil-alt'></i></button>
                 &nbsp;&nbsp;
                <button className='btn btn-danger' onClick={() =>{handleDelete(props.id)}} ><i className='fa fa-trash'></i></button>
                <br/><br/>*/
}    /*<td style={{ width: "100px", textAlign: "center" }}>
<button className="btn" style={{backgroundColor:'#59E817'}} onClick={() =>{handlePlus(objFournisseur)}}>
<i className="fas fa-info"></i> plus
</button>
</td>*/

export default LignClient