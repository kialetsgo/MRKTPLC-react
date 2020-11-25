/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Link as ReactLink} from 'react-router-dom'
import { Icon, IconButton } from '@material-ui/core'
import 'bootstrap/scss/bootstrap.scss'
// import { Link } from 'react-router-dom'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { Home } from '@material-ui/icons';
import { Info } from '@material-ui/icons'
import { ContactMail } from '@material-ui/icons'
import { Dashboard, PersonSharp, AddCircleOutline, EventAvailable, ExitToApp } from '@material-ui/icons'
import './SiteHeader.scss'
import Scrollspy from 'react-scrollspy'
import HomePage from './../components/pages/Home'
import About from './../components/pages/About'
import Contact from './../components/pages/Contact'
class SiteHeader extends Component {
    listener = null;
    state = {
        nav: false
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll',this.handleScroll);
    }
    handleScroll = () => {
        if (window.pageYOffset > 140) {
            if (!this.state.nav) {
                this.setState({ nav: true });
            }
        } else {
            if (this.state.nav) {
                this.setState({ nav: false });
            }
        }

    }

    render() {
        return (
            <div id="site-header">
                <nav id="navbar-data" className={`Nav ${this.state.nav && 'Nav__black'} navbar navbar-expand-lg navbar-light bg-light sticky`}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent_left" aria-controls="navbarSupportedContent_left" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent_left">
                        <ul className="navbar-nav mr-auto">
                            <li id="home" className="nav-item">
                                <IconButton>
                                    <Home /><Link hashSpy={true} to="/" className="nav-link" spy={true} smooth={true} duration={500} >Home</Link>
                                </IconButton>
                            </li>
                            <li id="info" className="nav-item">
                                <IconButton>
                                    <Info /><Link hashSpy={true} to="/about" className="nav-link" spy={true} smooth={true} duration={500} >Info</Link>
                                </IconButton>
                            </li>
                            <li id="contact" className="nav-item">
                                <IconButton>
                                    <ContactMail /><Link hashSpy={true} to="/contact" className="nav-link" spy={true} smooth={true} duration={500} >Contact</Link>
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent_center" aria-controls="navbarSupportedContent_center" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent_center">
                        <ul className="navbar-nav mr-auto">
                            <li id="dashboard" className="nav-item">
                                <IconButton>
                                    <Dashboard /><Link to="/" className="nav-link">Dashboard</Link>
                                </IconButton>
                            </li>
                            <li id="event" className="nav-item">
                                <IconButton>
                                    <EventAvailable /><Link to="/" className="nav-link">Events</Link>
                                </IconButton>
                            </li>
                        </ul>
                    </div>



                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent_right" aria-controls="navbarSupportedContent_right" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent_right">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <IconButton>
                                    <PersonSharp /><Link to="/" className="nav-link">Login</Link>
                                </IconButton>
                            </li>
                            <li className="nav-item">
                                <IconButton>
                                    <AddCircleOutline /><ReactLink to="/users/register" className="nav-link">Register</ReactLink>
                                </IconButton>
                            </li>
                            <li className="nav-item">
                                <IconButton>
                                    <ExitToApp /><Link to="/" className="nav-link">Logout</Link>
                                </IconButton>
                            </li>

                        </ul>
                    </div>
                </nav>
                <Element name="/" className="element">
                    <HomePage />
                </Element>
                <Element name="/about" className="element">
                    <About />
                </Element>
                <Element name="/contact" className="element">
                    <Contact />
                </Element>
            </div>
        )
    }
}

export default SiteHeader