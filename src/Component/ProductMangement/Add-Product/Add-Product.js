import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import AddCircleSharp from '@material-ui/icons/AddCircleSharp'
import AddImage from "./AddImage";
import Typography from "@material-ui/core/Typography";
import AuthService from "../../UserManagement/services/auth.service";
import LoaderComponent from "../ViewProducts/LoaderComponent";


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
            addBy:'',
            SubCat:['Select'],
            CategoryList:[],
            loading:false,
            Addarr:[0],
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

    componentDidMount() {
        axios.get('https://servershopping.azurewebsites.net/category/all')
            .then(res => {
                this.setState({
                    CategoryList: res.data
                });
            }).then()
            .catch((error) => {
                console.log(error);
            })

        this.setState({addBy:AuthService.getUsername() })
    }

    onSubmit = (e) => {
        e.preventDefault()
this.setState({loading:true})
        const formData = new FormData()
        formData.append("ProductName", this.state.Products.ProductName);
        formData.append("ProductBrand", this.state.Products.ProductBrand);
        formData.append("Category", this.state.Products.Category);
        formData.append("PricePerUnit", this.state.Products.PricePerUnit);
        formData.append("SubCategory", this.state.Products.SubCategory);
        formData.append("Discount", this.state.Products.Discount);
        formData.append("addBy", this.state.addBy);
        for (let m = 0; m < this.state.Products.ImageOfProduct.length; m++) {
            formData.append('ImageOfProduct', this.state.Products.ImageOfProduct[m]);
            formData.append('ColorOfImg['+m+']', this.state.Products.ColorOfImg[m]);
            formData.append('StockSmall['+m+']', this.state.Products.StockSmall[m]);
            formData.append('StockMedium['+m+']', this.state.Products.StockMedium[m]);
            formData.append('StockLarge['+m+']', this.state.Products.StockLarge[m]);
            formData.append('StockXL['+m+']', this.state.Products.StockXL[m]);
        }


            axios.post('https://servershopping.azurewebsites.net/products/add-product', formData, {headers: {"Content-type": "multipart/form-data"}})
                .then(()=>  this.props.history.push('/viewListOfProduct') )
            ;

            this.setState({
                Products: '',
                loading:false,
            })

    }


    render() {
            if(this.state.CategoryList.length === 0)
                return null

        return(
            <div>
            {this.state.loading ?     <div >
                        <div className="d-flex justify-content-center">
                            <LoaderComponent top={'100px'}/>
                        </div>
                    </div> :
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
                                   <option>Select</option>
                            {
                                this.state.CategoryList.map((text,index) =>
                                    <option key={index} value={text.name}>{text.name}</option>
                                )
                            }
                        </FormControl>
                        <br/><br/>

                        <FormLabel>Select Sub Category</FormLabel>
                        <FormControl value={this.state.Products.SubCategory} as="select" size="sm" name={"SubCategory"} onChange={(event ) => this.ChangeEventFn(event)} custom>
                            <option>Select</option>
                            {
                                 this.state.CategoryList[this.findIndex()].subCategory.map((text,index) =>
                                    <option key={index} value={text}>{text}</option>
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
                            <AddImage key={index} txt={index} length={this.state.Addarr.length} remove={this.removeItem} Products={this.state.Products}/>
                            )
                        })}
                    </div>


                    <Button style={{marginLeft:"48%"}} size="small" variant="contained" color="primary" startIcon={<AddCircleSharp/>}  onClick={(e)=>this.AddItem(e)}>
                            Add More
                    </Button>
                     <br/><br/>
                         <Button style={{marginLeft:"48%"}} type={"submit"} variant="contained" color="primary" size="large" startIcon={<SaveIcon/>}>
                             Save
                         </Button>

                     </form>
                </div>
            </div> } </div>
        )
    }

    AddItem = (e) => {
        this.setState({
            Addarr : [...this.state.Addarr,this.state.Addarr.length]
        });
    }

    removeItem = (e) => {

        this.state.Addarr.pop()
        this.forceUpdate()
    }

    findIndex = () => {
        if(this.state.CategoryList.length === 0)
           return 0
        else {
            var index
            if(this.state.Products.Category ==='')
                return  0
            else
                index = this.state.CategoryList.findIndex(x => x.name === this.state.Products.Category);
                return index
        }
    }


}






export default  AddProduct;