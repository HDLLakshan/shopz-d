import React, {Component} from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "@material-ui/core/Button";
import AuthService from "../Component/UserManagement/services/auth.service";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import SearchIcon from '@material-ui/icons/Search';
import GetShoppingCart from "../Component/UserManagement/Shopping Cart/getShoppingCart";
import {Badge} from "@material-ui/core";
import LoginRegView from "../Component/UserManagement/Login/loginRegView";
import Search from "@material-ui/icons/Search";
import {Link, NavLink, withRouter} from "react-router-dom";
import './NavBar.scss'
import Row from "react-bootstrap/Row";

let username = '';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: false,
            SearchVal: '',
            salesUser: false,
            adminUser: false,
            CategoryList: [],
            addModalShow: false,
            count: sessionStorage.getItem("count")
        };
    }

    componentDidMount() {


        const user = AuthService.getCurrentUser();
        username = AuthService.getUsername();
        if (user) {
            if (AuthService.getCurrentUser().roles[0] === "ROLE_USER") {
                this.setState({
                    currentUser: true,
                });
            } else if (AuthService.getCurrentUser().roles[0] === "ROLE_MODERATOR") {
                this.setState({
                    salesUser: true,
                });
            } else if (AuthService.getCurrentUser().roles[0] === "ROLE_ADMIN") {
                if (this.props.location.pathname === "/")
                    this.props.history.push('/Admin');
                else
                    this.props.history.push(this.props.location.pathname);
                this.setState({
                    adminUser: true,
                });
            }
        }

        setInterval(() => {
            this.setState({
                count: sessionStorage.getItem("count")
            })
        }, 1000)

        axios.get('http://localhost:4000/category/all')
            .then(res => {
                this.setState({
                    CategoryList: res.data
                });
            }).then()
            .catch((error) => {
                console.log(error);
            })
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const {currentUser, salesUser, adminUser} = this.state;
        let addModalClose = () => this.setState({addModalShow: false});
        return (
            <Navbar className="layout" sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className="name">RARE</Navbar.Brand>

                {currentUser || adminUser ? (
                    <Nav.Link style={{color: 'white'}} as={NavLink} to={"/add"}> Hi {username}! </Nav.Link>
                ) : (null)}

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {currentUser || salesUser ? (
                                <Nav.Link as={NavLink} to={"/add"}>Add</Nav.Link>
                            ) : (null)}

                        {currentUser || salesUser ? (
                            <Nav.Link as={NavLink} to={"/viewListOfProduct"}>View</Nav.Link>
                        ) : (null)}

                        {!adminUser ? (
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        ) : (null)}

                        {!adminUser ? (
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            {
                                this.state.CategoryList.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <NavDropdown.Header
                                                class="dropdown-submenu">{item.name}</NavDropdown.Header>
                                            <NavDropdown.Item as={Link} to={'/search/' + item.name}
                                                              style={{color: "blue"}}> All {item.name} </NavDropdown.Item>
                                            {
                                                item.subCategory.map((txt, i) => {
                                                    return (
                                                        <NavDropdown.Item key={i} class="dropdown-menu" as={Link}
                                                                          to={'/search/' + txt}>{txt}</NavDropdown.Item>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href={'/rated'} eventKey="4.4">Top-Rated</NavDropdown.Item>
                        </NavDropdown>
                        ) : (null)}

                        {currentUser ? (
                        <Nav.Link as={Link} to="/wishlist"><FavoriteBorderIcon/></Nav.Link>
                        ) : (null)}

                        {(this.state.addModalShow && currentUser) ? (
                            <GetShoppingCart show={this.state.addModalShow} onHide={addModalClose}
                                             history={this.props.history}/>
                        ) : (
                            <IconButton aria-label="cart">
                                <Badge badgeContent={this.state.count} color="secondary">
                                    <ShoppingCartIcon style={{fill: "white"}}
                                                      onClick={() => this.setState({addModalShow: true})}/>
                                </Badge>
                            </IconButton>
                        )}
                    </Nav>
                    <Form inline>
                        <FormControl defaultValue={this.state.SearchVal}
                                     type="text" placeholder="Search" className="mr-sm-2"
                                     onChange={(e) => this.setState({SearchVal: e.target.value})}/>
                        <Nav.Link className="paddingNone" as={NavLink} to={'/search/' + this.state.SearchVal}>
                            <IconButton style={{color: "white", padding: 0}}><SearchIcon/></IconButton>
                        </Nav.Link>
                    </Form>
                    {currentUser || adminUser || salesUser ? (
                        <Nav.Link style={{color: 'white'}} href="/" onClick={this.logOut}>Logout</Nav.Link>
                    ) : (
                        <Nav.Link style={{color: 'white'}} href="/loginRegView">Login</Nav.Link>
                    )}
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default withRouter(NavBar)


