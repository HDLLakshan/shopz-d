import React, {Component} from "react";
import axios from 'axios';

export default class AddToShoppingCart extends Component{
    constructor(props) {
        super(props);

        this.state={
            ProductId:'',
            isInList:false,
            ProductIds:[]
        };
        this.handleClick= this.handleClick.bind(this);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.productId !==null){
            console.log(nextProps.productId);
            this.setState({
                ProductId:nextProps.productId
            });
            axios.post('https://servershopping.azurewebsites.net/shoppingcart/check-product' + nextProps.productId)
                .then(res => {

                    console.log("tatewaki");
                    console.log(res.data.length);
                    this.setState({
                        length: res.data.length
                    });

                    if (res.data.length > 0) {
                        this.setState({
                            isInList: true,

                        });
                    }
                });
        }


    }


    handleClick() {
        axios.post('https://servershopping.azurewebsites.net/shoppingcart/check-product' + this.props.productId)
            .then(res => {
                console.log(res.data.length);


                if (res.data.length > 0) {
                    // this.setState({
                    //     addToWishList : true
                    // });
                    axios.delete('https://servershopping.azurewebsites.net/shoppingcart/delete-product' + this.props.productId)
                        .then(res => {
                            console.log('deleted');
                            this.setState({
                                isInList: false
                            });
                        })

                } else {
                    axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.productId)
                        .then(res => {
                            console.log(this.props.imagePath);
                            //console.log(res.data);
                            const productObj = {
                                ProductId: res.data._id,
                                PricePerUnit: res.data.PricePerUnit,
                                Quantity:this.props.quantity,
                                ImagePath: this.props.imagePath
                            };
                            axios.post('https://servershopping.azurewebsites.net/shoppingcart/add-to-cart', productObj)
                                .then(res => {
                                    console.log("okay done");
                                    console.log(res.data);
                                });
                            this.setState({isInList: true});
                        });


                }


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