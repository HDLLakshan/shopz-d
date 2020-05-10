import React, {Component} from "react";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import {Rating} from "@material-ui/lab";
import axios from "axios";
import AddToShoppingCart from "../../UserManagement/Shopping Cart/AddToShoppingCart";
import AddToWishlist from "../../UserManagement/Wishlist/AddToWishlist";
import Nav from "react-bootstrap/Nav";

class SubDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            color:'',
            size:'S',
            AvailableAmount:'',
            OrderQuantity:0,
            productId:this.props.product._id,
        }

    }


    ChangeEventFn = (event) => {
        this.setState({color: event.target.value}, () => {
            this.props.setPosition(this.state.color)
            console.log(this.state.color)
        })
    }


    setAvailability = () => {

        if(this.state.size==='S'){
             if(parseInt(this.props.product.Details[this.props.position].small) > 0 ){
                 return this.props.product.Details[this.props.position].small
             }
             else {
                 return this.props.product.Details[this.props.position].small
             }

        }
        else if(this.state.size==='M'){
            if(parseInt(this.props.product.Details[this.props.position].medium) > 0 ){
                return this.props.product.Details[this.props.position].medium
            }
            else {
                return this.props.product.Details[this.props.position].medium

            }

        }
        else if(this.state.size==='L'){
            if(parseInt(this.props.product.Details[this.props.position].large) > 0 ){
                return this.props.product.Details[this.props.position].large
            }
            else {
                return this.props.product.Details[this.props.position].large
            }

        }
        else if(this.state.size==='XL'){
            if(parseInt(this.props.product.Details[this.props.position].xl) > 0 ){
                return this.props.product.Details[this.props.position].xl
            }
            else {
                return this.props.product.Details[this.props.position].xl
            }
        }
    }



    render() {
        if (this.props.product.Details.length === 0)
            return null;
        return(
                 <div>
                     <p className={"newarrival text-center"}>NEW</p>
                     <h2>{this.props.product.ProductName}</h2>
                     <p>Brand:<a  href={'/search/'+this.props.product.ProductBrand}>{this.props.product.ProductBrand}</a></p>
                     <Rating name="size-small" defaultValue={2} size="small" disabled={true} />
                     <p>Added On: {this.props.product.AddDate}</p>
                     <p className={"lead"}>Rs. <b>{this.props.product.PricePerUnit}</b></p>


                     <div className={"row"}>
                     <FormLabel>Select Color</FormLabel>
                     <FormControl className={"col-md-2"}  as="select" size="sm" name={"color"} value={this.props.product.Details[this.props.position].color} onChange={(event ) => this.ChangeEventFn(event)} custom>
                         {this.props.product.Details.map((text) => <option value={text.color}>{text.color}</option>)}
                     </FormControl>
                         <FormLabel>Select Size</FormLabel>
                         <FormControl className={"col-md-2"}  as="select" size="sm" name={"size"} value={this.state.size} onChange={(e ) => this.setState({size: e.target.value})} custom>
                             <option value={"S"}>Small</option>
                             <option value={"M"}>Medium</option>
                             <option value={"L"}>Large</option>
                             <option value={"XL"}>XL</option>
                         </FormControl>
                     </div>

                     <p><b>Availability:</b>{this.setAvailability()} </p>

                     <input className={' col-md-2'} placeholder="Enter Quantity" required type="number" value={this.state.OrderQuantity} min="1" max={this.setAvailability()}
                     onChange={(event)=> this.setState({OrderQuantity:event.target.value})}/>

                     <AddToShoppingCart productId={this.props.product._id} imagePath={this.props.product.Details[this.props.position].imgPath} quantity={this.state.OrderQuantity} />
                     <AddToWishlist productId={this.props.product._id} imagePath={this.props.product.Details[this.props.position].imgPath} quantity={this.state.OrderQuantity} />


                 </div>
        )
    }

}

export default SubDetails