/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import ShowAllEvents from './../pages/ShowAllEvents'
import AllListings from './../pages/AllListings'
import About from './../pages/About'
import Contact from './../pages/Contact'
import Home from './../pages/Home'
import './Pages.scss'

import GuestRoute from './../GuestRoute'

class Pages extends Component {
    render() {
        return (
            <div id="guest-pages">
                <Home />
                <About />
                <Contact />
            </div>
        )
    }
}

export default Pages