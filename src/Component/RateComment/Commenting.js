import React, {Component} from "react";
import GridList from "@material-ui/core/GridList/GridList";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import '../Purchasing/PurchaseDetails/layout.css'
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper/Paper";
import List from "@material-ui/core/List/List";
import './Rate.css'

class Commenting extends Component{
    constructor(props) {
        super(props);

    }



    render() {
        return(

            <Grid container space={3}>

                <Paper style={{width:500}} >
                    <h4  align="center"> Comments</h4><br/>

                    <div className="overflow-auto" style={{width: "500px"}}>

                        {this.props.com.map(e =>
                            <div>
                                <table className="table table-striped" >

                                    <tbody className="tbody">
                                    <tr>
                                        <td>{e.userid}:</td>
                                        <td className="col-4">{e.comment}</td>

                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                        )}



                    </div>

                </Paper>
            </Grid>








        )
    }
}
export default Commenting