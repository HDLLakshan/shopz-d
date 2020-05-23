import * as React from "react";
import  './creditcard.css'
import Grid from "@material-ui/core/Grid/Grid";
import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import './layout.css'
import {Button, Col} from "reactstrap";
import AuthService from "../../UserManagement/services/auth.service";
import Box from "@material-ui/core/Box/Box";

export default class CardDetails extends React.Component {

    constructor() {
        super()

        this.onChangeCardNo = this.onChangeCardNo.bind(this);
        this.onChangeCName = this.onChangeCName.bind(this);
        this.onChangeExDay = this.onChangeExDay.bind(this);
        this.onChangeExMonth = this.onChangeExMonth.bind(this);
        this.onChangeCVV = this.onChangeCVV.bind(this);
        this.handleChangeCtype = this.handleChangeCtype.bind(this);
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
            },
            nameCardError:'',
            cnoError:'',
            monthError:'',
            yearError:'',
            cvcError:'',
            value:'Visa'
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
    handleChangeCtype(e){
        this.setState({value: e.target.value});
    }

    yearvalidate(){
        let thisdate = new Date();
        let currentyear = thisdate.getFullYear();

        return this.state.CreditCard.year < currentyear;

    }
    monthvalidate(){
        const thisdate = new Date();
        const currentmonth = thisdate.getMonth()+1;
        let currentyear = thisdate.getFullYear();

        return ((this.state.CreditCard.month < currentmonth)&& (this.state.CreditCard.year==currentyear));

    }

    validate(){

        let nameCardError="";
        let  cnoError="";
        let monthError="";
        let yearError="";
        let cvcError="";

        let visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
        let mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
        let amexpRegEx = /^(?:3[47][0-9]{13})$/;
        let discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
        let ccvNo = /^[0-9]{3,4}$/;

        if (!this.state.CreditCard.nameCard) {
            nameCardError = "Invalid card holder name";
        }
        if ((!this.state.CreditCard.cno)
        ) {
            cnoError = "Invalid card number";
        }

        if(this.state.value==='Visa'){
            if(visaRegEx.test(this.state.CreditCard.cno)===false) {
                cnoError = "Invalid Visa Card Number"
            }
        } else if(this.state.value==='AMEX'){
            if(amexpRegEx.test(this.state.CreditCard.cno)===false) {
                cnoError = "Invalid American Express Card Number "
            }
        }else if(this.state.value==='Master'){
            if(mastercardRegEx.test(this.state.CreditCard.cno)===false) {
                cnoError = "Invalid Master Card Number "
            }
        }else if(this.state.value==='Discover'){
            if(discovRegEx.test(this.state.CreditCard.cno)===false) {
                cnoError = "Invalid Discover Card Number "
            }
        }


        if ((!this.state.CreditCard.month)||(!(this.state.CreditCard.month >= 1 && this.state.CreditCard.month <= 12))||
            (this.monthvalidate()===true)
        ) {
            monthError = "Invalid month";
        }

        if ((!this.state.CreditCard.year)||(!(this.state.CreditCard.year >= 1000 && this.state.CreditCard.year <= 2100))||
            (this.yearvalidate()===true)
        ) {
            yearError = "Invalid year";
        }
        if ((!this.state.CreditCard.cvc)||((ccvNo.test(this.state.CreditCard.cvc)===false))) {
            cvcError = "Invalid CCV";
        }

        if (nameCardError||cnoError||monthError||yearError||cvcError)
        {

            this.setState({nameCardError,cnoError,monthError,yearError,cvcError});
            return false;
        }
        this.setState({
            nameCardError:'',
            cnoError:'',
            monthError:'',
            yearError:'',
            cvcError:''

        })

        return true;
    };


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
        const isValid = this.validate();

