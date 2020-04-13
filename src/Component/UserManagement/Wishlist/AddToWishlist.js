import React, {Component} from "react";
import axios from "axios";


export default class AddToWishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.productId,
            price: '',
            addToWishList: false,
            product: [],
            length: 0
        };
        this.handleWishlist = this.handleWishlist.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.productId !== null) {
            console.log(nextProps.productId);
            this.setState({
                productId: nextProps.productId
            });
            axios.post('https://servershopping.azurewebsites.net/wishlist/check-product' + this.props.productId)
                .then(res => {
                    console.log('ddddddd');
                    // console.log(res.data.length);
                    this.setState({
                        length: res.data.length
                    });

                    if (res.data.length > 0) {
                        this.setState({
                            addToWishList: true,

                        });
                    }


                });
        }
    }
    // componentDidMount() {
    //
    //     //console.log("aaaaa");
    //     //console.log(this.props.productId);
    //
    //     axios.post('http://localhost:4000/wishlist/check-product' + this.props.productId)
    //         .then(res => {
    //             console.log('ddddddd');
    //            // console.log(res.data.length);
    //             this.setState({
    //                 length: res.data.length
    //             });
    //
    //             if (res.data.length > 0) {
    //                 this.setState({
    //                     addToWishList: true,
    //
    //                 });
    //             }
    //
    //
    //         });
    // }

    handleWishlist() {

        axios.post('https://servershopping.azurewebsites.net/wishlist/check-product' + this.state.productId)
            .then(res => {
                console.log(res.data.length);

                if (res.data.length > 0) {
                    // this.setState({
                    //     addToWishList : true
                    // });
                    axios.delete('https://servershopping.azurewebsites.net/wishlist/delete-product' + this.state.productId)
                        .then(res => {
                            console.log('deleted');
                            this.setState({
                                addToWishList: false
                            });
                        })

                } else {
        console.log('aaaaaaa')
        axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.productId)
            .then(res => {
               // console.log(res.data);
                const productObj = {
                    // productId: res.data[0].name,
                    //                                 // price: res.data[0].price
                    ProductId: res.data._id,
                    ProductName: res.data.ProductName,
                    Category: res.data.Category,
                    PricePerUnit: res.data.PricePerUnit,
                    SubCategory: res.data.SubCategory,
                    ImageOfProduct: this.props.imagePath,
                    Quantity: this.props.quantity

                };
                axios.post('https://servershopping.azurewebsites.net/wishlist/add-to-wishlist', productObj)
                    .then(res => {
                        console.log("okay done");
                        console.log(res.data);
                    });
                this.setState({addToWishList: true});
            });


    }


      });
}



        // console.log("came to the handler");
        // this.setState({
        //     addToWishList:!this.state.addToWishList
        // });
        // axios.post('http://localhost:4000/products/get-product'+this.state.name)
        //     .then(res => {
        //         console.log(res.data);
        //         const productObj = {
        //             name: res.data[0].name,
        //             price:res.data[0].price
        //         };
        //         if(this.state.addToWishList === true){
        //             axios.post('http://localhost:4000/wishlist/add-to-wishlist',productObj)
        //                 .then(res =>{
        //                     console.log("okay done");
        //                     console.log(res.data);
        //                 })
        //         }else
        //         {
        //             axios.post('http://localhost:4000/wishlist/check-product'+this.state.name)
        //                 .then(res =>{
        //                     console.log(res.data.length);
        //                     if(res.data.length >0)
        //                     {
        //                         axios.delete('http://localhost:4000/wishlist/delete-product'+this.state.name)
        //                             .then(res => {
        //                                 console.log('deleted');
        //                             })
        //
        //                     }
        //                     else
        //                     {
        //
        //                     }
        //                     }
        //                 )
        //         }
        //
        //
        //     });


    render() {
        const {productId, imagePath , quantity}= this.props;
        return(
            <button className={this.state.addToWishList ? 'btn btn-danger': 'btn btn-info'} type='button' onClick={this.handleWishlist} >{this.state.addToWishList? 'Added to list': 'Add to list' }</button>
        );
    }
}