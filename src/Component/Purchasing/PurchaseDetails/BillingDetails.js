import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import './layout.css'
import { Col, Button, Form, FormGroup, Input } from 'reactstrap';
import Paper from "@material-ui/core/Paper/Paper";
import {CountryDropdown} from "react-country-region-selector";
import PhoneInput from "react-phone-number-input/mobile";
import AuthService from "../../UserManagement/services/auth.service";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";




class  BillingDetails extends Component{

    constructor(props){
        super(props)

        this.onChangeFName = this.onChangeFName.bind(this);
        this.onChangeLName = this.onChangeLName.bind(this);
        this.onChangeBillAddress = this.onChangeBillAddress.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeZip = this.onChangeZip.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangePhoneNo = this.onChangePhoneNo.bind(this);
        this.onChangeInstructions = this.onChangeInstructions.bind(this);
        this.onChangeDeliveryAddress = this.onChangeDeliveryAddress.bind(this);
        this.onCheckDelivery = this.onCheckDelivery.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            available:'',
            uname:'',
            checkdelivery:false,
            DAddress:'',
            Billing: {
              userName: '',
              firstName: '',
              lastName: '',
              billAddress:'',
              city: '',
              State: '',
              zip: '',
              country: '',
              pno: '',
              instructions: '',
              deliveryadd: '',
              cashDelivery: false,
          },
            firstNameError:'',
            lastNameError:'',
            cityError:'',
            StateError:'',
            zipError:'',
            countryError:'',
            pnoError:'',
            deliveryaddError:'',
            billaddError:'',
            Error:false,
        }
    }



    onChangeFName(e) {
        this.setState({Billing:{ ...this.state.Billing,firstName: e.target.value}})

    }

    onChangeLName(e) {
        this.setState({Billing:{ ...this.state.Billing,lastName: e.target.value}})

    }

    onChangeBillAddress(e) {
        this.setState({Billing:{...this.state.Billing,billAddress: e.target.value}})
    }


    onChangeCity(e) {
        this.setState({ Billing:{...this.state.Billing,city: e.target.value}})
    }

    onChangeState(e) {
        this.setState({ Billing:{...this.state.Billing,State: e.target.value}})
    }

    onChangeZip(e) {

        if ((isNaN(Number(e.target.value)))) {

            return ;
        } else {
            this.setState({ Billing:{...this.state.Billing,zip: e.target.value}});

        }

    }
    onChangeCountry(e) {
        this.setState({Billing:{...this.state.Billing,country: e}})
    }
    onChangePhoneNo(phone) {
        this.setState({Billing:{...this.state.Billing,pno: phone}})
    }

    onChangeDeliveryAddress(e){
        this.setState({DAddress: e.target.value});
    }


    onChangeInstructions(e){
        this.setState({Billing:{...this.state.Billing,instructions: e.target.value}})
    }



    onCheckDelivery = (event) =>{
        this.setState({
            Billing:{...this.state.Billing,cashDelivery: event.target.checked
        }});
    }
    handleChange = (event) => {
        this.setState({
            checkDelivery: event.target.checked
        });
    };


    validate(){
        let firstNameError = "";
        let lastNameError = "";
        let billaddError = "";
        let cityError="";
        let StateError="";
        let zipError="";
        let countryError="";
        let pnoError="";
        let deliveryaddError="";
        let Error=false;

        const phoneformat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (!this.state.Billing.firstName) {
            firstNameError = "First name cannot be empty";
        }
        if (!this.state.Billing.lastName) {
            lastNameError = "Last name cannot be empty";
        }
        if (!this.state.Billing.billAddress) {
            billaddError = "Bill Address cannot be empty";
        }

        if (phoneformat.test(this.state.Billing.pno)===false || this.state.Billing.pno===null) {
            pnoError = "Phone number Error";
        }
        if (!this.state.Billing.city) {
            cityError = "City cannot be empty";
        }
        if (!this.state.Billing.State) {
            StateError = "State cannot be empty";
        }
        if (!this.state.Billing.zip) {
            zipError = "Zip cannot be empty";
        }

        if (!this.state.Billing.deliveryadd) {
            deliveryaddError = "Delivery address cannot be empty";
        }
        if (pnoError||firstNameError||lastNameError||billaddError||deliveryaddError||StateError||zipError||
            cityError
        ) {

            this.setState({pnoError,firstNameError,lastNameError,billaddError,deliveryaddError,StateError,zipError,
                cityError});
            return false;
        }
        this.setState({
            firstNameError:'',
            lastNameError:'',
            cityError:'',
            StateError:'',
            zipError:'',
            countryError:'',
            pnoError:'',
            deliveryaddError:'',
            billaddError:'',

        })

        return true;
    };

    componentDidMount() {

        this.state.Billing.userName   = AuthService.getUsername();
        this.state.uname = AuthService.getUsername();
        axios.get('http://localhost:4000/billing/get-one-bill/' + this.state.Billing.userName)
            .then(res => {
                if(res.data === null){

                }else{
                    console.log("true")
                this.setState({
                    Billing:res.data,
                    available:true
                })}
            })
            .catch((error) => {
                console.log(error + 'mko aul');
            })


    }


    onSubmit(e) {
        e.preventDefault()

        this.state.Billing.userName = this.state.uname
        this.state.Billing.deliveryadd = this.state.DAddress
        console.log(this.state.Billing.DAddress + "kkkk "+ this.state.Billing.lastName);
        const isValid = this.validate();

        if(isValid) {

            if (!(this.state.available === true)) {


                axios.post('http://localhost:4000/billing/add-billing', this.state.Billing)
                    .then(res => console.log("kooooo" + res.data));

                if (this.state.Billing.cashDelivery===true) {
                    this.props.history.push('/review-order-details/' + this.state.uname);
                    window.location.reload();
                }else if(this.state.Billing.cashDelivery===false){
                    this.props.history.push('/credit-card');
                    window.location.reload();
                }else{
                    this.props.history.push('/billing');
                    window.location.reload();
                }


            }

            else if (this.state.available === true) {

                axios.put('http://localhost:4000/billing/update-bill/' + this.state.uname, this.state.Billing)
                    .then((res) => {
                        console.log(res.data)
                        console.log('Billing  successfully updated');

                    }).catch((error) => {
                    console.log(error)
                })

                if (this.state.Billing.cashDelivery===true) {
                    this.props.history.push('/review-order-details/' + this.state.uname)
                    window.location.reload();
                }else if(this.state.Billing.cashDelivery===false){
                    this.props.history.push('/credit-card');
                    window.location.reload();
                }else{
                    this.props.history.push('/billing');
                    window.location.reload();
                }
            }

        }


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
                                    Billing Details
                                </Typography>
                                <br/>
                                <Grid container spacing={1} justify="center" >

                                    <Grid item xs={11} >
                                        <Form onSubmit={this.onSubmit} >
                                            <FormGroup row inline  justify="center" >

                                                <Col sm={6}>
                                                    <Input type="text"
                                                           name="firstName"
                                                           maxlength={35}
                                                           placeholder="First Name"
                                                           autoComplete="fname"
                                                           value={this.state.Billing.firstName}
                                                           onChange={this.onChangeFName}
                                                    />

                                                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                                {this.state.firstNameError}
                                                            </div>


                                                </Col>
                                                <Col sm={6}>
                                                    <Input type="text"
                                                           placeholder="Last Name"
                                                           maxlength={35}
                                                           name="lastName"
                                                           autoComplete="lname"
                                                           value={this.state.Billing.lastName}
                                                           onChange={this.onChangeLName}
                                                    />
                                                    <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                        {this.state.lastNameError}
                                                    </div>

                                                </Col>
                                            </FormGroup><br/>
                                            <FormGroup row>
                                                <Col sm={12}>
                                                    <Input type="textarea"
                                                           placeholder="Billing Address"
                                                           value={this.state.Billing.billAddress}
                                                           onChange={this.onChangeBillAddress}
                                                    />
                                                    <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                        {this.state.billaddError}
                                                    </div>

                                                    <br/>
                                                    <FormControlLabel

                                                        control={<Checkbox  style={{color:"gray"}} checked={this.state.checkDelivery}onChange={this.handleChange} name="gilad" />}
                                                        label="Billing address is not same for delivery address"
                                                    />
                                                </Col>
                                            </FormGroup> <br/>

                                            <FormGroup row>
                                                <Col sm={3}>
                                                    <Input type="text"
                                                           placeholder="City"
                                                           maxlength={15}
                                                           name="city"
                                                           autoComplete="billing address-level2"
                                                           value={this.state.Billing.city}
                                                           onChange={this.onChangeCity}
                                                    />
                                                    <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                        {this.state.cityError}
                                                    </div>

                                                </Col>
                                                <Col sm={4}>
                                                    <Input type="text"
                                                           placeholder="State"
                                                           maxlength={23}
                                                           name="state"
                                                           value={this.state.Billing.State}
                                                           onChange={this.onChangeState}
                                                    />
                                                    <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                        {this.state.StateError}
                                                    </div>

                                                </Col>
                                                <Col sm={2}>
                                                    <CountryDropdown
                                                        className="dropdowns"
                                                        value={this.state.Billing.country}
                                                        onChange={(e) => this.onChangeCountry(e)}
                                                    />
                                                    <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                        {this.state.countryError}
                                                    </div>
                                                </Col>

                                            </FormGroup> <br/>
                                            <FormGroup row>
                                                <Col sm={3}>
                                                    <Input type="text"

                                                           placeholder="Zip / Postal code"
                                                           maxlength={10}
                                                           name="zip"
                                                           autoComplete="billing postal-code"
                                                           value={this.state.Billing.zip}
                                                           onChange={this.onChangeZip}
                                                    />
                                                    <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                        {this.state.zipError}
                                                    </div>

                                                </Col>
                                                <Col sm={9}>
                                                    <PhoneInput
                                                        className="phone"
                                                        placeholder="Enter phone number"
                                                        value={ this.state.Billing.pno }
                                                        name="pno"
                                                        maxlength={16}
                                                        onChange={ phone => this.onChangePhoneNo(phone)} />
                                                    <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                        {this.state.pnoError}
                                                    </div>
                                                </Col>
                                            </FormGroup> <br/>
                                            <Typography variant="h6" gutterBottom align="center">
                                                Delivery Details
                                            </Typography>
                                            <br/>
                                            {(() => {
                                                if (this.state.checkDelivery===true) {
                                                    return <FormGroup row>
                                                        <Col sm={12}>
                                                            <Input type="textarea"
                                                                   placeholder="Delivery Address"
                                                                   required
                                                                   name="deliveryadd"
                                                                   autoComplete="billing postal-code"
                                                                   value={this.state.DAddress}
                                                                   onChange={this.onChangeDeliveryAddress}
                                                            />
                                                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                                {this.state.deliveryaddError}
                                                            </div>

                                                        </Col>

                                                    </FormGroup>
                                                }else{
                                                    {this.state.DAddress=this.state.Billing.billAddress}
                                                }
                                            })()}

                                            <FormGroup row >
                                                <Col sm={12} >
                                                    <Input type="textarea"
                                                           placeholder="Note down if there special delivery instructions..."
                                                           name="instructions"
                                                           autoComplete="billing postal-code"
                                                           value={this.state.Billing.instructions}
                                                           onChange={this.onChangeInstructions}

                                                    />
                                                </Col>
                                            </FormGroup> <br/>
                                            <FormGroup row>
                                                <Col sm={1}>

                                                    <FormControlLabel
                                                        control={<Checkbox style={{color:"gray"}} checked={this.state.Billing.cashDelivery}onChange={this.onCheckDelivery} name="gilad" />}

                                                    />
                                                </Col>
                                                <Col sm={4}><label>Wish to do payment with cash on delivery</label> </Col>
                                                <Col sm={4}>
                                                    <div align="center">
                                                        <Button variant="danger" size="md"  type="submit" float-center="true"  >
                                                            Save Delivery Details
                                                        </Button></div>
                                                </Col>
                                            </FormGroup>
                                            <div align="right">
                                                {(() => {
                                                    if (this.state.Billing.cashDelivery===true) {
                                                        return   <Button variant="danger" size="md" type="submit"
                                                                         onClick={() => this.props.history.push('/review-order-details/' + this.state.uname)}

                                                        >
                                                            Next Step
                                                        </Button>
                                                    }
                                                })()}
                                                {(() => {
                                                    if (this.state.Billing.cashDelivery===false) {
                                                        return   <Button variant="danger" size="md" type="submit"
                                                                         onClick={() => this.props.history.push('/credit-card')}

                                                        >
                                                            Next Step
                                                        </Button>
                                                    }
                                                })()}

                                            </div>
                                            <br/>
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
export default BillingDetails;