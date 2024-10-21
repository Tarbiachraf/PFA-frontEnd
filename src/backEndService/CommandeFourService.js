import axios from "axios";

const API_URL="http://localhost:8088/api/commandesFournisseur"

class CommandeFournisseur {
    createCommandeFour = (cmdDto) =>{
        return axios.post(`${API_URL}/create`,cmdDto);
    }

    updateCommandeFour = (id ,cmdDto)=>{
        return axios.put(`${API_URL}/update/${id}`,cmdDto);
    }

    getCommadeFour = (id) =>{
        return axios.get(`${API_URL}/${id}`);
    }

    getCompletCommande = (id) =>{
        return axios.get(`${API_URL}/completeCommande/${id}`);
    }

    deleteCmdFour = (id) => {
        return axios.delete(`${API_URL}/delete/${id}`);
    }

    getLignCommande = (id) =>{
        return axios.get(`${API_URL}/lignProductCmd/${id}`)
    }

    getAllCommande = () =>{
        return axios.get(`${API_URL}/all`);
    }

    recherche = (searchDto) =>{
        return axios.post(`${API_URL}/recherche`,searchDto);
    }

    editState = (id,stateDto)=>{
        return axios.patch(`${API_URL}/editState/${id}`,stateDto);
    }

    getNbrCommandeByState(){
        return axios.get(`${API_URL}/NbrCmdByState`);
    }

    
}
export default new CommandeFournisseur();