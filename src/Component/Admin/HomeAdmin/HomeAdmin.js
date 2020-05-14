import React from "react";
import Nav from "react-bootstrap/Nav";
import {BrowserRouter as Router, Link} from "react-router-dom";
export function HomeAdmin() {
        return (
                <Nav fill variant="tabs" defaultActiveKey="/Admin/Home">
                    <Nav.Item>
                        <Nav.Link as={Link} eventKey="link-0" to="/Admin/Home" >Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                       <Nav.Link as={Link} eventKey="link-1" to="/Admin/ProductManager">Product Managers</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} eventKey="link-2" to="/Admin/Category">Categories</Nav.Link>
                    </Nav.Item>
                </Nav>
        )
}