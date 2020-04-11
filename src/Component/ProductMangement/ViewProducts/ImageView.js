import React, {Component} from "react";
import Figure from "react-bootstrap/Figure";
import Carousel from "react-bootstrap/Carousel";


class ImageView extends Component{
    constructor(props) {
        super(props);
        this.state ={
            ImgPath : []
        }

       for(let i=0; i<this.props.ImgArr.length-1; i++) {
           this.state.ImgPath.push(this.props.ImgArr[i + 1]);
       }
    }



    render() {
        return(

            <Carousel fade={true} pause={'hover'}  interval={5000} >

                {this.props.ImgArr.map(txt =>
                    <Carousel.Item>
                        <img

                            src={txt}
                            style={{'width': '15vw', 'height': '15vw'}}
                        />

                    </Carousel.Item>

                    )}

            </Carousel>
        )
    }
}
export default ImageView