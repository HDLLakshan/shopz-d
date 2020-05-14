import React, {Component} from "react";
import LoaderComponent from "./LoaderComponent";
import Figure from "react-bootstrap/Figure";
import {Link} from 'react-router-dom'
import ImageView from "./ImageView";
import '../../../css/App.css'


class ShowItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            didLoad: true
        }
    }




    setHidden = () =>{
       if(this.props.cat === 'none'){
           if(this.props.cid === this.props.product._id){
               return true
           }else {
               return false
           }
       }
       else {
           if (this.props.product.Category === this.props.cat) {
               return false
           } else {
               return true
           }
       }

    }


        render() {

    return(
        <Link to={'/details/'+ this.props.product._id }>

            <Figure hidden={this.setHidden()}  style={{ border: "5px solid white" }}>

                <ImageView ImgArr={this.props.product.Details}/>

                <figcaption >
                    {this.props.product.Discount > 0 ?
                    <div style={{overflow: 'hidden'}}>
                        <p style={{float: 'left'}}> Rs {this.props.product.PricePerUnit}</p>
                        <p style={{float: 'right', color:'red', 'margin-left':'10px'}}> {this.props.product.Discount}% OFF</p>
                    </div>:  <p style={{float: 'center'}}> Rs {this.props.product.PricePerUnit}</p>}

                </figcaption>

            </Figure>

        </Link>
    )
}

}
export default ShowItem