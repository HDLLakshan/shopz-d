import React, {Component} from "react";
import axios from 'axios';
import {WishlistProductRow} from "./wishlishProductRow";
import AuthService from '../services/auth.service';
import authHeader from "../services/auth-header";
import { withRouter } from 'react-router-dom'
import {Col, Row} from "react-bootstrap";
import Image from './wallpaper.jpg';

class GetWishlist extends Component{
    constructor(props) {
        super(props);
        this.state={
            products : [],
            username : AuthService.getUsername(),
            addModalShow:false
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
        for(let i= 0 ; i<this.state.products.length; i++){
            if(this.state.products[i].ProductId===pid){
                this.state.products.splice(i, 1);
            }
        }
        axios.put('http://localhost:4000/wishlist/edit-details' + this.state.userId, this.state.products)
            .then(() => {
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
                        <div style={{backgroundColor: '#000000', "width": "100%", "height": "100px"}}/>
                        <div style={{ "height":"400px"}}>
                            <img src={Image} style={{"height":"25%", "width":"100%"}} alt="Image"/>
                            <Row>
                                <Col>
                                    <h5 style={{"margin-top":"35px", "margin-left":'100px', fontWeight: 'bold'}}>{this.state.username}'s RARE Wishlist</h5>
                                </Col>

                            </Row>
                            <Row>
                                <div className='btn' onClick={()=>{this.props.history.push('/userMan')}} style={{width:"100%"}}>
                                    <Col>
                                        <hr/>
                                        <p style={{margin:"15px", fontWeight: 'bold', color:'#888844'}}>My Account</p>
                                        <hr/>
                                    </Col>
                                </div>
                            </Row>
                            <Row>
                                <div className='btn' style={{width:"100%"}} onClick={()=>{this.props.history.push('/userMan')}}>
                                    <Col>
                                        <hr/>
                                        <p style={{margin:"15px", fontWeight: 'bold', color:'#888844'}}>Home</p>
                                        <hr/>
                                    </Col>
                                </div>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col md="8" xs="12">
                    <div className="card-deck">
                        {this.WishlistComponentTemplate()}
                    </div>
                </Col>
            </Row>
        </div>
        );
    }
}
export default withRouter(GetWishlist);