import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Issues from './components/Issues';
import Issue from './components/Issue';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <span>
          <Route exact path="/" component={Login} />
          <Route path="/issues/:repoState?/:page?" component={Issues} />
          <Route path="/issue/:number" component={Issue} />
        </span>
      </BrowserRouter>
    );
  }
}

export default App;
