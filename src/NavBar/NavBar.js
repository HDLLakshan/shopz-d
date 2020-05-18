import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "@material-ui/core/Button";
import AuthService from "../Component/UserManagement/services/auth.service";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import GetShoppingCart from "../Component/UserManagement/Shopping Cart/getShoppingCart";
import LoginRegView from "../Component/UserManagement/Login/loginRegView";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import {Link, NavLink} from "react-router-dom";
let username='';



class NavBar extends Component{
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: false,
            SearchVal:'',
            salesUser:false,
            adminUser:false,
            CategoryList:[],
            addModalShow:false
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
            } else if(AuthService.getCurrentUser().roles[0]==="ROLE_ADMIN") {
                this.setState({
                    adminUser: true,
                });
            }
        }

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
        const { currentUser, salesUser , adminUser} = this.state;
        let addModalClose =() => this.setState({addModalShow : false});
        return(
            <Navbar bg="info" variant="dark">
                {currentUser ? (
                    <Navbar.Brand href="/userMan"> Hi {username}! </Navbar.Brand>
                ) : ( null )}
                <Nav className="mr-auto">
                    <Nav.Link hidden={!this.state.adminUser || !this.state.salesUser} href="/add">Add</Nav.Link>
                    <Nav.Link as={NavLink} to={"/viewListOfProduct"}> View </Nav.Link>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {currentUser ? (
                    <Nav.Link href="/wishlist">Wishlist</Nav.Link>
                    ) : ( null )}
                    {this.state.addModalShow ? (
                            <GetShoppingCart show={this.state.addModalShow} onHide={addModalClose} history={this.props.history}/>
                        ) : (
                            <button type='button' className='btn btn-info'
                                    onClick={() => this.setState({addModalShow:true})}> Cart </button>
                    )}
                    {adminUser && (
                        <Nav.Link href="/check">Admin</Nav.Link>
                    )}

                    <NavDropdown title="Categories" >
                        {this.state.CategoryList.map((item,index) => {
                            return(
                                <div key={index}>

                            <NavDropdown.Header   class="dropdown-submenu">{item.name}</NavDropdown.Header>
                            <NavDropdown.Item as={Link} to={'/search/' + item.name} style={{color:"blue"}}> All {item.name} </NavDropdown.Item>
                                    {
                                item.subCategory.map((txt, i) => {
                                    return(
                                        <NavDropdown.Item key={i} class="dropdown-menu" as={Link} to={'/search/' + txt}>{txt}</NavDropdown.Item>
                                    )
                                })
                            }
                                </div>
                            )
                        })}


                        <NavDropdown.Divider />
                        <NavDropdown.Item href={'/rated'} eventKey="4.4">Top-Rated</NavDropdown.Item>
                    </NavDropdown>


                </Nav>

                <Nav>
                    <Form inline>
                        <FormControl defaultValue={this.state.SearchVal} type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => this.setState({SearchVal:e.target.value})}/>

                      <Nav.Link as={NavLink} to={'/search/'+this.state.SearchVal}>
                        <Button  variant="outline-light" size={'large'} startIcon={<SearchOutlined/>}  />
                        </Nav.Link>
                        {currentUser ? (
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

export default NavBar

