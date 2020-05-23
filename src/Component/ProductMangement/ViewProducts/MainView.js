import React, {Component} from "react";
import axios from "axios";
import ShowItem from "./ShowItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Col} from "react-bootstrap";
import Slider from "react-slick";
import {Link} from "react-router-dom";
import LoaderComponent from "./LoaderComponent";
class MainView extends Component{

    constructor(props) {
        super(props)
        this.state = {
            ProductArray: [],
            CategoryName:[],
            loading: true,
            status:''

        };


    }

    checkAvailability = (prpty) => {
        const count = this.state.ProductArray.filter(item => item.Category === prpty).length;
        console.log(count)
        if (count > 0)
            return false
        else return true
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/')
            .then(res => {
                this.setState({
                    ProductArray: res.data

                });
            }).then(this.getCategories)
            .catch((error) => {
                console.log(error);
            })
        if(this.props.match.params.id === 'rated'){
            this.setState({status:'(Top-Rated)'})
        }else{
            this.setState({status:'(Latest)'})
        }

    }

    getCategories = () => {
        axios.get('http://localhost:4000/category/all')
            .then(res => {
                this.setState({
                    CategoryName: res.data
                });
            }).then(() => this.setState({loading:false}))
            .catch((error) => {
                console.log(error);
            })
    }

    orderArray = (id) => {
        let arr = []
        this.state.ProductArray.map((item,index) => {
         if(item.Category === id){
             arr.push(item)
         }
        })
        if(this.props.match.params.id === 'rated'){
            arr.sort(function(a,b){
                return b.TotRate - a.TotRate;
            });
        }

        return arr
    }

    render() {
        const width = Math.max(window.screen.width, window.innerWidth);
        var settings = {
            dots: false,
            infinite: false,
            speed: 100,
            slidesToShow: width/300,
            slidesToScroll: 1,
            autoplay :true,
            autoplaySpeed : 7000,
            lazyLoad: true,
            swipe:true,
            swipeToSlide:true,
            arrows:true,
            nextArrow:<SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return(

            <div className={"container-fluid mt-3 ml-4"} style={{width:"95%"}}>
                {this.state.loading ?     <div >
                    <div className="d-flex justify-content-center">
                       <LoaderComponent top={'100px'}/>
                    </div>
                </div> :
                <div>
                {this.state.CategoryName.map((txt,i) =>
                {return(<div key={i} hidden={this.checkAvailability(txt.name)}>
                    <div className={"clearfix mt-2 mb-2"}>
                    <h4 className={'float-left'}>{txt.name}</h4>
                        <h5 style={{color:'blue'}} className={'float-left'}>{this.state.status}</h5>
                    <Link to={"/search/"+txt.name} className={'float-right'} >SEE ALL</Link>
                    </div>

                    <Slider  {...settings}>
                        {
                            this.orderArray(txt.name).map((item, index) => {
                                return (

                                    <React.Fragment key={index}>
                                        <Col>
                                            <ShowItem  product={item} />
                                        </Col>
                                    </React.Fragment>

                                )
                            })}
                    </Slider>

                    </div>
                )})}
                </div> }
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

export default MainView