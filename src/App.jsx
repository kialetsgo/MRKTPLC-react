import React from 'react'
import 'bootstrap/scss/bootstrap.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import './App.scss';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './src/components/pages/Contact'
import UserProfile from './components/pages/UserProfile'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import CreateListing from './components/pages/CreateListing'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />

            <Switch>

              <GuestRoute path="/users/login" component={Login} />

              <GuestRoute path="/users/register" component={Register} />

              <GuestRoute path="/about" component={About} />

              <GuestRoute path="/contact" component={Contact} />

              <ProtectedRoute path="/users/profile" component={UserProfile} />

              <ProtectedRoute path="/listings/new" component={CreateListing} />
              
              <Route path="/">
                <Home />
              </Route>

            </Switch>
          <SiteFooter />
        </Router>
      </div>
    )
  }
}

export default App;

