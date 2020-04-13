import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShoppingCartRow} from "./ShoppingCartRow";
import axios from "axios";

export default class GetShoppingCart extends Component{
    constructor(props) {
        super(props);
        this.state={
            products : [],
            productIds:[],

        };
        this.getShoppingCartTemplate= this.getShoppingCartTemplate.bind(this);
    }
    componentDidMount() {
        axios.get('https://servershopping.azurewebsites.net/shoppingcart/get-cart').then(
            res => {
                this.setState({
                    products : res.data,
                    //productIds:res.data.ProductId
                });
                console.log(this.state.products);



                // this.state.products.map((res, i)=>{
                //     this.setState({
                //         productIds:this.state.productIds.push(res.ProductId)
                //     })
                // });



            }).catch((error)=>{
            console.log(error);
        });

    }
    getShoppingCartTemplate(){
        return this.state.products.map((res , i )=>{
            return <ShoppingCartRow obj={res} key={i} handleRemoveButton={this.handleRemoveButton} />;
        });
    }
    handleRemoveButton(name){
        axios.delete('https://servershopping.azurewebsites.net/shoppingcart/delete-product'+name)
            .then(res => {
                console.log('deleted');

                axios.get('https://servershopping.azurewebsites.net/shoppingcart/get-cart').then(
                    res => {
                        this.setState({
                            products : res.data
                        });
                    }).catch((error)=>{
                    console.log(error);
                });
            })
    }

    render(){
        return(
            <div>
                <div className='container2'>
                    {this.getShoppingCartTemplate()}
                </div>
            </div>
        )
    }
}