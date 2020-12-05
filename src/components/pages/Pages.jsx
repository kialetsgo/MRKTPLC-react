/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Home from './../pages/Home'
import About from './../pages/About'
import Contact from './../pages/Contact'
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