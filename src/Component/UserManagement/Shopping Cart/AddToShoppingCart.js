import React, {Component} from "react";
import axios from 'axios';

export default class AddToShoppingCart extends Component{
    constructor(props) {
        super(props);

        this.state={
            index:0,
            ToDelete:false,
            isInList:false,
            ProductId:'',
            PricePerUnit:'',
            ImagePath:''

        };
        this.handleClick= this.handleClick.bind(this);
    }
    componentDidMount() {
        let oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct =  JSON.parse(oldproduct);
        console.log(arrayproduct);
        for(var i= 0 ; i <arrayproduct.length ; i++){
            if(arrayproduct[i].ProductId===this.props.productId){
                this.setState({
                    isInList:true,
                    index:i,
                })
            }
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {

        let oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct =  JSON.parse(oldproduct);
        console.log(arrayproduct);
        for(var i= 0 ; i <arrayproduct.length ; i++){
            if(arrayproduct[i].ProductId===nextProps.productId){
                this.setState({
                    isInList:true,
                    index:i,
                })
            }
        }

    }

    handleClick()
    {
    let oldproduct = [];
    oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
    const arrayproduct = JSON.parse(oldproduct);

    if(this.state.isInList){
        console.log("came in");
        arrayproduct.splice(this.state.index, 1);
        sessionStorage.setItem('products', JSON.stringify(arrayproduct));
            }

    else{
        axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.productId)
            .then(res => {
                const productObj = {
                    ProductId: res.data._id,
                    PricePerUnit: res.data.PricePerUnit,
                    Quantity: this.props.quantity,
                    ImagePath: this.props.imagePath
                };
                arrayproduct.push(productObj);
                console.log("added");
                console.log(arrayproduct);
                sessionStorage.setItem('products', JSON.stringify(arrayproduct));
            });
    }
        this.setState({
            isInList:!this.state.isInList
        }, ()=>{
            console.log(arrayproduct);
            sessionStorage.setItem('products', JSON.stringify(arrayproduct));
        });

    }

    render() {
        const {productId, imagePath , quantity}= this.props;

        return(
            <button className={this.state.isInList? 'btn btn-danger': 'btn btn-info'} onClick={this.handleClick}>
                {!this.state.isInList? 'Add to cart' : 'Added to cart '}</button>
        );
    }


}