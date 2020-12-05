import React from 'react'
import 'bootstrap/scss/bootstrap.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Contact from './components/pages/Contact.jsx'
import UserProfile from './components/pages/UserProfile'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import CreateListing from './components/pages/CreateListing'
import UserDashboard from './components/pages/UserDashboard'
import AllListings from './components/pages/AllListings'
import UserListings from './components/pages/UserListings'
import Listing from './components/pages/Listing'
import EditListing from './components/pages/EditListing'

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

            <Route path="/listings/edit/:slug" component={EditListing} />
            <Route path="/listings/all" component={AllListings} />
            <Route path="/listings/:slug" component={Listing} />
            <ProtectedRoute path="/users/listings" component={UserListings} />


            <ProtectedRoute path="/users/profile" component={UserProfile} />

            <ProtectedRoute path="/users/listing/new" component={CreateListing} />

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

