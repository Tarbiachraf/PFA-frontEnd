import axiosInstance from './axisConfig'; // Assurez-vous que le chemin d'importation est correct
import axios from 'axios';
const API_URL='http://localhost:8088/api/appUser';

class AppUserService {

    register(registerRequest) {
        return axios.post(`${API_URL}/register`, registerRequest);
    }
    authenticate(credentials) {
        return axios.post(`${API_URL}/authenticate`, credentials);
    }

    refreshToken() {
        const refreshTokenValue = localStorage.getItem('refreshToken');
        console.log('Le refreshToken est: ', refreshTokenValue);
        const refreshTokenDTO = {
            "refreshToken": refreshTokenValue
        }
        return axios.post(`${API_URL}/refresh-token`, refreshTokenDTO);
    }
    getAllUsers = async () => {
        return axiosInstance.get(API_URL);
       
    };
    addUser(userDto){
        return axiosInstance.post(`${API_URL}/create`,userDto);
    }
    UpdateUser(userDto, id){
        return axiosInstance.put(`${API_URL}/update/${id}`,userDto)
    }
    deleteUser(id){
        return axiosInstance.delete(`${API_URL}/delete/${id}`);
    }
}


export default new AppUserService();