import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";



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

            <Carousel fade={true} pause={'hover'} slide={false} interval={5000} >
                {this.props.ImgArr.map((txt,index) =>
                    <Carousel.Item key={index}>
                        {this.state.loading ? <div style={{position:'absolute',marginTop:"40%", marginLeft:'40%'}} className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div> : null}
                        <img onLoad={this.onLoad} className={"img-thumbnail"} src={txt.imgPath} style={{width: '15vw', height: '15vw'}}
                        />

                    </Carousel.Item>

                    )}

            </Carousel>
        )
    }
}
export default ImageView