import React, {Component} from "react";
import axios from "axios";
import './ProductFile Details.css'
import ShowItem from "../ViewProducts/ShowItem";
import Details from "./Details";
import '../../../css/App.css'
import Slider from "react-slick";
import {Col} from "react-bootstrap";
import LoaderComponent from "../ViewProducts/LoaderComponent";

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
        const width = Math.max(window.screen.width, window.innerWidth);
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: width/305,
            slidesToScroll: 1,
            autoplay :true,
            autoplaySpeed : 3000,
            lazyLoad: true,
            swipe:true,
            swipeToSlide:true,
            arrows:true,
            nextArrow:<SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };

        return(
            <div>
                {this.state.didLoad ? <div className="d-flex justify-content-center">
                        <LoaderComponent top={'100px'}/>
                    </div> :
                   <div>
                    <Details product={this.state.Products} comments={this.state.comments}/>

                       <div className={"container-fluid mt-3 ml-4 clearfix mt-2 mb-2"} style={{width:"95%"}}>
                           <h4 hidden={this.state.relateProduct.length === 1} className={'float-left'}>Similar Products</h4>
                       </div>
                       {this.state.didLoadrel ? <div className="d-flex justify-content-center">
                               <div  className="spinner-border" role="status">
                                   <span className="sr-only">Loading...</span>
                               </div>
                           </div> :

                           <Slider  {...settings}>
                               {this.state.relateProduct.filter(p => p._id !== this.state.Products._id ).sort(function(a,b){
                                   return b.TotRate - a.TotRate;
                               }).map((item, index) => {
                                       return (

                                           <React.Fragment key={index}>
                                               <Col>
                                                   <ShowItem cid={this.state.Products._id}  product={item}
                                                             cat={'none'}/>
                                               </Col>
                                           </React.Fragment>

                                       )
                                   }
                               )
                               }
                           </Slider>
                       }
                   </div>
                }
            </div>
        )
    }

}
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}
export default ProductFullDetails;