import React, {Component} from "react";
import AddToShoppingCart from "../Shopping Cart/AddToShoppingCart";
import {Row} from "react-bootstrap";
import { Delete } from '@material-ui/icons';
import Badge from 'react-bootstrap/Badge';
import IconButton from "@material-ui/core/IconButton";

export class WishlistProductRow extends Component{
    constructor(props) {
        super(props);
        this.state={
            productId : this.props.obj.ProductId,
            isInList:false,
            discount:false
        };

    }
    componentDidMount() {
        if(this.props.obj.Discount > 0){
            this.setState({
                discount:true
            })
        }
    }

    render(){
        return(
                <div className="card" style={{"min-width":"25%", "max-width":"25%", "margin-top":"35px", "min-height":"65%"}}>
                    {this.state.discount? (<div style={{'width':'20px', 'height':'30px', align:'10px'}}>
                        <Badge variant="danger">{this.props.obj.Discount}% OFF</Badge>
                    </div>):null}
                    <div style={{align:"center"}}>
                            <img className="card-img-top" src={this.props.obj.ImageOfProduct} alt="Card image cap" style={{width: '100%', height: '15vw'}}/>
                    </div>
                        <div className="card-body">
                            <h5 className="card-title">{this.props.obj.ProductName}</h5>
                            <p className="card-text">{this.props.obj.Category} - <small className="text-muted">{this.props.obj.SubCategory}</small></p>
                            <h6 className="card-title">LKR {this.props.obj.PricePerUnit}</h6>
                            <Row>
                                <div style={{margin:"20px"}}>
                                    <IconButton aria-label="delete">
                                    <Delete color="secondary" fontSize="large" onClick={() => handleRemoveButton(this.state.productId)}/>
                                    </IconButton>
                                </div>
                                <div style={{margin:"20px"}}>
                                    <AddToShoppingCart productId={this.props.obj.ProductId} imagePath={this.props.obj.ImageOfProduct}
                                                color={this.props.obj.Color} size={this.props.obj.Size} quantity={1} />
                                </div>
                            </Row>
                            </div>
                </div>

        );
    }

}