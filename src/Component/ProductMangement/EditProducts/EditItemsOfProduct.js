import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import {Button} from "react-bootstrap";

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
        }
        this.onEdit = this.onEdit.bind(this)
    }

    componentDidMount() {
        axios.get('https://servershopping.azurewebsites.net/products/view-product/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    Products:res.data,
                })
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

                <div>
                    {
                        this.state.Products.Details.map((item,txt)=> {
                            return(
                            <div key={txt} className={"container-fluid"}  style={{border:'1px solid blue'}} >

                                <p>Item {txt+1}</p>
                                <div className={"form-group row"}>

                                    <div className="col col-md-2">
                                        <label>Color</label>
                                        <input type="text" className="form-control" placeholder="Color" name={"ColorOfImg"}
                                             value={Products.Details[txt].color}  required/>
                                    </div>

                                    <div className="col col-md-2">
                                        <label>Small</label>
                                        <input type="number" min={0} className="form-control" placeholder="Small" name={"StockSmall"}
                                               defaultValue={Products.Details[txt].small}  onChange={(event) => Products.Details[txt].small = event.target.value} required/>
                                    </div>

                                    <div className="col col-md-2">
                                        <label>Medium</label>
                                        <input type="number" min={0} className="form-control" placeholder="Medium" name={"StockMedium"}
                                               defaultValue={Products.Details[txt].medium} onChange={(event) => Products.Details[txt].medium = event.target.value} required/>
                                    </div>

                                    <div className="col col-md-2">
                                        <label>Large</label>
                                        <input type="number" min={0} className="form-control" placeholder="Large" name={"StockLarge"}
                                               defaultValue={Products.Details[txt].large} onChange={(event) => Products.Details[txt].large = event.target.value} required/>
                                    </div>

                                    <div className="col col-md-2">
                                        <label>XL</label>
                                        <input type="number" min={0} className="form-control" placeholder="XL" name={"StockXL"}
                                               defaultValue={Products.Details[txt].xl} onChange={(event) => Products.Details[txt].xl=event.target.value} required/>
                                    </div>

                                    <div>
                                        <Button  size="small" variant="btn btn-warning"
                                         onClick={e => this.onEdit(e,txt)}       >Edit & Save</Button>
                                        <br/>
                                        <Button hidden={Products.Details.length === 1} size="small" variant="btn btn-danger"
                                        onClick={e => this.onDelete(e,item.color)} >Delete</Button>
                                    </div>



                                </div>

                                <br/>
                            </div>
                            )})
                    }
                </div>



            </div>
        )
    }
}

export default EditItemsOfProduct