import React, {Component} from "react";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import {Rating} from "@material-ui/lab";
import AddToShoppingCart from "../../UserManagement/Shopping Cart/AddToShoppingCart";
import AddToWishlist from "../../UserManagement/Wishlist/AddToWishlist";
import {Row} from "react-bootstrap";
import LoaderComponent from "../ViewProducts/LoaderComponent";

class SubDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            color:this.props.product.Details[0].color,
            size:'small',
            AvailableAmount:'',
            OrderQuantity:1,
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

        if(this.state.size==='small'){
             if(parseInt(this.props.product.Details[this.props.position].small) > 0 ){
                 return this.props.product.Details[this.props.position].small
             }
             else {
                 return 0
             }

        }
        else if(this.state.size==='medium'){
            if(parseInt(this.props.product.Details[this.props.position].medium) > 0 ){
                return this.props.product.Details[this.props.position].medium
            }
            else {
                return 0

            }

        }
        else if(this.state.size==='large'){
            if(parseInt(this.props.product.Details[this.props.position].large) > 0 ){
                return this.props.product.Details[this.props.position].large
            }
            else {
                return 0
            }

        }
        else if(this.state.size==='xl'){
            if(parseInt(this.props.product.Details[this.props.position].xl) > 0 ){
                return this.props.product.Details[this.props.position].xl
            }
            else {
                return 0
            }
        }
    }


    render() {
        if (this.props.product.Details.length === 0)
            return (<LoaderComponent top={'100px'}/>)

        return(
                 <div>
                     <p className={"newarrival text-center"}>NEW</p>
                     <h2>{this.props.product.ProductName}</h2>
                     <p >Brand:<a  href={'/search/'+this.props.product.ProductBrand}><strong style={{fontSize:"22px"}}>{this.props.product.ProductBrand}</strong></a></p>

                     <Rating precision={0.5} defaultValue={this.props.product.TotRate} size="medium" disabled={true}/>

                     <p>Added On: {this.props.product.AddDate}</p>
                     <div >
                         {this.props.product.Discount > 0 ?<div>
                     <p style={{display:'inline', 'text-decoration-line':'line-through'}} className={"lead"}>LKR. <b>{this.props.product.PricePerUnit}</b></p>
                         <p style={{display:'inline',fontSize:'24px',color:'green'}} className={"lead"}>LKR. <b>{this.props.product.PricePerUnit * (100-this.props.product.Discount)/100}</b></p>
                         </div>:<p  className={"lead"}>LKR. <b>{this.props.product.PricePerUnit}</b></p>}
                     </div>


                     <div className={"row"}>
                     <FormLabel>Select Color</FormLabel>
                     <FormControl className={"col-md-2"}  as="select" size="sm" name={"color"} value={this.props.product.Details[this.props.position].color} onChange={(event ) => this.ChangeEventFn(event)} custom>
                         {this.props.product.Details.map((text) => <option value={text.color}>{text.color}</option>)}
                     </FormControl>
                         <FormLabel>Select Size</FormLabel>
                         <FormControl className={"col-md-2"}  as="select" size="sm" name={"size"} value={this.state.size} onChange={(e ) => this.setState({size: e.target.value})} custom>
                             <option value={"small"}>Small</option>
                             <option value={"medium"}>Medium</option>
                             <option value={"large"}>Large</option>
                             <option value={"xl"}>XL</option>
                         </FormControl>
                     </div>

                     <p><b>Availability : </b><strong style={this.setAvailability() < 10 ? {color:'red' }:{}}>{this.setAvailability()}</strong> </p>

                     <input className={' col-md-2'} placeholder="Enter Quantity" required type="number" value={this.state.OrderQuantity} min="1" max={this.setAvailability()}
                     onChange={(event)=> this.setState({OrderQuantity:event.target.value})}/>

                     <Row>
                         <div style={{margin: "20px"}}>

                             <AddToShoppingCart productId={this.props.product._id} imagePath={this.props.product.Details[this.props.position].imgPath} quantity={this.state.OrderQuantity}
                                                                                        size={this.state.size} color={this.props.product.Details[this.props.position].color}/>

                         </div>
                         <div style={{margin: "20px"}}>
                             <AddToWishlist productId={this.props.product._id} imagePath={this.props.product.Details[this.props.position].imgPath} quantity={this.state.OrderQuantity}
                                            size={this.state.size} color={this.props.product.Details[this.props.position].color}/>
                         </div>

                     </Row>
                 </div>
        )
    }
}


export default SubDetails