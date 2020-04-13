import React,{Component} from "react";
import {Form, Row, Col, Button} from 'react-bootstrap';
import LoginImg from "../../download.svg";
import axios from "axios";
import {store} from "react-notifications-component";
import AuthService from "../services/auth.service";

export default class UserManagement extends Component{

    constructor(props) {
        super(props);
        this.state={
            FirstName:'',
            LastName:'',
            Username:undefined,
            Email:'',
            PasswordOne:'',
            PasswordTwo:''
        };


        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleFirstName= this.handleFirstName.bind(this);
        this.handleLastName= this.handleLastName.bind(this);
        this.handleUserName= this.handleUserName.bind(this);
        this.handleEmail= this.handleEmail.bind(this);
        this.handlePassword= this.handlePassword.bind(this);
        this.handleConfirmPassword= this.handleConfirmPassword.bind(this);
    }

    componentDidMount() {

        const user = AuthService.getUsername();

        if (user) {
            console.log(user);
            this.setState({
                Username: user,
            }, () => {
                axios.post('http://localhost:4000/users/getOne' + this.state.Username)
                    .then(res => {
                        console.log(res.data);
                        this.setState({
                            FirstName: res.data.FirstName,
                            LastName: res.data.LastName,
                            UserName: res.data.Username,
                            Email: res.data.Email,
                        })
                    });
            });
        }

    }

    handleSubmit(){


        console.log("aaaaaa");
        const newDetails={
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Username:this.state.Username,
            Email: this.state.Email,
            PasswordOne: this.state.PasswordOne,
        };

        console.log(newDetails);
        axios.put('http://localhost:4000/users/edit-details'+this.state.Email, newDetails)
            .then(res =>{
                alert(res.data);
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
        return(

            <div className="base-container" >
            <div className="header">Edit Details</div>
            <div className="content ">
            <div className="image">
                <img src={LoginImg}/>
            </div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} controlId="formPlaintextFirstName">
                        <Form.Label column sm="8">
                            First Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder={this.state.FirstName} onChange={this.handleFirstName}  />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextLastName">
                        <Form.Label column sm="8">
                            Last Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder={this.state.LastName} onChange={this.handleLastName}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextUsername">
                        <Form.Label column sm="8">
                            Username
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" placeholder={this.state.Username} onChange={this.handleUserName} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="8">
                            Email
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control plaintext readOnly defaultValue={this.state.Email} onChange={this.handleEmail} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="8">
                            New Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Password" onChange={this.handlePassword}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="8">
                            Confirm new password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Confirm Password" onChange={this.handleConfirmPassword} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlainButton">
                    <Button type="submit" variant="info" size="lg" block>
                        Submit
                    </Button>
                    </Form.Group>
                </Form>
                </div>
            </div>

        )
    }

}