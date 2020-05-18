import React, {Component} from "react";
import AddToShoppingCart from "../Shopping Cart/AddToShoppingCart";
import {Col, Row} from "react-bootstrap";
import { Delete } from '@material-ui/icons';

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
                <div className="card" style={{"min-width":"25%", "max-width":"25%", "margin-top":"35px", "min-height":"65%"}}>
                    <div style={{align:"center"}}>
                            <img className="card-img-top" src={this.props.obj.ImageOfProduct} alt="Card image cap" style={{"height":"100%", "width":"100%"}}/>
                    </div>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.obj.ProductName}</h5>
                            <p className="card-text">{this.props.obj.Category} - <small className="text-muted">{this.props.obj.SubCategory}</small></p>
                            <h6 className="card-title">LKR {this.props.obj.PricePerUnit}</h6>
                            <Row>
                                <div style={{margin:"20px"}}>
                                    <Delete color="secondary" fontSize="large" onClick={() => handleRemoveButton(this.state.productId)}/>
                                </div>
                                <div style={{margin:"20px"}}>
                                    <AddToShoppingCart productId={this.props.obj.ProductId} imagePath={this.props.obj.ImageOfProduct} quantity={1} />
                                </div>
                            </Row>
                            </div>
                </div>
        );
    }

}