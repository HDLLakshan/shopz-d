import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ShoppingCartRow} from "./ShoppingCartRow";
import axios from "axios";
import Button from "@material-ui/core/Button/Button";

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
        console.log("came");
        let oldproduct = [];
        oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct = JSON.parse(oldproduct);
        console.log(arrayproduct);

        this.setState({
            products : arrayproduct
        });


    }
    getShoppingCartTemplate(){
        return this.state.products.map((res , i )=>{
            return <ShoppingCartRow obj={res} key={i} handleRemoveButton={this.handleRemoveButton} />;
        });
    }
    handleRemoveButton(id){
        const oldList = JSON.parse(sessionStorage.getItem("products"));
        console.log(oldList);
        for(var i = 0 ; i<oldList.length;i++){
            if(oldList[i].ProductId===id){

                var index = oldList.indexOf(id);
                oldList.splice(index,1);
            }
        }
        sessionStorage.setItem('products', JSON.stringify(oldList));
        console.log(oldList);
        window.location.reload();

    }

    render(){
        return(
            <div>
                <div className='container2'>
                    {this.getShoppingCartTemplate()}

                </div>
                <br/>
                <div align="center"> <Button variant="contained" size="md" type="submit" alignment={"center"} color="secondary"
                              onClick={() => this.props.history.push('/billing')}
                >
                    PAYMENT
                </Button></div>

            </div>
        )
    }
}