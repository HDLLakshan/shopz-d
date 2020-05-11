import React, {Component} from "react";


class AddImage extends Component{

    constructor(props) {
        super(props);
        this.state={
            imageURL:[],
        }
    }


    onFileChange = (event,index) => {

        this.props.Products.ImageOfProduct[index] = event.target.files[0]
        this.setState({
            Products:{
                ...this.props.Products,
                ...this.props.Products.ImageOfProduct,

            }
        })


        this.state.imageURL[index] = event.target.files[0].name

        this.forceUpdate();
    }


    render() {
        const {txt} = this.props
        return (
       <div>

                       <div className={"container-fluid"}  style={{border:'1px solid blue'}} >

                           <p>Add Item {txt+1}</p>
                           <div className={"form-group row"}>

                               <div className="col col-md-3">
                                   <input type="text" className="form-control" placeholder="clr" name={"ColorOfImg"}
                       onChange={(event) => this.props.Products.ColorOfImg[txt] = event.target.value} required/>
                               </div>

                               <div className="col col-md-2">
                                   <input type="number" min={0} className="form-control" placeholder="Small" name={"StockSmall"}
                           onChange={(event) => this.props.Products.StockSmall[txt]=event.target.value} required/>
                               </div>

                               <div className="col col-md-2">
                                   <input type="number" min={0} className="form-control" placeholder="Medium" name={"StockMedium"}
                           onChange={(event) => this.props.Products.StockMedium[txt]=event.target.value} required/>
                               </div>

                               <div className="col col-md-2">
                                   <input type="number" min={0} className="form-control" placeholder="Large" name={"StockLarge"}
                           onChange={(event) =>this.props.Products.StockLarge[txt]=event.target.value} required/>
                               </div>

                               <div className="col col-md-2">
                                   <input type="number" min={0} className="form-control" placeholder="XL" name={"StockXL"}
                           onChange={(event) => this.props.Products.StockXL[txt]=event.target.value} required/>
                               </div>

                           </div>

                           <div className={"row"}>
                               <div className="col-md-4  custom-file">
                                   <input type="file" className="mx-auto custom-file-input"   name={"ImageOfProduct"}
                           onChange={(event => this.onFileChange(event, txt))} required/>
                           <label className="custom-file-label" >{this.state.imageURL[txt]}</label>
                               </div>
                           </div>
                           <br/>
                       </div>

       </div>
        );
    }
}
export default AddImage

