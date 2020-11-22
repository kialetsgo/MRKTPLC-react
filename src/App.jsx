/* eslint-disable no-unused-vars */
import React from 'react'
import 'bootstrap/scss/bootstrap.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
          <Switch>
            <Route path="/contact"><Contact /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/"><Home /></Route>
          </Switch>
        </Router>

      </div>
    )
  }
}


export default App;