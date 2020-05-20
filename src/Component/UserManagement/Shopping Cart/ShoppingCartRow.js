import React, {Component} from "react";
import { Delete } from '@material-ui/icons';
import axios from "axios";
import {Col, Row} from "react-bootstrap";

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

                   <div className="card mb-3 card  shadow-lg" style={{"max-width": "auto", "height":"auto", padding: "20px",margin: "20px" }}>
                        <div className="row no-gutters">
                             <div className="row" style={{"width":"100%"}}>
                                 <div className="card-body" >
                                     <Row>
                                         <Col>
                                             <div className="col-md-4">
                                                 <img src={this.props.obj.ImagePath} className="card-img" style={{"width": "170px", "height":"220px"," padding-left": "15px","padding-top": "20px",margin: "10px"}}/>
                                             </div>
                                         </Col>
                                         <Col style={{"width":"50%"}}>
                                    <div>
                                        <h5> {this.state.products.ProductName}</h5>
                                        <p className="card-text">{this.state.products.Category}  </p>
                                        <p className="card-text"><small className="text-muted">{this.state.products.SubCategory}</small></p>
                                        <br/>
                                        <p className="card-text"><small className="text-muted">Color: {this.props.obj.Color}</small>  </p>
                                        <p className="card-text"><small className="text-muted">Size: {this.props.obj.Size} </small> </p>
                                    </div>
                                     </Col>
                                         <Col style={{"width":"50%"}}>
                                        <div>
                                            <p className="card-text"> Quantity: <input type="number" id="quantity" placeholder={this.props.obj.Quantity} min="0"
                                                                                       onChange={(e)=>changeQuantity(e.target.value, this.state.ProductId)}/></p>
                                            <br/>
                                            <h5 className="card-title">LKR {this.state.products.PricePerUnit}.00</h5>
                                            <br/>
                                            <Delete color="disabled" fontSize="large" onClick={() => handleRemoveButton(this.state.ProductId)}/>
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