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

          <BrowserRouter>
              <NavBar/>
              <Switch>
                  <Route exact path="/search/:keyword" component={ViewSerchedItem} />
                  <Route path="/add" component={AddProduct} exact/>
                  <Route path="/details/:id" component={ProductFullDetails} exact/>
                  <Route path="/" component={MainView} exact/>

              </Switch>
          </BrowserRouter>
      </div>




  );
}

export default App;
