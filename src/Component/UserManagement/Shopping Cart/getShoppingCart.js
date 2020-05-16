import React, {Component} from "react";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import {ShoppingCartRow} from "./ShoppingCartRow";
import {Modal,Button} from "react-bootstrap";
import { withRouter } from 'react-router-dom'
import AuthService from "../services/auth.service";


 class GetShoppingCart extends Component{

    constructor(props) {
        super(props);

        this.state={
            products : [],
            productIds:[],
            price:0,
        };
        this.getShoppingCartTemplate= this.getShoppingCartTemplate.bind(this);
        this.getThePrice= this.getThePrice.bind(this);
        this.changeQuantity= this.changeQuantity.bind(this);
        this.handleRemoveButton=this.handleRemoveButton.bind(this);
    }
    componentDidMount() {
        let oldproduct = [];
        oldproduct = sessionStorage.getItem('products') ? sessionStorage.getItem('products') : "[]";
        const arrayproduct = JSON.parse(oldproduct);
        console.log(arrayproduct);
        this.setState({
            products : arrayproduct
        });
    }
    changeQuantity(e, id) {
        var myObj=[];
        myObj = JSON.parse(sessionStorage.getItem("products"));
        for(var j=0; j<myObj.length; j++){
            if(myObj[j].ProductId===id){
                myObj[j].Quantity = e;
                sessionStorage.setItem("products", JSON.stringify(myObj));
            }
        }
        this.setState({
            products: this.state.products.map((res, i) => {
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
        for(var i = 0 ; i<oldList.length;i++){
            if(oldList[i].ProductId===id){
                var index = oldList.indexOf(id);
                oldList.splice(index,1);
                this.setState({
                    products:oldList
                })
            }
        }
        sessionStorage.setItem('products', JSON.stringify(oldList));


    }
    getThePrice(){
        var price1=0;
        this.state.products.map((res , i )=>{
            price1=res.PricePerUnit* res.Quantity+price1
        },()=>{
            this.setState({
                price:price1
            })
        });

        return <p style={{"font-size":"30px"}}> LKR {price1}.00</p>

    }

    render(){
        const {history}=this.props;
        return(

                <Modal show={this.props.show} aria-labelledby="contained-modal-title-vcenter" size="lg">
                    <Modal.Header closeButton onClick={this.props.onHide}>
                        <Modal.Title style={{color:"#334d4d", fontWeight: 'bold'}}>
                            RARE
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <p style={{ color: '#94b8b8', fontWeight: 'bold' }}>
                                your
                            </p>
                            <p style={{ color: '#527a7a', fontWeight: 'bold', fontSize:'30px'}}>
                                Cart
                            </p>
                            <div style={{ fontWeight: 'bold', backgroundColor:'#d1e0e0',  padding: "15px",margin: "20px" }} className='text-center text-white'
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
                </Modal>

        )
    }
}
export default withRouter(GetShoppingCart);