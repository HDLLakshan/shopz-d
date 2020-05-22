import React, {Component} from "react";
import axios from 'axios';
import '../Purchasing/PurchaseDetails/layout.css'
import Table from "@material-ui/core/Table/Table";
import RateCommentRow from "./RateCommentRow";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";



export default class DisplayRateComment extends Component {

    constructor(props) {
        super(props)
        this.state = {

            productid:'',
            products:[]
        };
    }

    componentDidMount() {

        let oldproduct = [];
        oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct = JSON.parse(oldproduct);
        console.log(arrayproduct);
        this.setState({
            products : arrayproduct
        });
        console.log("hiiiiiii"+this.state.products)
    }

    RatingTable() {
        return this.state.products.map((res, i) => {
            return <RateCommentRow obj={res} key={i}/>;
        });
    }

    click(){
        let oldList = [];
        this.setState({
            products : oldList
        });
        sessionStorage.setItem('products', JSON.stringify(oldList));
        // sessionStorage.removeItem("count");
        this.props.history.push('/');
        window.location.reload();

    }



    render() {
        return (
            <React.Fragment>

                <main>
                    <Paper>
                        <React.Fragment>

                            <React.Fragment>
                                <br/>

                                <br/>
                                <Grid container spacing={3}  >
                                    <Grid item sm={12}>
                                        <h5 align="center">Your Have Purchased Your Order Successfully !</h5>
                                        <h6 align="center"> Rate and Commment Products below</h6>
                                        <h6 align="center"> Or  &nbsp; <Button color="primary"
                                                                               variant="contained"  onClick={() => this.click()}
                                        >Skip & Back to Home</Button></h6>
                                        <br/>
                                        <br/>
                                    </Grid>

                                    <Table striped bordered hover >

                                        <tbody >

                                        {this.RatingTable()}

                                        </tbody>

                                    </Table>

                                    <Grid item sm={12}>
                                        <div align="center">
                                            <Button variant="contained" color="secondary"
                                                    onClick={() => this.click()}
                                            >Finish & Back to Home</Button>
                                        </div>
                                    </Grid>

                                </Grid>  <br/>


                            </React.Fragment>

                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}