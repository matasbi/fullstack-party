import React, { Component } from 'react';
import Button from "./buttons/Button";
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="navbar Header p-4">
        <a href="/"><img className="HeaderLogo" src="/img/logo-dark.png" alt="Testio" /></a>
        <Button icon="logout" title="Logout" />
      </header>
    );
  }
}
