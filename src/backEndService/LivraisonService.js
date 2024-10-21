import axiosInstance from './axisConfig';

const API_URL = 'http://localhost:8088/api/livraisons';

class LivraisonService{

    ajouterLivraison(livraisonDTO){
        return axiosInstance.post(`${API_URL}`, livraisonDTO);
    }

    updateLivraison(livraisonDTO,id){
        return axiosInstance.put(`${API_URL}/${id}`, livraisonDTO);
    }

    deleteLivraison(id){
        return axiosInstance.delete(`${API_URL}/${id}`);
    }

    getLivraison(id){
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    getAllLivraisons(){
        return axiosInstance.get(`${API_URL}`);
    }


    searchLivraison(rechCmdDto) {
        return axiosInstance.post(`${API_URL}/recherche`,rechCmdDto);
    }
    updateLivraisonStatus(id, statusLivraisonDto){
        return axiosInstance.put(`${API_URL}/${id}/status`,statusLivraisonDto);
    }
    generateLivraison(id){
        return axiosInstance.get(`${API_URL}/generate/${id}`,{ responseType: 'blob' })
    }

    
    
}
export default new LivraisonService();

