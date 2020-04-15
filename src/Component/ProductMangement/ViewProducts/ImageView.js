import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";
import LoaderComponent from "./LoaderComponent";


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

                {this.props.ImgArr.map(txt =>
                    <Carousel.Item>
                        {this.state.loading ? <LoaderComponent /> : null}
                        <img onLoad={this.onLoad} className={"img-thumbnail"} src={txt} style={{'width': '15vw', 'height': '15vw'}}
                        />

                    </Carousel.Item>

                    )}

            </Carousel>
        )
    }
}
export default ImageView