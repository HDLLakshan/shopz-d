import React, {Component} from 'react';
import SubDetails from "./SubDetails";
import AllRateComment from "../../RateComment/AllRateComment";


class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            position : 0,
            loading:true,
            ratingval:Number
        }
    }

    onLoad = () => {
        this.setState({
            loading:false
        })
    }

    setPosition = (value) => {
        let x;
        x = this.props.product.Details.map(e => e.color).indexOf(value);
        this.setState({
            position:x
        })
    }

    render() {
        if (this.props.product.Details.length === 0)
            return null;

        return (
            <div onChange={this.handleFormChange} className={"container-fluid  mt-5 ml-5"} style={{width:'95%'}} >
                <div className={"row"}>

                    <div className={"col-sm-auto .order-sm-2 .offset-sm-1"} >
                        {this.state.loading ? <div style={{position:'absolute',marginTop:"40%", marginLeft:'40%'}} className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> : null}
                        <img onLoad={this.onLoad} src={this.props.product.Details[this.state.position].imgPath} className="d-block "  style={{width:'20vw',height:'20vw'}}/>
                    </div>


                    <div className={"col-md-4"}>
                       <SubDetails position={this.state.position} product={this.props.product}   setPosition={this.setPosition} />
                    </div>

                    <div className={"col-md-3"}>
                        {
                            this.props.comments.map((item,index) => {
                               return <AllRateComment rid={this.props.product._id} product={item} key={index}/>
                            })
                        }
                    </div>

                </div>


            </div>
        )
    }
}



export default Details