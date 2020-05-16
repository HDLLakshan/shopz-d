import React, {Component} from "react";
import axios from 'axios';
import {WishlistProductRow} from "./wishlishProductRow";
import AuthService from '../services/auth.service';
import authHeader from "../services/auth-header";
import { withRouter } from 'react-router-dom';
import {Col, Row} from "react-bootstrap";
import Image from './images.png';
import GetShoppingCart from "../Shopping Cart/getShoppingCart";

class GetWishlist extends Component{
    constructor(props) {
        super(props);
        this.state={
            products : [],
            username : AuthService.getUsername()
        };
        this.handleRemoveButton= this.handleRemoveButton.bind(this);
    }


    componentDidMount() {
        axios.post("http://localhost:4000/users/getOne"+AuthService.getUsername())
            .then(response=>{
            this.setState({
                userId:response.data._id
            }, ()=>{
                axios.post('http://localhost:4000/wishlist/check-product' + response.data._id, null, { headers: authHeader() })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.length > 0) {
                            this.setState({
                                products: res.data[0].ProductObject,

                            });
                        }
                    })
            }
        )
        });

    }

        WishlistComponentTemplate(){
        return this.state.products.map((res , i )=>{
            return  <WishlistProductRow obj={res} key={i} handleRemoveButton={this.handleRemoveButton} /> ;
        });
    }

    handleRemoveButton(pid){
        for(var i= 0 ; i<this.state.products.length;i++){
            if(this.state.products[i].ProductId===pid){
                this.state.products.splice(i, 1);
            }
        }
        axios.put('http://localhost:4000/wishlist/edit-details' + this.state.userId, this.state.products)
            .then(res => {
                axios.post('http://localhost:4000/wishlist/check-product' + this.state.userId, null, { headers: authHeader() })
                    .then(res => {
                        if (res.data.length > 0) {
                            this.setState({
                                products: res.data[0].ProductObject,
                            });
                        }
                    })
            });
    }

    render(){
        let addModalClose =() => this.setState({addModalShow : false});
        return(
        <div>
            <div style={{ fontWeight: 'bold', backgroundColor:'#000000',  padding: "15px",margin: "20px" }} className='text-center text-white'
                 onClick={()=>{
                     this.props.history.push('/');
                     window.location.reload();
                 }}>
                ADD MORE ITEMS
            </div>
            <Row>
                <Col md="4" >
                    <div className="block-example border border-dark" style={{  margin: "40px" }}>
                        <div style={{ backgroundColor:'#000000', "width": "100%","height":"100px"}}></div>
                        <div style={{ "height":"400px"}}>
                            <Row>
                                <Col md="3">
                                    <img src={Image} style={{"height":"80px", "width":"80px", margin:"15px"}}/>
                                </Col>
                                <Col md="9">
                                    <h5 style={{"margin-top":"35px"}}>Your Wishlist {this.state.username}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <div onClick={()=>{this.props.history.push('/userMan')}}>
                                    <Col>
                                        <hr/>
                                        <p style={{margin:"15px", fontWeight: 'bold'}}>My Account</p>
                                        <hr/>
                                    </Col>
                                </div>
                            </Row>
                            <Row>
                                <div onClick={()=>{return <GetShoppingCart show={true} onHide={addModalClose}/>}}>
                                    <Col>
                                        <hr/>
                                        <p style={{margin:"15px", fontWeight: 'bold'}}>Shopping Cart</p>
                                        <hr/>
                                    </Col>
                                </div>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="8">
                    <div align="center">
                        {this.WishlistComponentTemplate()}
                    </div>
                </Col>
            </Row>
        </div>
        );
    }
}
export default withRouter(GetWishlist);