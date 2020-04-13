import React, {Component} from "react";
import LoaderComponent from "./LoaderComponent";
import Figure from "react-bootstrap/Figure";
import {Link} from 'react-router-dom'
import ImageView from "./ImageView";
import AddToWishlist from "../../Wishlist/AddToWishlist";
import AddToShoppingCart from "../../Shopping Cart/AddToShoppingCart";


class ShowItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            didLoad: true
        }
    }

    onLoad = () => {
        this.setState({
            didLoad: false
        })
    }


    setHidden = () =>{
       if(this.props.cat === 'none'){
           if(this.props.cid === this.props.product._id){
               return true
           }else {
               return false
           }
       }
       else {
           if (this.props.product.Category === this.props.cat) {
               return false
           } else {
               return true
           }
       }

    }


        render() {

    return(
        <Link to={'/details/'+ this.props.product._id }>
        <div hidden={this.setHidden()}>
            <Figure style={{ border: "5px solid white" }}>

                <ImageView ImgArr={this.props.product.ImageOfProduct}/>

                <figcaption className="text-xl-center">
                    Rs {this.props.product.PricePerUnit}
                </figcaption>

            </Figure>

        </div>
        </Link>
    )
}

}
export default ShowItem