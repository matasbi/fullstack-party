import React, { Component } from 'react';
import LoginButton from './buttons/LoginButton';
import './Login.css';
import { Redirect } from 'react-router-dom';
import qs from 'querystring';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'isAuth': false,
    };
  }

  componentDidMount() {
    const code = qs.parse(window.location.search.substr(1)).code;

    if (code) {
      this.oAuth();      
    } else{
      this.checkAuth();
    }
  }

  oAuth() {
    const code = qs.parse(window.location.search.substr(1)).code;

    if (code) {
      fetch(`${process.env.REACT_APP_API_URL}/login/oauth`, {
        method: "POST",
        body: qs.stringify({
          code: code
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: 'include',
      })
        .then(data => {
          this.setState({
            isAuth: true
          });
        })
        .catch(error => console.log(error));
    }
  }

  checkAuth() {
    fetch(`${process.env.REACT_APP_API_URL}/token`, {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then(response => {
        if (response.data.token) {
          this.setState({
            isAuth: true
          });
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    const { isAuth } = this.state;

    if (isAuth) {
      return <Redirect to={{ pathname: "/issues" }} />;
    }

    return (
      <div className="Login">
        <div id="background"></div>
        <div className="Login-flex d-flex align-items-center justify-content-center">
          <div className="Login-container text-center">
            <img src="/img/logo-light.png" className="Login-logo" alt="logo" width="246" height="64" />
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
