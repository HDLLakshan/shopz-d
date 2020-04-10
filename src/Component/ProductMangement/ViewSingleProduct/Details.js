import React, {Component} from "react";
import LoaderComponent from "./LoaderComponent";
import ShowItem from "./ShowItem";

class Details extends Component{

    render() {
        return (
            <div onChange={this.handleFormChange} className={"container"}>
                <div className={"row"}>
                    <div className={"col-md-5"}>

                        <img   className={"d-block w-100"} style={{'width':'12vw','height':'25vw'}} src={this.props.product.ImageOfProduct}/>

                    </div>
                    <div className={"col-md-7"}>
                        <p className={"newarrival text-center"}>NEW</p>
                        <h2>{this.props.product.ProductName}</h2>
                        <p>Product Code:SIfdjk</p>
                        <img src={"starts.png"} className={"stars"}/>
                        <p className={"price"}></p>
                        <p><b>Availability:</b>{this.props.product.PricePerUnit}</p>
                        <p><b>Availability:</b>In Stock </p>
                        <p><b>Availability:</b>In Stock </p>

                        <label>Quantity:</label>
                        <input type={"text"} value={"1"} defaultValue/>
                        <button type={"button"} className={"btn btn-default cart"}>Add to cart</button>


                    </div>
                </div>


            </div>
        )
    }
}

export default Details