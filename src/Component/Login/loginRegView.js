import React from 'react';
import { Login } from "./login"
import { Register } from "./register"
import './style.scss';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.css";
import AuthService from "../services/auth.service";

export default class LoginRegView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive : true,
            logged:false,
            currentuser:undefined
        }
    }

    componentDidMount() {
        //Add .right by default
        this.rightSide.classList.add("right");
        this.setState({
            currentuser:AuthService.getCurrentUser()
        })
        if(this.state.currentuser)
            this.setState({logged:true});

    }

    changeState() {
        const { isLogginActive } = this.state;

        if (isLogginActive) {
            this.rightSide.classList.remove("right");
            this.rightSide.classList.add("left");
        } else {
            this.rightSide.classList.remove("left");
            this.rightSide.classList.add("right");
        }
        this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    }

    render() {
        const { isLogginActive } = this.state;
        const current = isLogginActive ? "Register" : "Login";
        const currentActive = isLogginActive ? "login" : "register";
        return (
            <router>
                {/*<div onClick={this.state.loading ? (<Home/>) : (*/}
                <div className="App">
                    <div className="login">
                        <div className="container" ref={ref => (this.container = ref)}>
                            {isLogginActive && (
                                <Login containerRef={ref => (this.current = ref)} />
                            )}
                            {!isLogginActive && (
                                <Register containerRef={ref => (this.current = ref)} />
                            )}
                        </div>
                        <RightSide
                            current={current}
                            currentActive={currentActive}
                            containerRef={ref => (this.rightSide = ref)}
                            onClick={this.changeState.bind(this)}
                        />
                    </div>
                </div>
                {/*)}></div>*/}
            </router>
        );
    }

}

const RightSide = props => {
    return (
        <div
            className="right-side"
            ref={props.containerRef}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};


