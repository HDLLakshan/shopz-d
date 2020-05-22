import React, {Component} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import LoaderComponent from "../ViewProducts/LoaderComponent";


class AddNewItemToProduct extends Component{

    constructor() {
        super();
        this.state = {
            newItem : {
                image:File,
                color:'',
                small:'',
                medium:'',
                large:'',
                xl:''
            },
            imageURL:'',
            Products:[],
            loading:true

        }
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

    onFileChange = (event) => {

        this.state.newItem.image = event.target.files[0]
        this.state.imageURL = event.target.files[0].name
        this.forceUpdate();
    }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image",this.state.newItem.image);
        formData.append("color",this.state.newItem.color);
        formData.append("small",this.state.newItem.small);
        formData.append("medium",this.state.newItem.medium);
        formData.append("large",this.state.newItem.large);
        formData.append("xl",this.state.newItem.xl);

        axios.post('https://servershopping.azurewebsites.net/products/addnewItemToProduct/' + this.props.match.params.id, formData)
            .then((res) => {
                // Redirect to Product List
                this.props.history.push('/viewListOfProduct')
                console.log('Student successfully updated')
            }).catch((error) => {
            console.log(error)
        })




    }

    render() {
        const {newItem} = this.state
        return(
            <div className={"container-fluid"}   >

                <Typography component="h1" variant="h4" align="center">
                    Add New Item to Products
                </Typography>
                {this.state.loading ? <div className="d-flex justify-content-center">
                        <LoaderComponent top={'100px'}/>
                    </div> :
                <div>
                    <div className={"row container mt-4"}
                         style={{marginLeft: '20%', fontSize: "24px", fontFamily: 'MS Gothic'}}>
                        <p className={"col-6"}>Product Name : {this.state.Products.ProductName}</p>
                        <p className={"col-6"}>Product Brand : {this.state.Products.ProductBrand}</p>
                        <p className={"col-6"}>Category : {this.state.Products.Category}</p>
                        <p className={"col-6"}>Sub Category : {this.state.Products.SubCategory}</p>
                        <p className={"col-6"}>Price : {this.state.Products.PricePerUnit}</p>
                        <p className={"col-6"}>Discount : {this.state.Products.Discount}</p>
                    </div>
                <div style={{border:'1px solid blue'}}>
                <div className={"form-group row mt-5"} >

                    <div className="col col-md-3">
                        <input type="text" className="form-control" placeholder="clr" name={"ColorOfImg"}
                               onChange={(event) => newItem.color = event.target.value} required/>
                    </div>

                    <div className="col col-md-2">
                        <input type="number" min={0} className="form-control" placeholder="Small" name={"StockSmall"}
                               onChange={(event) => newItem.small=event.target.value} required/>
                    </div>

                    <div className="col col-md-2">
                        <input type="number" min={0} className="form-control" placeholder="Medium" name={"StockMedium"}
                               onChange={(event) => newItem.medium=event.target.value} required/>
                    </div>

                    <div className="col col-md-2">
                        <input type="number" min={0} className="form-control" placeholder="Large" name={"StockLarge"}
                               onChange={(event) => newItem.large=event.target.value} required/>
                    </div>

                    <div className="col col-md-2">
                        <input type="number" min={0} className="form-control" placeholder="XL" name={"StockXL"}
                               onChange={(event) => newItem.xl=event.target.value} required/>
                    </div>

                </div>

                <div className={"row"}>
                    <div className="col-md-4  custom-file">
                        <input type="file" className="mx-auto custom-file-input"   name={"ImageOfProduct"}
                               onChange={(event => this.onFileChange(event))} required/>
                        <label className="custom-file-label" >{this.state.imageURL}</label>
                    </div>

                    <Button className={"center"} type={"submit"} variant="contained" color="primary" size="large"
                    onClick={e => this.onSubmit(e)}>
                        Save
                    </Button>

                </div>
                <br/>
            </div>
                </div>}

            </div>
        )
    }
}

export default AddNewItemToProduct