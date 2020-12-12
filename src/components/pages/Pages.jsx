/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import About from './../pages/About'
import Contact from './../pages/Contact'
import Home from './../pages/Home'


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