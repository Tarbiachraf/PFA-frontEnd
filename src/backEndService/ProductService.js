import axiosInstance from './axisConfig';

const API_URL = 'http://localhost:8088/api/Product';

class ProductService {
   
    createProduct(produitDto) {
        return axiosInstance.post(`${API_URL}/create`, produitDto);
    }

    updateProduct(produitDto ,id) {
        return axiosInstance.put(`${API_URL}/update/${id}`, produitDto);
    }

    deleteProduct(id) {
        return axiosInstance.delete(`${API_URL}/delete/${id}`);
    }

    getProduct(id) {
        return axiosInstance.get(`${API_URL}/${id}`);
    }

    getAllProducts() {
        return axiosInstance.get(`${API_URL}/all`);
    }

    searchProducts(rechPDto) {
        return axiosInstance.post(`${API_URL}/recherche`,rechPDto);
    }
    getTopProductsByClient(clientId) {
        return axiosInstance.get(`${API_URL}/top/${clientId}`); // Update the path to your actual API endpoint
    }

}

export default new ProductService();
