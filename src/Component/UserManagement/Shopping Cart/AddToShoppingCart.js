import React, {Component} from "react";
import axios from 'axios';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

export default class AddToShoppingCart extends Component{
    constructor(props) {
        super(props);

        this.state={
            index:0,
            ToDelete:false,
            isInList:false,
            ProductId:'',
            PricePerUnit:'',
            ImagePath:''

        };
        this.handleClick= this.handleClick.bind(this);
    }
    componentDidMount() {
        let oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct =  JSON.parse(oldproduct);
        for(var i= 0 ; i <arrayproduct.length ; i++){
            if(arrayproduct[i].ProductId===this.props.productId){
                this.setState({
                    isInList:true,
                    index:i,
                    products:[]
                })
            }
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {

        let oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct =  JSON.parse(oldproduct);
        for(var i= 0 ; i <arrayproduct.length ; i++){
            if(arrayproduct[i].ProductId===nextProps.productId){
                this.setState({
                    isInList:true,
                    index:i,
                    products:arrayproduct,
                })
            }
        }

    }

    handleClick()
    {
    let oldproduct = [];
    oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
    const arrayproduct = JSON.parse(oldproduct);

    if(this.state.isInList){
        console.log("came in");
        for(var i= 0 ; i <arrayproduct.length ; i++){
            if(arrayproduct[i].ProductId===this.props.productId) {
                arrayproduct.splice(i, 1);
                sessionStorage.setItem('products', JSON.stringify(arrayproduct));
            }
        }

    }

    else{
        axios.get('http://localhost:4000/products/view-product/' + this.props.productId)
            .then(res => {
                const productObj = {
                    ProductId: res.data._id,
                    PricePerUnit: res.data.PricePerUnit,
                    Quantity: this.props.quantity,
                    ImagePath: this.props.imagePath,
                    Size:this.props.size,
                    Color:this.props.color
                };
                arrayproduct.push(productObj);
                sessionStorage.setItem('products', JSON.stringify(arrayproduct));
            });
    }
        this.setState({
            isInList:!this.state.isInList
        });

    }

    render() {
        const {productId, imagePath , quantity, size, color}= this.props;

        return(
            <div>
                    {this.state.isInList ? (
                        <RemoveShoppingCartIcon  fontSize="large"  onClick={this.handleClick}/>
                    ):( <AddShoppingCartIcon  fontSize="large"  onClick={this.handleClick} /> )}
            </div>
        );
    }


}