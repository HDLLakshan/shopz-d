import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import AddProduct from "./Component/ProductMangement/Add-Product/Add-Product";
import MainView from "./Component/ProductMangement/ViewProducts/MainView";
import ProductFullDetails from "./Component/ProductMangement/ViewSingleProduct/ProductFullDetails";
import ViewSerchedItem from "./Component/ProductMangement/Search/ViewSerchedItem";


function App() {

  return (
      <div className={"App"}>
          <NavBar/>
          <BrowserRouter>
              <Switch>
                  <Route path="/add" component={AddProduct} exact/>
                  <Route path="/details/:id" component={ProductFullDetails} exact/>
                  <Route path="/search/:keyword" component={ViewSerchedItem} exact />
                  <Route path="/" component={MainView}/>

              </Switch>
          </BrowserRouter>
      </div>




  );
}

export default App;
