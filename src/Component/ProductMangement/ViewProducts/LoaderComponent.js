import React, {Component} from "react";
const load = require('./loading1.gif')


class LoaderComponent extends Component{
    render() {
        return(
            <div className="divLoader container-sm justify-content-center" style={{position:'absolute',marginTop:this.props.top, marginLeft:'37%'}}>
                <img alt={"loading"} src={load}/>
            </div>
        )
    }
}
export default LoaderComponent