        if(isValid) {


            if (!(this.state.available === true)) {

                axios.post('http://localhost:4000/credit-card/add-creditcard', this.state.CreditCard)
                    .then(res => console.log(res.data));

                this.props.history.push('/review-order-details/' + this.state.uname)
                window.location.reload();

            } else if (this.state.available === true) {

                axios.put('http://localhost:4000/credit-card/update-creditcard/' + this.state.uname, this.state.CreditCard)
                    .then((res) => {
                        console.log(res.data)
                        console.log('Credit card successfully updated');

                    }).catch((error) => {
                    console.log(error)
                })
                this.props.history.push('/review-order-details/' + this.state.uname)
                window.location.reload();
            }
        }
    }

    render() {
        return (
            <React.Fragment>

                <main>
                    <Paper elevation={0}>

                        <br/>
                        <Typography component="h1" variant="h4" align="center">

                            Purchasing Details

                        </Typography>
                        <br/>

                        <React.Fragment>
                            <Typography variant="h5" gutterBottom align="center">
                                Payment Details
                            </Typography>
                            <Grid container spacing={1} justify="center">

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
                                                        <label className="creditname">Card Holder: &nbsp;
                                                            {this.state.CreditCard.nameCard}
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="small-9 columns">
                                                        <label className="creditdate">Expire: &nbsp;
                                                            {this.state.CreditCard.month} / {this.state.CreditCard.year}
                                                        </label>
                                                    </div>

                                                </div>
                                                <div className="row">
                                                    <div className="small-9 columns">
                                                        <label className="creditdate">
                                                            CVV: &nbsp;   {this.state.CreditCard.cvc}
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
                                                            <div class="row">
                                                                <select value={this.state.value} onChange={this.handleChangeCtype}
                                                                        className="customdroplist"
                                                                >
                                                                    <option value="Visa">Visa</option>
                                                                    <option value="AMEX">AMEX</option>
                                                                    <option value="Master">Master</option>
                                                                    <option value="Discover">Discover</option>
                                                                </select>
                                                                <input type="text"
                                                                       className="form-control mb-2 f" id="inlineFormInput"
                                                                       placeholder="Card Number"
                                                                       name="cno"
                                                                       value={this.state.CreditCard.cno}
                                                                       onChange={this.onChangeCardNo.bind(this)}

                                                                />
                                                            </div>
                                                            <div align="center" style={{ fontSize: 16, color: "red" }} className="cnoError">
                                                                {this.state.cnoError}
                                                            </div>

                                                        </div>
                                                    </div><br/>
                                                    <div className="form-row align-items-center">
                                                        <div className="col-md-10">

                                                            <input type="text"
                                                                   className="form-control mb-2" id="inlineFormInput"
                                                                   placeholder="Card Holder"
                                                                   name="nameCard"
                                                                   value={this.state.CreditCard.nameCard}
                                                                   onChange={this.onChangeCName.bind(this)}
                                                            />
                                                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                                {this.state.nameCardError}
                                                            </div>
                                                        </div>
                                                    </div><br/>


                                                    <div className="row ">
                                                        <div className="col-md-5">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Year"
                                                                   id="year"
                                                                   name="year"
                                                                   value={this.state.CreditCard.year}
                                                                   onChange={this.onChangeExDay.bind(this)}

                                                            />
                                                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                                {this.state.yearError}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5 ">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Month"
                                                                   id="month"
                                                                   name="month"
                                                                   value={this.state.CreditCard.month}
                                                                   onChange={this.onChangeExMonth.bind(this)}

                                                            />
                                                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                                {this.state.monthError}
                                                            </div>
                                                        </div>
                                                    </div><br/>
                                                    <div className="row ">
                                                        <div className="col-md-6">
                                                            <input type="text"
                                                                   className="form-control"
                                                                   placeholder="CVV"
                                                                   id="cvc"
                                                                   name="cvc"
                                                                   value={this.state.CreditCard.cvc}
                                                                   onChange={this.onChangeCVV.bind(this)}
                                                            />
                                                            <div align="center" style={{ fontSize: 16, color: "red" }}>
                                                                {this.state.cvcError}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 ">
                                                            <button className="btn"  style={{"background-color" :'#888844', color:"#fff"}} type="submit" value="Submit"> Save & Next</button>
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                    <br/>
                                </div>

                            </Grid>
                            <div align="center" className="divv" >
                                <Button variant="contained" size="md" type="submit" style={{width:100}}
                                        onClick={() => this.props.history.push('/billing')}

                                >
                                    Back
                                </Button>
                            </div>
                            <br/>
                        </React.Fragment>

                    </Paper>
                </main>
            </React.Fragment>

        );
    }
}