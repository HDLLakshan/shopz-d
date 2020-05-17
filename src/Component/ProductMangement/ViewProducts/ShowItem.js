import React, {Component} from "react";
import Figure from "react-bootstrap/Figure";
import {Link,withRouter} from 'react-router-dom'
import ImageView from "./ImageView";
import '../../../css/App.css'
import {Rating} from "@material-ui/lab";


class ShowItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            didLoad: true,
        }
    }



        render() {

    return(
        <Link to={'/details/'+ this.props.product._id }>

            <Figure   style={{ border: "5px solid white" }}>

                <ImageView ImgArr={this.props.product.Details}/>

                <figcaption >

                    <div style={{overflow: 'hidden'}}>
                        <p style={{float: 'left',color:"black",fontFamily:"Market Sans"}}> LKR {this.props.product.PricePerUnit}</p>
                        <Rating hidden={this.props.product.TotRate === 0} precision={0.5} style={{marginLeft: '12px', marginTop:'20px'}}
                                name="size-small" defaultValue={this.props.product.TotRate} size="small" disabled={true}/>
                        <p hidden={this.props.product.Discount === 0} style={{float: 'right', color:'red', marginLeft:'0px',font:"Open Sans bold"}}> {this.props.product.Discount}% OFF</p>
                    </div>

                </figcaption>


            </Figure>

        </Link>
    )
}

}
export default withRouter(ShowItem)