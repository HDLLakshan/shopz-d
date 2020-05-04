import React, {Component} from 'react';
import SubDetails from "./SubDetails";
import LoaderComponent from "../ViewProducts/LoaderComponent";


class Details extends Component{

    constructor(props) {
        super(props);
        this.state = {
            position : 0,
            loading:true,
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
            <div onChange={this.handleFormChange} className={"container"} >
                <div className={"row"}>

                    <div className={"col-md-4"} >
                        {this.state.loading ? <LoaderComponent /> : null}
                        <img onLoad={this.onLoad} src={this.props.product.Details[this.state.position].imgPath} className="d-block "  style={{'width':'20vw','height':'20vw'}}/>
                    </div>


                    <div className={"col-md-7"}>
                       <SubDetails position={this.state.position} product={this.props.product}  setPosition={this.setPosition} />
                    </div>

                </div>


            </div>
        )
    }
}

export default Details