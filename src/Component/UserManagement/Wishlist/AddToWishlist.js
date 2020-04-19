import React, {Component} from "react";
import axios from "axios";
import AuthService from '../services/auth.service';

export default class AddToWishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:'',
            objId:'',
            productId: this.props.productId,
            isInList:false,
            addToWishList: false,
            product: [],
            length: 0
        };
        this.handleWishlist = this.handleWishlist.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.productId !== null) {
            this.setState({
                productId: nextProps.productId
            });
            axios.post("https://servershopping.azurewebsites.net/users/getOne"+AuthService.getUsername()).then(response=>{
                this.setState({
                    userId:response.data._id
                }, ()=>{
                    axios.post('https://servershopping.azurewebsites.net/wishlist/check-product' + response.data._id)
                        .then(res => {
                            if(res.data.length>0){
                                this.setState({
                                    product:res.data[0].ProductObject,
                                    objId:res.data._id,
                                    isInList:true,
                                    length:res.data.length
                                });


                                    for(var i= 0 ; i<res.data[0].ProductObject.length;i++){
                                        if(res.data[0].ProductObject[i].ProductId===nextProps.productId){
                                            this.setState({
                                                addToWishList: true,
                                            });
                                        }

                                }

                            }else{
                                this.setState({
                                    isInList:false
                                })
                            }
                        });
                })
            });
        }
    }

    handleWishlist() {

                if (this.state.addToWishList) {
                    for(var i= 0 ; i<this.state.product.length;i++){
                        if(this.state.product[i].ProductId===this.state.productId){
                            this.state.product.splice(i, 1);
                        }
                    }
                    axios.put('https://servershopping.azurewebsites.net/wishlist/edit-details' + this.state.userId, this.state.product)
                        .then(res => {
                            this.setState({
                                addToWishList: false
                            });
                })

            } else {

                    if(this.state.length>0){
                        //User list is there
                        axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.productId)
                            .then(res => {
                                const productObj = {
                                    ProductId: res.data._id,
                                    ProductName: res.data.ProductName,
                                    Category: res.data.Category,
                                    PricePerUnit: res.data.PricePerUnit,
                                    SubCategory: res.data.SubCategory,
                                    ImageOfProduct: this.props.imagePath,
                                    Quantity: this.props.quantity

                                };
                                this.state.product.push(productObj);
                                axios.put('https://servershopping.azurewebsites.net/wishlist/edit-details' + this.state.userId, this.state.product)
                                    .then(res => {
                                        this.setState({
                                            addToWishList: true
                                        });
                                    });
                            });



                    }else{
                        //User list is not there
                        axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.productId)
                            .then(res => {
                                const productObj = {
                                    ProductId: res.data._id,
                                    ProductName: res.data.ProductName,
                                    Category: res.data.Category,
                                    PricePerUnit: res.data.PricePerUnit,
                                    SubCategory: res.data.SubCategory,
                                    ImageOfProduct: this.props.imagePath,
                                    Quantity: this.props.quantity

                                };
                                const proObj=[];
                                proObj.push(productObj);
                                const finalObj={
                                    UserId:this.state.userId,
                                    ProductObject:proObj
                                };
                                axios.post('https://servershopping.azurewebsites.net/wishlist/add-to-wishlist', finalObj)
                                    .then(res => {
                                    });
                                this.setState({addToWishList: true});

                            });

                    }
    }
}

    render() {
        const {productId, imagePath , quantity}= this.props;
        return(
            <button className={this.state.addToWishList ? 'btn btn-danger': 'btn btn-info'} type='button' onClick={this.handleWishlist} >{this.state.addToWishList? 'Added to list': 'Add to list' }</button>
        );
    }
}