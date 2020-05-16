import React, {Component} from "react";
import axios from "axios";
import './ProductFile Details.css'
import ShowItem from "../ViewProducts/ShowItem";
import Details from "./Details";
import '../../../css/App.css'

class ProductFullDetails extends Component{

    constructor(props) {
        super(props);
        this.state = {
            didLoad: true,
            didLoadrel: true,
            relateProduct: [],
            Products: {
                ProductName: '',
                Category: '',
                PricePerUnit: '',
                StockAmount: '',
                ProductBrand: '',
                AddDate: '',
                Details: [],
            },
            comments: [],
        }
    }


   getFullDetails = () => {
       axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.match.params.id)
           .then(res => {
               this.setState({
                   Products:res.data,
               }, () => this.getRelavantProduct());
           })
           .catch((error) => {
               console.log(error + 'mko aul');

           })
   }

   getRelavantProduct = () => {
        this.setState({didLoad:false})
       axios.get('https://servershopping.azurewebsites.net/products/get-products/' + this.state.Products.SubCategory)
           .then(res => {
               this.setState({
                   relateProduct: res.data,
               },() => this.setState({didLoadrel:false}))
           }).then(()=> this.getComments()).catch((error) => {
               console.log(error + 'error in get relevant products')
       })


    }

    getComments = () => {
        axios.get('https://servershopping.azurewebsites.net/rating/get-rate-comments/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    comments:res.data,
                });
            })
            .catch((error) => {
                console.log(error + 'mko aul');

            })

    }

    componentDidMount() {
        this.getFullDetails();
    }

    componentDidUpdate() {
        if (this.props.match.params.id !== this.state.Products._id) {
            this.getFullDetails();
            window.location.reload()
        }

    }

    render() {


        return(
            <div>
                {this.state.didLoad ? <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div> :

                    <Details product={this.state.Products} comments={this.state.comments} />
                }
                <h3 >Similar Products</h3>
                {this.state.didLoadrel ? <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : null}
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