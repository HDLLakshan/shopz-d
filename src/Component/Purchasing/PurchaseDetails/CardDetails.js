import * as React from "react";
import  './creditcard.css'
import Grid from "@material-ui/core/Grid/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import './layout.css'
import {Button, Col} from "reactstrap";
import AuthService from "../../UserManagement/services/auth.service";

export default class CardDetails extends React.Component {

    constructor() {
        super()

        this.onChangeCardNo = this.onChangeCardNo.bind(this);
        this.onChangeCName = this.onChangeCName.bind(this);
        this.onChangeExDay = this.onChangeExDay.bind(this);
        this.onChangeExMonth = this.onChangeExMonth.bind(this);
        this.onChangeCVV = this.onChangeCVV.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            uname:'',
            available:'',
            CreditCard: {
                userName: '',
                nameCard: 'xxxxx xxxxxx',
                cno: '0000000000000000',
                month: 'xx',
                year: 'xx',
                cvc: 'CVC'
            }
        }
    }

    //Name of Card Owner
    onChangeCName(n) {
        this.setState({
            CreditCard:{ ...this.state.CreditCard,nameCard: n.target.value}
        });
    }
    //Card Number
    onChangeCardNo(c) {
        this.setState({
            CreditCard:{ ...this.state.CreditCard,cno: c.target.value}
        });
    }
    //Expiration
    onChangeExMonth(m) {
        this.setState({
            CreditCard:{ ...this.state.CreditCard, month: m.target.value}
        });
    }
    onChangeExDay(d) {
        this.setState({
            CreditCard:{ ...this.state.CreditCard, year: d.target.value}
        });
    }
    //CCV
    onChangeCVV(v) {
        this.setState({
            CreditCard:{ ...this.state.CreditCard, cvc: v.target.value}
        });
    }



    componentDidMount() {
        this.state.uname = AuthService.getUsername();

        axios.get('http://localhost:4000/credit-card/get-single-creditcard/' + this.state.uname)
            .then(res => {
                if(res.data === null){

                }else{
                    console.log("true")
                    this.setState({
                        CreditCard:res.data,
                        available:true
                    })}
            })
            .catch((error) => {
                console.log(error + 'credit get error');
            })


    }

    onSubmit(e) {
        e.preventDefault()


        this.state.CreditCard.userName = this.state.uname

        if(!(this.state.available===true)) {

            axios.post('http://localhost:4000/credit-card/add-creditcard', this.state.CreditCard)
                .then(res => console.log(res.data));

        }else if(this.state.available===true){

            axios.put('http://localhost:4000/credit-card/update-creditcard/'+this.state.uname,this.state.CreditCard)
                .then((res) => {
                    console.log(res.data)
                    console.log('Credit card successfully updated');

                }).catch((error) => {
                console.log(error)
            })
        }

    }

    render() {
        return (
            <React.Fragment>

                <main className="layout">
                    <Paper className="paper">
                        <Typography component="h1" variant="h4" align="center">
                            Purchasing Details
                        </Typography>
                        <br/>

                        <React.Fragment>


                            <Grid container spacing={1} justify="center">
                                <Typography variant="h6" gutterBottom align="center">
                                    Payment Details
                                </Typography>
                                <br/>
                                <div >
                                    <div className="row">
                                        <div className="small-5 small-offset-1 columns ">
                                            <div className="callout credit">
                                                <div className="row">
                                                    <div className="small-6 columns">
                                                        <h1 className="creditbank">My Bank</h1>
                                                    </div>
                                                    <div className="small-6 columns" align="center">
                                                        <img className="creditmc" src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png" alt="" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="column">
                                                        <p className="creditcard-number">{this.state.CreditCard.cno}</p>

                                                    </div>


                                                </div>
                                                <div className="row">
                                                    <div className="small-9 columns">
                                                        <label className="creditname">Card Holder &nbsp;
                                                            {this.state.CreditCard.nameCard}
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="small-9 columns">
                                                        <label className="creditdate">Expire &nbsp;
                                                          {this.state.CreditCard.month} / {this.state.CreditCard.year}
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="small-9 columns">
                                                        <label className="creditdate">
                                                           {this.state.CreditCard.cvc}
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="small-5 columns end">
                                            <div className="callout margin-top50">
                                                <form onSubmit={this.onSubmit}>
                                                    <div className="form-row align-items-center">
                                                        <div className="col-md-10">

                                                            <input type="text"
                                                                   className="form-control mb-2" id="inlineFormInput"
                                                                   placeholder="Card Number"
                                                                   required
                                                                   name="cno"
                                                                   maxLength="16"
                                                                   value={this.state.CreditCard.cno}
                                                                   onChange={this.onChangeCardNo.bind(this)}

                                                            />
                                                        </div>
                                                    </div><br/>
                                                    <div className="form-row align-items-center">
                                                        <div className="col-md-10">

                                                            <input type="text"
                                                                   className="form-control mb-2" id="inlineFormInput"
                                                                   placeholder="Card Holder"
                                                                   required
                                                                   name="nameCard"
                                                                   value={this.state.CreditCard.nameCard}
                                                                   onChange={this.onChangeCName.bind(this)}
                                                            />
                                                        </div>
                                                    </div><br/>


                                                    <div className="row ">
                                                        <div className="col-md-5">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Year"
                                                                   maxLength="4"
                                                                   required
                                                                   id="year"
                                                                   name="year"
                                                                   value={this.state.CreditCard.year}
                                                                   onChange={this.onChangeExDay.bind(this)}

                                                            />
                                                        </div>
                                                        <div className="col-md-5 ">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Month"
                                                                   required
                                                                   id="month"
                                                                   name="month"
                                                                   maxLength="2"
                                                                   value={this.state.CreditCard.month}
                                                                   onChange={this.onChangeExMonth.bind(this)}

                                                            />
                                                        </div>
                                                    </div><br/>
                                                    <div className="row ">
                                                        <div className="col-md-6">
                                                            <input type="text"
                                                                   className="form-control"
                                                                   placeholder="CVV"
                                                                   required
                                                                   id="cvc"
                                                                   name="cvc"
                                                                   maxLength="3"
                                                                   value={this.state.CreditCard.cvc}
                                                                   onChange={this.onChangeCVV.bind(this)}
                                                            />
                                                        </div>
                                                        <div className="col-md-4 ">
                                                            <button className="btn btn-primary" type="submit" value="Submit"> Save Details</button>
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                    <br/><br/>
                                </div>

                            </Grid>
                            <div align="center" className="divv">
                            <Button variant="contained" size="md" type="submit"
                                    onClick={() => this.props.history.push('/review-order-details/'+this.state.uname)}

                            >
                                Review Order
                            </Button>
                            </div>
                        </React.Fragment>
                    </Paper>

                </main>
            </React.Fragment>

        );
    }
}