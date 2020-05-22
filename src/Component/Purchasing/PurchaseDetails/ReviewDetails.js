import React, { Component } from "react";
import axios from 'axios';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

import Paper from "@material-ui/core/Paper/Paper";
import './layout.css'
import Typography from "@material-ui/core/Typography/Typography";
import AuthService from "../../UserManagement/services/auth.service";
import LoaderComponent from "../../ProductMangement/ViewProducts/LoaderComponent";


export default class ReviewDetails extends Component {

    constructor(props) {
        super(props)
        this.oncliick = this.oncliick.bind(this);
        // State
        this.state = {
            uname:'',
            totpay:0,
            Billing: {
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

            CreditCard: {
                cno: '',
                nameCard: '',
                year: '',
                month: '',
                cvc: '',
            },
            price:0,
            datee:'',
            products:[],
            delCharge:100,
            totalpay:0,
            paying:'',
            loading:false
        }
    }


    componentDidMount() {

        this.state.uname = AuthService.getUsername();

        axios.get('http://localhost:4000/billing/get-one-bill/' + this.state.uname)
            .then(res => {
                this.setState({
                    Billing:res.data,
                })
            })
            .catch((error) => {
                console.log(error + 'geterror');
            })

        axios.get('http://localhost:4000/credit-card/get-single-creditcard/' + this.state.uname)
            .then(res => {
                this.setState({
                    CreditCard:res.data,
                })
            })
            .catch((error) => {
                console.log(error + 'credit get error');
            })

        let oldproduct = [];
        oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct = JSON.parse(oldproduct);
        console.log(arrayproduct);
        this.setState({
            products : arrayproduct
        });

    }
    changeQuantity(e, id) {
        var myObj=[];
        myObj = JSON.parse(sessionStorage.getItem("products"));
        for(var j=0; j<myObj.length; j++){
            if(myObj[j].ProductId===id){
                myObj[j].Quantity = e;
                sessionStorage.setItem("products", JSON.stringify(myObj));
            }


        }
        this.setState({
            products: this.state.products.map((res, i) => {
                if (res.ProductId === id) {
                    res.Quantity = parseInt(e);
                    return res;
                }
                return res;
            })
        });

        this.oncliick();

    }

    getThePrice(){

        var price1=0;
        var priceDis = 0
        this.state.products.map((res , i )=>{
            price1=res.PricePerUnit* res.Quantity+price1
        },()=>{
            this.setState({
                price:price1
            })
        });
        this.state.price = price1
        this.state.totalpay = this.state.delCharge + this.state.price
        return this.state.price

    }



    oncliick(e){
        e.preventDefault();
        this.setState({
            loading:true
        })
        sessionStorage.removeItem("count");
        // this.SaveTotal();

        axios.all([
            axios.post('http://localhost:4000/billing/add-payment/' + this.state.uname+"/"+this.state.totalpay),
            axios.post('http://localhost:4000/products/sold',this.state.products)
        ]).then(()=> this.setState({
            loading:false
        })).then(()=>
            this.props.history.push('/rate-comment/' + this.state.uname)

        )
        //window.location.reload();




    }
    afterSubmit = () => {

        this.setState({
            loading:false
        })




    }


    render() {
        return (
            <div>
                {this.state.loading ?     <div >
                        <div className="d-flex justify-content-center">
                            <LoaderComponent top={'100px'}/>
                        </div>
                    </div> :
                    <React.Fragment>

                        <main>
                            <Paper>
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



                                            <Grid item xs={4}>
                                                <Paper className="papers1">
                                                    <h6 align="center"> Billing Details</h6>
                                                    <p className="facts">Name
                                                        : {this.state.Billing.firstName} &nbsp; {this.state.Billing.lastName}</p>
                                                    <p className="facts">Address
                                                        : {this.state.Billing.zip}, {this.state.Billing.billAddress}</p>
                                                    <p className="facts">City: {this.state.Billing.city} </p>
                                                    <p className="facts">State : {this.state.Billing.State}</p>
                                                    <p className="facts">Country : {this.state.Billing.country}</p>
                                                    <p className="facts">Phone Number : {this.state.Billing.pno}</p>
                                                </Paper><br/>

                                            </Grid>
                                            <Grid item xs={4}>
                                                <Paper className="papers1 box" style={{marginLeft:30}}>

                                                    <h6 align="center"> Delivery Details</h6><br/>
                                                    <p className="facts">Delivery address : {this.state.Billing.deliveryadd}
                                                    </p>
                                                    <p className="facts">Delivery Instructions
                                                        : {this.state.Billing.instructions}</p>
                                                    {(() => {
                                                        if (this.state.Billing.cashDelivery === true) {
                                                            return <p className="facts">Payment Type : Cash on Delivery</p>
                                                        }
                                                    })()}
                                                </Paper>

                                            </Grid>

                                            {(() => {
                                                if (this.state.Billing.cashDelivery === false) {
                                                    // noinspection JSAnnotator
                                                    return <Grid item xs={4}>
                                                        <Paper className="papers1">
                                                            <h6 align="center">Payment Details</h6>
                                                            <p className="facts">Payment Type : Credit Card </p>
                                                            <p className="facts">Card Number : {this.state.CreditCard.cno} </p>
                                                            <p className="facts">Card Holder Name
                                                                : {this.state.CreditCard.nameCard}</p>
                                                            <p className="facts">Expire
                                                                Date: {this.state.CreditCard.month}/{this.state.CreditCard.year} </p>
                                                            <p className="facts">CCV Number : {this.state.CreditCard.cvc}</p>
                                                            <p className="facts">Delivery Charges :
                                                                Rs.{this.state.price = this.getThePrice()}+{this.state.delCharge}</p>
                                                            <p className="facts">Total Payment :
                                                                Rs.{this.state.totalpay}</p>
                                                            <br/>


                                                        </Paper><br/>

                                                    </Grid>
                                                } else {
                                                    return <Grid item xs={4}>
                                                        <Paper className="papers1">
                                                            <h6 align="center">Payment Details</h6>
                                                            <p className="facts">Payment Type : Cash on Delivery </p>
                                                            <p className="facts">Delivery Charges :
                                                                Rs.{this.state.price = this.getThePrice()}+{this.state.delCharge}</p>
                                                            <p className="facts">Total Payment :
                                                                Rs.{this.state.totalpay}</p>
                                                            <br/>


                                                        </Paper><br/>

                                                    </Grid>
                                                }
                                            })()}


                                            <Grid item xs={12}>
                                                <div class="row">
                                                    <div class="col-md-9" align="left" style={{"margin-left": 30}}>
                                                        {(() => {
                                                            if (this.state.Billing.cashDelivery === true) {
                                                                return <Button
                                                                    variant="contained" type="submit"
                                                                    onClick={() => this.props.history.push('/billing')}
                                                                    color="primary"

                                                                >
                                                                    Back to Details
                                                                </Button>
                                                            } else {
                                                                return <Button
                                                                    variant="contained" type="submit"
                                                                    onClick={() => this.props.history.push('/credit-card')}
                                                                    color="primary"

                                                                >
                                                                    Back to Details
                                                                </Button>
                                                            }
                                                        })()}


                                                    </div>
                                                    <div align="right" style={{"margin-right": 30}}>
                                                        <Button
                                                            variant="contained" type="submit"
                                                            onClick={(e) => this.oncliick(e)}
                                                            color="primary"

                                                        >
                                                            Place Order
                                                        </Button>

                                                    </div>
                                                </div>
                                                <br/>
                                            </Grid>

                                        </Grid>
                                    </div>
                                </React.Fragment>
                            </Paper>

                        </main>
                    </React.Fragment>
                }
            </div>


        );
    }
}