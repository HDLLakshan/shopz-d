import React from "react";
import LoginImg from "../../download.svg";
import AuthService from "../services/auth.service";
import {LoginRegView} from "./loginRegView";
import MainView from "../ProductMangement/ViewProducts/MainView";


export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Password: '',
            isValidated:false,
            loading:false
        };
        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

     // componentDidMount() {
    //      //     // If logged in and user navigates to Register page, should redirect them to dashboard
    //      //     if (this.props.auth.isAuthenticated) {
    //      //         this.props.history.push("/home");
    //      //     }
    //      // }
    //      // componentWillReceiveProps(nextProps) {
    //      //     if (nextProps.auth.isAuthenticated) {
    //      //         this.props.history.push("/home"); // push user to dashboard when they login
    //      //     }
    //      //     if (nextProps.errors) {
    //      //         this.setState({
    //      //             errors: nextProps.errors
    //      //         });
    //      //     }
    //      // }

    handleValidation(){
        if(!this.state.Username)
            alert('Please enter the username');
        else if(!this.state.Password)
            alert('Please enter the password');
        else
           this.setState({isValidated:true});
    }

    handleSubmit(event){
        event.preventDefault();


        const userData = {
            Username: this.state.Username,
            Password: this.state.Password
        };
        //this.props.loginUser(userData);

        console.log(this.state.isValidated);
        this.handleValidation();
            console.log(this.state.isValidated);
            //Have to change here
            //-----------------------------------
            // if(this.state.isValidated){
                console.log('csd');
                console.log(`Username: ${this.state.Username}`);
                console.log(`PasswordOne: ${this.state.Password}`);

        AuthService.login(userData).then(
            () => {
                console.log("----------------------------");

                this.setState({
                    loading: true,
                    Username:'',
                    Password:''
                });
                //this.props.history.push("/");
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

            });




                //thissssssssssssssssssssssssssssssssssssssss
                // axios.post('http://localhost:4000/users/login', userData)
                //     .then(res => {
                //         console.log(res.data);
                //         if(res.data.success)
                //             alert('okay');
                //         else
                //             alert('nonono');
                //until thissssssssssssssssssssssssssssss
                        // console.log(res.data[0].PasswordOne);
                        // if(res.data[0].PasswordOne === this.state.Password)
                        //     alert('okay');
                        // else
                        //     alert('nonono');
        //hereeeeeeeeeeeeeeeeeeeeeeee
                //     });
                //
                // this.setState({
                //     Username:'',
                //     Password:''
                // })
//hereeeeeeeeeeeeeeeeeee
            // }else{
            //     console.log('Not validated');
            // }
    }

handleUserName(event)
{
    this.setState({
        Username: event.target.value,

    });
}
handlePassword(event)
{
    this.setState({
        Password: event.target.value,

    });
}

render(){
    const { errors } = this.state;
    return (

            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={LoginImg}/>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="Username">Username</label>
                                {/*<span className="red-text">*/}
                                {/*    {errors.Username}*/}
                                {/*    {errors.usernamenotfound}*/}
                                {/*</span>*/}
                                <input type="text" value={this.state.Username} onChange={this.handleUserName}
                                    //error={errors.Username} id="Username" className={classnames("", {
                                    //invalid: errors.Username || errors.usernamenotfound })}
                                       placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                {/*<span className="red-text">*/}
                                {/*    {errors.Password}*/}
                                {/*    {errors.passwordincorrect}*/}
                                {/*</span>*/}
                                <input type="password"
                                    // error={errors.Password}
                                    // id="Password"
                                    // className={classnames("", {
                                    //     invalid: errors.Password || errors.Password})}
                                       value={this.state.Password} onChange={this.handlePassword}
                                       placeholder="Password"/>
                            </div>

                        </div>
                        <div className="footer">
                            <button type="submit" className="btn">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>

    );
}

}
