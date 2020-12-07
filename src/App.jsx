/* eslint-disable no-unused-vars */
import React from 'react'
import 'bootstrap/scss/bootstrap.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.scss'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import Home from './components/pages/Home'
import About from './components/pages/About'
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
import Pages from './components/pages/Pages'
import CreateEvents from './components/pages/CreateEvents'
import ShowAllEvents from './components/pages/ShowAllEvents'
import ShowOneEvents from './components/pages/ShowOneEvents'
import ShowUserEvents from './components/pages/ShowUserEvents'
import 'tailwindcss/tailwind.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SiteHeader />

          <Switch>

            <GuestRoute path="/users/login" component={Login} />

            <GuestRoute path="/users/register" component={Register} />

            <Route path="/currentuser/events" component={ShowUserEvents} />
            <Route path="/events/new" component={CreateEvents} />
            <Route path="/events/:id" component={ShowOneEvents} />
            <Route path="/events" component={ShowAllEvents} />

            <Route path="/listings/edit/:slug" component={EditListing} />
            <Route path="/listings/all" component={AllListings} />
            <Route path="/listings/:slug" component={Listing} />
            <ProtectedRoute path="/users/listings" component={UserListings} />


            <ProtectedRoute path="/users/profile" component={UserProfile} />
            <ProtectedRoute path="/users/listing/new" component={CreateListing} />

            <Route path="/" component={Pages} />
          </Switch>
          <SiteFooter />
        </Router>
      </div>
    )
  }
}

export default App;

