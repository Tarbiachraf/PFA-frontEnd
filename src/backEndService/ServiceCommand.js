import axiosInstance from './axisConfig';

const API_URL = 'http://localhost:8088/api/commandes';

class ServiceCommande{

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

    createFacture(factureDTO, id){
        return axiosInstance.post(`${API_URL}/${id}/facture`,factureDTO);
    }
    createLivraison(livraisonDto, id){
        return axiosInstance.post(`${API_URL}/${id}/livraison`,livraisonDto);
    }
    updateCommandeStatus(id, statusCommandeDto){
        return axiosInstance.put(`${API_URL}/${id}/status`,statusCommandeDto);
    }

    updateLivraisonStatus(id, statusLivraisonDto){
        return axiosInstance.put(`${API_URL}/${id}/status`,statusLivraisonDto);
    }
    getCommandesByClientId(clientId){
        return axiosInstance.get(`${API_URL}/client/${clientId}`);
      }
      createCommandeFromDevis(formData) {
        return axiosInstance.post(`${API_URL}/create-from-devis/${formData.get('idDevis')}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
}
export default new ServiceCommande();

