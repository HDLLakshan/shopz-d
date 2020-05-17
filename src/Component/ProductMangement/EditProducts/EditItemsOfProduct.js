import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {Button} from "react-bootstrap";
import LoaderComponent from "../ViewProducts/LoaderComponent";

class EditItemsOfProduct extends Component{

    constructor() {
        super();
        this.state = {
            Products: {
                ProductName:'',
                ProductBrand:'',
                Category: '',
                PricePerUnit: '',
                SubCategory:'',
                Details: []
            },
            loading:true
        }
        this.onEdit = this.onEdit.bind(this)
    }

    componentDidMount() {
        axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    Products:res.data,
                },()=>this.setState({loading:false}))
            })
            .catch((error) => {
                console.log(error + 'mko aul');
            })
    }

    onEdit = (e,index) => {
        e.preventDefault();
        axios.put('https://servershopping.azurewebsites.net/products/editItemOfProduct/' + this.props.match.params.id, this.state.Products.Details[index])
            .then((res) => {
                console.log(res.data)
                console.log('Student successfully updated')
            })
            .then(()=> this.props.history.push('/viewListOfProduct'))
            .catch((error) => {
            console.log(error)
        })
    }

    onDelete = (e,color) => {
        e.preventDefault();

        axios.put('https://servershopping.azurewebsites.net/products/deleteOneItemFromProduct/' + this.props.match.params.id + "/" + color)
            .then((res) => {
                console.log(res.data)
                console.log('Product successfully updated')
            })
            .then(()=> this.props.history.push('/viewListOfProduct'))
            .catch((error) => {
            console.log(error)
        })



    }


    render() {
        const {Products} = this.state
        return(
            <div>
                <Typography component="h1" variant="h4" align="center">
                    Edit Items Of Products
                </Typography>
                {this.state.loading ? <div className="d-flex justify-content-center">
                        <LoaderComponent top={'100px'}/>
                    </div> :
                    <div>
                        <div className={"row container mt-0"}
                             style={{marginLeft: '20%', fontSize: "24px", fontFamily: 'MS Gothic'}}>
                            <p className={"col-6"}>Product Name : {this.state.Products.ProductName}</p>
                            <p className={"col-6"}>Product Brand : {this.state.Products.ProductBrand}</p>
                            <p className={"col-6"}>Category : {this.state.Products.Category}</p>
                            <p className={"col-6"}>Sub Category : {this.state.Products.SubCategory}</p>
                            <p className={"col-6"}>Price : {this.state.Products.PricePerUnit}</p>
                            <p className={"col-6"}>Discount : {this.state.Products.Discount}</p>
                        </div>

                        <div>
                            {
                                this.state.Products.Details.map((item, txt) => {
                                    return (
                                        <div key={txt} className={"container-fluid"} style={{border: '1px solid blue'}}>

                                            <p>Item {txt + 1}</p>
                                            <div className={"form-group row"}>

                                                <div className="col col-md-2">
                                                    <label>Color</label>
                                                    <input type="text" className="form-control" placeholder="Color"
                                                           name={"ColorOfImg"}
                                                           value={Products.Details[txt].color} required/>
                                                </div>

                                                <div className="col col-md-2">
                                                    <label>Small</label>
                                                    <input type="number" min={0} className="form-control"
                                                           placeholder="Small" name={"StockSmall"}
                                                           defaultValue={Products.Details[txt].small}
                                                           onChange={(event) => Products.Details[txt].small = event.target.value}
                                                           required/>
                                                </div>

                                                <div className="col col-md-2">
                                                    <label>Medium</label>
                                                    <input type="number" min={0} className="form-control"
                                                           placeholder="Medium" name={"StockMedium"}
                                                           defaultValue={Products.Details[txt].medium}
                                                           onChange={(event) => Products.Details[txt].medium = event.target.value}
                                                           required/>
                                                </div>

                                                <div className="col col-md-2">
                                                    <label>Large</label>
                                                    <input type="number" min={0} className="form-control"
                                                           placeholder="Large" name={"StockLarge"}
                                                           defaultValue={Products.Details[txt].large}
                                                           onChange={(event) => Products.Details[txt].large = event.target.value}
                                                           required/>
                                                </div>

                                                <div className="col col-md-2">
                                                    <label>XL</label>
                                                    <input type="number" min={0} className="form-control"
                                                           placeholder="XL" name={"StockXL"}
                                                           defaultValue={Products.Details[txt].xl}
                                                           onChange={(event) => Products.Details[txt].xl = event.target.value}
                                                           required/>
                                                </div>

                                                <div>
                                                    <Button size="small" variant="btn btn-warning"
                                                            onClick={e => this.onEdit(e, txt)}>Edit & Save</Button>
                                                    <br/>
                                                    <Button hidden={Products.Details.length === 1} size="small"
                                                            variant="btn btn-danger"
                                                            onClick={e => {
                                                                if (window.confirm('Are you sure you wish to delete this item?')) this.onDelete(e, item.color)
                                                            }}>Delete</Button>
                                                </div>


                                            </div>

                                            <br/>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                }
            </div>
        )
    }
}

export default EditItemsOfProduct