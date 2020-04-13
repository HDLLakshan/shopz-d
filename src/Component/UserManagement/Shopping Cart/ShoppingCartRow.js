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
                console.log(res.data);
                this.setState({
                    products:res.data
                });
            })
    }

    render(){
        const {key, obj, handleRemoveButton}= this.props;
        return(
                    <div className="card mb-3" style={{"max-width": "540px"}}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={this.props.obj.ImagePath} className="card-img" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{this.state.products.ProductName}</h5>
                                    <p className="card-text">{this.state.products.Category}</p>
                                    <p className="card-text">{this.state.products.PricePerUnit}</p>
                                    <p className="card-text">{this.props.obj.Quantity}</p>
                                    <p className="card-text">{this.state.products.PricePerUnit}</p>
                                    <p className="card-text"><small className="text-muted">{this.state.products.SubCategory}</small></p>
                                    <button type='button' onClick={() => handleRemoveButton(this.state.ProductId)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
        );
                    {/*<Row className="show-grid">*/}
                    {/*    <Col xs={12} md={8}>*/}
                    {/*    <code>{this.state.products.ProductName}</code>*/}
                    {/*</Col>*/}
                    {/*    <Col xs={10} md={6}>*/}
                    {/*        <code>{this.state.products.Category}</code>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={8}>*/}
                    {/*        <code>{this.state.products.PricePerUnit}</code>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={10} md={6}>*/}
                    {/*        <code>{this.state.products.SubCategory}</code>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={12} md={8}>*/}
                    {/*        <code><img src={this.state.products.ImageOfProduct}/></code>*/}
                    {/*    </Col>*/}
                    {/*    <Col xs={10} md={6}>*/}
                    {/*        <code>{this.state.products.Quantity}</code>*/}
                    {/*    </Col>*/}
                    {/*    <button type='button' onClick={() => handleRemoveButton(this.state.name)}>Remove</button>*/}
                    {/*</Row>*/}


    }

}