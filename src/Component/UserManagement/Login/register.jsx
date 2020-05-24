import React from "react";
import { store } from 'react-notifications-component';
import AuthService from "../services/auth.service";
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
let password;

class Register extends React.Component {
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
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    }


    handleSubmit(event) {

            event.preventDefault();
            const userObject = {
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Username: this.state.Username,
                Email: this.state.Email,
                PasswordOne: this.state.PasswordOne,
                PasswordTwo: this.state.PasswordTwo,
                roles:'user'
            };
            //Calling the axios method in AuthService class by sending an object
            AuthService.register(userObject).then(
                response => {
                    this.setState({
                        errors: response.data,
                    });
                    //Sweet alert showing when successful
                    if(response.data.success){
                        swal("Good job!", "You are now registered!", "success").then(() => null);
                    }
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
                },
            );

            //Setting the form empty
            this.setState({
                FirstName: '',
                LastName: '',
                Username: '',
                Email: '',
                PasswordOne: '',
                PasswordTwo: '',
                errors:[]
            });
        password=''
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
        if(event.target.value.length === 1 && !password){
            let generator = require('generate-password');
            //Generating a random password
            password = generator.generate({
                length: 8,
                numbers: true,
                uppercase: true
            });
            //Showing the password through a notification
            store.addNotification({
                title: "Let's put a strong password!! Copy this password :) ",
                message: password,
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 11000,
                    onScreen: true
                }
            });
        }
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
                            <button type="submit" className='btn' style={{"background-color" :'#888844', color:"#fff"}}>
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
export default withRouter(Register);

