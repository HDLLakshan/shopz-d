import React, {Component} from "react";
import axios from "axios";
import './ProductFile Details.css'
import ShowItem from "./ShowItem";
import Details from "./Details";
import '../../App.css'

class ProductFullDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            product : {},
            didLoad: true,
            relateProduct:[]
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

               }, () => this.getRelavantProduct());
           })
           .catch((error) => {
               console.log(error);
           })
   }

   getRelavantProduct = () => {
       axios.get('http://localhost:4000/products/get-products/' + this.state.product.SubCategory)
           .then(res => {
               this.setState({
                   relateProduct: res.data,
               })
           })
   }


    componentDidMount() {

       this.getFullDetails();
    }

    componentDidUpdate() {
        if (this.props.match.params.id !== this.state.product._id) {
            this.getFullDetails();
           this.getRelavantProduct();
        }

    }
        render() {
        return(
            <div>
           <Details product={this.state.product}/>
           <h3>Related</h3>
                <div className={"container1"}>
                {
                    this.state.relateProduct.map((item, index) =>

                        <ShowItem cid={this.state.product._id} key={index} product={item} cat={'none'}/>

                    )
                }
                </div>
            </div>
        )
    }

}

export default ProductFullDetails;