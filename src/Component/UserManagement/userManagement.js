import React,{Component} from "react";
import {Form, Row, Col, Button} from 'react-bootstrap';
import LoginImg from "../../Assests/download.svg";
import axios from "axios";
import {store} from "react-notifications-component";
import AuthService from "./services/auth.service";
import swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

class UserManagement extends Component{
    passwordChanged;
    modifiedUser;
    _id;

    constructor(props) {
        super(props);
        this.state={
            FirstName:'',
            LastName:'',
            Username:undefined,
            Email:'',
            PasswordOne:'',
            PasswordTwo:'',
            showPasswordChange:false,
            passwordNoMatch:'',
            CurrentPassword:''
        };


        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleFirstName= this.handleFirstName.bind(this);
        this.handleLastName= this.handleLastName.bind(this);
        this.handleUserName= this.handleUserName.bind(this);
        this.handleEmail= this.handleEmail.bind(this);
        this.handlePassword= this.handlePassword.bind(this);
        this.handleConfirmPassword= this.handleConfirmPassword.bind(this);
        this.handleCurrentPassword= this.handleCurrentPassword.bind(this);
        this.handleDelete= this.handleDelete.bind(this);
    }

    componentDidMount() {

        const user = AuthService.getUsername();
        if (user) {
            this.setState({
                Username: user,
            }, () => {
                axios.post('http://localhost:4000/users/getOne' + this.state.Username)
                    .then(res => {
                        this.setState({
                            UserId:res.data._id,
                            FirstName: res.data.FirstName,
                            LastName: res.data.LastName,
                            UserName: res.data.Username,
                            Email: res.data.Email,
                        })
                    });
            });
        }

    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.CurrentPassword){
            const newDetails={
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                Username:this.state.Username,
                Email: this.state.Email,
                PasswordOne: this.state.PasswordOne,
                PasswordTwo: this.state.PasswordTwo,
                CurrentPassword:this.state.CurrentPassword
            };

            axios.put('http://localhost:4000/users/edit-details'+this.state.UserId, newDetails).then(res=>{
                if(res.data.success){
                    swal("Hey!", "You changed your data!", "success").then(() =>null );
                    this.setState({
                        FirstName: res.data.modifiedUser.FirstName,
                        LastName: res.data.modifiedUser.LastName,
                        UserName: res.data.modifiedUser.Username,
                    })
                }
                else{
                    if(res.data.Error)
                    swal("Hey!", "Current Password you entered is wrong!", "error").then(() => null);
                }
                if(res.data.passwordChanged){
                    this.props.history.push('./loginRegView');
                }
            })
        }else{
            swal("Hey!", "Please Enter your current Password ", "error").then(() => null);
        }
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
        const generator = require('generate-password');
        const password = generator.generate({
            length: 8,
            numbers: true,
            uppercase: true
        });
        if(event.target.value.length === 1 && !password){

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
    handleCurrentPassword(event){
        this.setState({
            CurrentPassword:event.target.value,

        });
    }
    handleDelete(event){
        event.preventDefault();
        const deleteUser={
            CurrentPassword:this.state.CurrentPassword
        };
        if(this.state.CurrentPassword){
            swal({
                title: "Are you sure?",
                text: "Once deleted, your account will be deleted!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })

                .then((willDelete) => {
                    if (willDelete) {
                        axios.post('http://localhost:4000/users/delete-user' + this.state.Username, deleteUser ).then(res => {
                            if (res.data.success) {
                                 AuthService.logout();
                                this.props.history.push('/');
                                window.location.reload();
                            }
                        });
                    }});
        }else{
            swal("Hey!", "Please Enter your current Password ", "error").then(() => null);
        }

    }
    render() {
        return(

            <div className="base-container" >
            <div className="header">Edit Details</div>
            <div className="content ">
            <div className="image">
                <img src={LoginImg} alt="Login image"/>
            </div>
                <Form>
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
                            Current Password
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Current Password" onChange={this.handleCurrentPassword}/>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} controlId="formPlainPasswordButton">
                        <Button onClick={()=>{
                            this.setState({
                                showPasswordChange:!this.state.showPasswordChange
                            })
                        }} type="button" className='btn' style={{"background-color" :'#888844', color:"#fff"}} size="lg" block >
                            Change Password
                        </Button>
                    </Form.Group>


                    {this.state.showPasswordChange? (
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="8">
                                New Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Password" onChange={this.handlePassword}/>
                            </Col>
                        </Form.Group>
                    ):null}

                    {this.state.showPasswordChange? (
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="8">
                                Confirm new password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="Confirm Password" onChange={this.handleConfirmPassword} />
                            </Col>
                        </Form.Group>
                    ):null}


                    <Form.Group as={Row} controlId="formPlainButton">
                    <Button type="submit" className='btn' style={{"background-color" :'#888844', color:"#fff"}} size="lg" block onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlainButton">
                        <Button type="submit" className='btn' style={{"background-color" :'#888844', color:"#fff"}} size="lg" block onClick={this.handleDelete}>
                            Delete account
                        </Button>
                    </Form.Group>
                </Form>
                </div>
            </div>

        )
    }

}
export default withRouter(UserManagement)