/* eslint-disable no-unused-vars */
import React from 'react'
import 'bootstrap/scss/bootstrap.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import './App.scss'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Register from './components/pages/Register'
import Home from './components/pages/Home'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          
        <SiteHeader />
          <Switch>

            <Route path="/users/register" component={Register} />

  
          </Switch>

          <SiteFooter />
        </Router>


      </div>
    )
  }
}


export default App;