import axios from "axios";
import axiosInstance from "./axisConfig";
const API_URL='http://localhost:8088/api/category';

class CategorieService{

    createCategorie(categorie){
       return  axiosInstance.post(`${API_URL}/create`,categorie);
    }

    updateCategorie(categorie){
        return  axiosInstance.put(`${API_URL}/update`, categorie);
    }

    deleteCategorie(id){
       return   axiosInstance.delete(`${API_URL}/delete/${id}`);
    }

    getCategorie(id){
       return  axiosInstance.get(`${API_URL}/${id}`);
    }

    getAllCategorie(){
       return  axiosInstance.get(`${API_URL}/all`);
    }

    searchCategories(key) {
        return axiosInstance.post(`${API_URL}/recherche`, { "nomCategorie": key });
    }
}
export default new CategorieService();
/*
    @GetMapping("/recherche/{nomCategorie}")
    public ResponseEntity<?> getAllCategoris(@PathVariable String nomCategorie){
        List<CategorieProduit> categorieProduitList = categoryService.getAllCategoryByNomContainingKey(nomCategorie);
        return ResponseEntity.ok(categorieProduitList);
    }


        @PutMapping("/update")
    public ResponseEntity<?> updateCategory(@RequestBody CategorieProduit categorieProduit){
        CategorieProduit categorieProduit1  = categoryService.updateCategory(categorieProduit);
        return ResponseEntity.status(HttpStatus.OK).body(categorieProduit1);
    }*/