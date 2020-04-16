import * as React from "react";
import  '../PurchaseDetails/creditcard.css'
import Grid from "@material-ui/core/Grid/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import '../PurchaseDetails/layout.css'
import {Button, Col} from "reactstrap";
import AuthService from "../../UserManagement/services/auth.service";

export default class CardDetails extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeCardNo = this.onChangeCardNo.bind(this);
        this.onChangeCName = this.onChangeCName.bind(this);
        this.onChangeExDay = this.onChangeExDay.bind(this);
        this.onChangeExMonth = this.onChangeExMonth.bind(this);
        this.onChangeCVV = this.onChangeCVV.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            userName:'',
            nameCard: '',
            cno: '',
            month: '',
            year: '',
            cvc: '',
            pid:'',
        }
    }

    //Name of Card Owner
    onChangeCName(n) {
        this.setState({
            nameCard: n.target.value
        });
    }
    //Card Number
    onChangeCardNo(c) {
        this.setState({
            cno: c.target.value
        });
    }
    //Expiration
    onChangeExMonth(m) {
        this.setState({
            month: m.target.value
        });
    }
    onChangeExDay(d) {
        this.setState({
            year: d.target.value
        });
    }
    //CCV
    onChangeCVV(v) {
        this.setState({
            cvc: v.target.value
        });
    }

    componentDidMount() {

        this.state.userName   = AuthService.getUsername();

        axios.get('https://servershopping.azurewebsites.net/payment/getpayment/' + this.state.userName)
            .then(res => {

                this.setState({
                    pid:res.data[0]._id,
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

    onSubmit(e) {
        e.preventDefault()

        const editpaymentObject = {

            cno:this.state.cno,
            nameCard:this.state.nameCard,
            month:this.state.month,
            year:this.state.year,
            cvc:this.state.cvc
        };
        axios.put('https://servershopping.azurewebsites.net/payment/update-payment/' + this.state.pid, editpaymentObject)
            .then(res => console.log(res.data));

        this.setState({

            cno: '',
            nameCard: '',
            month:'',
            year: '',
            cvc:''
        })
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
                                                        <p className="creditcard-number">{this.state.cno}</p>

                                                    </div>


                                                </div>
                                                <div className="row">
                                                    <div className="small-9 columns">
                                                        <label className="creditname">Card Holder &nbsp;
                                                            {this.state.nameCard}
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="small-9 columns">
                                                        <label className="creditdate">Expire &nbsp;
                                                            {this.state.month} / {this.state.year}
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="small-9 columns">
                                                        <label className="creditdate">
                                                            {this.state.cvc}
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
                                                                   onChange={this.onChangeCardNo.bind(this)}
                                                                   value={this.state.cno}

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
                                                                   onChange={this.onChangeCName.bind(this)}
                                                                   value={this.state.nameCard}
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
                                                                   onChange={this.onChangeExDay.bind(this)}
                                                                   value={this.state.year}

                                                            />
                                                        </div>
                                                        <div className="col-md-5 ">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Month"
                                                                   required
                                                                   id="month"
                                                                   name="month"
                                                                   maxLength="2"
                                                                   onChange={this.onChangeExMonth.bind(this)}
                                                                   value={this.state.month}

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
                                                                   onChange={this.onChangeCVV.bind(this)}
                                                                   value={this.state.cvc}
                                                            />
                                                        </div>
                                                        <div className="col-md-4 ">
                                                            <button className="btn btn-primary" type="submit" value="Submit"> Update</button>
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
                                        onClick={() => this.props.history.push('/review-order-details/'+this.state.userName)}
                                >
                                    Back to Review
                                </Button>
                            </div>
                        </React.Fragment>
                    </Paper>

                </main>
            </React.Fragment>

        );
    }
}