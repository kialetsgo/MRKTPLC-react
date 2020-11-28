/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import './Home.scss'

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <div id="page-home">
                    <p>this is an home page</p>
                </div>

                <div id="page-about">
                    <p>this is an about page</p>
                </div>
                <div id="page-contact">
                    <p>this is an contact page</p>
                </div>
            </div>

        )
    }
}

export default HomePage