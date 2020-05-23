import React, { Component } from "react";
import axios from 'axios';
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";
import './review.css'
import Typography from "@material-ui/core/Typography/Typography";
import AuthService from "../../UserManagement/services/auth.service";
import LoaderComponent from "../../ProductMangement/ViewProducts/LoaderComponent";
import Container from "@material-ui/core/Container/Container";


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
        this.state.products.map((res , i )=>{
            price1= (res.PricePerUnit - res.PricePerUnit*(res.Discount/100))* res.Quantity + price1
        },()=>{
            this.setState({
                price:price1
            })
        });
        this.state.price = price1
        this.state.totalpay = this.state.delCharge + this.state.price
        return this.state.price

    }



    oncliick(){
       // e.preventDefault();
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

    render() {
        return (
            <Container>
                {this.state.loading ?     <div >
                        <div className="d-flex justify-content-center">
                            <LoaderComponent top={'100px'}/>
                        </div>
                    </div> :
                    <React.Fragment>
                        <div className="content">
                            <div className="container">

                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12">
                                        <div className="box">
                                            <h2 className="h" align="center">
                                                Review Purchase Details
                                            </h2>
                                            <br/>
                                            <h3 className="box-title h h3">Billing Details</h3>
                                            <div className="plan-selection">
                                                <p className="p p1">Name
                                                    : {this.state.Billing.firstName} &nbsp; {this.state.Billing.lastName}</p>
                                                <p className="p p1">Address
                                                    : {this.state.Billing.zip}, {this.state.Billing.billAddress}</p>
                                                <p className="p p1">City: {this.state.Billing.city} </p>
                                                <p className="p p1">State : {this.state.Billing.State}</p>
                                                <p className="p p1">Country : {this.state.Billing.country}</p>
                                                <p className="p p1">Phone Number : {this.state.Billing.pno}</p>
                                            </div>
                                            <div className="plan-selection">
                                                <div className="plan-data">
                                                    <h4 className="box-title h h3">Delivery Details</h4>
                                                    <p className="p p1">Delivery address
                                                        : {this.state.Billing.deliveryadd}
                                                    </p>

                                                    <p className="p p1">Delivery Instructions
                                                        : {this.state.Billing.instructions}</p>
                                                    {(() => {
                                                        if (this.state.Billing.cashDelivery === true) {
                                                            return <p className="p p1">Payment Type : Cash on
                                                                Delivery</p>
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>

                                        {(() => {
                                            if (this.state.Billing.cashDelivery === false) {
                                                // noinspection JSAnnotator
                                                return <div className="box">
                                                    <h3 className="box-title h h3">Payment Details</h3>
                                                    <div className="plan-selection">
                                                        <div className="plan-data">
                                                            <p className="p p1">Payment Type : Credit Card </p>
                                                            <p className="p p1">Card Number
                                                                : {this.state.CreditCard.cno} </p>
                                                            <p className="p p1">Card Holder Name
                                                                : {this.state.CreditCard.nameCard}</p>
                                                            <p className="p p1">Expire
                                                                Date: {this.state.CreditCard.month}/{this.state.CreditCard.year} </p>
                                                            <p className="p p1">CCV Number
                                                                : {this.state.CreditCard.cvc}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            } else {
                                                return <div className="box">
                                                    <h3 className="box-title">Payment Details</h3>
                                                    <div className="plan-selection">
                                                        <div className="plan-data">

                                                            <label className="label">Payment Type : Cash on Delivery</label>
                                                        </div>
                                                    </div>
                                                    <div className="plan-selection">
                                                        <div className="plan-data">
                                                            <label className="label">Make your payment when delivered :) </label>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                        })()}
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-5 col-xs-12">

                                        <div className="widget">
                                            <h3 className="widget-title h3 h">Total Payment</h3>
                                            <h2 className="h h2">
                                                Rs. {this.state.price = this.getThePrice() + this.state.delCharge}
                                            </h2>
                                            <div className="summary-block">
                                                <div className="summary-content">
                                                    <div className="summary-head"><h5 className="summary-title h5 h">Products
                                                        Price</h5></div>
                                                    <div className="summary-price">
                                                        <p className="summary-text p p1">Rs. {this.state.price = this.getThePrice()}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="summary-block">
                                                <div className="summary-content">
                                                    <div className="summary-head"><h5 className="summary-title h h5">Delivery
                                                        Charges
                                                    </h5></div>
                                                    <div className="summary-price">
                                                        <p className="summary-text p p1">Rs. {this.state.delCharge}</p>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="summary-block">
                                                <div className="summary-content">
                                                    <div className="summary-head"><h5 className="summary-title h h5">Total
                                                        Price</h5></div>
                                                    <div className="summary-price">
                                                        <p className="summary-text p p1">
                                                            Rs. {this.state.price = this.getThePrice()} + {this.state.delCharge}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div align="center">
                                                <br/>
                                                <Button
                                                    variant="contained" type="submit"
                                                    onClick={() => this.oncliick()}
                                                    color="default"

                                                >
                                                    Place Order
                                                </Button>
                                            </div>
                                        </div>
                                        <div align="center">
                                            {(() => {
                                                if (this.state.Billing.cashDelivery === true) {
                                                    return <Button
                                                        type="submit"
                                                        onClick={() => this.props.history.push('/billing')}
                                                        style={{"background-color" :'#363626', color:"#fff"}}

                                                    >
                                                        Back to Details
                                                    </Button>
                                                } else {
                                                    return <Button
                                                        type="submit"
                                                        onClick={() => this.props.history.push('/credit-card')}
                                                        style={{"background-color" :'#363626', color:"#fff"}}

                                                    >
                                                        Back to Details
                                                    </Button>
                                                }
                                            })()}

                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </React.Fragment>
                }
            </Container>


        );
    }
}