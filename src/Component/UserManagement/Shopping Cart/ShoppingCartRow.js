import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";

export class ShoppingCartRow extends Component{
    constructor(props) {
        super(props);
        this.state={
            ProductId:this.props.obj.ProductId,
            products:[]
        };

    }
    componentDidMount() {
        axios.get('https://servershopping.azurewebsites.net/products/view-product/' +this.props.obj.ProductId)
            .then(res => {
                this.setState({
                    products:res.data
                });
            })
    }

    render(){
        const {key, obj, handleRemoveButton}= this.props;
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
                                     <p className="card-text">{this.state.products.Category} {this.props.obj.Quantity} {this.props.obj.Quantity} </p>
                                     <p className="card-text"><small className="text-muted">{this.state.products.SubCategory}</small></p>
                                     <button type='button' onClick={() => handleRemoveButton(this.state.ProductId)}>Remove</button>
                                 </div>
                             </div>
                         </div>
                     </div>
        );



    }

}