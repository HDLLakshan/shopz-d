import React, {Component} from "react";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import {Rating} from "@material-ui/lab";
import axios from "axios";
import AddToShoppingCart from "../../UserManagement/Shopping Cart/AddToShoppingCart";
import AddToWishlist from "../../UserManagement/Wishlist/AddToWishlist";

class SubDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            color:'',
            size:'S',
            AvailableAmount:'',
            OrderQuantity:0,
            productId:this.props.product._id

        }
        console.log(this.props.product.StockSmall[0])
    }


    ChangeEventFn = (event) => {
        this.setState({color: event.target.value}, () => {
            this.props.setPosition(this.state.color)
            console.log(this.state.color)
        })
    }

    componentWillMount() {

    }


    setAvailability = () => {
        if(this.state.size==='S'){
             if(parseInt(this.props.product.StockSmall[this.props.position]) > 0 ){
                 return this.props.product.StockSmall[this.props.position]
             }
             else {
                 return this.props.product.StockSmall[this.props.position]
             }

        }
        else if(this.state.size==='M'){
            if(parseInt(this.props.product.StockMedium[this.props.position]) > 0 ){
                return this.props.product.StockMedium[this.props.position]
            }
            else {
                return this.props.product.StockMedium[this.props.position]

            }

        }
        else if(this.state.size==='L'){
            if(parseInt(this.props.product.StockLarge[this.props.position]) > 0 ){
                return this.props.product.StockLarge[this.props.position]
            }
            else {
                return this.props.product.StockLarge[this.props.position]
            }

        }
        else if(this.state.size==='XL'){
            if(parseInt(this.props.product.StockXL[this.props.position]) > 0 ){
                return this.props.product.StockXL[this.props.position]
            }
            else {
                return this.props.product.StockXL[this.props.position]
            }
        }
    }



    render() {
        return(
                 <div>
                     <p className={"newarrival text-center"}>NEW</p>
                     <h2>{this.props.product.ProductName}</h2>
                     <p>Brand: {this.props.product.ProductBrand}</p>
                     <Rating name="size-small" defaultValue={2} size="small" disabled={true} />
                     <p>Added On: {this.props.product.AddDate}</p>
                     <p className={"lead"}>Rs. <b>{this.props.product.PricePerUnit}</b></p>


                     <div className={"row"}>
                     <FormLabel>Select Color</FormLabel>
                     <FormControl className={"col-md-2"}  as="select" size="sm" name={"color"} value={this.props.product.ColorOfImg[this.props.position]} onChange={(event ) => this.ChangeEventFn(event)} custom>
                         {this.props.product.ColorOfImg.map((text) => <option value={text}>{text}</option>)}
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

                     <AddToShoppingCart productId={this.props.product._id} imagePath={this.props.product.ImageOfProduct[this.props.position]} quantity={this.state.OrderQuantity} />
                     <AddToWishlist productId={this.props.product._id} imagePath={this.props.product.ImageOfProduct[this.props.position]} quantity={this.state.OrderQuantity} />


                 </div>
        )
    }

}

export default SubDetails