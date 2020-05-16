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
                        <div className="card mb-3 card shadow-lg " style={{"min-width": "50%","height":"300px","max-width": "540px",padding: "20px",margin: "20px" }}>
                        <div className="row no-gutters">
                            <div className="row" style={{"width":"100%"}}>
                                <div className="card-body" >
                                    <Row>
                                        <Col>
                                            <div className="col-md-4">
                                            <img src={this.props.obj.ImageOfProduct} className="card-img"  style={{"width": "150px", "height":"150px"}} alt="..."/>
                                            </div>
                                        </Col>
                                        <Col style={{"width":"50%"}}>
                                <div>
                                    <h5>{this.props.obj.ProductName}</h5>
                                    <p className="card-text">{this.props.obj.Category}</p>
                                    <p className="card-text"><small className="text-muted">{this.props.obj.SubCategory}</small></p>
                                    <br/>
                                    <p className="card-text"><small className="text-muted">Color: {this.props.obj.Color}</small>  </p>
                                    <p className="card-text"><small className="text-muted">Size: {this.props.obj.Size} </small> </p>
                                </div>
                                        </Col>
                                        <Col style={{"width":"50%"}}>
                                            <div>
                                                <h5 className="card-title">LKR {this.props.obj.PricePerUnit}</h5>
                                                <Delete color="disabled" fontSize="large" onClick={() => handleRemoveButton(this.state.productId)}/>
                                                <br/>
                                                <AddToShoppingCart productId={this.props.obj.ProductId} imagePath={this.props.obj.ImageOfProduct} quantity={1} />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }

}