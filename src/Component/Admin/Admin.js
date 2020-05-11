import React from "react";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import allReducers from "../../ReduxStore/reducers";
import {fetchAllCats, fetchAllPMs} from "../../ReduxStore/action";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Dashboard} from "./DashBoard/Dashboard";
import {ProductManager} from "./ProductManagerComponents/ProductManager";
import {Category} from "./CategoryComponents/Category";
import {HomeAdmin} from "./HomeAdmin/HomeAdmin";


const store = createStore(allReducers, compose(applyMiddleware(thunk), ));
store.dispatch(fetchAllPMs());
store.dispatch(fetchAllCats());

export class Admin extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <HomeAdmin/>
                    <Switch>
                        <Route path="/Admin/Home" exact component={Dashboard}/>
                        <Route path="/Admin/ProductManager" exact component={ProductManager}/>
                        <Route path="/Admin/Category" exact component={Category}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}