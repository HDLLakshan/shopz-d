import React from "react";
import { store } from 'react-notifications-component';
import AuthService from "../services/auth.service";



export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            FirstName: '',
            LastName: '',
            Username: '',
            Email : '',
            PasswordOne: '',
            PasswordTwo: '',
            isValidated:false,
            errors:[],
            successful: false,
            role:[]
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    }

    handleValidation(){
        if(!this.state.FirstName)
            alert('Please enter the FirstName');
        else if(!this.state.LastName)
            alert('Please enter the LastName');
        else if(!this.state.Username)
            alert('Please enter the email');
        else if(!this.state.PasswordOne)
            alert('Please enter the password');
        else if(!this.state.PasswordTwo)
            alert('Please confirm the password');
        else if(!this.state.PasswordOne===this.state.PasswordTwo)
            alert('The confirmation password does not match!');
        else
            this.setState({isValidated : true});

    }
    handleSubmit(event) {

        event.preventDefault();
        if (this.state.errors)
            this.setState({errors: ''});
        this.setState({
            successful: false,
            role:this.state.role.push("user")
        });
        // this.handleValidation(res => {
        //     if (!this.state.isValidated) {
                const userObject = {
                    FirstName: this.state.FirstName,
                    LastName: this.state.LastName,
                    Username: this.state.Username,
                    Email: this.state.Email,
                    PasswordOne: this.state.PasswordOne,
                    PasswordTwo: this.state.PasswordTwo,
                    roles:this.state.role
                };

                AuthService.register(userObject).then(
                    response => {
                        console.log(response.data);
                        this.setState({
                            errors: response.data,
                            successful: true
                        });
                    },
                    error => {
                        const resMessage =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString();

                        this.setState({
                            successful: false,
                            message: resMessage
                        });
                    }
                );

                this.setState({
                    FirstName: '',
                    LastName: '',
                    Username: '',
                    Email: '',
                    PasswordOne: '',
                    PasswordTwo: ''
                });

    }


    handleFirstName(event){
        this.setState({
            FirstName:event.target.value,

        });
    }
    handleLastName(event){
        this.setState({
            LastName:event.target.value,

        });
    }
    handleUserName(event){
        this.setState({
            Username:event.target.value,

        });
    }
    handleEmail(event){
        this.setState({
            Email:event.target.value,

        });
    }
    handlePassword(event){
        if(event.target.value.length === 1){
            var generator = require('generate-password');

            var password = generator.generate({
                length: 8,
                numbers: true,
                uppercase: true
            });

            store.addNotification({
                title: "Let's put a strong password!! Copy this password :) ",
                message: password,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 10000,
                    onScreen: true
                }
            });
        }
        console.log(password);
        this.setState({
            PasswordOne:event.target.value,

        });
    }
    handleConfirmPassword(event){
        this.setState({
            PasswordTwo:event.target.value,

        });
    }


    render() {
        return (
            <div className="base-container">
                <div className="header">Register</div>
                <div className="content">
                <form onSubmit={this.handleSubmit}>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="firstname">FirstName</label>
                            <span style={{color: "red", fontSize:10}}>{this.state.errors.FirstName}</span>
                            <input type="text" value={this.state.FirstName} onChange={this.handleFirstName} placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">LastName</label>
                            <span style={{color: "red", fontSize:10}}>{this.state.errors.LastName}</span>
                            <input type="text" value={this.state.LastName} onChange={this.handleLastName} placeholder="Last Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <span style={{color: "red", fontSize:10}}>{this.state.errors.Username}</span>
                            <input type="text" value={this.state.Username} onChange={this.handleUserName} placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <span style={{color: "red", fontSize:10}}>{this.state.errors.Email}</span>
                            <input type="email" value={this.state.Email} onChange={this.handleEmail} placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <span style={{color: "red", fontSize:10}}>{this.state.errors.PasswordOne}</span>
                            <input type="password" value={this.state.PasswordOne} onChange={this.handlePassword} placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label><span style={{color: "red", fontSize:10}}>{this.state.errors.PasswordTwo}</span>

                            <input type="password" value={this.state.PasswordTwo} onChange={this.handleConfirmPassword} placeholder="Confirm Password" />
                        </div>
                        <div className="footer">
                            <button type="submit" className="btn btn-info">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
                </div>

            </div>
        );
    }
}


