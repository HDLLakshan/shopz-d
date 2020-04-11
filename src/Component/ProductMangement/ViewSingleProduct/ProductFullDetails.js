import React, {Component} from "react";
import axios from "axios";
import './ProductFile Details.css'
import ShowItem from "../ViewProducts/ShowItem";
import Details from "./Details";
import '../../../App.css'

class ProductFullDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            product : {},
            didLoad: true,
            relateProduct:[],
            images:[],
            colors:[],
        }
    }

    onLoad = () => {
        this.setState({
            didLoad: false
        })
    }

   getFullDetails = () => {
       axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.match.params.id)
           .then(res => {

               this.setState({
                   // loading:false,
                   product: res.data,
                   images:res.data.ImageOfProduct,
                   colors:res.data.ColorOfImg


               }, () => this.getRelavantProduct());
           })
           .catch((error) => {
               console.log(error + 'mko aul');

           })
   }

   getRelavantProduct = () => {
       axios.get('https://servershopping.azurewebsites.net/products/get-products/' + this.state.product.SubCategory)
           .then(res => {
               this.setState({
                   relateProduct: res.data,
               })
           })
       console.log(this.state.images[1])
   }


    componentDidMount() {
        this.getFullDetails();
    }

    componentDidUpdate() {
        if (this.props.match.params.id !== this.state.product._id) {
            this.getFullDetails();
         //  this.getRelavantProduct();
        }

    }

    render() {
        return(
            <div>

                <Details product={this.state.product} clr={this.state.colors} src={this.state.images}/>



                <h3>Related</h3>

                <div className={"container1"}>
                {this.state.relateProduct.map((item, index) =>
                        <ShowItem cid={this.state.product._id} key={index} product={item} cat={'none'}/>

                    )
                }
                </div>


            </div>
        )
    }

}

export default ProductFullDetails;