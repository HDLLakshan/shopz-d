import React from "react";
import Nav from "react-bootstrap/Nav";
import {BrowserRouter as Router, Link} from "react-router-dom";

export function HomeAdmin(props) {
    return (
        <Nav fill variant="tabs" defaultActiveKey={props.path.location.pathname}>
            <Nav.Item>
                <Nav.Link as={Link} eventKey="/Admin" to="/Admin">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} eventKey="/Admin/ProductManager" to="/Admin/ProductManager">Product Managers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} eventKey="/Admin/Category" to="/Admin/Category">Categories</Nav.Link>
            </Nav.Item>
        </Nav>

    )
}
