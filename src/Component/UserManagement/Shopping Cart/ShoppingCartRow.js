import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";

export class ShoppingCartRow extends Component{
    constructor(props) {
        super(props);
        this.state={
            ProductId:this.props.obj.ProductId,
            products:{},
            quantity:0,
        };
    }


    componentDidMount() {
        axios.get('http://localhost:4000/products/view-product/' +this.props.obj.ProductId)
            .then(res => {
                this.setState({
                    products:res.data
                });
            })

    }

    render(){
        const {key, obj, handleRemoveButton, changeQuantity}= this.props;
        return(

                   <div className="card mb-3 card border-info" style={{"max-width": "50%", "height":"300px"}}>
                        <div className="card-header text-info">{this.state.products.ProductName}</div>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                 <img src={this.props.obj.ImagePath} className="card-img" style={{"width": "150px", "height":"150px"}}/>
                             </div>
                             <div className="row">
                                 <div className="card-body text-info">
                                     <h5 className="text-info card-title">Price:  {this.state.products.PricePerUnit}</h5>
                                     <p className="card-text">Category: {this.state.products.Category}  </p>
                                     <p className="card-text">Color: {this.state.products.Color}  </p>
                                     <p className="card-text">Size: {this.state.products.Size}  </p>
                                     <p className="card-text"> Quantity: <input type="number" id="quantity" placeholder={this.props.obj.Quantity} min="0"
                                                                                onChange={(e)=>changeQuantity(e.target.value, this.state.ProductId)}/></p>
                                     <p className="card-text"><small className="text-muted">{this.state.products.SubCategory}</small></p>
                                     <button type='button' onClick={() => handleRemoveButton(this.state.ProductId)}>Remove</button>
                                 </div>
                             </div>
                         </div>
                     </div>
        );



    }

}