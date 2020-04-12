import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {BrowserRouter, Link} from "react-router-dom";

class NavBar extends Component{

    constructor() {
        super();
        this.state = {
            SearchVal : '',
            redirectToReferrer:''

        }
    }

    onSearch = () =>{
        if(this.state.SearchVal !== ''){
            this.setState({redirectToReferrer:true})
        }
    }

    render() {

        return(
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="add">Add</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => this.setState({SearchVal:e.target.value})}/>
                    <BrowserRouter>
                    <Link href={`/search/${this.state.SearchVal}`}>
                    <Button variant="outline-light" type={"submit"}  >Search</Button>
                    </Link>
                    </BrowserRouter>
                </Form>
            </Navbar>
        )
    }

}

export default NavBar