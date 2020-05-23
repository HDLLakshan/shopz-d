import React, {Component} from "react";
import {withRouter} from 'react-router-dom'
import ImageView from "./ImageView";
import '../../../css/App.css'
import {Rating} from "@material-ui/lab";
import {Card} from "react-bootstrap";


class ShowItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            didLoad: true,
        }
    }



        render() {
const {product} = this.props
    return(

            <Card onClick={()=>this.props.history.push('/details/'+ product._id)}  style={{ width: '14rem' }}>
                <div >
                    <ImageView ImgArr={product.Details}/>
                </div >
                <Card.Body>
                    <Card.Title className={"text-center"}>{product.ProductName}</Card.Title>
                    <Card.Text >
                        <strong style={{color:'black'}}>LKR.{product.PricePerUnit}</strong>
                        <strong hidden={product.Discount === 0} style={{float: 'right', color:'red'}}>{product.Discount}% OFF</strong>
                    </Card.Text>
                    <Card.Footer>
                        {product.TotRate === 0 ?  <p className={"newarrival text-center"}>NEW</p> :  <Rating name={"rate"} precision={0.5}  style={{marginLeft: '20px', marginTop:'10px'}}
                                defaultValue={product.TotRate} size="small" disabled={true}/> }
                    </Card.Footer>
                </Card.Body>
            </Card>

    )
}

}
export default withRouter(ShowItem)