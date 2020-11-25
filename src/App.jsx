/* eslint-disable no-unused-vars */
import React from 'react'
import 'bootstrap/scss/bootstrap.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import Home from './../src/components/pages/Home'
import About from './../src/components/pages/About'
import Contact from './../src/components/pages/Contact'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import Register from './components/pages/Register'
import LoginPage from './components/pages/Login'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />
          <Switch>
          <Route path="/users/register" component={Register} />

          <Route path="/users/login" component={LoginPage} />

          <Route path="/contact"><Contact /></Route>

          <Route path="/about"><About /></Route>


          <Route path="/"><Home /></Route>




          </Switch>
          <SiteFooter />
        </Router>

      </div>
    )
  }
}


export default App;