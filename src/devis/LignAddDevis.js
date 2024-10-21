import React from 'react'
import { useNavigate } from 'react-router-dom';

const LignAddDevis = (props) => {
    const navigate=useNavigate();
    const handleClickAddcmd = (idC) =>{
        navigate("/AjouterCmd",{state:{idC}})
    }
    return (
        <tr>
            <td style={{width:"80px", textAlign: "center" }}>{props.id}</td>
            <td style={{width:"100px",   textAlign: "center" }}>{props.nom}</td>
            <td style={{width:"100px",   textAlign: "center" }}>{props.prenom}</td>
            <td style={{ width:"100px",  textAlign: "center" }}>{props.societe}</td>
            <td style={{width:"100px",   textAlign: "center" }}>{props.pays}</td>
            <td style={{width:"100px", textAlign: "center" }}>{props.ville}</td>
            <td style={{ width:"140px", textAlign: "center" }}>{props.tel}</td>
            <td style={{width:"80px",  textAlign: "center" }}>
                <button className='btn btn-success' onClick={() =>{handleClickAddcmd(props.id)}}><i className='fa fa-plus'></i>devise</button>
            </td>
        </tr>
    )
}

export default LignAddDevis;
