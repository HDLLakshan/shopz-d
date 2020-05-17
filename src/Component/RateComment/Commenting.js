import React, {Component} from "react";
import '../Purchasing/PurchaseDetails/layout.css'
import Paper from "@material-ui/core/Paper/Paper";
import './Rate.css'




const grid = 8;
const getItemStyle = () => ({

    padding: grid * 2,
    marginBottom: grid,
    backgroundColor:"#FCFCFCFC",
    width:420,

});
const getListStyle =() => ({

    padding: grid,
    width: 450,
    height:350,




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
                           style={{width:450}}
                           elevation={0}
                        >

                            <h3 align="center">Comments</h3>
                          <div
                              style={getListStyle()}
                              class="scroll scroll2 scroll3 scroll4 spacee"
                          >

                            {this.props.com.map(e =>



                                <Paper
                                    class="scroll scroll2 scroll3 scroll4 border1"
                                style={getItemStyle()}
                                >


                                    <h6>{e.userid}:</h6>
                                {e.comment}

                                </Paper>

                            )}

                          </div>
                        </Paper>


        );
    }
}
export default  Commenting