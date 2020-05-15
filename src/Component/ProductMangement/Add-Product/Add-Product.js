import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";

import AddImage from "./AddImage";
import Typography from "@material-ui/core/Typography";


class AddProduct extends Component{

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            Products:{
                ProductName:'',
                ProductBrand:'',
                Category: '',
                PricePerUnit: '',
                Discount:'',
                SubCategory:'',
                ImageOfProduct:[],
                ColorOfImg:[],
                StockSmall:[],
                StockMedium:[],
                StockLarge:[],
                StockXL:[],

            },
            CategoryList:['Select','Men','Women','Watch'],
            SubCat:['Select'],
            show:false,
            Addarr:[0]

        }

    }

    ChangeEventFn = (event) => {
        this.setState({
                Products: {
                    ...this.state.Products,
                    [event.target.name]: event.target.value,
                }
            },() =>
                console.log(this.state.Products)

        )
        this.forceUpdate();
    }



    onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("ProductName", this.state.Products.ProductName);
        formData.append("ProductBrand", this.state.Products.ProductBrand);
        formData.append("Category", this.state.Products.Category);
        formData.append("PricePerUnit", this.state.Products.PricePerUnit);
        formData.append("SubCategory", this.state.Products.SubCategory);
        formData.append("Discount", this.state.Products.Discount);
        for (let l = 0; l < this.state.Products.ImageOfProduct.length; l++) {
            formData.append('ImageOfProduct', this.state.Products.ImageOfProduct[l]);
        }

        for (let m = 0; m < this.state.Products.ColorOfImg.length; m++) {
            console.log(this.state.Products.ColorOfImg[m])
            formData.append('ColorOfImg['+m+']', this.state.Products.ColorOfImg[m]);
            formData.append('StockSmall['+m+']', this.state.Products.StockSmall[m]);
            formData.append('StockMedium['+m+']', this.state.Products.StockMedium[m]);
            formData.append('StockLarge['+m+']', this.state.Products.StockLarge[m]);
            formData.append('StockXL['+m+']', this.state.Products.StockXL[m]);
            }


            formData.append("StockAmount", this.state.Products.StockAmount);
            axios.post('https://the-hanger-af.el.r.appspot.com/products/add-product', formData, {headers: {"Content-type": "multipart/form-data"}})
                .then(()=> this.props.history.push('/viewListOfProduct'))
            ;

            this.setState({
                Products: '',
                show:false,
            })

    }




    render() {


        return(
            <div className="container-fluid">
                <Typography component="h1" variant="h4" align="center">
                    Add New Product
                </Typography>
                <div >
                     <form onSubmit={this.onSubmit}>
                        <div className={"container-sm"}>
                        <TextField id="outlined-basic" name={"ProductName"} value={this.state.Products.ProductName} label="Product Name" variant="outlined" onChange={(event ) => this.ChangeEventFn(event)} required/>
                        <br/><br/>

                            <TextField id="outlined-basic" name={"ProductBrand"} value={this.state.Products.ProductBrand} label="Product Brand" variant="outlined" onChange={(event ) => this.ChangeEventFn(event)} required/>
                            <br/><br/>

                        <FormLabel>Select Category</FormLabel>
                        <FormControl value={this.state.Products.Category} as="select" size="sm" name={"Category"} onChange={(event ) => this.ChangeEventFn(event)} custom>
                            {
                                this.state.CategoryList.map((text) =>
                                    <option value={text}>{text}</option>
                                )
                            }
                        </FormControl>
                        <br/><br/>

                        <FormLabel>Select Sub Category</FormLabel>
                        <FormControl value={this.state.Products.SubCategory} as="select" size="sm" name={"SubCategory"} onChange={(event ) => this.ChangeEventFn(event)} custom>
                            {
                                this.setArray().map((text) =>
                                    <option value={text}>{text}</option>
                                )
                            }
                        </FormControl>
                            <br/><br/>


                        <TextField type="number" min={0} label="Price pre Unit" name={"PricePerUnit"} value={this.state.Products.PricePerUnit} onChange={(event ) => this.ChangeEventFn(event)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                            }}
                            variant="outlined"
                       required />
                        <br/><br/>

                            <TextField type="number" min={0} label="Discount" value={0} name={"Discount"} value={this.state.Products.Discount} onChange={(event ) => this.ChangeEventFn(event)}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                       }}
                                       variant="outlined"
                                       required />
                            <br/><br/>

                        </div>


                    <div >
                        {this.state.Addarr.map((index) => {
                            return(
                            <AddImage txt={index} keyss={1} Products={this.state.Products}/>
                            )
                        })}
                    </div>


                    <Button size="small" variant="contained" color="primary"  onClick={(e)=>this.AddItem(e)}>
                            Add More
                    </Button>
                     <br/><br/>
                         <Button className={"center"} type={"submit"} variant="contained" color="primary" size="large" >
                             Save
                         </Button>

                     </form>
                </div>
            </div>
        )
    }

    AddItem = (e) => {
        this.setState({
            Addarr : [...this.state.Addarr,this.state.Addarr.length]
        });
    }

    setArray = () => {
        if(this.state.Products.Category === 'Men'){
            this.state.SubCat = ['Select','T-Shirt','Shirt','Trouser','Denim' ]
        }

        else if (this.state.Products.Category === 'Women'){
            this.state.SubCat = ['Select','T-Shirt','Frock','Girl-Trouser','Denim' ]
        }

        else if (this.state.Products.Category === 'Watch'){
            this.state.SubCat = ['Select','Casio','Citizen']
        }
        return this.state.SubCat

    }



}






export default  AddProduct;