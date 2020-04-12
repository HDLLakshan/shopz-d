import React, {Component} from "react";

class ViewSerchedItem extends Component{



    render() {
        return(
            <div className={"row"}>
                <div className="card mb-3" style={{'max-width': '540px'}}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src="..." className="card-img" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewSerchedItem