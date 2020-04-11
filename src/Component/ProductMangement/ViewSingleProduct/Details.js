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
        x = this.props.clr.indexOf(value);
        this.setState({
            position:x
        })
    }

    render() {
        return (
            <div onChange={this.handleFormChange} className={"container"}>
                <div className={"row"}>

                    <div className={"col-md-5"}>
                        <img src={this.props.src[this.state.position]} className="d-block w-100" alt="..." style={{'width':'12vw','height':'25vw'}}/>
                    </div>


                    <div className={"col-md-7"}>
                       <SubDetails position={this.state.position} product={this.props.product} clr={this.props.clr} setPosition={this.setPosition}/>
                    </div>

                </div>


            </div>
        )
    }
}

export default Details