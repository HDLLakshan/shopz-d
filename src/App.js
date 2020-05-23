import React, {Component} from 'react';
import './css/App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import AddProduct from "./Component/ProductMangement/Add-Product/Add-Product";
import MainView from "./Component/ProductMangement/ViewProducts/MainView";
import ProductFullDetails from "./Component/ProductMangement/ViewSingleProduct/ProductFullDetails";
import 'react-notifications-component/dist/theme.css';
import LoginRegView from "./Component/UserManagement/Login/loginRegView";
import ReactNotification from 'react-notifications-component';
import UserManagement from "./Component/UserManagement/userManagement";
import GetWishlist from "./Component/UserManagement/Wishlist/GetWishlist";
import GetShoppingCart from "./Component/UserManagement/Shopping Cart/getShoppingCart";
import ViewSerchedItem from "./Component/ProductMangement/Search/ViewSerchedItem";
import BillingDetails from "./Component/Purchasing/PurchaseDetails/BillingDetails";
import CardDetails from "./Component/Purchasing/PurchaseDetails/CardDetails";
import ReviewDetails from "./Component/Purchasing/PurchaseDetails/ReviewDetails";
import DisplayRateComment from "./Component/RateComment/DisplayRateComment";
import BoardUser from "./Component/UserManagement/check";
import ShowAllProdcuts from "./Component/ProductMangement/EditProducts/ShowAllProdcuts";
import EditProductsDetails from "./Component/ProductMangement/EditProducts/EditProductsDetails";
import EditItemsOfProduct from "./Component/ProductMangement/EditProducts/EditItemsOfProduct";
import AddNewItemToProduct from "./Component/ProductMangement/EditProducts/AddNewItemToProduct";
import {ProductManager} from "./Component/Admin/ProductManagerComponents/ProductManager";
import {Category} from "./Component/Admin/CategoryComponents/Category";
import {applyMiddleware, compose, createStore} from "redux";
import allReducers from "./ReduxStore/reducers";
import thunk from "redux-thunk";
import {fetchAllCats, fetchAllPayments, fetchAllPMs, fetchAllProducts, fetchAllUsers} from "./ReduxStore/action";
import {Provider} from "react-redux";
import {Dashboard} from "./Component/Admin/DashBoard/Dashboard";

const store = createStore(allReducers,
    compose(applyMiddleware(thunk),
     //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
store.dispatch(fetchAllPMs());
store.dispatch(fetchAllCats());
store.dispatch(fetchAllUsers());
store.dispatch(fetchAllProducts());
store.dispatch(fetchAllPayments());

class App extends Component {

    render() {
        return (
            <div>
                <NavBar />
                <ReactNotification/>
                <Provider store={store}>
                    <Switch>
                        <Route path="/check" component={BoardUser} exact/>
                        <Route path="/Admin" exact component={Dashboard}/>
                        <Route path="/Admin/ProductManager" exact component={ProductManager}/>
                        <Route path="/Admin/Category" exact component={Category}/>
                        <Route exact path="/search/:id" component={ViewSerchedItem}/>
                        <Route path="/cart" component={GetShoppingCart} exact/>
                        <Route path="/wishlist" component={GetWishlist} exact/>
                        <Route path="/userMan" component={UserManagement} exact/>
                        <Route path="/loginRegView" component={LoginRegView} exact/>
                        <Route path="/add" component={AddProduct} exact/>
                        <Route path="/details/:id" component={ProductFullDetails} exact/>
                        <Route path="/billing" component={BillingDetails} exact/>
                        <Route path="/credit-card" component={CardDetails} exact/>
                        <Route path="/review-order-details/:id" component={ReviewDetails} exact/>
                        <Route path="/rate-comment/:id" component={DisplayRateComment} exact/>
                        <Route path="/viewListOfProduct" component={ShowAllProdcuts} exact/>
                        <Route path="/editProductDetails/:id" exact component={EditProductsDetails}/>
                        <Route path="/editItemsDetails/:id" exact component={EditItemsOfProduct}/>
                        <Route path="/addnewItemsToProduct/:id" exact component={AddNewItemToProduct}/>
                        <Route path="/:id" exact component={MainView}/>
                        <Route path="/" exact component={MainView}/>
                    </Switch>
                </Provider>
            </div>
        );
    }

}

export default App;

