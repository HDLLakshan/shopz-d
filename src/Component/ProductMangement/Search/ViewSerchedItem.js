import React, {Component} from "react";
import axios from 'axios';
import {Alert, Button, Card} from "react-bootstrap";
import ImageView from "../ViewProducts/ImageView";
import {Link} from "react-router-dom";
class ViewSerchedItem extends Component{

constructor(props) {
    super(props);
    this.state = {
        product:[],
        loading:false
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

componentDidMount() {
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

    render() {
        return(
            <div>
            {this.checkNoResult()}
                {this.state.loading ? null : <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> }
            <div className={"row"}>

                {
                    this.state.product.map((obj,index) =>
                        <div className={"col-md-3"}>
                            <Link to={'/details/'+ obj._id }>
                        <Card  style={{ width: '14rem' }}>
                            <div >
                            <ImageView ImgArr={obj.Details}/>
                            </div >
                            <Card.Body>
                                <Card.Title>{obj.ProductName}</Card.Title>
                                <Card.Text>
                                   <p>{obj.ProductBrand}</p>
                                    <p className={"price"}>Rs.{obj.PricePerUnit}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                            </Link>
                        </div>
                    )}
            </div>
            </div>
        )
    }
}

export default ViewSerchedItem