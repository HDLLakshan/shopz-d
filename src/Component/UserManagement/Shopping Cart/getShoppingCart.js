import React, {Component} from "react";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import {ShoppingCartRow} from "./ShoppingCartRow";
import {Modal} from "react-bootstrap";
import { withRouter } from 'react-router-dom'
import AuthService from "../services/auth.service";
let price1=0;

 class GetShoppingCart extends Component{

    constructor(props) {
        super(props);

        this.state={
            products : [],
            productIds:[],
            price:0,
            paymentButton:false
        };
        this.getShoppingCartTemplate= this.getShoppingCartTemplate.bind(this);
        this.getThePrice= this.getThePrice.bind(this);
        this.changeQuantity= this.changeQuantity.bind(this);
        this.handleRemoveButton=this.handleRemoveButton.bind(this);
    }
    componentDidMount() {
        let oldproduct;
        oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct = JSON.parse(oldproduct);
        console.log(arrayproduct);
        this.setState({
            products : arrayproduct
        });

    }
    changeQuantity(e, id) {
        let myObj;
        myObj = JSON.parse(sessionStorage.getItem("products"));
        for(let j=0; j<myObj.length; j++){
            if(myObj[j].ProductId===id){
                myObj[j].Quantity = e;
                sessionStorage.setItem("products", JSON.stringify(myObj));
            }
        }
        this.setState({
            products: this.state.products.map((res) => {
                if (res.ProductId === id) {
                    res.Quantity = parseInt(e);
                    return res;
                }
                return res;
            })
    });


    }
    getShoppingCartTemplate(){
            return this.state.products.map((res , i )=>{
                return <ShoppingCartRow obj={res} key={i} handleRemoveButton={this.handleRemoveButton} changeQuantity={this.changeQuantity}/>;
            });

    }
    handleRemoveButton(id){
        var oldList=[];
        oldList = JSON.parse(sessionStorage.getItem("products"));
        for(let i = 0 ; i<oldList.length; i++){
            if(oldList[i].ProductId===id){
                console.log(oldList[i].ProductId);
                if(sessionStorage.getItem("count")){
                    sessionStorage.removeItem("count");
                }
                oldList.splice(i,1);
                this.setState({
                    products:oldList
                })
            }
        }
        sessionStorage.setItem('products', JSON.stringify(oldList));
        sessionStorage.setItem('count', JSON.stringify(oldList.length));
        this.props.history.push('/');
    }
    getThePrice(){
        price1 = 0;
        this.state.products.map((res)=>{
            price1=(res.PricePerUnit - res.PricePerUnit*(res.Discount/100))* res.Quantity + price1
        },()=>{
            this.setState({
                price:price1
            });

        });


        return <p style={{"font-size":"30px"}}> LKR {price1}.00</p>

    }

    render(){
        return(

                <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" size="lg">
                    <Modal.Header closeButton onClick={this.props.onHide}>
                        <Modal.Title style={{color:"#888844", fontWeight: 'bold'}}>
                            RARE
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p style={{ color: '#888844', fontWeight: 'bold' }}>
                                your
                            </p>
                            <p style={{ color: '#888844', fontWeight: 'bold', fontSize:'30px'}}>
                                Cart
                            </p>
                            <div style={{ fontWeight: 'bold', backgroundColor:'#ddddbb',  padding: "15px",margin: "20px" }} className='text-center text-white'
                            onClick={()=>{
                                this.props.history.push('/');
                                window.location.reload();
                            }}>
                                CONTINUE SHOPPING
                            </div>
                        </div>
                        <br/>
                        <div >
                    {this.getShoppingCartTemplate()}
                        </div>
                <br/>
                <div align="center" style={{fontWeight: 'bold' }}>
                    {this.getThePrice()}
                </div>

                    </Modal.Body>
                    {price1 > 0 ? (
                        <Modal.Footer>

                            Proceed to checkout <DoubleArrowIcon fontSize="large"
                                                                 onClick={() => {
                                                                     if(AuthService.getCurrentUser() != null){
                                                                         this.props.history.push('/billing');
                                                                         window.location.reload();
                                                                     }else {
                                                                         this.props.history.push('/loginRegView');
                                                                         window.location.reload();
                                                                     }
                                                                 }
                                                                 }
                        />
                        </Modal.Footer>
                    ):null}

                </Modal>

        )
    }
}
export default withRouter(GetShoppingCart);