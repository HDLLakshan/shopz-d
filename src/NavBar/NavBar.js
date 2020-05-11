import React, {Component} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import AuthService from "../Component/UserManagement/services/auth.service";
let username='';


class NavBar extends Component{
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: false,
            SearchVal:'',
            salesUser:false,
            adminUser:false
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

