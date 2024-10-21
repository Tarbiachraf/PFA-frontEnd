import axiosInstance from './axisConfig';

const API_URL = 'http://localhost:8088/api/factures';

class FactureService{

    ajouterFacture(factureDTO){
        return axiosInstance.post(`${API_URL}`, factureDTO);
    }

    updateFacture(factureDTO,id){
        return axiosInstance.put(`${API_URL}/${id}`, factureDTO);
    }

    deleteFacture(id){
        return axiosInstance.delete(`${API_URL}/${id}`);
    }

    getFacture(id){
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    getAllFactures(){
        return axiosInstance.get(`${API_URL}`);
    }


    searchFacture(rechCmdDto) {
        return axiosInstance.post(`${API_URL}/recherche`,rechCmdDto);
    }

    generateFacture(id){
        return axiosInstance.get(`${API_URL}/generate/${id}`,{ responseType: 'blob' })
    }

        // Dans FactureService.js
    
  updateStatusFacture(idFacture, statusFactureDto) {
    return axiosInstance.put(`${API_URL}/${idFacture}/status`, statusFactureDto);
  }
  

}
export default new FactureService();

