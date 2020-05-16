import React, {Component, lazy, Suspense} from "react";
import axios from "axios";
import ShowItem from "./ShowItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Button, Card, Col, Container} from "react-bootstrap";
import Slider from "react-slick";
import {Link} from "react-router-dom";
class MainView extends Component{

    constructor(props) {
        super(props)
        this.state = {
            ProductArray: [],
            CategoryName:['Men', 'Women', 'Watch'],
            loading: true,
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
            }).then(() => this.setState({loading:false}))
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            draggable:true,
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


            <div className={"container-fluid mt-3 ml-4"} style={{width:"95%"}}>
                {this.state.loading ?     <div >
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div> :
                <div>
                {this.state.CategoryName.map((txt) =>
                {return(<div hidden={this.checkAvailability(txt)}>
                    <div className={"clearfix mt-0 mb-2"}>
                    <h4 className={'float-left'}>{txt}</h4>
                    <Link to={"/search/"+txt} className={'float-right'} >SEE ALL</Link>
                    </div>
                    <Slider  {...settings}>
                        {
                            this.state.ProductArray.map((item, index) => {
                                return (

                                    <React.Fragment>
                                        <Col>
                                            <ShowItem key={index} product={item} cat={txt}/>
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