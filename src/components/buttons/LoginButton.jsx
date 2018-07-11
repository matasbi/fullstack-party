import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './LoginButton.css';

class LoginButton extends Component {
    handleLogin() {
        window.location = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
    }

    render() {
        return (
            <Button className="LoginButton btn-block" color="primary" onClick={this.handleLogin}>Login With GitHub</Button>
        );
    }
}

export default LoginButton;
