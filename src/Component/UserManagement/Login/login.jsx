import React from "react";
import LoginImg from "../../../download.svg";
import AuthService from "../services/auth.service";
import {LoginRegView} from "./loginRegView";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            isValidated:false,
            loading:false,
            errors:[]
        };

        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation(){
        if(!this.state.Username)
            alert('Please enter the username');
        else if(!this.state.Password)
            alert('Please enter the password');
        else
           this.setState({isValidated:true});
    }

    handleSubmit(event){
        event.preventDefault();
        const userData = {
            Username: this.state.Username,
            Password: this.state.Password
        };

        AuthService.login(userData).then(
            res => {
                console.log(res);
                this.setState({
                    errors:res,
                    loading: true,
                    Username:'',
                    Password:''
                });
                if(res.success){
                    window.location.assign('http://localhost:3000/');
                }
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                alert(resMessage);

            });
    }

    handleUserName(event)
    {
        this.setState({
            Username: event.target.value,

    });
    }
    handlePassword(event)
    {
         this.setState({
              Password: event.target.value,

        });
    }

render(){
    const { errors } = this.state;
    return (

            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={LoginImg}/>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="Username">Username</label>
                                <span style={{color: "red", fontSize:14}}>{this.state.errors.Username}</span>
                                <input type="text" value={this.state.Username} onChange={this.handleUserName} placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <span style={{color: "red", fontSize:14}}>{this.state.errors.Password}</span>
                                <input type="password" value={this.state.Password} onChange={this.handlePassword}
                                       placeholder="Password"/>
                            </div>

                        </div>
                        <div className="footer">
                            <button type="submit" className="btn btn-info">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>

    );}

}
