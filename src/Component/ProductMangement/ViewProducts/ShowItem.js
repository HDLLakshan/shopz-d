import React, {Component} from "react";
import LoaderComponent from "./LoaderComponent";
import Figure from "react-bootstrap/Figure";
import {Link} from 'react-router-dom'
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

                    <div style={{overflow: 'hidden'}}>
                        <p style={{float: 'left'}}> Rs {this.props.product.PricePerUnit}</p>
                        <Rating style={{marginLeft: '20px', marginTop:'10px'}} name="size-small" defaultValue={this.props.product.TotRate} size="small" disabled={true}/>
                        <p hidden={this.props.product.Discount === 0} style={{float: 'right', color:'red', 'margin-left':'10px'}}> {this.props.product.Discount}% OFF</p>
                    </div>

                </figcaption>


            </Figure>

        </Link>
    )
}

}
export default ShowItem