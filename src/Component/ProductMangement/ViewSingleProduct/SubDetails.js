import React, {Component} from "react";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import {Rating} from "@material-ui/lab";

class SubDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            color:''
        }
    }


    ChangeEventFn = (event) => {
        this.setState({color: event.target.value}, () => {
            this.props.setPosition(this.state.color)
            console.log(this.state.color)
        })

    }

    render() {
        return(
                 <div>
                     <p className={"newarrival text-center"}>NEW</p>
                     <h2>{this.props.product.ProductName}</h2>
                     <p>Brand: {this.props.product.ProductBrand}</p>
                     <Rating name="size-small" defaultValue={2} size="small" disabled={true} />
                     <p className={"price"}></p>

                     <FormLabel>Select Color</FormLabel>
                     <FormControl  as="select" size="sm" name={"color"} value={this.props.clr[this.props.position]} onChange={(event ) => this.ChangeEventFn(event)} custom>
                         {
                             this.props.clr.map((text) =>
                                 <option value={text}>{text}</option>
                             )
                         }
                     </FormControl>

                     <p><b>Availability:</b>In Stock </p>
                     <p><b>Availability:</b>In Stock </p>

                     <label>Quantity:</label>

                     <input placeholder="Enter a number" required type="number" value="" min="-100" max="100"/>

                     <button type={"button"} className={"btn btn-default cart"}>Add to cart</button>


                 </div>
        )
    }

}

export default SubDetails