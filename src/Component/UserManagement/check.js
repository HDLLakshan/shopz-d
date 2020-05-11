import React, { Component } from "react";
import axios from "axios";
import AuthService from "./services/auth.service";
import authHeader from "./services/auth-header";


export default class BoardUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        axios.post("http://localhost:4000/users/getOne"+AuthService.getUsername())
            .then(res=> {
                console.log("1");
                this.setState({
                    userId: res.data._id
                }, () => {
                    console.log("2");
                    axios.post('http://localhost:4000/wishlist/check-product' + res.data._id,null, { headers: authHeader() })
                        .then(
                            response => {
                                console.log(response);
                                this.setState({
                                    content: response.data[0].ProductObject
                                });
                                console.log(this.state.content);
                                console.log(AuthService.getCurrentUser());
                            })
                })
            });
    }

    render() {
        return (
            <div className="container">
                <header className="jumbotron">
                    <div>

                    </div>
                </header>
            </div>
        );
    }
}