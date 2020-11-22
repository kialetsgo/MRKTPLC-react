/* eslint-disable no-unused-vars */
import React from 'react'
import 'bootstrap/scss/bootstrap.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import './App.scss'
import Home from './../src/components/pages/Home'
import About from './../src/components/pages/About'
import Contact from './../src/components/pages/Contact'
import SiteHeader from './components/SiteHeader'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />
        </Router>

      </div>
    )
  }
}


export default App;