import React, {Component} from "react";

export class WishlistProductRow extends Component{
    constructor(props) {
        super(props);
        this.state={
            productId : this.props.obj.ProductId
        };
    }


    render(){
        const {key, obj, handleRemoveButton}= this.props;
        return(
                    <div className="card mb-3 card border-info" style={{"max-width": "540px"}}>
                        <div className="card-header text-info">{this.props.obj.ProductName}</div>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={this.props.obj.ImageOfProduct} className="card-img" alt="..."/>
                            </div>
                            <div className="row">
                                <div className="card-body">
                                    <h5 className="card-title">{this.props.obj.PricePerUnit}</h5>
                                    <p className="card-text">{this.props.obj.Category}</p>
                                    <p className="card-text"><small className="text-muted">{this.props.obj.SubCategory}</small></p>
                                    <button type='button' onClick={() => handleRemoveButton(this.state.productId)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
        );


    }

}