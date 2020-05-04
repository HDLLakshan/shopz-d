import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";

import AddImage from "./AddImage";


class AddProduct extends Component{

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            Products:{
                ProductName:'',
                Category: '',
                ProductBrand:'',
                PricePerUnit: '',
                StockAmount:'',
                SubCategory:'',
                ImageOfProduct:[],
                ColorOfImg:[],
                StockSmall:[],
                StockMedium:[],
                StockLarge:[],
                StockXL:[],

            },
            imagePreviewUrl:'',
            image:'',
            CategoryList:['Select','Men','Women','Watch'],
            SubCat:['Select'],
            show:false

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
            formData.append("Category", this.state.Products.Category);
            formData.append("PricePerUnit", this.state.Products.PricePerUnit);
            formData.append("SubCategory", this.state.Products.SubCategory);
            formData.append("ProductBrand", this.state.Products.ProductBrand);

            for (let l = 0; l < this.state.Products.ImageOfProduct.length; l++) {
                formData.append('ImageOfProduct', this.state.Products.ImageOfProduct[l]);
            }

            for (let m = 0; m < this.state.Products.ColorOfImg.length; m++) {
                console.log(this.state.Products.ColorOfImg[m])
                formData.append('ColorOfImg', this.state.Products.ColorOfImg[m]);
                formData.append('StockSmall', this.state.Products.StockSmall[m]);
                formData.append('StockMedium', this.state.Products.StockMedium[m]);
                formData.append('StockLarge', this.state.Products.StockLarge[m]);
                formData.append('StockXL', this.state.Products.StockXL[m]);


            }


            formData.append("StockAmount", this.state.Products.StockAmount);
            axios.post('https://servershopping.azurewebsites.net/products/add-product', formData, {headers: {"Content-type": "multipart/form-data"}})
                .then(res => console.log(res.data));

            this.setState({
                Products: {
                    ProductName: '',
                    Category: '',
                    PricePerUnit: '',
                    StockAmount: '',
                    ProductBrand: '',
                    ImageOfProduct: [],
                    ColorOfImg: [],
                    StockSmall: [],
                    StockMedium: [],
                    StockLarge: [],
                    StockXL: [],
                },
                show:false
            })

    }




    render() {


        return(
            <div className="container">
                <div >
                    <form  autoComplete="off" onSubmit={this.onSubmit}>

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


                        <TextField type={"number"} min="0" label="Price pre Unit" id="outlined-start-adornment" name={"PricePerUnit"} value={this.state.Products.PricePerUnit} onChange={(event ) => this.ChangeEventFn(event)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                            }}
                            variant="outlined"
                       required />
                        <br/><br/>


                        <TextField value={this.state.Products.StockAmount} type={"number"} id="outlined-basic" name={"StockAmount"} label="Full Stock Amount" variant="outlined" onChange={(event ) => this.ChangeEventFn(event)} required/>
                        <br/><br/>


                        </div>
     <div >

                                <AddImage keyss={1} Products={this.state.Products}/>

     </div>

                        <Button variant="contained" color="primary" size="large" type="submit"  startIcon={<SaveIcon />}>
                            Save
                        </Button>

                    </form>

                </div>
            </div>
        )
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