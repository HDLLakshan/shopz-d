import React, {Component} from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css"

class ViewAllProduct extends Component{

    constructor() {
        super();
        this.state = {
            products:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/products/')
            .then(res => {
                this.setState({
                    products: res.data
                });
            })
            .catch((error) => {
                console.log(error);
            })

    }

    render() {
        const columns = [
            {
                Header: "Product Name",
                accessor: "ProductName"
            },
            {
                Header: "Product Brand",
                accessor: "ProductBrand"
            },
            {
                Header: "Category",
                accessor: "Category"
            },
            {
                Header: "Sub Category",
                accessor: "SubCategory"
            },
            {
                Header: "Price",
                accessor: "PricePerUnit"
            },
        ]
        return(
            <ReactTable
            columns={{columns}}>

            </ReactTable>
        )
    }
}
export default ViewAllProduct