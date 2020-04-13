import React,{Component} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import AddProduct from "./Component/ProductMangement/Add-Product/Add-Product";
import MainView from "./Component/ProductMangement/ViewProducts/MainView";
import ProductFullDetails from "./Component/ProductMangement/ViewSingleProduct/ProductFullDetails";
import 'react-notifications-component/dist/theme.css';
import LoginRegView from "./Component/Login/loginRegView";
import ReactNotification from 'react-notifications-component';
import UserManagement from "./Component/UserManagement/userManagement";
import GetWishlist from "./Component/Wishlist/GetWishlist";
import GetShoppingCart from "./Component/Shopping Cart/getShoppingCart";
import ViewSerchedItem from "./Component/ProductMangement/Search/ViewSerchedItem";

class App extends Component{

    render(){
    return (
        <div>
            <NavBar/>
            <BrowserRouter>
                <ReactNotification/>
                <Switch>
                    <Route exact path="/search/:keyword" component={ViewSerchedItem} />
                    <Route path="/cart" component={GetShoppingCart} exact/>
                    <Route path="/wishlist" component={GetWishlist} exact/>
                    <Route path="/userMan" component={UserManagement} exact/>
                    <Route path="/loginRegView" component={LoginRegView} exact/>
                    <Route path="/add" component={AddProduct} exact/>
                    <Route path="/details/:id" component={ProductFullDetails} exact/>
                    <Route path="/" component={MainView}/>

                </Switch>
            </BrowserRouter>
        </div>

    );
}

}

export default App;

