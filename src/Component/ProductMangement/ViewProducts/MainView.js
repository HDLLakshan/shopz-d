import React, {Component, lazy, Suspense} from "react";
import axios from "axios";

import LoaderComponent from "./LoaderComponent";
import ShowItem from "./ShowItem";




class MainView extends Component{

    constructor(props) {
        super(props)
        this.state = {
            ProductArray: [],
            CategoryName:['Men', 'Women', 'Watch'],
            loading: true,
        };
    }

    componentDidMount() {
        axios.get('https://servershopping.azurewebsites.net/products/')
            .then(res => {
                this.setState({
                    loading:false,
                    ProductArray: res.data

                });
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        return(

            <div>
                {
                    this.state.CategoryName.map(txt =>
                        <div>
                            <h3>{txt} Latest (More Item)</h3>
                            <div className="container1">
                                {this.state.loading ? <LoaderComponent /> : null}
                                {
                                    this.state.ProductArray.map((item, index) =>

                                        <ShowItem key={index} product={item} cat={txt}/>

                                    )
                                }
                            </div>
                        </div>
                    ) }
            </div>
        )
    }
}
export default MainView