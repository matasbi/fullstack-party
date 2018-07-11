import React, { Component } from 'react';
import Button from "./buttons/Button";
import './Header.css';

export default class Header extends Component {
  handleLogout() {
    window.location = `${process.env.REACT_APP_HOST_URL}/logout`;
  }

  render() {
    return (
      <header className="navbar Header p-4">
        <a href="/"><img className="HeaderLogo" src="/img/logo-dark.png" alt="Testio" /></a>
        <Button className="Header-logout" icon="logout" title="Logout" onClick={this.handleLogout} />
      </header>
    );
  }
}
