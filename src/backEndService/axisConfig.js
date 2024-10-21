import axios from 'axios';
import AppUserService from './AppUserService';

const axiosInstance = axios.create({
    headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    console.log('laccess token est ',accessToken);
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401 && !error.config._retry) {
        // Tentez de retirer le header d'autorisation expiré
        delete axiosInstance.defaults.headers.common['Authorization'];

        const originalRequest = error.config;
        originalRequest._retry = true;

        return AppUserService.refreshToken().then(res => {
            if (res.status === 200) {
                const { accessToken } = res.data;
                // Stockez le nouveau token et rééquipez-le dans le header
                localStorage.setItem('accessToken', accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                
                // Assurez-vous de retourner la nouvelle requête avec le token rafraîchi
                return axiosInstance(originalRequest);
            }
        }).catch(err => {
            // Gérez le cas où même le refreshToken n'est pas valide ou n'a pas pu être rafraîchi
            console.error('Error refreshing token:', err);
            // Vous pouvez ici déconnecter l'utilisateur ou le rediriger vers la page de connexion
            // ...
        });
    }

    return Promise.reject(error);
});

export default axiosInstance;
