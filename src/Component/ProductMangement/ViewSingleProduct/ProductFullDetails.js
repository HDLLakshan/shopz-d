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
            didLoad: true,
            relateProduct:[],
            Products:{
                ProductName:'',
                Category: '',
                PricePerUnit: '',
                StockAmount:'',
                ProductBrand: '',
                ImageOfProduct:[],
                ColorOfImg: [],
                StockSmall:[],
                StockMedium:[],
                StockLarge:[],
                StockXL:[],


            }
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
                   Products:res.data
               }, () => this.getRelavantProduct());
           })
           .catch((error) => {
               console.log(error + 'mko aul');

           })
   }

   getRelavantProduct = () => {
       axios.get('https://servershopping.azurewebsites.net/products/get-products/' + this.state.Products.SubCategory)
           .then(res => {
               this.setState({
                   relateProduct: res.data,
               })
           }).catch((error) => {
               console.log(error + 'error in get relevant products')
       })



   }


    componentDidMount() {
        this.getFullDetails();
    }

    componentDidUpdate() {
        if (this.props.match.params.id !== this.state.Products._id) {
            this.getFullDetails();
        }

    }

    render() {
        return(
            <div>

                <Details product={this.state.Products} clr={this.state.colors} src={this.state.images} small={this.state.smallArr}/>



                <h3>Related</h3>

                <div className={"container1"}>
                {this.state.relateProduct.map((item, index) =>
                        <ShowItem cid={this.state.Products._id} key={index} product={item} cat={'none'}/>

                    )
                }
                </div>


            </div>
        )
    }

}

export default ProductFullDetails;