/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Icon, IconButton } from '@material-ui/core'
import 'bootstrap/scss/bootstrap.scss'
import { Link } from 'react-router-dom'
import { HashLink as HLink } from 'react-router-hash-link';
import { Home } from '@material-ui/icons';
import { Info } from '@material-ui/icons'
import { ContactMail } from '@material-ui/icons'
import { Dashboard, PersonSharp, AddCircleOutline, EventAvailable, ExitToApp } from '@material-ui/icons'
import './SiteHeader.scss'

class SiteHeader extends Component {
    render() {
        return (
            <div id="site-header sticky" className="sticky">
                <nav id="navbar-data" className="navbar navbar-expand-lg navbar-light bg-light">



                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent_left" aria-controls="navbarSupportedContent_left" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent_left">
                        <ul class="navbar-nav mr-auto">

                            <li id="home" className="nav-item">
                                <IconButton>
                                    <Home style={{fontSize: '20px'}}/><HLink to="/#page-home" className="nav-link">Home</HLink>
                                </IconButton>

                            </li>
                            <li id="info" className="nav-item">
                                <IconButton>
                                    <Info style={{fontSize: '20px'}}/><HLink to="/about#page-about" className="nav-link">Info</HLink>
                                </IconButton>

                            </li>
                            <li id="contact" className="nav-item">

                                <IconButton>
                                    <ContactMail style={{fontSize: '20px'}}/><HLink to="/contact#page-contact" className="nav-link">Contact</HLink>
                                </IconButton>

                            </li>

                        </ul>
                    </div>





                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent_center" aria-controls="navbarSupportedContent_center" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent_center">
                        <ul class="navbar-nav mr-auto">
                            <li id="dashboard" className="nav-item">
                                <IconButton>
                                    <Dashboard style={{fontSize: '20px'}}/><Link to="/" className="nav-link">Dashboard</Link>
                                </IconButton>
                            </li>
                            <li id="event" className="nav-item">
                                <IconButton>
                                    <EventAvailable style={{fontSize: '20px'}}/><Link to="/" className="nav-link">Events</Link>
                                </IconButton>
                            </li>
                        </ul>
                    </div>



                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent_right" aria-controls="navbarSupportedContent_right" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent_right">
                        <ul class="navbar-nav ml-auto">
                            <li className="nav-item">
                                <IconButton>
                                    <PersonSharp style={{fontSize: '20px'}}/><Link to="/users/login" className="nav-link">Login</Link>
                                </IconButton>
                            </li>
                            <li className="nav-item">
                                <IconButton>
                                    <AddCircleOutline style={{fontSize: '20px'}}/><Link to="/users/register" className="nav-link">Register</Link>
                                </IconButton>
                            </li>
                            <li className="nav-item">
                                <IconButton fontSize="small">
                                    <ExitToApp style={{fontSize: '20px'}}/><Link to="/" className="nav-link" >Logout</Link>
                                </IconButton>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default SiteHeader