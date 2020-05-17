import React, {Component} from "react";
import axios from 'axios';
import {Alert, Card} from "react-bootstrap";
import ImageView from "../ViewProducts/ImageView";
import {Rating} from "@material-ui/lab";
import LoaderComponent from "../ViewProducts/LoaderComponent";
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
                   <LoaderComponent top={50}/>
                </div> }
            <div className={"row mt-4"}>

                {
                    this.state.product.map((obj,index) =>
                        <div onClick={()=>this.props.history.push('/details/'+ obj._id)} className={"col-auto - variable width content"}>

                        <Card  style={{ width: '14rem' }}>
                            <div >
                            <ImageView ImgArr={obj.Details}/>
                            </div >
                            <Card.Body>
                                <Card.Title>{obj.ProductName}</Card.Title>
                                <Card.Body >
                                    <strong>Rs.{obj.PricePerUnit}</strong>
                                    <strong hidden={obj.Discount === 0} style={{float: 'right', color:'red'}}>{obj.Discount}% OFF</strong>
                                </Card.Body>
                                <Card.Footer>
                                    <Rating precision={0.5}  style={{marginLeft: '20px', marginTop:'10px'}}
                                            defaultValue={obj.TotRate} size="small" disabled={true}/>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                        </div>
                    )}
            </div>
            </div>
        )
    }
}

export default ViewSerchedItem