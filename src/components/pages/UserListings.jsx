/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'
import React from 'react'
import { withCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import './UserListings.scss'

class UserListings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listings: []
        }
    }

    componentDidMount() {
        this.getAllListings()
    }

    getAllListings() {
        const token = this.props.cookies.get('token')
        console.log(token)
        const config = {
            headers: {
                auth_token: token
            }
        }
        return axios.get('http://localhost:5000/api/v1/users/listings', config)
            .then(response => {
                this.setState({
                    listings: response.data
                })
                console.log(this.state.listings)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="page-heading">
                    <h1>All Listings</h1>
                </div>
                <div className="listings">
                    <div className="row">
                        {
                            this.state.listings.length > 0 ? (
                                this.state.listings.map(listing => {
                                    return (
                                        <div className="listing col-4">
                                            <figure>
                                                <img src={listing.img} />
                                                <figcaption>
                                                    <p className="p-name">{listing.listing_name}</p>
                                                    <p className="p-location">{listing.location}</p>
                                                    <p className="p-username">{listing.username}</p>
                                                </figcaption>
                                            </figure>
                                            <Link to={{
                                                // link to new path
                                                pathname: `/listings/${listing.slug}`,
                                                state: {
                                                    listing: listing
                                                }
                                            }}>
                                            </Link>
                                        </div>
                                    )
                                })
                            ) : (
                                    <p>No listings at this moment</p>
                                )
                        }

                    </div>
                </div>
            </div>
        )
    }

}

export default withCookies(UserListings)
