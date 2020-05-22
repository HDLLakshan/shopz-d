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
import GetShoppingCart from "../Component/UserManagement/Shopping Cart/getShoppingCart";
import {Badge} from "@material-ui/core";
import LoginRegView from "../Component/UserManagement/Login/loginRegView";
import Search from "@material-ui/icons/Search";
import {Link, NavLink, withRouter} from "react-router-dom";
import './NavBar.scss'

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

        axios.get('https://servershopping.azurewebsites.net/category/all')
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
            <Navbar className="layout" variant="dark">
                <text className="name">RARE</text>
                {currentUser || adminUser ? (
                    <Navbar.Brand href="/userMan"> Hi {username}! </Navbar.Brand>
                ) : (null)}
                <Nav className="mr-auto">

                    {currentUser || salesUser ? (
                        <div>
                            <Nav.Link as={NavLink} to={"/add"}>Add</Nav.Link>
                            <Nav.Link as={NavLink} to={"/viewListOfProduct"}> View </Nav.Link>
                        </div>   ) : (null)}
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            < NavDropdown title="Categories">
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



                    {currentUser ? (
                        <Nav.Link as={Link} to="/wishlist"><FavoriteBorderIcon/></Nav.Link>
                    ) : (null)}
                    {this.state.addModalShow ? (
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

                    <Nav>
                        <Form inline>
                           <div>
                                <FormControl defaultValue={this.state.SearchVal} type="text" placeholder="Search"
                                             className="mr-sm-2"
                                             onChange={(e) => this.setState({SearchVal: e.target.value})}/>

                                <Nav.Link as={NavLink} to={'/search/' + this.state.SearchVal}>
                                    <Button  size={'large'} variant="contained" color="primary" size="large" startIcon={<Search/>}/>
                                </Nav.Link>
                            </div>

                            {currentUser || adminUser ? (
                                <Nav.Link href="/" onClick={this.logOut}>Logout</Nav.Link>
                            ) : (
                                <Nav.Link href="/loginRegView">Login</Nav.Link>
                            )}
                        </Form>
                    </Nav>


            </Navbar>
        )
    }
}

export default withRouter(NavBar)


