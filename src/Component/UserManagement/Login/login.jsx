import React from "react";
import LoginImg from "../../../Assests/download.svg";
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom'

class Login extends React.Component {

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

    handleSubmit(event){
        event.preventDefault();
        const userData = {
            Username: this.state.Username,
            Password: this.state.Password
        };
        //Calling the AuthService login axios method
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
                    this.props.history.push('/');
                    window.location.reload();
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
    return (

            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={LoginImg} alt="Login image"/>
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

        );
    }
}
export default withRouter(Login);