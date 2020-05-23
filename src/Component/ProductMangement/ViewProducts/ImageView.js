import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
 const loadimg = require('./faviconload.ico')


class ImageView extends Component{
    constructor(props) {
        super(props);
        this.state ={
           loading:true
        }
    }


    onLoad = () => {
        this.setState({
            loading: false
        })
    }

    render() {
        return(

            <Carousel fade={true} pause={'hover'} slide={false} interval={4000} >
                {this.props.ImgArr.map((txt,index) =>
                    <Carousel.Item key={index}>
                        {this.state.loading ? <div style={{position:'absolute'}} className="d-flex justify-content-center">
                            <img className={"img-thumbnail"} src={loadimg} style={{width: '15vw', height: '15vw'}}/>
                            <div className="spinner-border" style={{position:'absolute',marginTop:"40%"}} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> : null}
                        <img onLoad={this.onLoad} className={"img-thumbnail"} src={txt.imgPath} style={{width: '100%', height: '250px'}}
                        />

                    </Carousel.Item>

                    )}

            </Carousel>
        )
    }
}
export default ImageView