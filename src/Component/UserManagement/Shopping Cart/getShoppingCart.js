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
            price:0,
        };
        this.getShoppingCartTemplate= this.getShoppingCartTemplate.bind(this);
        this.getThePrice= this.getThePrice.bind(this);
        this.changeQuantity= this.changeQuantity.bind(this);
    }
    componentDidMount() {
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


    }
    getShoppingCartTemplate(){

            return this.state.products.map((res , i )=>{
                return <ShoppingCartRow obj={res} key={i} handleRemoveButton={this.handleRemoveButton} changeQuantity={this.changeQuantity}/>;
            });

    }
    handleRemoveButton(id){
        const oldList = JSON.parse(sessionStorage.getItem("products"));
        for(var i = 0 ; i<oldList.length;i++){
            if(oldList[i].ProductId===id){

                var index = oldList.indexOf(id);
                oldList.splice(index,1);
            }
        }
        sessionStorage.setItem('products', JSON.stringify(oldList));
        window.location.reload();

    }
    getThePrice(){
        var price1=0;
        this.state.products.map((res , i )=>{
            price1=res.PricePerUnit* res.Quantity+price1
        },()=>{
            this.setState({
                price:price1
            })
        });

        return <p style={{"font-size":"30px"}}> Rs {price1}</p>

    }

    render(){
        return(
            <div align="center">
                <div >
                    {this.getShoppingCartTemplate()}
                </div>
                <br/>
                <div>
                    {this.getThePrice()}
                </div>
                <div> <Button variant="contained" size="md" type="submit" alignment={"center"} color="secondary"
                              onClick={() => this.props.history.push('/billing')}
                >
                    PAYMENT
                </Button></div>

            </div>
        )
    }
}