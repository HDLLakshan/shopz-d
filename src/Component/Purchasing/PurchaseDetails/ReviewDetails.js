import React, { Component } from "react";
import axios from 'axios';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

import Paper from "@material-ui/core/Paper/Paper";
import './layout.css'
import Typography from "@material-ui/core/Typography/Typography";
import AuthService from "../../UserManagement/services/auth.service";


export default class ReviewDetails extends Component {

    constructor(props) {
        super(props)



        // State
        this.state = {
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
            deliveryadd:'',
            cashDelivery:'',
            s: '',
            delivey:'',
            pay:'',

            cno:'',
            nameCard:'',
            year:'',
            month:'',
            cvc:''
        }
    }








    componentDidMount() {

        this.state.s = AuthService.getUsername();;

        axios.get('https://servershopping.azurewebsites.net/billing/getbill/' + this.state.s)
            .then(res => {
                this.setState({

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
                    cashDelivery:res.data[0].cashDelivery
                });
            })
            .catch((error) => {
                console.log(error);
            })


        axios.get('https://servershopping.azurewebsites.net/payment/getpayment/' + this.state.s)
            .then(res => {
                this.setState({

                    cno:res.data[0].cno,
                    nameCard:res.data[0].nameCard,
                    year: res.data[0].year,
                    month:res.data[0].month,
                    cvc:res.data[0].cvc

                });
            })
            .catch((error) => {
                console.log(error);
            })


    }




    render() {
        return (
            <React.Fragment>

                <main className="layout">
                    <Paper className="paper2">
                        <Typography component="h1" variant="h4" align="center">
                            Purchasing Details
                        </Typography>
                        <br/>
                        <Typography variant="h6" gutterBottom align="center">
                            Review Details
                        </Typography>
                        <br/>

                        <React.Fragment>

                            <div className="roots">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper className="papers"></Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper className="papers1">
                                            <h6 align="center" > Billing Details</h6>
                                            <p className="facts">Name : {this.state.firstName} &nbsp; {this.state.lastName}</p>
                                            <p className="facts">Address : {this.state.zip}, {this.state.add1} &nbsp; {this.state.add2}</p>
                                            <p className="facts">City:   {this.state.city} </p>
                                            <p className="facts">State :  {this.state.State}</p>
                                            <p className="facts">Country :  {this.state.country}</p>
                                            <p className="facts">Phone Number :  {this.state.pno}</p>
                                            <br/>


                                            <div align="center">
                                                <Button
                                                    variant="contained"
                                                    onClick={() => this.props.history.push('/edit-billing/'+this.state.s)}
                                                >
                                                    Edit Billing Details
                                                </Button></div>


                                        </Paper>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Paper className="papers1" >
                                            <h6 align="center" > Delivery Details</h6><br/>
                                            <p className="facts">Delivery address :  {this.state.deliveryadd}</p>
                                            <p className="facts">Delivery Instructions :  {this.state.instructions}</p>
                                            {(() => {
                                                if (this.state.cashDelivery==true) {
                                                    return   <p className="facts">Payment Type : Cash on Delivery</p>
                                                }
                                            })()}
                                        </Paper>

                                    </Grid>

                                    {(() => {
                                        if (this.state.cashDelivery==false) {
                                            return  <Grid item xs={4}>
                                                <Paper className="papers1">
                                                    <h6 align="center" >Payment Details</h6>
                                                    <p className="facts">Card Number : {this.state.cno} </p>
                                                    <p className="facts">Card Holder Name : {this.state.nameCard}</p>
                                                    <p className="facts">Expire Date: {this.state.month}/{this.state.year} </p>
                                                    <p className="facts">CCV Number :  {this.state.cvc}</p><br/>
                                                    <div align="center">
                                                        <Button
                                                            variant="contained"
                                                            onClick={() => this.props.history.push('/edit-credit-card/'+this.state.s)}
                                                        >
                                                            Edit Payment Details
                                                        </Button></div>

                                                </Paper>
                                            </Grid>
                                        }
                                    })()}


                                    <Grid item xs={12} >
                                        <div align="center" >
                                            <Button
                                                variant="contained"  type="submit"
                                                onClick={() => this.props.history.push('/rate-comment/'+this.state.s)}
                                                color="secondary"

                                            >
                                                Place Order
                                            </Button>

                                        </div>
                                    </Grid>

                                </Grid>
                            </div>
                        </React.Fragment>
                    </Paper>

                </main>
            </React.Fragment>




        );
    }
}