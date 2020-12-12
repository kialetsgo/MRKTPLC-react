/* eslint-disable no-unused-vars */
import React from 'react'
import 'tailwindcss/tailwind.css'
import 'bootstrap/scss/bootstrap.scss'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import UserProfile from './components/pages/UserProfile'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateListing from './components/pages/CreateListing'
import AllListings from './components/pages/AllListings'
import UserListings from './components/pages/UserListings'
import Listing from './components/pages/Listing'
import EditListing from './components/pages/EditListing'
import Pages from './components/pages/Pages'
import CreateEvents from './components/pages/CreateEvents'
import ShowAllEvents from './components/pages/ShowAllEvents'
import ShowOneEvents from './components/pages/ShowOneEvents'
import ShowUserEvents from './components/pages/ShowUserEvents'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Header />

          <Switch>

            <GuestRoute path="/users/login" component={Login} />

            <GuestRoute path="/users/register" component={Register} />

            <ProtectedRoute path="/users/events" component={ShowUserEvents} />
            <ProtectedRoute path="/events/new" component={CreateEvents} />
            <Route path="/events/:id" component={ShowOneEvents} />
            <Route path="/events" component={ShowAllEvents} />

            <Route path="/listings/edit/:slug" component={EditListing} />
            <Route path="/listings/all" component={AllListings} />
            <Route path="/listings/:slug" component={Listing} />
            <ProtectedRoute path="/users/listings/new" component={CreateListing} />
            <ProtectedRoute path="/users/listings" component={UserListings} />


            <ProtectedRoute path="/users/profile" component={UserProfile} />


            <Route path="/" component={Pages} />

          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default App;

