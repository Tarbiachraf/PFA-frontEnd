import axios from 'axios';
import axiosInstance from "./axisConfig";

const API_URL ="http://localhost:8088/api/facture";

class FactureFourService{
    createFacture(formData){
        return axios.post(`${API_URL}/create`,formData);
    }

    updateFacture(formatData,id){
        return axios.put(`${API_URL}/update/${id}`,formatData);
    }

    getFacture(id){
        return axios.get(`${API_URL}/${id}`);
    }

    deleteFacture(id){
        return axios.delete(`${API_URL}/delete/${id}`);
    }
}

export default new FactureFourService();