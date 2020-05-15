import React, {Component} from "react";

import '../Purchasing/PurchaseDetails/layout.css'

import Commenting from './Commenting'





export default class AllRateComment extends Component {

    constructor(props) {
        super(props)

    }







    render() {
        return (
            <React.Fragment>

                <Commenting com={this.props.product.RateComment}/>




            </React.Fragment>
        );
    }
}