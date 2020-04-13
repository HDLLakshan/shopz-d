import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";

export class WishlistProductRow extends Component{
    constructor(props) {
        super(props);
        this.state={
            productId : this.props.obj.ProductId
        };
        // this.handleRemoveButton= this.handleRemoveButton.bind(this);
    }



    // handleRemoveButton(){
    //     axios.delete('http://localhost:4000/wishlist/delete-product'+this.props.obj.name)
    //         .then(res => {
    //             console.log('deleted');
    //         })
    //
    // }
    render(){
        const {key, obj, handleRemoveButton}= this.props;
        return(
                    <div className="card mb-3" style={{"max-width": "540px"}}>
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <img src={this.props.obj.ImageOfProduct} className="card-img" alt="..."/>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{this.props.obj.ProductName}</h5>
                                    <p className="card-text">{this.props.obj.Category}</p>
                                    <p className="card-text">{this.props.obj.PricePerUnit}</p>
                                    <p className="card-text"><small className="text-muted">{this.props.obj.SubCategory}</small></p>
                                    <button type='button' onClick={() => handleRemoveButton(this.state.productId)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
        );
            {/*    <Row className="show-grid">*/}
            {/*<Col xs={12} md={8}>*/}
            {/*<code>{this.props.obj.ProductName}</code>*/}
            {/*</Col>*/}
            {/* <Col xs={10} md={6}>*/}
            {/*     <code>{this.props.obj.Category}</code>*/}
            {/* </Col>*/}
            {/*        <Col xs={10} md={6}>*/}
            {/*            <code>{this.props.obj.PricePerUnit}</code>*/}
            {/*        </Col>*/}
            {/*        <Col xs={10} md={6}>*/}
            {/*            <code>{this.props.obj.SubCategory}</code>*/}
            {/*        </Col>*/}
            {/*        <Col xs={10} md={6}>*/}
            {/*            <code><img src={this.props.obj.ImageOfProduct}/></code>*/}
            {/*        </Col>*/}

            {/*    </Row>*/}



    }

}