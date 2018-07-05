import React, { Component } from 'react';
import LoginButton from './buttons/LoginButton';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div className="Login">
                <img src="/img/logo-light.png" className="Login-logo" alt="logo" width="246" height="64" />
                <LoginButton />
            </div>
        );
    }
}

export default Login;
