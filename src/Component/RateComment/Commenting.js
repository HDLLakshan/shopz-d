import React, {Component} from "react";
import GridList from "@material-ui/core/GridList/GridList";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import '../Purchasing/PurchaseDetails/layout.css'
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import List from "@material-ui/core/List/List";
import './Rate.css'




const grid = 8;
const getItemStyle = () => ({

    padding: grid * 2,
    marginBottom: grid,
    backgroundColor:"#F3F3F3",
    width:390




});
const getListStyle =() => ({

    padding: grid,
    width: 400,
    height:400,

});

class Commenting extends Component{
    constructor(props) {
        super(props);

    }


    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        return (


                        <Paper
                            style={getListStyle()}
                        >

                            <h3 align="center">Comments</h3>


                            {this.props.com.map(e =>



                                <div

                                className="spacee"
                                style={getItemStyle()}
                                >
                                    <h6>{e.userid}:</h6>
                                {e.comment}
                                </div>

                            )}


                        </Paper>


        );
    }
}
export default  Commenting