import React, { Component } from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Nav from './components/Nav'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Nav />
          <Main />
        </div>
      </Router>
    )
  }
}

export default App;
