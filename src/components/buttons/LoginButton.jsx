import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './LoginButton.css';

class LoginButton extends Component {
    render() {
        return (
            <Button href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`} color="primary" className="LoginButton btn-block">Login With GitHub</Button>
        );
    }
}

export default LoginButton;
