import axiosInstance from './axisConfig'; // Assurez-vous que le chemin d'importation est correct

const API_URL="http://localhost:8088/api/client";

class ServiceClient{

  ajouterClient(client){
        return axiosInstance.post(`${API_URL}/create`, client);        
  }

  deleteClient(id){
    return axiosInstance.delete(`${API_URL}/delete/${id}`);
  }

  getClient(id){
    return axiosInstance.get(`${API_URL}/${id}`);
  }
  updateClient(client , id){
    return axiosInstance.put(`${API_URL}/update/${id}`,client);
  }

  getAllClients(){
    return axiosInstance.get(`${API_URL}/all`);
  }

  rechercheClients(searchClient){
    return axiosInstance.post(`${API_URL}/recherche`,searchClient);
  }

}
export default new ServiceClient();