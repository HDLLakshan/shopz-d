import React, {Component} from "react";
import AddToShoppingCart from "../Shopping Cart/AddToShoppingCart";

export class WishlistProductRow extends Component{
    constructor(props) {
        super(props);
        this.state={
            productId : this.props.obj.ProductId,
            isInList:false,
        };

    }


    render(){
        const {key, obj, handleRemoveButton}= this.props;
        return(
                    <div className="card mb-3 card border-info " style={{"min-width": "50%","height":"300px","max-width": "540px"}}>
                        <div className="card-header text-info">{this.props.obj.ProductName}</div>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={this.props.obj.ImageOfProduct} className="card-img"  style={{"width": "150px", "height":"150px"}} alt="..."/>
                            </div>
                            <div className="row">
                                <div className="card-body text-info">
                                    <h5 className="text-info card-title">Price: {this.props.obj.PricePerUnit}</h5>
                                    <p className="card-text">{this.props.obj.Category}</p>
                                    <p className="card-text"><small className="text-muted">{this.props.obj.SubCategory}</small></p>
                                    <button type='button' onClick={() => handleRemoveButton(this.state.productId)}>Remove</button>
                                    <AddToShoppingCart productId={this.props.obj.ProductId} imagePath={this.props.obj.ImageOfProduct} quantity={1} />
                                </div>
                            </div>
                        </div>
                    </div>

        );


    }

}