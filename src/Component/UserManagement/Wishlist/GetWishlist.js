import React, {Component} from "react";
import axios from 'axios';
import {WishlistProductRow} from "./wishlishProductRow";
import AuthService from '../services/auth.service';

export default class GetWishlist extends Component{
    constructor(props) {
        super(props);
        this.state={
            products : [],

        };
        this.handleRemoveButton= this.handleRemoveButton.bind(this);
    }


    componentDidMount() {
        axios.post("https://servershopping.azurewebsites.net/users/getOne"+AuthService.getUsername())
            .then(response=>{
            this.setState({
                userId:response.data._id
            }, ()=>{
                axios.post('https://servershopping.azurewebsites.net/wishlist/check-product' + response.data._id)
                    .then(res => {
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
            return <WishlistProductRow obj={res} key={i} handleRemoveButton={this.handleRemoveButton} />;
        });
    }
    handleRemoveButton(pid){
        for(var i= 0 ; i<this.state.products.length;i++){
            if(this.state.products[i].ProductId===pid){
                this.state.products.splice(i, 1);
            }
        }
        axios.put('https://servershopping.azurewebsites.net/wishlist/edit-details' + this.state.userId, this.state.products)
            .then(res => {
                axios.post('https://servershopping.azurewebsites.net/wishlist/check-product' + this.state.userId)
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
            <div className='container2'>
                {/*<Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter">*/}
                {/*    <Modal.Header closeButton onClick={this.props.onHide}>*/}
                {/*        <Modal.Title id="contained-modal-title-vcenter">*/}
                {/*            My Wish list*/}
                {/*        </Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}
                <div className="row">
                    {this.WishlistComponentTemplate()}
                </div>

                {/*    </Modal.Body>*/}
                {/*    <Modal.Footer>*/}
                {/*        <Button onClick={this.props.onHide}>Close</Button>*/}
                {/*    </Modal.Footer>*/}
                {/*</Modal>*/}
            </div>
            </div>

        );
    }
}
