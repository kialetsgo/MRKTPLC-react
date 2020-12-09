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

            <header id="site-header" className="sticky">

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">

                        <Link to="/" className="navbar-brand">
                            <img src="../../img/mrktplc.png" alt="logo" />
                        </Link>

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
                                <li className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Events
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/events" className="dropdown-item">Show All</Link>
                                        <Link to="/events/new" className="dropdown-item">Create New</Link>
                                    </div>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Listings
                                    </Link>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <Link to="/listings/all" className="dropdown-item">Show All</Link>
                                        <Link to="/listing/new" className="dropdown-item">Create New</Link>
                                    </div>
                                </li>
                            </ul>

                            {/* <form className="form-inline my-2 my-lg-0" onSubmit={e => { this.handleFormSubmission(e) }}>
                                    <div className="input-group">
                                        <select className="form-control" value={this.state.searchField} onChange={e => { this.handleChange(e, 'searchField') }} id="search-field">
                                            <option>Location</option>
                                            <option>Category</option>
                                        </select>
                                        <input type="text" className="form-control" value={this.state.searchInput} onChange={e => { this.handleChange(e, 'searchInput') }} aria-label="Text input with dropdown button" />
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                    </div>
                                </form> */}




                            <ul className="navbar-nav mr-auto float-right" id="profile-dropdown">

                                {
                                    this.isAuthenticated() ? (
                                        <li className="nav-item dropdown">
                                            <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Profile
                                        </Link>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link to="/users/profile" className="dropdown-item">Update</Link>
                                                <Link to="/users/events" className="dropdown-item">Event</Link>
                                                <Link to="/users/listings" className="dropdown-item">Listing</Link>
                                            </div>
                                        </li>
                                    ) : (
                                            <li className="nav-item">
                                                <Link to="/users/login" className="nav-link">Login</Link>
                                            </li>
                                        )
                                }

                            </ul>
                            <li className="nav-item dropdown">
                                <Link to="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Users
                                    </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link to="/users/login" className="dropdown-item">Login</Link>
                                    <Link to="/users/register" className="dropdown-item">Register</Link>
                                    <Link to="/user/events" className="dropdown-item">Show My Events</Link>
                                </div>
                            </li>

                        </div>
                    </div>

                </nav>
            </header>

        )
    }
}

export default withCookies(Header)
