import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import '../PurchaseDetails/layout.css'
import { Col, Button, Form, FormGroup, Input } from 'reactstrap';
import Paper from "@material-ui/core/Paper/Paper";
import {CountryDropdown} from "react-country-region-selector";
import PhoneInput from "react-phone-number-input/mobile";
import AuthService from "../../UserManagement/services/auth.service";



export default class  EditBilling extends Component{

    constructor(props){
        super(props)

        this.onChangeFName = this.onChangeFName.bind(this);
        this.onChangeLName = this.onChangeLName.bind(this);
        this.onChangeAdd1 = this.onChangeAdd1.bind(this);
        this.onChangeAdd2 = this.onChangeAdd2.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZip = this.onChangeZip.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
        this.onChangeInstructions = this.onChangeInstructions.bind(this);
        this.onChangeDeliveryAddress = this.onChangeDeliveryAddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            idd:'',
            userName:'',
            firstName:'',
            lastName:'',
            add1: '',
            add2:'',
            city: '',
            State: '',
            zip:'',
            country:'',
            pno:'',
            instructions:'',
            deliveryadd:''


        }
    }



    onChangeFName(e) {
        this.setState({firstName: e.target.value})
    }

    onChangeLName(e) {
        this.setState({lastName: e.target.value})
    }

    onChangeAdd1(e) {
        this.setState({add1: e.target.value})
    }
    onChangeAdd2(e) {
        this.setState({add2: e.target.value})
    }

    onChangeCity(e) {
        this.setState({city: e.target.value})
    }

    onChangeState(e) {
        this.setState({State: e.target.value})
    }

    onChangeZip(e) {

        if ((isNaN(Number(e.target.value)))) {

            return ;
        } else {
            this.setState({ zip: e.target.value });

        }

    }
    onChangeCountry(e) {
        this.setState({country: e})
    }
    onChangePhoneNo(phone) {
        this.setState({pno: phone})
    }

    onChangeDeliveryAddress(e){
        this.setState({deliveryadd: e.target.value});
    }


    onChangeInstructions(e){
        this.setState({instructions: e.target.value})
    }

    isDisabled(){
        if(!this.state.firstName ||!this.state.lastName || !this.state.add1||!this.state.add2 ||
            !this.state.city ||!this.state.State ||!this.state.zip || !this.state.country ||
            !this.state.pno || !this.state.deliveryadd
        ){
            return true;
        }else {
            return false;
        }
    }

    componentDidMount() {

        this.state.userName   = AuthService.getUsername();


        axios.get('https://servershopping.azurewebsites.net/billing/getbill/' + this.state.userName)
            .then(res => {


                this.setState(

                    {
                    idd:res.data[0]._id,
                    firstName:res.data[0].firstName,
                    lastName:res.data[0].lastName,
                    add1: res.data[0].add1,
                    add2:res.data[0].add2,
                    city: res.data[0].city,
                    State: res.data[0].State,
                    zip:res.data[0].zip,
                    country:res.data[0].country,
                    pno:res.data[0].pno,
                    instructions: res.data[0].instructions,
                    deliveryadd:res.data[0].deliveryadd,

                });
            })
            .catch((error) => {
                console.log(error);
            })


    }

    onSubmit(e) {
        e.preventDefault()

        const editbillingObject = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            add1: this.state.add1,
            add2:this.state.add2,
            city: this.state.city,
            State: this.state.State,
            zip:this.state.zip,
            country:this.state.country,
            pno:this.state.pno,
            instructions: this.state.instructions,
            deliveryadd:this.state.deliveryadd

        };

        axios.put('https://servershopping.azurewebsites.net/billing/update-billing/' + this.state.idd, editbillingObject)
            .then((res) => {
                console.log(res.data)
                console.log('Billing  successfully updated');

            }).catch((error) => {
            console.log(error)
        })

        // Redirect to Student List


    }










    render(){
        return (

            <React.Fragment>

                <main className="layout">
                    <Paper className="paper">
                        <Typography component="h1" variant="h4" align="center">
                            Purchasing Details
                        </Typography>
                        <br/>

                        <React.Fragment>

                            <React.Fragment>
                                <Typography variant="h6" gutterBottom align="center">
                                  Edit  Billing and Delivery Details
                                </Typography>
                                <br/>
                                <Grid container spacing={1} justify="center" >

                                    <Grid item xs={11} >
                                        <Form onSubmit={this.onSubmit} >
                                            <FormGroup row inline  justify="center" >

                                                <Col sm={6}>
                                                    <Input type="text"
                                                           required
                                                           name="firstName"
                                                           maxlength={35}
                                                           placeholder="First Name"
                                                           autoComplete="fname"
                                                           value={this.state.firstName}
                                                           onChange={this.onChangeFName}
                                                    />
                                                </Col>
                                                <Col sm={6}>
                                                    <Input type="text"
                                                           placeholder="Last Name"
                                                           required
                                                           maxlength={35}
                                                           name="lastName"
                                                           autoComplete="lname"
                                                           value={this.state.lastName}
                                                           onChange={this.onChangeLName}
                                                    />
                                                </Col>
                                            </FormGroup><br/>
                                            <FormGroup row>
                                                <Col sm={6}>
                                                    <Input type="text"
                                                           placeholder="Address Line 1"
                                                           required
                                                           maxlength={35}
                                                           name="address1"
                                                           autoComplete="billing address-line1"
                                                           value={this.state.add1}
                                                           onChange={this.onChangeAdd1}
                                                    />
                                                </Col>
                                                <Col sm={6}>
                                                    <Input type="text"
                                                           placeholder="Address Line 2"
                                                           name="address2"
                                                           maxlength={35}
                                                           autoComplete="billing address-line2"
                                                           value={this.state.add2}
                                                           onChange={this.onChangeAdd2}
                                                    />
                                                </Col>
                                            </FormGroup> <br/>

                                            <FormGroup row>
                                                <Col sm={3}>
                                                    <Input type="text"
                                                           placeholder="City"
                                                           required
                                                           maxlength={15}
                                                           name="city"
                                                           autoComplete="billing address-level2"
                                                           value={this.state.city}
                                                           onChange={this.onChangeCity}
                                                    />
                                                </Col>
                                                <Col sm={4}>
                                                    <Input type="text"
                                                           placeholder="State"
                                                           maxlength={23}
                                                           name="state"
                                                           value={this.state.State}
                                                           onChange={this.onChangeState}
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <CountryDropdown
                                                        className="dropdowns"
                                                        value={this.state.country}
                                                        onChange={(e) => this.onChangeCountry(e)} />
                                                </Col>
                                            </FormGroup> <br/>
                                            <FormGroup row>
                                                <Col sm={3}>
                                                    <Input type="text"

                                                           placeholder="Zip / Postal code"
                                                           required
                                                           maxlength={10}
                                                           name="zip"
                                                           autoComplete="billing postal-code"
                                                           value={this.state.zip}
                                                           onChange={this.onChangeZip}
                                                    />

                                                </Col>
                                                <Col sm={9}>
                                                    <PhoneInput
                                                        className="phone"
                                                        placeholder="Enter phone number"
                                                        value={ this.state.pno }
                                                        name="pno"
                                                        maxlength={16}
                                                        onChange={ phone => this.onChangePhoneNo(phone)} />
                                                </Col>
                                            </FormGroup> <br/>
                                            <Typography variant="h6" gutterBottom align="center">
                                                Delivery Details
                                            </Typography>
                                            <br/>
                                            <FormGroup row>
                                                <Col sm={12}>
                                                    <Input type="textarea"
                                                           placeholder="Delivery Address"
                                                           required
                                                           name="deliveryadd"
                                                           autoComplete="billing postal-code"
                                                           value={this.state.deliveryadd}
                                                           onChange={this.onChangeDeliveryAddress}
                                                    />
                                                </Col>

                                            </FormGroup> <br/>
                                            <FormGroup row >
                                                <Col sm={12} >
                                                    <Input type="textarea"
                                                           required
                                                           placeholder="Note down if there special delivery instructions..."
                                                           name="instructions"
                                                           autoComplete="billing postal-code"
                                                           value={this.state.instructions}
                                                           onChange={this.onChangeInstructions}

                                                    />
                                                </Col>
                                            </FormGroup> <br/>

                                            <FormGroup row >
                                                <Col sm={9}>

                                                    <Button variant="danger" size="md"  type="submit" float-center="true" disabled={this.isDisabled()} >
                                                        Update Details
                                                    </Button>
                                                </Col>
                                                <Col sm={3}>
                                                    <Button variant="danger" size="md" type="submit"
                                                            onClick={() => this.props.history.push('/review-order-details/'+this.state.userName)}
                                                    >
                                                        Back to Review
                                                    </Button>
                                                </Col>
                                            </FormGroup> <br/>
                                        </Form>

                                    </Grid>
                                </Grid>
                            </React.Fragment>

                        </React.Fragment>
                    </Paper>

                </main>
            </React.Fragment>

        );
    }}