import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'home');
    }

    getUserBoard() {
        return axios.get(API_URL + 'wishlist/get-wishlist', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'shoppingcart/get-cart', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();