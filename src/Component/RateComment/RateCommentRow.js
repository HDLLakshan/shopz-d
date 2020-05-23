import React, {Component} from 'react';
import Form from "reactstrap/es/Form";
import Button from "@material-ui/core/Button/Button";
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';
import './Rate.css'
import Grid from "@material-ui/core/Grid/Grid";
import {Col, FormGroup, Input} from "reactstrap";
import AuthService from "../UserManagement/services/auth.service";

export default class RateCommentRow extends Component{

    constructor(props) {
        super(props);


        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            ratingno: 0,
            comment:'',
            userName:'',
            productId:'',


        };
    }



    onChangeComment(e) {
        this.setState({comment: e.target.value})
    }

    onStarClick(nextValue) {
        this.setState({ratingno: nextValue});
    }

    onStarHover(nextValue){
        this.setState({ratingno:nextValue});
    }

    componentDidMount() {

        this.state.userName   = AuthService.getUsername();


    }

    onSubmit(e) {
        e.preventDefault()

        const ratingObject = {

            userName:this.state.userName,
            ratingno:this.state.ratingno,
            comment:this.state.comment,
            productId: this.state.productId


        };
        axios.post('http://localhost:4000/rating/add-rating', ratingObject)
            .then(res => console.log(res.data));

        this.setState({

            userName:'',
            productId:'',
            ratingno:0,
            comment:'',

        })
    }



    render() {


        return (
            <div className="row" style={{marginTop: 40}}>

                <div className="col-md-3" style={{marginLeft: 100}}>
                    < img src={this.props.obj.ImagePath} style={{width: '17vw', height: '17vw'}}/>
                </div>

                <div className="col-md-5" style={{marginLeft: 10}}>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup row inline justify="center">
                            <Col sm={8}>
                                <StarRatingComponent
                                    className={"Ratingss"}
                                    name="rate1"
                                    starCount={5}
                                    size={90}
                                    value={this.state.ratingno}
                                    onStarClick={this.onStarClick.bind(this)}
                                    onStarHover={this.onStarHover.bind(this)}

                                />
                                <input className="Hide" value={this.state.ratingno}/>
                                <input className="Hide" value={this.state.productId = this.props.obj.ProductId}/>

                                <br/>

                                <Input type="textarea"
                                       placeholder="Add a comment..."
                                       name="comment"
                                       autoComplete="billing postal-code"
                                       value={this.state.comment}
                                       onChange={this.onChangeComment}
                                       rowsMax={5}
                                />
                                <br/>
                                <Button variant="contained" size="sm" type="submit" float-center="true">
                                    Save Response
                                </Button>
                            </Col><br/><br/>


                        </FormGroup>
                    </Form>

                </div>
                <br/><br/>


            </div>
        );

    }


}