import React, {Component, lazy, Suspense} from "react";
import axios from "axios";
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
        axios.get('https://the-hanger-af.el.r.appspot.com/products/')
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
                {this.state.loading ? <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> : null}
                {
                    this.state.CategoryName.map(txt =>
                        <div>
                            <h3 class="h3" hidden={this.state.loading}>{txt} Latest </h3>
                            <div className="container1">

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