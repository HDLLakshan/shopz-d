import React, {Component} from "react";
import axios from 'axios';
import {WishlistProductRow} from "./wishlishProductRow";
import {Modal,Button} from "react-bootstrap";


export default class GetWishlist extends Component{
    constructor(props) {
        super(props);
        this.state={
            products : [],

        };
        this.handleRemoveButton= this.handleRemoveButton.bind(this);
    }


    componentDidMount() {
        axios.get('https://servershopping.azurewebsites.net/wishlist/get-wishlist').then(
            res => {
                this.setState({
                    products : res.data
                });
            }).catch((error)=>{
            console.log(error);
        });

    }

     WishlistComponentTemplate(){
        return this.state.products.map((res , i )=>{
            return <WishlistProductRow obj={res} key={i} handleRemoveButton={this.handleRemoveButton} />;
        });
    }
    handleRemoveButton(name){
        axios.delete('https://servershopping.azurewebsites.net/wishlist/delete-product'+name)
            .then(res => {
                console.log('deleted');

                axios.get('https://servershopping.azurewebsites.net/wishlist/get-wishlist').then(
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
            <div className='container'>
                {/*<Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter">*/}
                {/*    <Modal.Header closeButton onClick={this.props.onHide}>*/}
                {/*        <Modal.Title id="contained-modal-title-vcenter">*/}
                {/*            My Wish list*/}
                {/*        </Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body>*/}
                         {this.WishlistComponentTemplate()}
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
