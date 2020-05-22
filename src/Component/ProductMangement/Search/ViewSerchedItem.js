import React, {Component} from "react";
import axios from 'axios';
import {Alert, Card} from "react-bootstrap";
import LoaderComponent from "../ViewProducts/LoaderComponent";
import ShowItem from "../ViewProducts/ShowItem";

class ViewSerchedItem extends Component{

constructor(props) {
    super(props);
    this.state = {
        product:[],
        loading:false,
        status: this.props.match.params.id
    }

}


checkNoResult = () => {
    if(this.state.loading) {
        if (this.state.product.length === 0) {
            return (
                <div className={"d-flex justify-content-center"}>
                    <Alert variant={"warning"}>
                        No Result Found
                    </Alert>
                </div>
            )
        }
    }
}

getdata = () =>{
    console.log(this.props.match.params.id)
    axios.get('https://servershopping.azurewebsites.net/products/search/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                product: res.data

            },() => {this.setState({loading:true})});
        })
        .catch((error) => {
            console.log(error);
        })
}

componentDidMount() {
   this.getdata()
}



    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {

this.getdata()
        }
    }

    render() {
        return(
            <div>
            {this.checkNoResult()}
                {this.state.loading ? null : <div className="d-flex justify-content-center">
                   <LoaderComponent top={50}/>
                </div> }
            <div className={"row mt-4"}>

                {
                    this.state.product.map((item,index) =>
                       <ShowItem product={item} key={index}/>
                    )}
            </div>
            </div>
        )
    }
}

export default ViewSerchedItem