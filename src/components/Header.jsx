/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { withCookies } from 'react-cookie'
import { HashLink as HLink } from 'react-router-hash-link';
import './Header.scss'
import axios from 'axios'
import qs from 'qs'

class Header extends React.Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         searchField: '',
    //         searchInput: ''
    //     }
    // }
    isAuthenticated() {
        const token = this.props.cookies.get('token')

        if (!token || token === "undefined" || token === "null") {
            return false
        }

        return true
    }

    // handleChange(e, elemName) {
    //     this.setState({ [elemName]: e.target.value })
    // switch (elemName) {
    //     case 'listing_name':
    //         this.setState({
    //             listing_name: e.target.value
    //         })
    //         break;
    //     case 'img':
    //         this.setState({
    //             img: e.target.value
    //         })
    //         break;
    //     case 'description':
    //         this.setState({
    //             description: e.target.value
    //         })
    //         break;
    //     case 'location':
    //         this.setState({
    //             location: e.target.value
    //         })
    //         break;
    //     case 'category':
    //         this.setState({
    //             category: e.target.value
    //         })
    //         break;
    //     case 'expiry_date':
    //         this.setState({
    //             expiry_date: e.target.value
    //         })
    //         break;
    // }
    //     console.log(this.state)
    // }


    // handleFormSubmission(e) {
    //     e.preventDefault() // prevent submit to another page
    //     const token = this.props.cookies.get('token')
    //     const config = {
    //         headers: {
    //             auth_token: token
    //         }
    //     }
    //     console.log(token)
    //     axios.get(`http://localhost:5000/api/v1/?${this.state.searchField}/?${this.state.searchInput}`, qs.stringify({
    //         searchField: this.state.searchField,
    //         searchInput: this.state.searchInput
    //     }), config)
    //         .then(response => {
    //             console.log(response.data)
    //             this.setState({
    //                 searchField: '',
    //                 searchInput: ''
    //             })
    //             this.props.history.push('/search')
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }


    render() {
        return (

            <header id="site-header">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">

                        <Link to="/" className="navbar-brand">
                            <img src="../../img/mrktplc.png" alt="logo" id="brand-logo" />
                        </Link>
                        
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item dropdown">
                                        <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            MRKTPLC
                                        </Link>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <HLink to="/#page-home" className="dropdown-item">Home</HLink>
                                            <HLink to="/about#page-about" className="dropdown-item">About Us</HLink>
                                            <HLink to="/contact#page-contact" className="dropdown-item">Contact Us</HLink>
                                        </div>
                                    </li>

                                    {
                                        this.isAuthenticated() ? (
                                            <li className="nav-item dropdown">
                                                <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Events
                                                </Link>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <Link to="/events" className="dropdown-item">Show All Events</Link>
                                                    <Link to="/events/new" className="dropdown-item">Create Event</Link>
                                                    <Link to="/users/events" className="dropdown-item">Show User Events</Link>
                                                </div>
                                            </li>
                                        ) : (
                                            <li className="nav-item">
                                                <Link to="/events" className="nav-link">Events</Link>
                                            </li>
                                            )
                                    }

                                    {
                                        this.isAuthenticated() ? (
                                            <li className="nav-item dropdown">
                                                <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Listings
                                                </Link>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <Link to="/listings/all" className="dropdown-item">Show All Listings</Link>
                                                    <Link to="/users/listings/new" className="dropdown-item">Add Item</Link>
                                                    <Link to="/users/listings" className="dropdown-item">Show User Items</Link>
                                                </div>
                                            </li>
                                        ) : (
                                            <li className="nav-item">
                                                <Link to="/listings/all" className="nav-link">Listings</Link>
                                            </li>
                                            )
                                    }

                                </ul>

                                    {
                                        this.isAuthenticated() ? (
                                            <li className="nav-item dropdown">
                                                <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Profile
                                            </Link>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <Link to="/users/profile" className="dropdown-item">Update</Link>
                                                </div>
                                            </li>
                                        ) : (
                                                <li className="nav-item">
                                                    <Link to="/users/login" className="nav-link btn btn-primary active">Login</Link>
                                                </li>
                                            )
                                    }

                            </div>
                    </nav>
                    

            </header>

        )
    }
}

export default withCookies(Header)
