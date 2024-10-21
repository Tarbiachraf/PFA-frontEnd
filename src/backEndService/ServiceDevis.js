import axiosInstance from "./axisConfig";

const API_URL = 'http://localhost:8088/api/devis';

class ServiceDevis{

    ajouterCommande(commandeDto){
        return axiosInstance.post(`${API_URL}`, commandeDto);
    }

    updateCommande(commandeDto,id){
        return axiosInstance.put(`${API_URL}/${id}`, commandeDto);
    }

    deleteCommande(id){
        return axiosInstance.delete(`${API_URL}/${id}`);
    }

    getCommande(id){
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    getAllCommande(){
        return axiosInstance.get(`${API_URL}`);
    }

    getLignesCommande(id){
        return axiosInstance.get(`${API_URL}/lignes/${id}`);
    }

    searchCommande(rechCmdDto) {
        return axiosInstance.post(`${API_URL}/recherche`,rechCmdDto);
    }
    sendDevis(id){
        return axiosInstance.post(`${API_URL}/${id}/sendEmail`);
    }
    generateDevis(id){
        return axiosInstance.get(`${API_URL}/generate/${id}`);
    }
    lanceCommand(id){
        return axiosInstance.post(`${API_URL}/${id}/confirm`);
    }

    changeStatus(id, status){
        return axiosInstance.put(`${API_URL}/${id}/status`,status);
    }
    createCommandeFromDevis(formData) {
        return axiosInstance.post(`${API_URL}/create-from-devis/${formData.get('idDevis')}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
    
}
export default new ServiceDevis();