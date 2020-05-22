import React, {Component} from "react";
import axios from 'axios';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

export default class AddToShoppingCart extends Component{
    constructor(props) {
        super(props);
    console.log("qqqq")
        this.state={
            index:0,
            ToDelete:false,
            isInList:false,
            ProductId:'',
            PricePerUnit:'',
            ImagePath:'',
            count:0,
            Remove:false

        };
        this.handleClick= this.handleClick.bind(this);
    }
    componentDidMount() {

                let oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
                const arrayproduct =  JSON.parse(oldproduct);
                for(var i= 0 ; i <arrayproduct.length ; i++) {
                    if (arrayproduct[i].ProductId === this.props.productId) {
                        this.setState({
                            isInList: true,
                            index: i,
                            products: []
                        })
                    }else{
                        console.log('came')
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
        for(var i= 0 ; i <arrayproduct.length ; i++){
            if(arrayproduct[i].ProductId===this.props.productId) {
                if(sessionStorage.getItem("count")){
                    sessionStorage.removeItem("count");
                }
                arrayproduct.splice(i, 1);
                sessionStorage.setItem('products', JSON.stringify(arrayproduct));
                sessionStorage.setItem("count", JSON.stringify(arrayproduct.length))
            }
        }

    }

    else{
        axios.get('http://localhost:4000/products/view-product/' + this.props.productId)
            .then(res => {
                if(sessionStorage.getItem("count")){
                    sessionStorage.removeItem("count");
                }
                const productObj = {
                    ProductId: res.data._id,
                    PricePerUnit: res.data.PricePerUnit,
                    Quantity: this.props.quantity,
                    ImagePath: this.props.imagePath,
                    Size:this.props.size,
                    Color:this.props.color,
                    Discount: res.data.Discount
                };
                arrayproduct.push(productObj);
                sessionStorage.setItem('products', JSON.stringify(arrayproduct));
                sessionStorage.setItem('count', JSON.stringify(arrayproduct.length))
            });
    }

        this.setState({
            isInList:!this.state.isInList,
            count:arrayproduct.length+1
        });


    }

    render() {

            return(
                <div>
                    {this.state.isInList ? (
                        <RemoveShoppingCartIcon  fontSize="large"  onClick={this.handleClick}/>
                    ):( <AddShoppingCartIcon  fontSize="large"  onClick={this.handleClick} /> )}
                </div>
            );

    }

}
