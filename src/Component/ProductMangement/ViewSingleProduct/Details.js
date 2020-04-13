import React, {Component} from "react";
import SubDetails from "./SubDetails";


class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            position : 0
        }
      //  this.setPosition = this.setPosition().bind(this)
    }

    setPosition = (value) => {
        let x;
        x = this.props.product.ColorOfImg.indexOf(value);
        this.setState({
            position:x
        })
    }

    render() {
        return (
            <div onChange={this.handleFormChange} className={"container"}>
                <div className={"row"}>

                    <div className={"col-md-5"}>
                        <img src={this.props.product.ImageOfProduct[this.state.position]} className="d-block " alt="..." style={{'width':'12vw','height':'25vw'}}/>
                    </div>


                    <div className={"col-md-7"}>
                       <SubDetails position={this.state.position} product={this.props.product}  setPosition={this.setPosition}/>
                    </div>

                </div>


            </div>
        )
    }
}

export default Details