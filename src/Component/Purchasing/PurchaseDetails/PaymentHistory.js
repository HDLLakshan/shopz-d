import React, {Component} from 'react';
import './review.css'

export default class PaymentHistory extends Component{

    constructor(props) {
        super(props);



    }

    getorderproductHistory(){
        return this.props.obj.productlist.map((res, i) => {
            return <div className="panel-body">
                <div className="form-group">
                    <div className="col-sm-3 col-xs-3">
                        < img className="img-responsive" src={res.ImagePath} style={{width: '5vw', height: '5vw'}}/>
                    </div>
                    <div className="col-sm-3 col-xs-3">
                        <div className="col-xs-12">
                            <small className="p">Size : <span>{res.Size}</span></small><br/>
                            <small className="p">Quantity : <span>{res.Quantity}</span></small>
                        </div>
                    </div>
                    <div className="col-sm-7 col-xs-3 ">
                        <h6 className="h"><span>Rs.</span>{res.PricePerUnit} (price per unit)</h6>
                    </div>
                </div>
                <div className="form-group">
                    <hr/>
                </div>
            </div>

        });
    }



    render() {


        return (

            <div>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h6 className="h" style={{backgroundColor:"yellow"}}> Total Payment : Rs. {this.props.obj.totpay} &nbsp; Date: {this.props.obj.timedate}
                        </h6>
                    </div>
                    <div>
                        {this.getorderproductHistory()}
                    </div>
                </div>
            </div>
        );

    }


}