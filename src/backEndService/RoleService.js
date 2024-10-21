import axiosInstance from './axisConfig';

const ROLE_BASE_REST_API_URL = 'http://localhost:8088/api/role';

class RoleService {
    getAllRoles() {
        return axiosInstance.get(ROLE_BASE_REST_API_URL + '/all');
    }

    getRoleById(roleId) {
        return axiosInstance.get(ROLE_BASE_REST_API_URL + '/' + roleId);
    }

    createRole(role) {
        return axiosInstance.post(ROLE_BASE_REST_API_URL + '/create', role);
    }

    updateRole(roleId, role) {
        return axiosInstance.put(ROLE_BASE_REST_API_URL + '/update/' + roleId, role);
    }

    deleteRole(roleId) {
        return axiosInstance.delete(ROLE_BASE_REST_API_URL + '/delete/' + roleId);
    }
}

export default new RoleService();
