import React, {Component} from "react";
import FormFile from "react-bootstrap/FormFile";
import TextField from "@material-ui/core/TextField";
import Tooltip from '@material-ui/core/Tooltip'
import Fab from "@material-ui/core/Fab";

class AddImage extends Component{

    constructor(props) {
        super(props);
        this.state={
            imageURL:[],
            Arr:[0],
        }
    }


    onFileChange = (event,index) => {
        let reader = new FileReader()
        this.props.Products.ImageOfProduct[index] = event.target.files[0]
        this.setState({
            Products:{
                ...this.props.Products,
                ...this.props.Products.ImageOfProduct,

            }
        })

        this.state.Arr.push(index+1);
        console.log("Data" + this.props.Products.StockSmall[index])

        reader.onloadend = (e) => {
            this.setState({image: e.target.result});
        }

        reader.readAsDataURL(event.target.files[0]);

        this.state.imageURL[index] = event.target.files[0].name

        this.forceUpdate();
    }





    render() {
        return (
<div>
            {
               this.state.Arr.map(txt =>


        <div className="">
            <div className={"row"}>
            <div className="col col-md-3">
                <input type="text" className="form-control" placeholder="clr" name={"ColorOfImg"}
                       onChange={(event) => this.props.Products.ColorOfImg[txt] = event.target.value}/>
            </div>
                <div className="col col-md-2">
                    <input type="number" min={0} className="form-control" placeholder="Small" name={"StockSmall"}
                           onChange={(event) => this.props.Products.StockSmall[txt]=event.target.value}/>
                </div>
                <div className="col col-md-2">
                    <input type="number" min={0} className="form-control" placeholder="Medium" name={"StockMedium"}
                           onChange={(event) => this.props.Products.StockMedium[txt]=event.target.value}/>
                </div>
                <div className="col col-md-2">
                    <input type="number" min={0} className="form-control" placeholder="Large" name={"StockLarge"}
                           onChange={(event) =>this.props.Products.StockLarge[txt]=event.target.value}/>
                </div>
                <div className="col col-md-2">
                    <input type="number" min={0} className="form-control" placeholder="XL" name={"StockXL"}
                           onChange={(event) => this.props.Products.StockXL[txt]=event.target.value}/>
                </div>

            </div>
            <div className={"row"}>
                <div className="col-md-4  custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile01"
                           aria-describedby="inputGroupFileAddon01"  name={"ImageOfProduct"}
                           onChange={(event => this.onFileChange(event, txt))}/>
                    <label className="custom-file-label"  htmlFor="inputGroupFile01">{this.state.imageURL[txt]}</label>
                </div>
            </div>
            <br/>

        </div>

                )}
</div>
        );
    }


}
export default AddImage

