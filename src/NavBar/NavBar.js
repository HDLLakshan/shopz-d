import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import AuthService from "../Component/UserManagement/services/auth.service";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
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
            CategoryList:[]
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
        return(
            <Navbar bg="info" variant="dark">
                {currentUser ? (
                    <Navbar.Brand href="/userMan"> Hi {username}! </Navbar.Brand>
                ) : ( null )}
                <Nav className="mr-auto">
                    <Nav.Link href="/add">Add</Nav.Link>
                    <Nav.Link href="/viewListOfProduct">View</Nav.Link>
                    <Nav.Link href="/">Home</Nav.Link>
                    {currentUser ? (
                    <Nav.Link href="/" onClick={this.logOut}>Logout</Nav.Link>
                    ) : (
                        <Nav.Link href="/loginRegView">Login</Nav.Link>
                    )}
                    {currentUser ? (
                    <Nav.Link href="/wishlist">Wishlist</Nav.Link>
                    ) : ( null )}
                    {currentUser ? (
                    <Nav.Link href="/cart">Shopping cart</Nav.Link>
                    ) : ( null )}
                    {salesUser && (
                        <Nav.Link href="/check">Admin</Nav.Link>
                    )}

                    <NavDropdown title="Categories" >
                        {this.state.CategoryList.map(item => {
                            return(
                            <NavDropdown.Item eventKey="4.1"  href={'/search/' + item.name}>{item.name}</NavDropdown.Item>
                            )
                        })}


                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                    </NavDropdown>


                </Nav>

                <Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => this.setState({SearchVal:e.target.value})}/>

                      <Nav.Link href={'/search/'+this.state.SearchVal}>
                        <Button variant="outline-light" >Search</Button>
                        </Nav.Link>

                    </Form>
                </Nav>

            </Navbar>
        )
    }

}

export default NavBar

