import axios from "axios";
let Username='';

const API_URL = "https://servershopping.azurewebsites.net/users/";

class AuthService {

    login(userObject) {
        console.log(userObject);
        return axios
            .post(API_URL + "login", userObject)
            .then(response => {
                console.log(response.data);
                sessionStorage.setItem("username", JSON.stringify(userObject.Username));
                //localStorage.setItem("username", JSON.stringify(userObject.Username));
                if (response.data.token) {
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                    console.log(response.data.token);
                }
                return response.data;
            });

    }

    getUsername(){
        return JSON.parse(sessionStorage.getItem('username'));
    }

    logout() {
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("username");
    }

    register(userObj) {
        console.log(userObj);
        return axios.post(API_URL + "register", userObj);
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }
}

export default new AuthService();